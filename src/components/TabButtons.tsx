import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface TabButtonsProps {
  queries: string[];
  tabNodes: React.ReactNode[];
}

const TabButtons = ({ queries, tabNodes }: TabButtonsProps) => {
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const isChaptersSelected = !!searchParams?.get("chapters");
  const isResourcesSelected = !!searchParams?.get("resources");

  // /home/chapters/[chapterId]?resouces=true
  // /home/resources

  return (
    <div style={{ width: "fit-content" }}>
      <div className="flex gap-6">
        <div>
          <Link
            replace
            href={pathname + "/?chapters=true"}
            className={
              "text-xl" +
              (isChaptersSelected ? " text-dark-teal" : " text-black")
            }
          >
            CHAPTERS
          </Link>

          {isChaptersSelected ? (
            <hr style={{ border: "1px solid black", width: "100%" }} />
          ) : null}
        </div>
        <div>
          <Link
            replace
            href={pathname + "/?resources=true"}
            className={
              "text-xl" +
              (isResourcesSelected ? " text-dark-teal" : " text-black")
            }
          >
            RESOURCES
          </Link>
          {isResourcesSelected ? (
            <hr style={{ border: "1px solid black", width: "100%" }} />
          ) : null}
        </div>
      </div>
      <hr style={{ border: "0.5px solid black", width: "100%" }} />
    </div>
  );
};

export default TabButtons;
