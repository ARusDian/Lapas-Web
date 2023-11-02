import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, getAllRoles } from "../../../lib/api";
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
    roleId: 0,
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data.data.data as UserModel);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllRoles().then((res) => {
      setRoles(res);
    });
    setIsLoading(false);
  }, []);

  const approveUserHandler = () => {
    setIsLoading(true);
    api
      .put(`/users/${userId}/approve`)
      .then((res) => {
        console.log(res);
        navigate("/dashboard/users");
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const saveUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(user);
    setIsLoading(false);
  };

  if (isLoading || !user.name) {
    return <DashboardLoading />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Detail User - LapasPanic</title>
      </Helmet>

      <div className="h-[calc(100vh-100px)] border shadow-lg rounded-lg p-4">
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
                type="text"
                name="NIP"
                id="NIP"
                variant="outlined"
                size="small"
                value={user?.NIP}
                inputProps={{
                  minLength: 18,
                  readOnly: true,
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!user.approved}
          >
            Simpan
          </Button>
        </form>
      </div>
    </HelmetProvider>
  );
};

export default UserEdit;
