import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);
  const switchModal = (type) => setModalType(type); // Function to switch between signIn and signUp

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal, switchModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
