import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();
  return session && session.user ? (
    <button
      className="text-l rounded-lg bg-dark-green py-1.5 px-4 font-semibold text-white duration-150 hover:-translate-y-0.5"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  ) : (
    <button
      className="text-l rounded-lg bg-dark-green py-1.5 px-4 font-semibold text-white duration-150 hover:-translate-y-0.5"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

export default SignIn;
