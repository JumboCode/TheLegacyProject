import Link from "next/link";
import Image from "next/image";
import SignIn from "./SignIn";

//Todo: center align items, import and add actual icons, add business icon

const Sidebar = () => {
  return (
    <div className="w-7/8 sticky top-0 flex h-screen flex-col items-center justify-between bg-nav-taupe px-6 py-8 shadow-lg drop-shadow-lg">
      <div className="w-full items-center p-2">
        <div className="mb-10">
          <h1 className="text-left font-serif text-3xl">The Legacy Project</h1>
        </div>

        <Link href="/home">
          <button className="bg-white-500 hover:bg-dark-green-hover w-full rounded-xl bg-dark-green px-5 py-3 text-center font-serif text-xl text-white duration-150 hover:-translate-y-0.5">
            Home
          </button>
        </Link>
      </div>

      <div className="w-full items-center p-2">
        <SignIn />
      </div>
    </div>
  );
};

export default Sidebar;
