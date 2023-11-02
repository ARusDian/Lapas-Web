import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LinkHighlightContext from "../contexts/LinkHighlightContext";
import AuthContext from "../contexts/AuthContext";
import { BaseUserModel } from "../types/Auth.type";
import { getAuthData } from "../utils/api";
import { HelmetProvider } from "react-helmet-async";
import Sidebar from "../pages/dashboard/components/Sidebar";
import Navbar from "../pages/dashboard/components/Navbar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<BaseUserModel>({
    name: "",
    email: "",
  });
  const [currentPath, setCurrentPath] = React.useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    getAuthData()
      .then((res) => {
        setUser({
          name: res.data.data.data.name,
          email: res.data.data.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("accessToken");
        navigate("/");
      });
  }, []);

  return (
    <HelmetProvider>
      <Sidebar currentPath={currentPath} />
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="fixed top-0 left-0 h-[calc(100vh-64px)] w-[calc(100%-240px)] ml-60 opacity-20 -z-10 mt-16 flex justify-center items-center">
        <img src="/assets/lapas-logo.png" />
      </div>

      <AuthContext.Provider value={{ user }}>
        <LinkHighlightContext.Provider value={{ currentPath, setCurrentPath }}>
          <div className="ml-60 mt-16 p-4">
            <Outlet />
          </div>
        </LinkHighlightContext.Provider>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default DashboardLayout;
