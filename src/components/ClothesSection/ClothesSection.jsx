import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  isLoggedIn,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__header-title">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes__header-add-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
