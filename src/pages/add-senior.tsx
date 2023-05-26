import type { NextPage } from "next";
import React from 'react';
import Image from 'next/image';
import InputBox from "@components/InputBox";

import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { Approval } from "@prisma/client";
import { Senior } from "@prisma/client";

type IAddSeniorProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {redirect: undefined}

const AddSenior: NextPage<IAddSeniorProps> = ( { studentNames }: IAddSeniorProps ) => {
  // const placeholdSenior: Senior = {
  //   firstName: "Enter their first name.",
  //   lastName: "Enter their last name.",
  //   selectName: "Enter their student's names.",
  //   interests: "Enter their interests.",
  //   location: "Enter their location.",
  //   description: "Describe this senior.",
  // };

  // const labelSenior: Senior = {
  //   firstName: "First Name",
  //   lastName: "Last Name",
  //   selectName: "Student Names",
  //   interests: "Interests",
  //   location: "Location",
  //   description: "Description",
  // };


  const handleSeniorSubmit = (
    seniorData: Senior,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const seniorPost = {
      // name: seniorData.firstName + " " + seniorData.lastName,
      // location: seniorData.location,
      // description: seniorData.description,
    };

    const postData = async () => {
      const response = await fetch("/api/seniors/add", {
        method: "POST",
        body: JSON.stringify(seniorPost),
      });
      return response.json();
    };

    postData()
    .then((data) => { alert(JSON.stringify(data)); })
    .catch((err) => { alert(err); });    
  }; 

  return (
    <>
      <div className="h-full bg-taupe">
        <h1 className="sm:text-center md:text-left font-serif text-5xl m-8">Add New Senior</h1>

        <div className="flex flex-col m-16 p-24 gap-8 bg-nav-taupe rounded drop-shadow-md">

        <span className="flex w-full justify-center gap-2">
          <span className="flex flex-col w-fit p-4 place-items-center \
                           bg-off-white hover:bg-offer-white rounded drop-shadow-md"> 
              <Image 
                src={"/profile/uploadphoto_icon.png"}
                alt="The student user's profile picture."
                width={80}
                height={80}
              />
            <p className="text-lg mt-2 text-neutral-800">Upload Photo</p>
          </span>
        </span>

        <div className="flex flex-col gap-8">
          <div className="flex sm:flex-col md:flex-row md:h-1/2 gap-8">
            <InputBox label="Name" content="" />
            <InputBox label="Students" content="" />
          </div>
          <div className="flex sm:flex-col md:flex-row md:h-1/2 gap-8">
            <InputBox label="Location" content="" />
            <InputBox label="Description" content="" />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default AddSenior;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (!prisma) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.approved === Approval.PENDING) {
    return {
      redirect: {
        destination: "/pending",
        permanent: false,
      },
    };
  }

  const studentNames = await prisma.user.findMany({
    select: {
      name: true,
      id: true
    }
  })

  //console.log(studentNames);

  return {
    props: {
      studentNames
    },
  };
}; 
