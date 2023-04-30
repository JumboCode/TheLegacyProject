import Image from "next/image";

export default function Pending() {
  return (
    <main className="text-center m-auto text-white">
    <div className="bg-dark-teal p-16 rounded-lg">
      <h1 className="text-4xl font-bold">Pending</h1>
      <br></br>
      <h1 className="text-2xl font-semibold italic">Uh Oh! Looks Like You Don't Have Access Yet.</h1>
      <br></br>
      <h2>
        Your access to The Legacy Project is pending, please follow-up with a
        club administrator.
      </h2>
    </div>
    <Image
        src="/pending/orange dried flower thing.png"
        alt="A circular photo of younger woman helping a senior citizen"
        height={300}
        width={300}
        objectFit="cover"
        className="absolute z-10 duration-500"
      ></Image>
    </main>
  );
}
