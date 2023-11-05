import { useContext, useEffect } from "react";
import { RegisterProps } from "../../../types/Auth.type";
import UserForm from "../components/UserForm";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";
import { Helmet } from "react-helmet-async";
import { api } from "../../../utils/api";

const Create = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);

  useEffect(() => {
    setCurrentPath("create");

    return () => {
      setCurrentPath("");
    };
  }, [setCurrentPath]);

  const formSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    data: RegisterProps
  ) => {
    e.preventDefault();
    api.post('/users', data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(res => console.log(res))
    .catch(err => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>Tambah User - LapasPanic</title>
      </Helmet>
      <div className="h-fit bg-white bg-opacity-50 border shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-6">Tambah User</h1>
        <UserForm onSubmit={formSubmitHandler} />
      </div>
    </>
  );
};

export default Create;
