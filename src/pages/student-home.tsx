import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import PhotoHeader from "@components/photoHeader";
import { Approval, Senior, User } from "@prisma/client";
import { useRouter } from "next/router";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { SeniorGrid } from "@components/profileTile";
import { useCallback, useMemo, useState } from "react";
import { TileData } from "@components/profileTile/profileTile";


type IStudentProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

const Home: NextPage<IStudentProps> = ({
  me, 
  seniors
}) => {



  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-max bg-taupe">
        <PhotoHeader name={me.name} image={me.image} email={me.email}/>
        <div className="px-3 md:px-5 lg:px-9">
          <h1 className="mt-1 text-xl font-semibold">My Senior</h1>
          <button className="my-3 inline-block h-0.5 w-1/3 min-w-[2in] bg-dark-teal md:w-[12%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]"></button>
        </div>
        <SeniorGrid name="Andrew" location="Boston" picture="" />
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
  const users = await prisma.user.findMany();
  const students = users.filter(
    ({ approved }) => approved === Approval.APPROVED
  );
  const pending = users.filter(({ approved }) => approved === Approval.PENDING);
  const deactivated = users.filter(
    ({ approved }) => approved === Approval.DENIED
  );

  return {
    props: {
      me: user,
      students,
      pending,
      deactivated,
      seniors,
    },
  };
};
