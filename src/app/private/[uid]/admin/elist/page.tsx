"use client";

import { Email } from "@prisma/client";
import { prisma } from "@server/db/client";
import { useState, useEffect } from "react";
// import { useEffect, useState } from "react";

const ElistPage = () => {
  const [elist, setElist] = useState<Email[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const elistData = await prisma.email.findMany();
        setElist(elistData);
      } catch (error) {
        console.error("Error fetching elist:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {elist &&
        elist.map((elistEmail, index) => (
          <div key={index}>{elistEmail.email}</div>
        ))}
    </div>
  );
};

export default ElistPage;
