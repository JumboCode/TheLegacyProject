import NavbarButton from "@components/navbar/navbar_button";

//Todo: center align items, import and add actual icons, add business icon

const Sidebar = () => {
  return (
    <>
    <div className="flex-[0.15] bg-white shadow-lg drop-shadow-lg box-shadow flex flex-col justify-between items-center p-5">
      <div className="flex flex-col items-center">
        <div className="mb-10">
          <h1 className="text-center">LOGO PLACEHOLDER</h1>
          {/* <img src="" className="h-15 w-20 mx-8 mt-8 "/> */}
        </div>

        <NavbarButton isCurr={true} icon={<></>} label='General' to='/index'/>
        <NavbarButton isCurr={false} icon={<></>} label='Settings' to='/index'/>
      </div>
      <div>
        <NavbarButton isCurr={false} icon={<></>} label='Sign out' to='/index'/>
      </div>
    </div>
    </>
  );
}

export default Sidebar;
