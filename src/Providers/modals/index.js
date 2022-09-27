import { createContext, useContext, useState } from "react";
import { set } from "react-hook-form";
import { useContact } from "../contacts";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("");

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenModal = (modalType) => {
    setType(modalType);
    handleModal();
  };

  return (
    <ModalContext.Provider
      value={{ type, handleOpenModal, openModal, handleModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
