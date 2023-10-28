import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { RegisterProps } from "../../../types/Auth.type";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, data: RegisterProps) => void;
  data?: RegisterProps;
}

const UserForm = ({ onSubmit, data }: Props) => {
  const [form, setForm] = React.useState<RegisterProps>(
    data ?? {
      name: "",
      email: "",
      NIP: "",
      gender: "L",
      jabatan: "",
      roles: [],
      password: "",
      confirm_password: "",
    }
  );

  const jabatanSelectHandler = (event: SelectChangeEvent) => {
    setForm((prev) => ({
      ...prev,
      jabatan: event.target.value as "L" | "P",
    }));
  };

  const genderSelectHandler = (event: SelectChangeEvent) => {
    setForm((prev) => ({
      ...prev,
      gender: event.target.value as "L" | "P",
    }));
  };

  const roleSelectHandler = (event: SelectChangeEvent<string | string[]>) => {
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
    <form onSubmit={(e) => onSubmit(e, form)} className="flex flex-col gap-4">
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
      <div className="flex flex-row gap-4">
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="NIP">NIP*</label>
          <TextField
            required
            type="text"
            name="NIP"
            id="NIP"
            variant="outlined"
            size="small"
            value={form.NIP}
            onChange={formSetHandler}
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <label>Gender*</label>
          <Select
            required
            value={form.gender}
            size="small"
            onChange={genderSelectHandler}
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
        <div className="flex flex-col w-full gap-1">
          <label>Jabatan*</label>
          <Select
            required
            value={form.jabatan}
            size="small"
            onChange={jabatanSelectHandler}
          >
            {["Petugas", "Penjaga", "Pengunjung"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col w-full gap-1">
          <label>Roles*</label>
          <Select
            required
            multiple
            value={form.roles}
            size="small"
            onChange={roleSelectHandler}
          >
            {["super-admin", "admin", "petugas"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </div>
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
            inputProps={{
              minLength: 8,
            }}
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
            inputProps={{
              minLength: 8,
            }}
          />
        </div>
      </div>
      <Button type="submit" variant="contained" color="primary" size="large">
        Tambah
      </Button>
    </form>
  );
};

export default UserForm;
