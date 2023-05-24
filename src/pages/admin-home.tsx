import type { GetServerSidePropsContext, NextPage } from "next";
import PhotoHeader from "@components/photoHeader";

import Image from "next/image";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { Approval, Senior, User } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import { CheckMark } from "@components/Icons";
import { Cross } from "@components/Icons/Cross";
import { useRouter } from "next/router";
import TileGrid, { SeniorTile, StudentTile } from "@components/TileGrid";
import SearchBar from "@components/SearchBar";
import cn from "classnames";

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
  seniors: initialSeniors,
}) => {
  const [students, setStudents] = useState(initialStudents);
  const [pending, setPending] = useState(initialPending);
  const [deactivated, setDeactivated] = useState(initialDeactivated);
  const [seniors, setSeniors] = useState(initialSeniors);


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
      return (
        <SeniorBody
          seniors={seniors}
          setSeniors={setSeniors}
          refreshData={refreshData}
        />
      );
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
    <div className="flex flex-col h-full place-items-stretch p-6">
          <PhotoHeader name={me.name} image={me.image} email={me.email} />
      <div className="resize-y my-3 ">
        <div className="flex w-full bg-white pl-9 h-[50px]">
          {tabs.map((tab) => (
            <button
              disabled={tab === "Pending" && pending.length === 0}
              className={cn(
                tab === selectedTab ? "border-b-4 border-dark-green" : null,
                tab === "Pending" && pending.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : null,
                "flex flex-row text-xl justify-center gap-1 p-3 py-3 hover:bg-neutral-100"
              )}
              key={tab}
              onClick={() => setSelectedTab(tab)}
            >
              <p>{tab}</p>
              {tab === "Pending" && pending.length > 0 ? (
                <div className="rounded-full bg-neutral-400 px-0.5">
                  {pending.length}
                </div>
              ) : null}
            </button>
          ))}
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
  const [filter, setFilter] = useState("");

  return (
    <>
      <SearchBar setFilter={setFilter}/>
      <div className="bg-indigo-600 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-center mt-6">
          {students
            .filter(({ name }) => name?.includes(filter))
            .map((student) => (
              <div className="h-auto w-auto">
              <StudentTile
                key={student.id}
                student={student}
                setDeactivated={setDeactivated}
                setStudents={setStudents}
                refreshData={refreshData}
                />
                </div>
            ))}
      </div>
    </>
  );
}

function SeniorBody({
  seniors,
  setSeniors,
  refreshData,
}: {
  seniors: Senior[];
  setSeniors: React.Dispatch<React.SetStateAction<Senior[]>>;
  refreshData: () => void;
}) {
  return (
    <TileGrid>
        {seniors.map((senior) => (
          <div key={senior.id}>
            <SeniorTile
              key={senior.id}
              senior={senior}
              setSeniors={setSeniors}
              refreshData={refreshData}
            />
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
            src={user.image ?? "/student_home/genericprofile.png"}
            className="rounded"
            width={48}
            height={48}
          />
          <div className="ml-1 flex-grow">          
            <p className="text-base font-bold text-neutral-600">{user.name}</p>
            <p className="text-sm font-light text-neutral-400">{user.email}</p>
          </div>
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
            src={user.image ?? "/student_home/genericprofile.png"}
            className="rounded"
            width={48}
            height={48}
          />
          <div className="ml-1 flex-grow">
            <p className="text-base font-bold text-neutral-600">{user.name}</p>
            <p className="text-sm font-light text-neutral-400">{user.email}</p>
          </div>
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
