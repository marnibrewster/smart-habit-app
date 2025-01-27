import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Links from "./components/Links";
import HomePage from "./components/HomePage";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const awaitedCookies = await cookies;
  const supabase = createServerComponentClient({ cookies: awaitedCookies });

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return (
        <div>
          <div>
            You need to <Link href="/login">log in</Link> to access this page.
          </div>
        </div>
      );
    }

    return (
      <div>
        <HomePage />
        <Links />
      </div>
    );
  };

  return fetchUser();
}
