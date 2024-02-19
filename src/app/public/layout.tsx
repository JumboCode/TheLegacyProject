import Navbar from "@components/Navbar";
import { Footer } from "@components/Layout";

interface IPublicLayout {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: IPublicLayout) => {
  return (
    <>
      <Navbar />
      <div className="px-[93px] pb-[105px] pt-[88px]">{children}</div>
      <Footer />
    </>
  );
};

export default PublicLayout;
