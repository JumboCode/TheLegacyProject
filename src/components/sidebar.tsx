import Link from "next/link";
import SignIn from "./SignIn";

//Todo: center align items, import and add actual icons, add business icon

const Sidebar = () => {
  return (
      <div className="flex flex-col h-screen sticky top-0 items-center w-7/8 justify-between bg-taupe px-6 py-8 shadow-lg drop-shadow-lg">
        <div className="p-2 items-center w-full">
          <div className="mb-10">
            <h1 className="text-left font-serif text-3xl">The Legacy Project</h1>
          </div>

          <Link href="/index">
            <button className="bg-white-500 w-full text-center rounded-xl bg-dark-green px-5 py-3 font-serif text-xl text-white hover:bg-dark-green-hover duration-150 hover:-translate-y-0.5">
                Home
            </button>
          </Link>
        </div>

        <div className="p-2 items-center w-full">
          <SignIn />
        </div>

      </div>
  );
};

export default Sidebar;
