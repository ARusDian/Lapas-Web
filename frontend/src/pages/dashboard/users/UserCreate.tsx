import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { RegisterProps } from "../../../types/Auth.type";

const Create = () => {
  const [form, setForm] = React.useState<RegisterProps>({
    name: "",
    roles: [],
    email: "",
    password: "",
    confirm_password: "",
  });

  const selectHandler = (event: SelectChangeEvent<string | string[]>) => {
    const {
      target: { value },
    } = event;
    setForm((prev) => ({
      ...prev,
      roles: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const formSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Tambah User</h1>
      <div className="min-h-[600px] border shadow-lg rounded-lg p-4">
        <form className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="nama">Nama*</label>
              <TextField
                required
                type="text"
                name="name"
                id="nama"
                variant="outlined"
                size="small"
                value={form.name}
                onChange={formSetHandler}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="email">Email*</label>
              <TextField
                required
                id="email"
                type="email"
                variant="outlined"
                size="small"
                name="email"
                onChange={formSetHandler}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label>Roles*</label>
            <Select
              required
              multiple
              value={form.roles}
              size="small"
              onChange={selectHandler}
            >
              {["super-admin", "admin", "petugas"].map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="password">Password*</label>
              <TextField
                required
                id="password"
                type="password"
                variant="outlined"
                size="small"
                name="password"
                onChange={formSetHandler}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="passwordConfirmation">Konfirmasi Password*</label>
              <TextField
                required
                id="passwordConfirmation"
                type="password"
                variant="outlined"
                size="small"
                name="confirm_password"
                onChange={formSetHandler}
                error={form.password !== form.confirm_password}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Tambah
          </Button>
        </form>
      </div>
    </>
  );
};

export default Create;
