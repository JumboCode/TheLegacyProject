import Button from "@components/button";
import type { NextPage } from "next";
import Sidebar from "../components/sidebar";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Sidebar />
    </div>
  );
};

export default Home;
