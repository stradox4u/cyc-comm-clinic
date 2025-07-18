import { Outlet } from "react-router-dom";
import Footer from "../pages/home/Footer";

const AppLayout = () => {
  return (
    <div className="bg-blue-950 h-screen">
      <Outlet />
      <Footer />
    </div>
  );
};
export default AppLayout;
