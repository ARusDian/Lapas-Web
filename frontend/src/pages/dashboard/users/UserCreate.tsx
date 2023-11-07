import { useContext, useEffect } from "react";
import UserForm from "../components/UserForm";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";
import { Helmet } from "react-helmet-async";

const Create = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);
  useEffect(() => {
    setCurrentPath("create");

    return () => {
      setCurrentPath("");
    };
  }, [setCurrentPath]);

  return (
    <>
      <Helmet>
        <title>Tambah User - LapasPanic</title>
      </Helmet>
      <div className="h-fit bg-white bg-opacity-50 border shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-6">Tambah User</h1>
        <UserForm />
      </div>
    </>
  );
};

export default Create;
