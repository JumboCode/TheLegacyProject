import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Head from "next/head";
import PhotoHeader from "@components/photoHeader";
import { Approval } from "@prisma/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { SeniorTile } from "@components/TileGrid";


type IStudentProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

const Home: NextPage<IStudentProps> = ({
  me, 
  seniors: initialSeniors
}) => {
  const router = useRouter(); // call to refresh props
  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);
  
  const [seniors, setSeniors] = useState(initialSeniors);
  return (
    <>
      <div className="flex flex-col h-full place-items-stretch p-6 gap-6">
        <PhotoHeader name={me.name} image={me.image} email={me.email}/>
        <p className="pl-6 font-serif text-3xl"> 
          {me.name == null ? "Your" : me.name.split(' ').shift() + "'s"} Seniors
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-center mt-3">
          {seniors.map(
            (senior) =>
            (
              <SeniorTile 
                senior={senior}
                setSeniors={setSeniors}
                refreshData={refreshData}/>
            )
          )}
        </div>
      </div>
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!prisma) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const seniors = await prisma.senior.findMany();
  return {
    props: {
      me: user,
      seniors,
    },
  };
};
