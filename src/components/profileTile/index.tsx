import Image from "next/image"

type tileData =  {
        name: string
        location: string
        picture: typeof Image
};

const ProfileTile = ({ name, location, picture }: tileData) => {
        return (
        <div className="lg:p-9 md:p-5 p-3">
          <section className="w-64 h-64 p-4 place-content-center rounded border bg-white drop-shadow-md">
            <div className="align-center flex flex-col width-full">
                <Image className="object-scale-down h-10" width={35} height={35} src={'/student_home/profile_tile_pic1.png'} alt="Placeholder profile image"></Image>
                <p className="text-lg text-gray-700">{name}</p>
                <p className="text-sm text-gray-600">Test</p>
            </div>
          </section>
        </div>
        );
};

export default ProfileTile;
