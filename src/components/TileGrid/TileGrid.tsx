interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
  return (
    <div className="bg-indigo-600 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-auto text-center">
        {children}
    </div>
    // <div className="flex flex-col w-full min-w-fit">
    //   <div className="grid grid-cols-[repeat(auto-fill,_256px)] sm:gap-8 md:gap-10 text-center">
    //     {children}
    //   </div>
    // </div>
  );
}
