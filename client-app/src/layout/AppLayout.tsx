import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="bg-blue-950 h-screen">
      <Outlet />
    </div>
  );
};
export default AppLayout;
