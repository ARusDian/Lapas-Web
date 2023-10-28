import { useContext, useEffect } from "react";
import { RegisterProps } from "../../../types/Auth.type";
import UserForm from "../components/UserForm";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";

const Create = () => {
  const { setCurrentPath }= useContext(LinkHighlightContext);
  
  useEffect(() => {
    setCurrentPath("create");
    return () => {
      setCurrentPath("");
    };
  }, [setCurrentPath]);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>, data: RegisterProps) => {
    e.preventDefault();
    alert(data);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Tambah User</h1>
      <div className="min-h-[600px] border shadow-lg rounded-lg p-4">
        <UserForm onSubmit={formSubmitHandler}/>
      </div>
    </>
  );
};

export default Create;
