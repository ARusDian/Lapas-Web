import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import UserCreate from "./pages/dashboard/users/UserCreate";
import UserList from "./pages/dashboard/users/UserList";
import LogIndex from "./pages/dashboard/logs/LogIndex";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import UserEdit from "./pages/dashboard/users/UserEdit";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";

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
        element: <DashboardIndex />,
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <UserList />,
          },
          {
            path: "create",
            element: <UserCreate />,
          },
          {
            path: ":userId",
            element: <UserEdit />,
          }
        ],
      },
      {
        path: "logs",
        element: <LogIndex />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound/>,
  }
]);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
