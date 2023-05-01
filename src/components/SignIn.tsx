import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();
  return session && session.user ? (
    <button
      className="rounded-lg bg-dark-green px-5 py-3 font-serif text-2xl text-white duration-150 hover:-translate-y-0.5"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  ) : (
    <button
      className="rounded-lg bg-dark-green px-5 py-3 font-serif text-2xl text-white duration-150 hover:-translate-y-0.5"
      onClick={() => signIn("google", { callbackUrl: "/home" })}
    >
      Sign in
    </button>
  );
};

export default SignIn;
