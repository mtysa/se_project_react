import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__header-title">Your items</p>
        <button onClick={handleAddClick} className="clothes__header-add-btn">
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
