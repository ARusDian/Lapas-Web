import React, { useContext, useEffect, useMemo, useState } from "react";
import LinkHighlightContext from "../../../contexts/LinkHighlightContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { api } from "../../../utils/api";
import { LogType } from "../../../types/log.type";
import DashboardLoading from "../components/DashboardLoading";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

const LogIndex = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);
  const [logs, setLogs] = useState<LogType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getLogData = () => {
    api
      .get("/pushButtonLogs")
      .then((res) => {
        setLogs(res.data.data.data as LogType[]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCurrentPath("logs");
    return () => {
      setCurrentPath("");
    };
  }, [setCurrentPath]);

  useEffect(() => {
    getLogData();
  }, []);

  const dataColumns = useMemo<MRT_ColumnDef<LogType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size:10
      },
      {
        accessorKey: "type",
        header: "Jenis",
        size: 35
      },
      {
        accessorKey: "createdAt",
        header: "Tanggal Kejadian",
        size: 35,
        Cell: ({ row }) => (
          <Box>
            {moment(row.original.createdAt).format("DD MMMM YYYY, HH:mm:ss")}
          </Box>
        ),
      },
      {
        accessorKey: "user",
        header: "Ditekan oleh",
        size: 20,
        Cell: ({ row }) => (
          <Box>
            <Link
              to={`/dashboard/users/${row.original.user.id}`}
              className="text-blue-500 hover:underline text-center"
            >
              {row.original.user.name}
            </Link>
          </Box>
        ),
      },
    ],
    [logs]
  );

  const table = useMaterialReactTable({
    columns: dataColumns,
    data: logs,
  });

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Logs - LapasPanic</title>
      </Helmet>
      <div className="p-4 bg-white bg-opacity-50 shadow-xl border rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Daftar Log</h1>
        <div className="rounded-lg">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default LogIndex;
