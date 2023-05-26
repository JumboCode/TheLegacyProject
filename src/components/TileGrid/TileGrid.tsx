interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
  return (
    <div className="grid xs:mx-8 xs:mx-0 xs:grid-cols-1 \
                    sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-6">
      {children}
    </div>
  );
}
