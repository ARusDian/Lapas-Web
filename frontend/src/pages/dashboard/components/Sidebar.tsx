import { Collapse, Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import SidebarLinkButton from "./SidebarLinkButton";
import LiveClock from "./LiveClock";

interface Props {
  currentPath: string;
}

const Sidebar = ({ currentPath }: Props) => {
  const [openCollapse, setOpenCollapse] = React.useState<boolean>(false);
  return (
    <div className="fixed left-0 top-0 w-60 z-30 flex flex-col bg-primary-main h-screen text-primary-contrast px-2">
      <div className="flex flex-col">
        <Link to={"/dashboard"} className="text-2xl text-start pl-2 py-4 block">
          LapasPanic
        </Link>
        <Divider />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col mt-2">
          <div
            className="flex flex-col items-start gap-4 px-2 py-3 transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer"
            onClick={() => setOpenCollapse((prev) => !prev)}
          >
            <div className="relative flex items-center gap-4 w-full">
              <PersonIcon />
              <p className="font-semibold">Users</p>
              <div className="absolute right-0">
                {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
            </div>
          </div>
          <Collapse in={openCollapse} unmountOnExit className="pl-4 mt-1">
            <SidebarLinkButton
              linkTo="users"
              startIcon={<VisibilityIcon />}
              text="Daftar Pengguna"
              className={`${
                currentPath === "users" && "bg-white bg-opacity-10"
              } text-sm mb-0.5`}
            />
            <SidebarLinkButton
              linkTo="users/create"
              startIcon={<AddIcon />}
              text="Tambah Pengguna"
              className={`${
                currentPath === "create" && "bg-white bg-opacity-10"
              } text-sm`}
            />
          </Collapse>
          <SidebarLinkButton
            linkTo="logs"
            startIcon={<ArticleIcon />}
            text="Logs"
            className={`${currentPath === "logs" && "bg-white bg-opacity-10"} mt-1`}
          />
        </div>

        <div>
          <Divider />
          <div className="text-lg p-2 border rounded-lg my-2 text-center">
            <LiveClock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
