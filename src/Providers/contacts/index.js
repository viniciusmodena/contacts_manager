import { useContext, useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contactList, setContactList] = useState([]);
  const [contact, setContact] = useState();

  const addNewContact = (contactData) => {
    const user_id = JSON.parse(
      localStorage.getItem(`@contacts_manager:user`)
    ).id;
    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));

    api
      .post(`/client/${user_id}/contacts`, contactData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setContactList(
          [response.data, ...contactList].sort((a, b) =>
            a.full_name > b.full_name ? 1 : -1
          )
        );
        toast.success(`Contact added to your list successfully`);
      })
      .catch((err) => {
        toast.error(`Fail to add contact to the list!`);
      });
  };

  const seeContactDetail = (contact_id) => {
    const user_id = JSON.parse(
      localStorage.getItem(`@contacts_manager:user`)
    ).id;
    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));

    api
      .get(`/client/contacts/${contact_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listUserContacts = () => {
    const user_id = JSON.parse(
      localStorage.getItem(`@contacts_manager:user`)
    ).id;
    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));

    api
      .get(`/client/${user_id}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setContactList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateContactInfo = (contact_id, data) => {
    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));
    api
      .patch(`client/contacts/${contact_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const updatedList = [...contactList];

        const contactIndex = updatedList.findIndex(
          (contact) => contact.id === contact_id
        );

        updatedList[contactIndex] = response.data;

        setContactList(
          updatedList.sort((a, b) => (a.full_name > b.full_name ? 1 : -1))
        );

        toast.success(`Contact information updated successfully`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Contact information update failed!`);
      });
  };

  const deleteContact = (contact_id) => {
    const token = JSON.parse(localStorage.getItem(`@contacts_manager:token`));

    api
      .delete(`client/contacts/${contact_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setContactList(
          contactList
            .filter((contact) => contact.id !== contact_id)
            .sort((a, b) => (a.full_name > b.full_name ? 1 : -1))
        );

        toast.success("Contact deleted");
      })
      .catch((err) => {
        toast.error("Fail to delete the contact");
      });
  };

  return (
    <ContactContext.Provider
      value={{
        contactList,
        contact,
        setContactList,
        setContact,
        addNewContact,
        seeContactDetail,
        listUserContacts,
        updateContactInfo,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
