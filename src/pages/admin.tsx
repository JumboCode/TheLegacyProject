import type { NextPage } from "next";
import Sidebar from "@components/sidebar";

const Admin: NextPage = () => {
  return (
    <div className="w-screen h-screen flex flex-row">
      <Sidebar />
      <div className="flex-[0.85] bg-[#f5f5f5] w-full h-full">

      </div>
    </div>
  );
};

export default Admin;
