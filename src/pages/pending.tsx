import Image from "next/image";

export default function Pending() {
  return (
    <main className="flex flex-col place-items-center justify-center w-full h-screen">
      <span className="relative opacity-60">
          <Image 
            src="/landing/olive-branch.png"
            height={100}
            width={180}
          />
      </span>

      <div className="py-[10px]">
        <h1 className="font-medium font-serif text-2xl text-center pb-2">
          Oh no! It looks like you don&apos;t have access to the Legacy Project yet.
        </h1>
        <h2 className="font-serif text-lg text-center">
          Your access to The Legacy Project is pending. Please follow-up with a
          club administrator for more details.
        </h2>
      </div>

      <span className="relative rotate-180 opacity-60">
          <Image 
            src="/landing/olive-branch.png"
            height={100}
            width={180}
          />
      </span>
    </main>
  );
}
