import type { NextPage } from "next";
import { useState } from "react";

function TabToggle({ children, active, onClick }: { children: any, active: boolean, onClick: any }) {
  let styles: string = "m-3 p-3 hover:cursor-pointer text-md font-bold";
  let activeStyles: string = "text-black";
  let inactiveStyles: string = "text-gray-400";

  return (
    <div className={`${styles} ${active ? activeStyles : inactiveStyles}`} onClick={onClick}>
      <div className="pr-9">{children}</div>
      <div className={`min-h-[1px] max-h-[1px] w-full ${active ? "bg-black" : ""}`}/>
    </div>
  );
}

function Card({ type, data }: { type: string, data: any }) {
  if (type == "member") {
    return (
      <div className="flex flex-col m-3 bg-white p-9 rounded-lg items-center justify-between border-2 border-white text-center hover:border-teal hover:cursor-pointer duration-300">
        <div className="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] bg-slate-300">
          Profile Picture
        </div>
        <p className="py-3">{data.name}</p>
        <small className="font-light">{data.email}</small>
      </div>
    );
  }
  return (
    <div className="flex flex-col m-3 bg-white p-9 rounded-lg items-center justify-between border-2 border-white text-center hover:border-teal hover:cursor-pointer">
      <div className="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] bg-slate-300">
        Profile Picture
      </div>
      <p className="py-3">{data.name}</p>
      <small className="font-light">{data.location}</small>
    </div>
  );
}

const Admin: NextPage = () => {
  const [ activeTab, setActiveTab ] = useState(1);
  const toggleActiveTab = () => {
    if (activeTab == 0) setActiveTab(1);
    if (activeTab == 1) setActiveTab(0);
  }

  const [ dummySeniorData, setDummySeniorData ] = useState([
    { name: "Andrew Bojangles", location: "location" },
    { name: "Andrew Bojangles", location: "location" },
    { name: "Andrew Bojangles", location: "location" },
    { name: "Andrew Bojangles", location: "location" },
    { name: "Andrew Bojangles", location: "location" },
    { name: "Andrew Bojangles", location: "location" },
  ]);
  const [ dummyMemberData, setDummyMemberData ] = useState([
    { name: "Andrew Bojangles", email: "eml@tufts.edu" },
    { name: "Andrew Bojangles", email: "eml@tufts.edu" },
    { name: "Andrew Bojangles", email: "eml@tufts.edu" },
    { name: "Andrew Bojangles", email: "eml@tufts.edu" },
    { name: "Andrew Bojangles", email: "eml@tufts.edu" },
    { name: "Andrew Bojangles", email: "eml@tufts.edu" },
  ]);

  const addButtonClicked = (e: any) => {
    e.preventDefault();
    if (activeTab == 0) {
      setDummyMemberData([...dummyMemberData, { name: "Andrew Bojangles", email: "eml@tufts.edu" }]);
    } else {
      setDummySeniorData([...dummySeniorData, { name: "Andrew Bojangles", location: "location" }]);
    }
  }

  return (
    // this outer div can be though of as the "layout" for the admin page, which
    // might be a concept worth abstracting out to it's own component later.
    <div className="flex-[0.85] flex flex-col items-center">
      <div className="bg-off-white w-full h-full px-3">
        {/* the header */}
        <div className="flex flex-row items-center justify-between pt-9 px-5">
          <h1 className="text-2xl">General</h1>
          <div className="min-w-[50px] min-h-[50px] bg-teal text-white">Icon</div>
        </div>
        {/* the toggles between members and seniors */}
        <div className="flex flex-row">
          <TabToggle active={activeTab == 0} onClick={toggleActiveTab}>Members</TabToggle>
          <TabToggle active={activeTab == 1} onClick={toggleActiveTab}>Seniors</TabToggle>
        </div>
        {/* the search box */}
        <div>
          <input type="text" className="ml-5 p-1 border border-1 border-teal rounded-lg bg-off-white w-[75%]"/>
        </div>
        {/* the list of members/seniors */}
        <div className="grid sm: grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 p-5 pl-0">
          { /* <div className="flex flex-col m-3 bg-white p-9 rounded-lg justify-center items-center text-[2rem] hover:border-2 hover:border-teal hover:cursor-pointer"> */ }
          <div className="flex flex-col m-3 bg-white p-9 rounded-lg justify-center items-center text-[2rem] border-2 border-white hover:bg-teal hover:text-white hover:cursor-pointer duration-300" onClick={addButtonClicked}>
          +
          </div>
          {
            (activeTab == 0 ? dummyMemberData : dummySeniorData).map((data: any, i: number) => (
              <Card key={i} type={ activeTab == 0 ? "member" : "senior" } data={data}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Admin;
