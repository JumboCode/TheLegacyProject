import type { GetServerSidePropsContext, NextPage } from "next";
import AdminPhotoHeader from "@components/adminPhotoHeader";

import Image from "next/image";
import { AdminTile } from "@components/profileTile/adminGrid";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { Approval, Senior, User } from "@prisma/client";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { CheckMark } from "@components/Icons";
import { Cross } from "@components/Icons/Cross";
import { useRouter } from "next/router";
import TileGrid, { StudentTile } from "@components/TileGrid";

type IAdminProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

const tabs = ["Students", "Seniors", "Pending", "Deactivated"] as const;
type Tabs = typeof tabs[number];

const Home: NextPage<IAdminProps> = ({
  me,
  students: initialStudents,
  pending: initialPending,
  deactivated: initialDeactivated,
  seniors,
}) => {
  const [students, setStudents] = useState(initialStudents);
  const [pending, setPending] = useState(initialPending);
  const [deactivated, setDeactivated] = useState(initialDeactivated);

  const [selectedTab, setSelectedTab] = useState<Tabs>("Students");

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  const body = useMemo(() => {
    if (selectedTab === "Students") {
      return (
        <StudentBody
          students={students}
          setDeactivated={setDeactivated}
          setStudents={setStudents}
          refreshData={refreshData}
        />
      );
    } else if (selectedTab === "Seniors") {
      return <SeniorBody seniors={seniors} />;
    } else if (selectedTab === "Pending") {
      return (
        <PendingBody
          pending={pending}
          setPending={setPending}
          setDeactivated={setDeactivated}
          setStudents={setStudents}
          refreshData={refreshData}
        />
      );
    } else if (selectedTab === "Deactivated") {
      return (
        <DeactivatedBody
          deactivated={deactivated}
          setDeactivated={setDeactivated}
          setStudents={setStudents}
          refreshData={refreshData}
        />
      );
    }
  }, [deactivated, pending, refreshData, selectedTab, seniors, students]);

  return (
    <div className="h-max w-full bg-taupe">
      <AdminPhotoHeader name={me.name} image={me.image} email={me.email} />
      {/* TODO: this horizontal bar is not responsive :( */}
      <div className="resize-y">
        <div className="pl-9">
          <hr />
        </div>
        <div className="m-auto flex w-full gap-1 p-1 pl-9">
          {tabs.map((tab) => (
            <button
              className="flex flex-row gap-1"
              key={tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
              <div className="rounded-full bg-taupe-hover px-0.5">
                {tab === "Pending" && pending.length > 0
                  ? pending.length
                  : null}
              </div>
            </button>
          ))}
        </div>
        <div className="pl-9 shadow-sm">
          <hr />
        </div>
      </div>
      {body}
    </div>
  );
};

function StudentBody({
  students,
  setDeactivated,
  setStudents,
  refreshData,
}: {
  students: User[];
  setDeactivated: React.Dispatch<React.SetStateAction<User[]>>;
  setStudents: React.Dispatch<React.SetStateAction<User[]>>;
  refreshData: () => void;
}) {
  return (
    <TileGrid>
      {students.map((student) => (
        <StudentTile
          key={student.id}
          student={student}
          setDeactivated={setDeactivated}
          setStudents={setStudents}
          refreshData={refreshData}
        />
      ))}
    </TileGrid>
  );
}

function SeniorBody({ seniors }: { seniors: Senior[] }) {
  return (
    <TileGrid>
      {seniors.map((senior) => (
        <div key={senior.id}>
          <AdminTile key={senior.id} data={senior} />
        </div>
      ))}
    </TileGrid>
  );
}

function PendingBody({
  pending,
  setPending,
  setDeactivated,
  setStudents,
  refreshData,
}: {
  pending: User[];
  setPending: React.Dispatch<React.SetStateAction<User[]>>;
  setDeactivated: React.Dispatch<React.SetStateAction<User[]>>;
  setStudents: React.Dispatch<React.SetStateAction<User[]>>;
  refreshData: () => void;
}) {
  return (
    <ul className="mt-5 px-3 pb-9 md:px-5 lg:px-9">
      {pending.map((user) => (
        <li
          className="flex flex-row items-center gap-2 rounded bg-white p-4 drop-shadow-md"
          key={user.id}
        >
          <Image
            alt="Profile Picture"
            src={user.image ?? ""}
            className="rounded"
            width={48}
            height={48}
          />
          <p className="mr-4 flex-grow">{user.name}</p>
          <button
            title="Reject"
            className="flex h-8 w-8 items-center justify-center rounded border-2 border-red-200 bg-red-100"
            onClick={() => {
              fetch(`/api/student/${user.id}`, { method: "DELETE" });
              setPending((prev) => prev.filter((u) => u.id !== user.id));
              setDeactivated((prev) => [...prev, user]);
              refreshData();
            }}
          >
            <div className="fill-red-800 stroke-red-800">
              <Cross />
            </div>
          </button>
          <button
            title="Approve"
            className="flex h-8 w-8 items-center justify-center rounded border-2 border-green-200 bg-green-100"
            onClick={() => {
              fetch(`/api/student/${user.id}/approve`, { method: "POST" });
              setPending((prev) => prev.filter((u) => u.id !== user.id));
              setStudents((prev) => [...prev, user]);
              refreshData();
            }}
          >
            <div className="fill-green-800 ">
              <CheckMark />
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function DeactivatedBody({
  deactivated,
  setDeactivated,
  setStudents,
  refreshData,
}: {
  deactivated: User[];
  setDeactivated: React.Dispatch<React.SetStateAction<User[]>>;
  setStudents: React.Dispatch<React.SetStateAction<User[]>>;
  refreshData: () => void;
}) {
  return (
    <ul className="mt-5 px-3 pb-9 md:px-5 lg:px-9">
      {deactivated.map((user) => (
        <li
          className="flex flex-row items-center gap-2 rounded bg-white p-4 drop-shadow-md"
          key={user.id}
        >
          <Image
            alt="Profile Picture"
            src={user.image ?? ""}
            className="rounded"
            width={48}
            height={48}
          />
          <p className="mr-4 flex-grow">{user.name}</p>
          <button
            title="Re-approve"
            className="flex h-8 w-8 items-center justify-center rounded border-2 border-green-200 bg-green-100"
            onClick={() => {
              fetch(`/api/student/${user.id}/approve`, { method: "POST" });
              setDeactivated((prev) => prev.filter((u) => u.id !== user.id));
              setStudents((prev) => [...prev, user]);
              refreshData();
            }}
          >
            <div className="fill-green-800 ">
              <CheckMark />
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

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

  if (!user.admin) {
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
