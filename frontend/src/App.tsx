import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import UserCreate from "./pages/dashboard/users/UserCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <h1>Dashboard</h1>,
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <h1>Users</h1>,
          },
          {
            path: "create",
            element: <UserCreate />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
