import TabButtons from "@components/TabButtons";
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
      <TabButtons
        queries={[
          { segment: "chapters", name: "chapters" },
          { segment: "resources", name: "resources" },
        ]}
      />
      {children}
    </HeaderContainer>
  );
};

export default AdminHomeLayout;
