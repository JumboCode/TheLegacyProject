interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
  return (
    <div className="mx-auto flex w-full min-w-fit flex-col px-3 pb-9 md:px-5 lg:px-9">
      <div className="mt-5 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {children}
      </div>
    </div>
  );
}
