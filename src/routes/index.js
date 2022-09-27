import { Route, Routes as Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";
import ProtectedRoute from "./ProtectRoute";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../Providers/users";
import LogoutOnlyRoute from "./LogoutOnlyRoute";
import { useEffect } from "react";
import Profile from "../pages/Profile";

const Routes = () => {
  const { authUser } = useUser();
  const token = JSON.parse(localStorage.getItem("@contacts_manager:token"));

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
          <Route element={<ProtectedRoute isAllowed={authUser || token} />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<LogoutOnlyRoute isAllowed={authUser || token} />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default Routes;
