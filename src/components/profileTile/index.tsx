import Image from "next/image"

type tileData =  {
        name: string
        location: string
        picture: typeof Image
};

const ProfileTile = ({ name, location, picture }: tileData) => {
        return (
        <div className="lg:px-9 md:px-5 px-3">
          <section className="w-64 h-64 p-4 rounded bg-white drop-shadow-md">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image className="object-scale-down" src={'/student_home/andrewbojangles.png'} alt="Placeholder profile image" height={80} width={80}></Image>
              </div>
              <br></br>
              <p className="text-base text-gray-700">{name}</p>
              <p className="text-sm text-gray-600">Student Name</p>
              <p className="text-xs text-gray-600">{location}</p>
            </div>
          </section>
      </div>
      );
};

export default ProfileTile;
