import React, { useContext, useEffect } from "react";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";
import { Helmet } from "react-helmet";

const UserList = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);

  useEffect(() => {
    setCurrentPath("users");
    return () => {
      setCurrentPath("");
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Daftar User - LapasPanic</title>
      </Helmet>
      <div className="shadow-xl p-4 border border-gray-300 min-h-[600px] rounded-lg">
        <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
      </div>
    </>
  );
};

export default UserList;
