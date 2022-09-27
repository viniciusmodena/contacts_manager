import { Route, Routes as Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectRoute";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../Providers/users";
import LogoutOnlyRoute from "./LogoutOnlyRoute";
import Profile from "../pages/Profile";

const Routes = () => {
  const { authUser } = useUser();
  const user = JSON.parse(localStorage.getItem("@contacts_manager:user"));

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
      <AnimatePresence>
        <Switch>
          <Route element={<ProtectedRoute isAllowed={authUser || user} />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<LogoutOnlyRoute isAllowed={authUser || user} />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default Routes;
