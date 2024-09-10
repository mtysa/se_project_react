import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditClick, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

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
      <button onClick={handleLogOut} className="sideBar__logout">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
