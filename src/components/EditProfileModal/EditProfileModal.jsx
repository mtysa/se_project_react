import React, { useState } from "react";
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
          id="edit-avatar"
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
