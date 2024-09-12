import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditPofileModal = ({
  closeActiveModal,
  activeModal,
  handleEditProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);
  // Name
  const [name, setName] = useState(currentUser?.name || "");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  // Avi
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const handleAvatarChange = (e) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };
  // Save
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(name, avatar);
    console.log("Changes saved.");
  };

  useEffect(() => {
    if (activeModal === "edit-profile" && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [activeModal, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={activeModal === "edit-profile"}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditPofileModal;
