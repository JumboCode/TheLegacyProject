// "use client";

import { Email } from "@prisma/client";
import { prisma } from "@server/db/client";
// import { useEffect, useState } from "react";

const ElistPage = () => {
  // const elist = await prisma.email.findMany();
  // const [elist, setElist] = useState<Email[]>();
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const elistData = await prisma.email.findMany();
  //       setElist(elistData);
  //     } catch (error) {
  //       console.error("Error fetching elist:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return <div>HELLO</div>;
  // {/* {elist &&
  //   elist.map((elistEmail, index) => (
  //     <div key={index}>{elistEmail.email}</div>
  //   ))} */}
};

export default ElistPage;
