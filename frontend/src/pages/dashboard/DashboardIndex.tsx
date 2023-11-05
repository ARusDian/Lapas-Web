import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import AuthContext from "../../contexts/AuthContext";
import { PuffLoader } from "react-spinners";

const DashboardIndex = () => {
  const { user } = useContext(AuthContext);
  
  if (!user.name) {
    return (
      <div className="text-3xl font-bold w-full h-[calc(100vh-100px)] flex items-center justify-center">
        <PuffLoader color="#1976d2" size={150}/>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - LapasPanic</title>
      </Helmet>

      <div className="text-3xl font-bold">Welcome back, {user.name}!</div>
    </>
  );
};

export default DashboardIndex;
