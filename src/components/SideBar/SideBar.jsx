import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sideBar">
      <img className="sideBar__avatar" src={avatar} alt="Default avatar" />
      <p className="sideBar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
