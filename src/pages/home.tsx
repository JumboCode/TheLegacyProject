import { Approval } from "@prisma/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { GetServerSidePropsContext } from "next";
import { prisma } from "@server/db/client";

export default function Home() {
  return <div></div>;
}

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

  if (user.approved !== Approval.APPROVED) {
    return {
      redirect: {
        destination: "/pending",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: user.admin ? "/admin-home" : "/student/" + user.id,
        permanent: false,
      },
    };
  }
};
