import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import PhotoHeader from "@components/PhotoHeader";
import TileGrid, { SeniorTile } from "@components/TileGrid";

import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { z } from "zod";


type IStudentProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

const StudentProfilePage = ({ student }: IStudentProps) => {
  const router = useRouter(); // call to refresh props
  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);
  
  console.log("Their Seniors: " + student.Seniors);
  const [seniors, setSeniors] = useState(student.Seniors);
  
  return (
    <>
      <div className="flex flex-col h-full place-items-stsetch p-8 gap-6">
        <PhotoHeader admin={false} name={student.name} image={student.image} email={student.email}/>
        <TileGrid >
          {seniors.map(
            (senior) => (
              <SeniorTile 
                key={student.id}
                senior={senior}
                link={"/senior/" + senior.id}
                setSeniors={setSeniors}
                refreshData={refreshData}/>
            )
          )}
        </TileGrid>
      </div>
    </>
  );
};

// render sidebar instead of top navbar
StudentProfilePage.displayName = "private";

export default StudentProfilePage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  const studentId = z.string().parse(context.query.id);

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

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: { Seniors: true }
  });

  if (!student) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      student: student,
    },
  };
};