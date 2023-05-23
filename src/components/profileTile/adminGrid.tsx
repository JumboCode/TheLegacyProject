import Image from "next/image";
import { AddTile } from "@components/addTile";
import { TileEdit } from "@components/TileGrid/TileEdit";

// type AdminTileData = {
//   name: string;
//   image: string;
// };

export const AdminTile = ({ data }: { data: any }) => {
  return (
    <div className="w-64 resize-y resize-x">
      <TileEdit
        id="1"
        handleDelete={() =>
          fetch("/api/senior/6442c41aa1fbce0735b20ba0/", {
            method: "DELETE",
          })
        }
        handleEdit={() =>
          fetch("/api/senior/6442c41aa1fbce0735b20ba0/", {
            method: "PATCH",
          })
        }
      />
      <section className="h-64 rounded bg-white p-4 drop-shadow-md">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <Image
              className="object-scale-down"
              src={data.image}
              alt="Placeholder profile image"
              height={80}
              width={80}
            ></Image>
          </div>
          <br></br>
          <p className="text-base font-medium text-gray-700">{data.name}</p>
        </div>
      </section>
    </div>
  );
};

const AdminGrid = ({ users }: IAdminProps) => {
  // const [data, setData] = useState<AdminTileData[]>([
  //   { name: "Jo", location: "Somerville, MA", picture: "" },
  //   { name: "JoJo", location: "Somerville, MA", picture: "" },
  //   { name: "Joe", location: "Somerville, MA", picture: "" },
  //   { name: "Joseph", location: "Somerville, MA", picture: "" },
  //   { name: "Jô", location: "Somerville, MA", picture: "" },
  //   { name: "Jonathan", location: "Somerville, MA", picture: "" },
  //   { name: "João", location: "Somerville, MA", picture: "" },
  //   { name: "Bojangles", location: "Somerville, MA", picture: "" },
  // ]);

  //const data = students;
  const [studentData, setStudentData] = useState(users);

  return (
    <main className="mx-auto flex w-full min-w-fit flex-col px-3 pb-9 md:px-5 lg:px-9">
      <div className="mt-5 flex grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {/* Grid styling submitted in PR */}
        {/* <div className="grid gap-10 pt-3 text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 space-evenly"> */}

        {/* Flex styling workaround */}
        {/* <div className="lg:px-9 md:px-5 px-3 flex justify-self-center flex-wrap gap-6"></div> */}
        <AddTile />
        {studentData.map((data, i) => (
          <AdminTile key={i} data={data} />
        ))}
      </div>
    </main>
  );
};

export default AdminGrid;
