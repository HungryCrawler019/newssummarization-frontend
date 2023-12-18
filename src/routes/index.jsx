import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import News from "../pages/News";
import Scholarly from "../pages/Scholarly";
import Summaries from "../pages/Summaries";
import Judgements from "../pages/Judgements";
import Login from "../pages/Login"; // You need to create this component
import Register from "../pages/Register"; // You need to create this component
import ProtectedRoute from "./ProtectedRoute"; // This is the component we created above

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        ),
      },
      {
        path: "/scholarly",
        element: (
          <ProtectedRoute>
            <Scholarly />
          </ProtectedRoute>
        ),
      },
      {
        path: "/judgements",
        element: (
          <ProtectedRoute>
            <Judgements />
          </ProtectedRoute>
        ),
      },
      {
        path: "/summaries",
        element: (
          <ProtectedRoute>
            <Summaries />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);
