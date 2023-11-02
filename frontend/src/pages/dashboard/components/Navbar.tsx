import React from "react";
import { BaseUserModel } from "../../../types/Auth.type";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  user: BaseUserModel;
  handleLogout: () => void;
}

const Navbar = ({ user, handleLogout }: Props) => {
  return (
    <div className="fixed top-0 h-16 bg-primary-main w-full flex justify-end items-center text-primary-contrast px-4 gap-4">
      {user.name && (
        <div className="flex gap-1 border px-2 py-1 rounded-md justify-center items-center">
          <PersonIcon />
          <p>{user.name}</p>
        </div>
      )}
      <Link to={"/"}>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          color="primary"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
