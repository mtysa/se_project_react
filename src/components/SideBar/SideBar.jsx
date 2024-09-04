import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <div className="sideBar">
      <img
        className="sideBar__avatar"
        src={currentUser?.avatar}
        alt={currentUser?.name}
      />
      <p className="sideBar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;

//get name to reflect currentuser
// update avi later instead of hardcode
