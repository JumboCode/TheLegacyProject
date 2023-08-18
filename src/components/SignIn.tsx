import Button from "@components/Button"
import { signIn, signOut, useSession } from "next-auth/react";


const SignIn = ({ isPublic } : { isPublic: boolean }) => {
  const { data: session } = useSession();
  return session && session.user ? (
    isPublic ? 
      (
        <Button text="Home" color="bg-teal" hover="hover:bg-dark-teal"
                action={() => { window.location.href = "/home" }}/>
      ) :
      ( <Button text="Sign Out" color="bg-teal" hover="hover:bg-dark-teal"
                action={() => signOut({ callbackUrl: "/" })}/> 
      )
    ) : 
    (
      <Button text="Sign In" color="bg-teal" hover="hover:bg-dark-teal"
              action={() => signIn("google", { callbackUrl: "/home" })}/>
    );
};

export default SignIn;
