import Image from "next/image";

export default function Pending() {
  return (
    <main className="text-center m-auto">
    <div className="p-16">
      <h1 className="text-4xl font-bold font-serif text-dark-plum">Pending</h1>
      <br></br>
      <h1 className="text-2xl font-semibold italic font-serif pb-1">Uh Oh! Looks like you don't have access yet.</h1>
      <h2>
        Your access to The Legacy Project is pending, please follow-up with a
        club administrator.
      </h2>
    </div>
    <div>
    <Image
        src="/pending/orange dried flower thing.png"
        alt="A dried orange flower"
        height={300}
        width={300}
        objectFit="cover"
        className="absolute z-10 opacity-80"
      ></Image>
    </div>
    </main>
  );
}
