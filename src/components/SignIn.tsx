import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();
  return session && session.user ? (
    <button
      className="w-full px-5 py-3 rounded bg-nav-teal font-serif text-xl text-white drop-shadow-md \
                 duration-150 hover:-translate-y-0.5"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  ) : (
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
