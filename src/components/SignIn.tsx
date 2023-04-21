import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();
  return session && session.user ? (
    <button
      className="text-2xl rounded-lg bg-dark-green px-5 py-3 font-serif text-white duration-150 hover:-translate-y-0.5"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  ) : (
    <button
      className="text-2xl rounded-lg bg-dark-green px-5 py-3 font-serif text-white duration-150 hover:-translate-y-0.5"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

export default SignIn;
