import Link from "next/link";
import SignIn from "./SignIn";

const Sidebar = ({ displayName } : { displayName: string }) => {
  return (
    // <div className="w-7/8 sticky top-0 flex h-screen flex-col items-center justify-between bg-med-tan px-6 py-8 shadow-lg drop-shadow-lg">
    <div className="flex w-full sticky top-0 flex h-screen flex-col items-center justify-between bg-tan px-6 py-8 shadow-xl drop-shadow-xl">
      <div className="w-full items-center p-2">
        <div className="mb-10">
          <Link href="/">
            <h1 className="rounded p-4 bg-tan text-left font-serif text-3xl drop-shadow-md /
                           duration-150 hover:-translate-y-0.5">
              The Legacy Project
            </h1>
          </Link>
        </div>

        <Link href="/home">
          <button className="w-full rounded bg-legacy-teal px-5 py-3 text-center font-serif text-xl text-white \
                             drop-shadow-md hover:bg-dark-teal duration-150 hover:-translate-y-0.5">
            Home
          </button>
        </Link>
      </div>

      <div className="w-full items-center p-2">
        <SignIn isPublic={displayName === "public"}/>
      </div>
    </div>
  );
};

export default Sidebar;