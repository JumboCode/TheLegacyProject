import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();
  return session && session.user ? (
    <button
      className="px-5 py-3 rounded-lg bg-nav-teal font-serif text-xl text-white duration-150 hover:-translate-y-0.5"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  ) : (
    <button
      className="px-5 py-3 rounded-lg bg-nav-teal font-serif text-xl text-white  duration-150 hover:-translate-y-0.5"
      onClick={() => signIn("google", { callbackUrl: "/home" })}
    >
      Sign in
    </button>
  );
};

export default SignIn;
