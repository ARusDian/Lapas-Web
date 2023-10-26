import { RegisterProps } from "../../../types/Auth.type";
import UserForm from "../components/UserForm";

const Create = () => {
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
