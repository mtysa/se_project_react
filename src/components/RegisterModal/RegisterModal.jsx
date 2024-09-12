import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  closeActiveModal,
  activeModal,
  handleRegistration,
  handleLoginClick,
}) => {
  //email
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  //pw
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  //name
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  //avi
  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };
  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, name, avatar);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={activeModal === "sign-up"}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      showLink={true}
      linkText="or Log In"
      onLinkClick={handleLoginClick}
    >
      <label htmlFor="registerEmail" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="registerEmail"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="registerPassword" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="registerPassword"
          placeholder="Password"
          minLength="6"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="registerName" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="registerName"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="registerAvatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="registerAvatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
