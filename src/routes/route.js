import { Redirect, Route as ReactDOMRoute } from "react-router-dom";

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const token = JSON.parse(localStorage.getItem("@token"));

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return !!token ? (
          <Component />
        ) : !!token ? (
          <Redirect to={"/"} />
        ) : isPrivate ? (
          <Redirect to={"/login"} />
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default Route;
