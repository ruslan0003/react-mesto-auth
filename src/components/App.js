import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { UserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import { api } from '../utils/api.js';
import AddCardPopup from './AddCardPopup.js';
import { Redirect, useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { ROUTES_MAP } from '../utils/routesMap.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import * as userAuth from '../userAuth.js';
import { getToken } from '../utils/token.js';
import InfoTooltip from './InfoTooltip.js';
import Page404 from './Page404.js';

document.body.style.backgroundColor = 'black';

function App() {
  const [currentUser, setCurrentUserInfo] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: '', password: '' });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistrationValid, setRegistrationStatus] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getServerCards(),
    ]).then(([userDataApi, cardsApi]) => {
      const initialCards = cardsApi.map(item => ({
        name: item.name,
        link: item.link,
        likes: item.likes,
        _id: item._id,
        owner: {
          _id: item.owner._id,
        }
      }))
      setCards(initialCards);
      setCurrentUserInfo(userDataApi);
    }).catch((err) => {
      console.log(err);
    });
    tokenCheck();
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const cardsWithoutDeleted = cards.filter(c => c._id !== card._id);
      setCards(cardsWithoutDeleted);
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(name, about) {
    api.editProfile(name, about).then(
      res => {
        setCurrentUserInfo(res);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.changeAvatar(link).then(
      res => {
        setCurrentUserInfo(res);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(title, url) {
    api.createCard(title, url).then(
      newCard => {
        setCards([...cards, newCard]);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(userData) {
    setUserData(userData);
    setLoggedIn(true);
  }

  function tokenCheck() {
    const jwt = getToken();
    if (jwt) {
      userAuth.getContent(jwt).then((res) => {
        if (res) {
          const userData = {
            email: res.data.email,
          }
          setUserData(userData);
          setLoggedIn(true);
          history.push(ROUTES_MAP.MAIN);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleRegistrationStatus(status) {
    setRegistrationStatus(status);
  }

  return (
    <div className="page">

      <UserContext.Provider value={currentUser}>

        <Header userData={userData} />

        <Switch>

          <ProtectedRoute path={ROUTES_MAP.MAIN} exact loggedIn={loggedIn}>
            <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCard={setSelectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />
          </ProtectedRoute>

          <Route path={ROUTES_MAP.LOGIN}>
            <Login handleLogin={handleLogin}/>
          </Route>

          <Route path={ROUTES_MAP.REGISTER}>
            <Register handleInfoTooltipOpen={handleInfoTooltipOpen} handleRegistrationStatus={handleRegistrationStatus} />
          </Route>

          <Route path={ROUTES_MAP.NOT_FOUND} exact>
            <Page404/>
          </Route>

          <Redirect to={ROUTES_MAP.NOT_FOUND} />

        </Switch>

        <Footer />

        <InfoTooltip isRegistrationValid={isRegistrationValid} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />

        <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />

        <AddCardPopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlaceSubmit={handleAddPlaceSubmit} />

        <PopupWithForm name="popup-submit" title="Вы уверены?">
          <button className="form__submit popup-submit__submit-button form__submit-button_no-input" type="submit" value="Подтвердить">Да</button>
        </PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithImage card={selectedCard} onClose={closeAllPopups} />

      </UserContext.Provider>

    </div>
  );
}

export default App;

