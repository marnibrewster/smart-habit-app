import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, target_streak }: { name: string; target_streak?: number } =
    await req.json();

  const { data, error } = await supabase.from("habits").insert([
    {
      user_id: user.id, // Automatically link to authenticated user
      name,
      target_streak: target_streak || 0,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Handle GET requests to fetch habits for a specific user
export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch habits for the user
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error", err }, { status: 500 });
  }
}
