import PathNav from "@components/PathNav";
import { DisplaySenior } from "@components/senior";
import { prisma } from "@server/db/client";
import { seniorFullName } from "@utils";

interface LayoutProps {
  params: {
    seniorId: string;
  };
}

const Page = async ({ params }: LayoutProps) => {
  const senior = await prisma.senior.findFirstOrThrow({
    where: { id: params.seniorId },
    include: {
      Files: true,
      chapter: {
        include: {
          students: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-y-6">
      <PathNav
        pathInfo={[
          { display: "Seniors", url: "seniors" },
          {
            display: seniorFullName(senior),
            url: `seniors/${seniorFullName(senior)}`,
          },
        ]}
      />
      <DisplaySenior editable canAddFile={false} senior={senior} />
    </div>
  );
};

export default Page;
