import NavbarButton from "@components/navbar/navbar_button";

//Todo: center align items, import and add actual icons, add business icon

const Sidebar = () => {
  return (
    <>
    <div className="flex-[0.2] grid grid-cols-1 grid-rows-10 bg-white shadow box-shadow">
      <div>
        <img src="" className="h-15 w-20 mx-8 mt-8 "/>
      </div>
      <div className="h-1">
        <NavbarButton isCurr={true} icon="" label='General' to='/index'/>
      </div>
      <div className="h-1">
        <NavbarButton isCurr={false} icon="" label='Settings' to='/index'/>
      </div>
      <div className="flex-col row-span-6 flex-grow grow"></div>
      <div className="absolute bottom-5">
        <NavbarButton isCurr={false} icon="" label='Sign out' to='/index'/>
      </div>
    </div>
    </>
  );
}

export default Sidebar;
