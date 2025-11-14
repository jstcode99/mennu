import { createBrowserRouter } from "react-router";
import Home from '@/pages/Home';
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);
export default router;
