import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditPofileModal = ({
  closeActiveModal,
  activeModal,
  handleEditProfile,
}) => {
  // Name
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  // Avi
  const [avatar, setAvatar] = useState("");
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

  // const currentUser = useContext(CurrentUserContext);
  // useEffect(() => {
  //   if (activeModal === "edit-profile") {
  //     currentUser.name = setName;
  //     currentUser.avatar = setAvatar;
  //   }
  // });
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
          id="edit-name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
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

// make submit functioning for edit profile. complete handleEditProfile in App.jsx
// having issues with api authorizing change. maybe find answer within login auth.
