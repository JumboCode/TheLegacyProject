interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
  return (
    <div className="grid mx-8 mx-0 grid-cols-1 sm:grid-cols-2 \ 
                    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 mt-6">
      {children}
    </div>
  );
}
