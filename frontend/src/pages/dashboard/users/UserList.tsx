import React, { useContext, useEffect, useMemo } from "react";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";
import { Helmet } from "react-helmet-async";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { UserModel } from "../../../types/Auth.type";
import { api } from "../../../lib/api";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button } from "@mui/material";

const UserList = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchUsers = () => {
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPath("users");
    fetchUsers();
    return () => {
      setCurrentPath("");
    };
  }, []);

  const dataColumns = useMemo<MRT_ColumnDef<UserModel>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "jabatan",
        header: "Jabatan",
        size: 50,
      },
      {
        accessorKey: "approved",
        header: "Approved",
        size: 50,
        Cell: ({ row }) => (
          <Box>{row.original.approved ? "Approved" : "-"}</Box>
        ),
      },
      {
        accessorKey: "disabled",
        header: "Disabled",
        size: 50,
        Cell: ({ row }) => (
          <Box>{row.original.disabled ? "Disabled" : "-"}</Box>
        ),
      },
    ],
    [users]
  );

  const table = useMaterialReactTable({
    columns: dataColumns,
    data: users,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Link
        to={`/dashboard/users/${row.original.id}`}
        className="px-2 bg-primary-main text-center text-primary-contrast rounded-lg inline-flex items-center justify-center"
      >
        <Button startIcon={<VisibilityIcon />} sx={{ color: "white" }}>
          <p>Lihat</p>
        </Button>
      </Link>
    ),
  });

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 h-[calc(100vh-64px)] w-[calc(100%-240px)] ml-60 -z-10 mt-16 flex justify-center items-center">
        <PuffLoader color="#1976d2" size={150} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Daftar User - LapasPanic</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-2">Daftar Pengguna</h1>
      <div className="shadow-xl rounded-lg">
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default UserList;
