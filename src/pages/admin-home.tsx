import type { NextPage } from "next";
import Head from "next/head";
import AdminPhotoHeader from "@components/adminPhotoHeader";
import HorizontalMenu from "@components/horizontalMenu/horizontalMenu";

import AdminGrid from "@components/profileTile/adminGrid";

import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { Approval } from "@prisma/client";

type IHomeProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {redirect: undefined}

const Home: NextPage<IHomeProps> = ( { students }: IHomeProps ) => {
  
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-max bg-taupe">
        <AdminPhotoHeader />
        {/* TODO: this horizontal bar is not responsive :( */}
        <div className = "resize-y">
          <div className = "pl-9" >
            <hr/>
          </div>
          <HorizontalMenu/>
          <div className = "pl-9 shadow-sm" >
            <hr/>
          </div>
        </div>
        <AdminGrid name="Andrew" location="Boston" picture="" />
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
        destination: "/login",
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
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.approved === Approval.PENDING) {
    return {
      redirect: {
        destination: "/pending",
        permanent: false,
      },
    };
  }

  const students = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    }
  })

  //console.log(students);

  return {
    props: {
      students
    },
  };
}; 
