import { Approval } from "@prisma/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";

type IAdminProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

const tabs = ["Members", "Seniors", "Pending Accounts"] as const;
type Tab = typeof tabs[number];

const Admin: NextPage<IAdminProps> = ({ seniors, users }) => {
  const [activeTab, setActiveTab] = useState(1);
  const toggleActiveTab = () => {
    if (activeTab == 0) setActiveTab(1);
    if (activeTab == 1) setActiveTab(0);
  };

  const [dummySeniorData, setDummySeniorData] = useState(seniors);
  const [dummyMemberData, setDummyMemberData] = useState(users);

  const addButtonClicked = (e: any) => {
    e.preventDefault();
    alert("not implemented");
  };

  return (
    // this outer div can be though of as the "layout" for the admin page, which
    // might be a concept worth abstracting out to it's own component later.
    <div className="flex flex-[0.85] flex-col items-center">
      <div className="h-full w-full bg-off-white px-3">
        {/* the header */}
        <div className="flex flex-row items-center justify-between px-5 pt-9">
          <h1 className="text-2xl">General</h1>
          <div className="bg-teal min-h-[50px] min-w-[50px] text-white">
            Icon
          </div>
        </div>
        {/* the toggles between members and seniors */}
        <div className="flex flex-row">
          <TabToggle active={activeTab == 0} onClick={toggleActiveTab}>
            Members
          </TabToggle>
          <TabToggle active={activeTab == 1} onClick={toggleActiveTab}>
            Seniors
          </TabToggle>
        </div>
        {/* the search box */}
        <div>
          <input
            type="text"
            className="border-1 border-teal ml-5 w-[75%] rounded-lg border bg-off-white p-1"
          />
        </div>
        {/* the list of members/seniors */}
        <div className="sm: grid grid-cols-2 p-5 pl-0 lg:grid-cols-4 xl:grid-cols-6">
          {/* <div className="flex flex-col m-3 bg-white p-9 rounded-lg justify-center items-center text-[2rem] hover:border-2 hover:border-teal hover:cursor-pointer"> */}
          <div
            className="hover:bg-teal m-3 flex flex-col items-center justify-center rounded-lg border-2 border-white bg-white p-9 text-[2rem] duration-300 hover:cursor-pointer hover:text-white"
            onClick={addButtonClicked}
          >
            +
          </div>
          {(activeTab == 0 ? dummyMemberData : dummySeniorData).map(
            (data, i) => (
              <Card
                key={i}
                type={activeTab == 0 ? "member" : "senior"}
                data={data}
              />
            )
          )}
        </div>
      </div>
      {/* TESTS SENIOR DELETE ROUTE */}
      <button onClick={() => fetch("/api/senior/6442c41aa1fbce0735b20ba0/", {method: "DELETE"})}>DELETE SENIOR</button>
      {/* TESTS STUDENT DELETE ROUTE */}
      <button onClick={() => fetch("/api/student/644ea32180982d230ea94434/", {method: "DELETE"})}>DELETE STUDENT</button>
      
    </div>
  );
};

export default Admin;

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

  if (!user.admin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const seniors = await prisma.senior.findMany();
  const users = await prisma.user.findMany({
    where: {
      approved: Approval.APPROVED,
    },
  });

  return {
    props: {
      seniors,
      users,
    },
  };
};

function TabToggle({
  children,
  active,
  onClick,
}: {
  children: any;
  active: boolean;
  onClick: any;
}) {
  const styles = "m-3 p-3 hover:cursor-pointer text-md font-bold";
  const activeStyles = "text-black";
  const inactiveStyles = "text-gray-400";

  return (
    <div
      className={`${styles} ${active ? activeStyles : inactiveStyles}`}
      onClick={onClick}
    >
      <div className="pr-9">{children}</div>
      <div
        className={`max-h-[1px] min-h-[1px] w-full ${active ? "bg-black" : ""}`}
      />
    </div>
  );
}

function Card({ type, data }: { type: string; data: any }) {
  if (type == "member") {
    return (
      <div className="hover:border-teal m-3 flex flex-col items-center justify-between rounded-lg border-2 border-white bg-white p-9 text-center duration-300 hover:cursor-pointer">
        <div className="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px] bg-slate-300">
          Profile Picture
        </div>
        <p className="py-3">{data.name}</p>
        <small className="font-light">{data.email}</small>
      </div>
    );
  }
  return (
    <div className="hover:border-teal m-3 flex flex-col items-center justify-between rounded-lg border-2 border-white bg-white p-9 text-center hover:cursor-pointer">
      <div className="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px] bg-slate-300">
        Profile Picture
      </div>
      <p className="py-3">{data.name}</p>
      <small className="font-light">{data.location}</small>
    </div>
  );
}
