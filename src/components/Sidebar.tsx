import Link from "next/link";
import Image from "next/legacy/image";
import { signOut } from "next-auth/react";

const SidebarItem = ({ label } : { label: string }) => {
  return (
    <div className="w-full px-4 p-2 text-md text-left font-serif duration-150 hover:bg-darker-tan">
      <div className="duration-150 hover:translate-x-1">{label}</div>
    </div>
  );
};

const Sidebar = ({ displayName } : { displayName: string }) => {
  return (
    <div className="flex flex-col w-[160px] h-screen top-0 py-12 justify-start gap-20 \
                    bg-med-tan border-r border-darker-tan">
          <div className="flex flex-col p-4 place-items-center">
            <Link href="/">
              <h1 className="font-serif text-center text-2xl duration-150 hover:-translate-y-0.5 z-10">
                The Legacy Project
              </h1>
            </Link>

            <span className="absolute h-[60px] aspect-square left-3 top-[48px] rotate-45 opacity-60">
              <Image 
                src="/landing/pink-flower.png"
                layout="fill"
                objectFit="cover"
                // TODO(nickbar01234) - Write a more descriptive alt
                alt="Pink flower"
              />
            </span>

            <span className="absolute h-[60px] aspect-square top-[70px] left-[88px] opacity-40">
              <Image 
                src="/landing/yellow-flower.png"
                layout="fill"
                objectFit="cover"
                // TODO(nickbar01234) - Write a more descriptive alt
                alt="Yellow flower"
              />
            </span>
          </div>

        <div className="flex flex-col w-full bg-dark-tan border border-darker-tan">
          <Link href="/home">
            <SidebarItem label="Home"/>
          </Link>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            <SidebarItem label="Sign Out"/>
          </button>
        </div>
    </div>
  );
};

export default Sidebar;