import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface IAdminHomeLayout {
  children: React.ReactNode;
}

const AdminHomeLayout = ({ children }: IAdminHomeLayout) => {
  return (
    <HeaderContainer
      header="Home"
      headerIcon={faHouse}
      showHorizontalLine={false}
    >
      <div style={{ width: "fit-content" }}>
        <div className="flex gap-6">
          <div>
            <Link href="/chapters" className="text-xl text-dark-teal">
              CHAPTERS
            </Link>
            <hr style={{ border: "1px solid black", width: "100%" }} />
          </div>
          <div>
            <Link href="/resources" className="text-xl text-dark-teal">
              RESOURCES
            </Link>
            <hr style={{ border: "1px solid black", width: "100%" }} />
          </div>
        </div>
        <hr style={{ border: "0.5px solid black", width: "100%" }} />
      </div>
      {children}
    </HeaderContainer>
  );
};

export default AdminHomeLayout;
