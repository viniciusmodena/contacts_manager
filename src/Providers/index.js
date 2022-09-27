import { ContactProvider } from "./contacts";
import { ModalProvider } from "./modals";
import { UserProvider } from "./users";

const Providers = ({ children }) => {
  return (
    <ModalProvider>
      <ContactProvider>
        <UserProvider>{children}</UserProvider>
      </ContactProvider>
    </ModalProvider>
  );
};

export default Providers;
