<<<<<<< HEAD
"use client";

<<<<<<< HEAD
import TileGrid, { StudentTile } from "@components/TileGrid";
// import { useRouter } from "next/navigation";
import { prisma } from "@server/db/client";
import PathNav from "@components/PathNav";

const ChapterLayout = ({ children }) => {
  // const students = await prisma.user.findMany();
  // console.log(students);
  return (
    <>
      <PathNav />
      <div className="font-merriweather mt-5 text-2xl font-bold">
        Tufts University
      </div>
      <div className="font-merriweather mt-3 flex h-1/5 w-5/6 flex-col justify-between rounded-md bg-white p-5">
        <div className="flex flex-row text-start">
          <div>Location: </div>
          <div className="ml-2 font-bold">Medford, MA</div>
        </div>
        <div className="flex flex-row text-start">
          <div>No. of members: </div>
          <div className="ml-2 font-bold">12</div>
        </div>
        <div className="flex flex-row text-start">
          <div>Years Active: </div>
          <div className="ml-2 font-bold">1</div>
        </div>
      </div>
      <div className="font-merriweather mt-5 text-xl font-bold">
        Executive Board
      </div>

      {/* <TileGrid>
        {students
          // .filter(({ name }) => name?.includes(filter))
          .map((student) => (
            <div className="h-auto w-auto" key={student.id}>
              <StudentTile
                link={"/student/" + student.id}
                student={student}
                setDeactivated={setDeactivated}
                setStudents={setStudents}
                refreshData={refreshData}
              />
            </div>
          ))}
      </TileGrid> */}
    </>
  );
};

export default ChapterLayout;
=======
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

interface IAdminHomeLayout {
  children: React.ReactNode;
}

const AdminHomeLayout = ({ children }: IAdminHomeLayout) => {
  return (
    <>
      <div className="font-merriweather mt-5 text-2xl font-bold">
        Tufts University
      </div>
      <div className="font-merriweather mt-3 flex h-1/5 w-5/6 flex-col justify-between rounded-md bg-white p-5">
        <div className="flex flex-row text-start">
          <div>Location: </div>
          <div className="ml-2 font-bold">Medford, MA</div>
=======
const ChapterLayout = () =>
  // {
  //   students,
  //   setDeactivated,
  //   setStudents,
  //   refreshData,
  // }: {
  //   students: User[];
  //   setDeactivated: Dispatch<SetStateAction<User[]>>;
  //   setStudents: Dispatch<SetStateAction<User[]>>;
  //   refreshData: () => void;
  // }
  {
    return (
      <>
        <div className="font-merriweather mt-5 text-2xl font-bold">
          Tufts University
>>>>>>> c8a9cbc (comment out temporary code)
        </div>
        <div className="font-merriweather mt-3 flex h-1/5 w-5/6 flex-col justify-between rounded-md bg-white p-5">
          <div className="flex flex-row text-start">
            <div>Location: </div>
            <div className="ml-2 font-bold">Medford, MA</div>
          </div>
          <div className="flex flex-row text-start">
            <div>No. of members: </div>
            <div className="ml-2 font-bold">12</div>
          </div>
          <div className="flex flex-row text-start">
            <div>Years Active: </div>
            <div className="ml-2 font-bold">1</div>
          </div>
        </div>
        <div className="font-merriweather mt-5 text-xl font-bold">
          Executive Board
        </div>
        {/* <div>
        <TileGrid>
          {students.map((student) => (
            <div className="h-auto w-auto" key={student.id}>
              <StudentTile
                link={"/student/" + student.id}
                student={student}
                setDeactivated={setDeactivated}
                setStudents={setStudents}
                refreshData={refreshData}
              />
            </div>
          ))}
        </TileGrid>
      </div> */}
      </>
    );
  };

export default AdminHomeLayout;
