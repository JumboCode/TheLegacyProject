"use client";
import { useState } from "react";

type ButtonProps = {
  universityName: string;
  universityAddress: string;
  name: string;
  email: string;
  phoneNumber: string;
};

const ChapterRequest = ({
  universityName,
  universityAddress,
  name,
  email,
  phoneNumber,
}: ButtonProps) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="border-color-dark-tan box-border w-72 rounded-lg border-8 bg-white p-4 sm:w-2/5">
      {universityName} <br />
      {universityAddress} <br />
      {name} <br />
      {email} <br />
      {phoneNumber} <br />
      {showMore ? (
        <div onClick={() => setShowMore((b) => !b)}>Show less</div>
      ) : (
        <div onClick={() => setShowMore((b) => !b)}>Show more</div>
      )}
    </div>
  );
};

export default ChapterRequest;
