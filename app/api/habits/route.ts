import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const awaitedCookies = await cookies;
  const supabase = createRouteHandlerClient({ cookies: awaitedCookies });
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse the request body
  const {
    name,
    target_streak,
    user_ids,
  }: { name: string; target_streak?: number; user_ids: string[] } =
    await req.json();

  // Insert a new habit
  const { data: habit, error: habitError } = await supabase
    .from("habits")
    .insert([{ name, target_streak: target_streak || 0 }])
    .select("id")
    .single();

  if (habitError) {
    return NextResponse.json({ error: habitError.message }, { status: 400 });
  }

  // Assign the habit to users
  const { error: userHabitsError } = await supabase.from("user_habits").insert(
    [...user_ids, user.id].map((user_id) => ({
      user_id,
      habit_id: habit.id,
    }))
  );

  if (userHabitsError) {
    return NextResponse.json(
      { error: userHabitsError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ habit }, { status: 200 });
}

export async function GET() {
  const awaitedCookies = await cookies;
  const supabase = createRouteHandlerClient({ cookies: awaitedCookies });

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch habits for the user
    const { data, error } = await supabase
      .from("user_habits")
      .select("habit:habits(*)")
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const flatHabits = data.map((item) => item.habit);
    return NextResponse.json(flatHabits, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error", err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const awaitedCookies = await cookies;
  const supabase = createRouteHandlerClient({ cookies: awaitedCookies });
  const { id } = await req.json();

  const { error } = await supabase.from("habits").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Habit deleted successfully" },
    { status: 200 }
  );
}
