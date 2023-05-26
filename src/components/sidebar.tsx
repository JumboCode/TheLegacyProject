import Link from "next/link";
import Image from "next/image";
import SignIn from "./SignIn";

const Sidebar = () => {
  return (
    <div className="w-full sticky top-0 flex h-screen flex-col items-center justify-between bg-nav-taupe px-6 py-8 shadow-xl drop-shadow-xl">
      <div className="w-full items-center p-2">
        <div className="mb-10">
          <Link href="/">
            <h1 className="rounded p-4 bg-dark-taupe text-left font-serif text-3xl drop-shadow-md /
                           duration-150 hover:-translate-y-0.5">
              The Legacy Project
            </h1>
          </Link>
        </div>

        <Link href="/home">
          <button className="bg-white-500 w-full rounded bg-nav-teal px-5 py-3 text-center font-serif text-xl text-white \
                             drop-shadow-md hover:bg-dark-teal duration-150 hover:-translate-y-0.5">
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
