import NavbarButton from "@components/navbar/navbar_button";

//Todo: center align items, import and add actual icons, add business icon

const Sidebar = () => {
  return (
    <>
      <div className="box-shadow flex flex shrink-0 flex-col items-center justify-between bg-taupe px-6 py-8 shadow-lg drop-shadow-lg">
        <div className="flex flex-col items-center">
          <div className="mb-10">
            <h1 className="text-left font-serif text-xl">The Legacy Project</h1>
            {/* <img src="" className="h-15 w-20 mx-8 mt-8 "/> */}
          </div>

          <NavbarButton
            isCurr={true}
            icon={<></>}
            label="General"
            to="/index"
          />
          <NavbarButton
            isCurr={false}
            icon={<></>}
            label="Settings"
            to="/index"
          />
        </div>
        <div>
          <NavbarButton
            isCurr={false}
            icon={<></>}
            label="Sign out"
            to="/index"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
