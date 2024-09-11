// React
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// Application
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../Profile/ProtectedRoute";
// Utils & Contexts
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import { setToken, getToken, removeToken } from "../../utils/token";
// Modals
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditPofileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    avatar: "",
    name: "",
  });
  const navigate = useNavigate();

  // Modal Functions
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleRegisterClick = () => {
    setActiveModal("sign-up");
  };
  const handleLoginClick = () => {
    setActiveModal("log-in");
  };
  const handleEditClick = () => {
    setActiveModal("edit-profile");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    function handleClickOffModal(event) {
      if (event.target.classList.contains("modal")) {
        closeActiveModal();
      }
    }

    document.addEventListener("click", handleClickOffModal);
    return () => document.removeEventListener("click", handleClickOffModal);
  }, [activeModal]);

  //                                Login/Logout/Sign up
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        setToken(data.token);
        setIsLoggedIn(true);
        return api.getUserInfo(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleRegistration = (email, password, name, avatar) => {
    auth
      .register(email, password, name, avatar)
      .then(() => handleLogin(email, password))
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const handleLogOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  //                                    Edit Profile: Need to work on
  const handleEditProfile = (name, avatar) => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    api
      .updateUserInfo(name, avatar, jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //                                  Clothing Items
  useEffect(() => {
    getItems()
      .then(({ data }) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleAddItem = (name, imageUrl, weather) => {
    const jwt = getToken();
    return addItem(name, imageUrl, weather, jwt)
      .then((item) => {
        setClothingItems([item.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteItem = (id) => {
    const jwt = getToken();
    return deleteItem(id, jwt)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Like function
  const handleCardLike = ({ _id, isLiked }) => {
    const id = _id;
    const jwt = getToken();
    !isLiked
      ? api
          .addCardLike(id, jwt)
          .then((updatedCard) => {
            const updatedClothingItems = clothingItems.map((item) =>
              item._id === id ? updatedCard.data : item
            );
            setClothingItems(updatedClothingItems);
          })
          .catch((error) => {
            console.error(error);
          })
      : api
          .removeCardLike(id, jwt)
          .then((updatedCard) => {
            const updatedClothingItems = clothingItems.map((item) =>
              item._id === id ? updatedCard.data : item
            );
            setClothingItems(updatedClothingItems);
          })
          .catch((error) => {
            console.error(error);
          });
  };

  //                                    Weather
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleEditClick={handleEditClick}
                      handleLogOut={handleLogOut}
                      clothingItems={clothingItems}
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      name={currentUser.name}
                      avatar={currentUser.avatar}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleAddItem={handleAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleRegistration={handleRegistration}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleLogin={handleLogin}
            handleRegisterClick={handleRegisterClick}
          />
          <EditPofileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// to do later: validate form, confirmation modal
