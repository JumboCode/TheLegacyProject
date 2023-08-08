import Image from "next/image";

export default function Pending() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
    <div className="flex flex-col text-center gap-y-2 p-16 w-3/4">
      <h1 className="text-3xl font-medium font-serif pb-2">Oh no! It looks like you don&apos;t have access yet.</h1>
      <h2 className="font-sans text-xl tracking-8">
        Your access to The Legacy Project is pending. Please follow-up with a
        club administrator for more details.
      </h2>
    </div>
      <div className="flex justify-center">
      <Image
          src="/pending/orange dried flower thing.png"
          alt="A dried yellow tulip."
          height={400}
          width={400}
          objectFit="cover"
          className="z-10 opacity-80"
        ></Image>
      </div>
    </main>
  );
}
