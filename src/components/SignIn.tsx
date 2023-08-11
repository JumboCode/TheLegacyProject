import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";


const SignIn = ({ isPublic } : { isPublic: boolean }) => {
  const { data: session } = useSession();
  return session && session.user ? (
    isPublic ? 
    (
        <Link 
          className="flex w-[100px] h-[40px] rounded font-serif text-lg text-white \
                     hover:bg-dark-teal duration-150 hover:-translate-y-0.5"
          href="/home"
        >
          <span className="m-auto "> Home </span>
        </Link>
    ) :
    (
      <button
        className="flex w-[100px] h-[40px] rounded font-serif text-lg text-white \
                  duration-150 hover:-translate-y-0.5"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <span className="m-auto"> Sign Out </span>
      </button>
    )
  ) : 
  (
    <button
      className="flex w-[100px] h-[40px] rounded font-serif text-lg text-white \
                 bg-nav-teal duration-150 hover:bg-dark-teal hover:-translate-y-0.5"
      onClick={() => signIn("google", { callbackUrl: "/home" })}
    >
      <span className="m-auto"> Sign In </span>
    </button>
  );
};

export default SignIn;
