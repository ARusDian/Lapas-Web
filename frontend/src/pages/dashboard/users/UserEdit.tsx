import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, getAllRoles } from "../../../utils/api";
import { Role, UserModel } from "../../../types/Auth.type";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import DashboardLoading from "../components/DashboardLoading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteDialog from "../components/DeleteDialog";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const UserEdit = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserModel>({
    id: Number(userId),
    uid: "",
    name: "",
    email: "",
    NIP: "",
    disabled: false,
    approved: false,
    jabatan: "",
    gender: "L",
    roleId: 5,
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    api
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data.data.data as UserModel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();

    getAllRoles().then((res) => {
      setRoles(res);
    });
    setIsLoading(false);
  }, []);

  const approveUserHandler = () => {
    setIsLoading(true);
    api
      .post(`/users/${userId}/approve`)
      .then(() => {
        navigate("/dashboard/users", {
          replace: true,
          state: {
            approveUser: true,
          },
        });
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const saveUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .put(`/users/${userId}`, user)
      .then((res) => {
        console.log(res);
        navigate("/dashboard/users", {
          replace: true,
          state: { saveUser: true },
        });
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const deleteUserHandler = () => {
    setIsLoading(true);
    api
      .delete(`/users/${userId}`)
      .then(() => {
        navigate("/dashboard/users", {
          replace: true,
          state: {
            deleteUser: true,
          },
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const disableUserHandler = () => {
    setIsLoading(true);
    api
      .put(`/users/${userId}/disable`)
      .then(() => {
        fetchUser();
        toast.info(`User berhasil di-${user.disabled ? "enable" : "disable"}!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .then((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  if (isLoading && !user.name) {
    return <DashboardLoading />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Detail User - LapasPanic</title>
      </Helmet>
      <ToastContainer/>
      <div className="h-[calc(100vh-100px)] border bg-white bg-opacity-50 shadow-lg rounded-lg p-4">
        <div className="flex flex-row justify-between w-full">
          <Link
            to="/dashboard/users"
            className="flex flex-row gap-3 items-center mb-6 hover:opacity-75"
          >
            <ArrowBackIcon />
            <h1 className="text-2xl font-bold">Detail User</h1>
          </Link>

          <div className="flex flex-row gap-2 mt-2">
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              className="w-full"
              disabled={user.approved || isLoading}
              onClick={approveUserHandler}
            >
              Approve
            </Button>
            <Button
              type="submit"
              variant="contained"
              color={user.disabled ? "primary" : "error"}
              size="large"
              className="w-full"
              disabled={isLoading}
              onClick={disableUserHandler}
            >
              {user.disabled ? "Enable" : "Disable"}
            </Button>
          </div>
        </div>
        <form onSubmit={saveUserHandler} className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-1 font-bold">
            <label htmlFor="uid">UID</label>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              inputProps={{ readOnly: true }}
              value={user.uid ?? "-"}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full gap-1 font-bold">
              <label htmlFor="nama">Nama*</label>
              <TextField
                required
                type="text"
                name="name"
                id="nama"
                variant="outlined"
                size="small"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col w-full gap-1 font-bold">
              <label htmlFor="email">Email*</label>
              <TextField
                required
                id="email"
                type="email"
                variant="outlined"
                size="small"
                name="email"
                value={user.email}
                inputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full gap-1 font-bold">
              <label htmlFor="NIP">NIP*</label>
              <TextField
                required
                type="number"
                name="NIP"
                id="NIP"
                variant="outlined"
                size="small"
                value={user?.NIP}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, NIP: e.target.value }))
                }
                inputProps={{
                  minLength: 18,
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-1 font-bold">
              <label>Gender*</label>
              <Select
                required
                value={user?.gender}
                size="small"
                onChange={(e: SelectChangeEvent) =>
                  setUser((prev) => ({
                    ...prev,
                    gender: e.target.value as "L" | "P",
                  }))
                }
              >
                {["L", "P"].map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full gap-1 font-bold">
              <label>Jabatan*</label>
              <Select
                required
                value={user?.jabatan}
                size="small"
                onChange={(e: SelectChangeEvent) =>
                  setUser((prev) => ({
                    ...prev,
                    jabatan: e.target.value,
                  }))
                }
              >
                {["Petugas", "Penjaga"].map((jabatan) => (
                  <MenuItem key={jabatan} value={jabatan}>
                    {jabatan}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col w-full gap-1 font-bold">
              <label>Roles*</label>
              <Select
                required
                value={`${roles.length > 0 ? user?.roleId : ""}`}
                size="small"
                onChange={(e: SelectChangeEvent) => {
                  setUser((prev) => ({
                    ...prev,
                    roleId: Number(e.target.value),
                  }));
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full gap-1 font-bold">
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                type="password"
                variant="outlined"
                size="small"
                name="password"
                inputProps={{
                  minLength: 8,
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-1 font-bold">
              <label htmlFor="passwordConfirmation">Konfirmasi Password</label>
              <TextField
                id="passwordConfirmation"
                type="password"
                variant="outlined"
                size="small"
                name="confirm_password"
                inputProps={{
                  minLength: 8,
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className="w-full"
              disabled={!user.approved || isLoading}
            >
              Simpan
            </Button>
            <div className="flex items-center gap-2 transition-all delay-300 ease-in-out">
              <Button
                type="button"
                variant="contained"
                color="error"
                size="large"
                onClick={() => setOpenDialog(true)}
                disabled={!user.approved || isLoading}
              >
                Hapus
              </Button>
              <div className={`${!isLoading && "hidden"} flex`}>
                <ClipLoader color="#1976d2" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DeleteDialog
        open={openDialog}
        setOpen={setOpenDialog}
        submitHandler={deleteUserHandler}
      />
    </HelmetProvider>
  );
};

export default UserEdit;
