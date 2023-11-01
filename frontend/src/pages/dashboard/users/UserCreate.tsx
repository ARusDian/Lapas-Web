import { useContext, useEffect } from "react";
import { RegisterProps } from "../../../types/Auth.type";
import UserForm from "../components/UserForm";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { api } from "../../../lib/api";
import AuthContext from "../../../contexts/AuthContext";

const Create = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);
  const { user } = useContext(AuthContext);

  console.log(user);

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
    <HelmetProvider>
      <Helmet>
        <title>Tambah User - LapasPanic</title>
      </Helmet>
      <div className="min-h-[600px] border shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-6">Tambah User</h1>
        <UserForm onSubmit={formSubmitHandler} />
      </div>
    </HelmetProvider>
  );
};

export default Create;
