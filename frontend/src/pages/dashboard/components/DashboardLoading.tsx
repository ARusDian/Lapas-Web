import { PuffLoader } from "react-spinners";

const DashboardLoading = () => {
  return (
    <div className="fixed top-0 left-0 h-[calc(100vh-64px)] w-[calc(100%-240px)] ml-60 -z-10 mt-16 flex justify-center items-center">
      <PuffLoader color="#1976d2" size={150} />
    </div>
  );
};

export default DashboardLoading;
