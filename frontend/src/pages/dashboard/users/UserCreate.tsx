import { useContext, useEffect, useState } from "react";
import { RegisterProps, Role } from "../../../types/Auth.type";
import UserForm from "../components/UserForm";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";
import { Helmet } from "react-helmet";

const Create = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);
  // const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    setCurrentPath("create");

    // getAllRoles().then((res) => {
    //   console.log(res);
    // });

    return () => {
      setCurrentPath("");
    };
  }, [setCurrentPath]);

  const formSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    data: RegisterProps
  ) => {
    e.preventDefault();
    alert(data);
  };

  return (
    <>
      <Helmet>
        <title>Tambah User - LapasPanic</title>
      </Helmet>
      <div className="min-h-[600px] border shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-6">Tambah User</h1>
        <UserForm onSubmit={formSubmitHandler} />
      </div>
    </>
  );
};

export default Create;
