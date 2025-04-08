import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Dashboard from "./pages/Dashboard";
import UserSettings from "./pages/UserSettings";
import Post from "./pages/Post";
import "@mantine/core/styles.css";
import Providers from "./providers/Providers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <div>Oops! Something went wrong.</div>,
      },
      {
        path: "/user-settings",
        element: <UserSettings />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/post",
        element: <Navigate to={"/"} />,
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
      {
        path: "/register",
        element: <div>Register</div>,
      },
      {
        path: "/*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
