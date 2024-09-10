import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeActive from "../../assets/like-active.svg";
import likeInactive from "../../assets/like-inactive.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__content-container">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <img
            src={isLiked ? likeActive : likeInactive}
            alt="card like"
            className="card__like-btn"
            onClick={handleLikeClick}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

//fix like button
