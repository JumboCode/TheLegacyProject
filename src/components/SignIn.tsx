import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";


const SignIn = ({ isPublic } : { isPublic: boolean }) => {
  const { data: session } = useSession();
  return session && session.user ? (
    isPublic ? 
    (
      <button
        className="w-auto rounded bg-nav-teal px-5 py-3 text-center font-serif text-xl text-white \
                   drop-shadow-md hover:bg-dark-teal duration-150 hover:-translate-y-0.5"
      >
        <Link href="/home">
          Home
        </Link>
      </button>
    ) :
    (
      <button
        className="w-full px-5 py-3 rounded bg-nav-teal font-serif text-xl text-white drop-shadow-md \
                  duration-150 hover:-translate-y-0.5"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
      Sign out
      </button>
    )
  ) : 
  (
    <button
      className="w-full px-5 py-3 rounded bg-nav-teal font-serif text-xl text-white drop-shadow-md \
                 duration-150 hover:bg-dark-teal hover:-translate-y-0.5"
      onClick={() => signIn("google", { callbackUrl: "/home" })}
    >
      Sign in
    </button>
  );
};

export default SignIn;
