import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, isLoggedIn, handleRegisterClick, handleLoginClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="wtwr logo" />
        </Link>
        <p className="header__date-and-location">
          {" "}
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__temp-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
          <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>{" "}
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
        </>
        )
      : (
        <div className="header__auth">
          <button className="header__register"
          onClick={handleRegisterClick}>Sign Up</button>
          <button className="header__login"
          onClick={handleLoginClick}>Login</button>
        </div>

      )}
        
     
      </div>
    </header>
  );
}

export default Header;
