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
      <label htmlFor="signUpEmail" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="signUpEmail"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="signUpPassword" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="signUpPassword"
          placeholder="Password"
          minLength="6"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="signUpName" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="signUpName"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="signUpAvatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="signUpAvatar"
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
