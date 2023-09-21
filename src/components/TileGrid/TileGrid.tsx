interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
  return (
    <div className="grid mx-8 mx-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 \
                    gap-12 mt-6">
      {children}
    </div>
  );
}
