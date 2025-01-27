import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const awaitedCookies = await cookies;
  while (!awaitedCookies) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const supabase = createRouteHandlerClient({ cookies: awaitedCookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Query the user's details
  const { data: userData, error: userDetailsError } = await supabase
    .from("users")
    .select("id, role, first_name, last_name, email")
    .eq("id", user.id)
    .single();

  if (userDetailsError) {
    return NextResponse.json(
      { error: userDetailsError.message },
      { status: 400 }
    );
  }

  return NextResponse.json(userData, { status: 200 });
}
