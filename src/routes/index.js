import React from "react";
import { Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import Route from "./route";

const Routes = () => {
  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default Routes;
