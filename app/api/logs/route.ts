import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const {
      user_id,
      name,
      target_streak,
    }: { user_id: string; name: string; target_streak: number } =
      await req.json();

    const { data, error } = await supabase
      .from("habits")
      .insert([{ user_id, name, target_streak }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request", err },
      { status: 500 }
    );
  }
}
