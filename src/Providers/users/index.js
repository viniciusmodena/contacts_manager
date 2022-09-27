import { useContext, useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [authUser, setAuthUser] = useState(false);

  const logout = () => {
    localStorage.removeItem("@contacts_manager:user");
    localStorage.removeItem("@contacts_manager:token");
    navigate("/sign-in", { replace: true });
    setUser(undefined);
    setAuthUser(false);
  };

  const userSignUp = (userData) => {
    api
      .post(`/clients`, userData)
      .then((response) => {
        toast.success(`Sign up successfuly!`);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Sign up has failed!`);
      });
  };

  const userSignIn = (credentials) => {
    api
      .post(`/login`, credentials)
      .then((response) => {
        localStorage.setItem(
          `@contacts_manager:user`,
          JSON.stringify(response.data.user)
        );

        localStorage.setItem(
          `@contacts_manager:token`,
          JSON.stringify(response.data.access_token)
        );

        setUser({
          user: response.data.user,
          token: response.data.access_token,
        });

        setAuthUser(true);
      })
      .catch((err) => {
        toast.error(`Login has failed!`);
      });
  };

  const userAccountDetail = () => {
    const user_id = JSON.parse(
      localStorage.getItem(`@contacts_manager:user`)
    ).id;

    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));

    api
      .get(`clients/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userUpdateAccountInfo = (data) => {
    const user_id = JSON.parse(
      localStorage.getItem(`@contacts_manager:user`)
    ).id;
    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));

    api
      .patch(`clients/${user_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        localStorage.setItem(
          `@contacts_manager:user`,
          JSON.stringify(response.data)
        );

        setUser({ user: response.data, ...user });

        toast.success(`Account information updated successfully!`);
      })
      .catch((err) => {
        toast.error(`Account information failed to update!`);
      });
  };

  const userDeleteAccount = () => {
    const user_id = JSON.parse(
      localStorage.getItem(`@contacts_manager:user`)
    ).user_id;
    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));

    api
      .delete(`clients/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        localStorage.removeItem("@contacts_manager:user");
        localStorage.removeItem("@contacts_manager:token");
        setUser({});
        setAuthUser(false);
      })
      .catch((err) => {});
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authUser,
        logout,
        setUser,
        setAuthUser,
        userSignUp,
        userSignIn,
        userAccountDetail,
        userUpdateAccountInfo,
        userDeleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
