import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import { removeToken } from "../../utils/token";

function SideBar({ handleEditClick, setIsLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  function logOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }
  return (
    <div className="sideBar">
      <div className="sideBar__info">
        <img
          className="sideBar__avatar"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />
        <p className="sideBar__username">{currentUser.name}</p>
      </div>
      <button className="sideBar__edit" onClick={handleEditClick}>
        Change profile data
      </button>
      <button onClick={logOut} className="sideBar__logout">
        Log out
      </button>
    </div>
  );
}

export default SideBar;

// edit profile function.. link to server.. reference aroundtheus proj
