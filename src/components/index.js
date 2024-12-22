import '../pages/index.css';
import avatarUrl from '../images/avatar.jpg';
import { enableValidation } from "./validate";
import { createCard } from './card';
import { openModal, closeModal, closePopupOverlay } from './modal';
import { getInitialCards, getUserInformation, updateProfile, addNewCard, changeAvatar } from './api';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarUrl})`;


const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
export var idMe = '';

getUserInformation()
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDesc.textContent = res.about;
        profileImage.style.backgroundImage = `url("${res.avatar}")`;
        idMe = res._id;
        const urlInput = avatarPopup.querySelector(".popup__input_type_avatar-url");
        urlInput.value = res.avatar;
    })
    .catch(res => console.log(res.status))


var initialCards = {};

/*-----------------создание карточек-----------------------*/
getInitialCards()
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
        initialCards = res;
        createAllCards(initialCards)
    })
    .catch(res => console.log(res.status))

function createAllCards(initialCards) {
    for (let i = 0; i < initialCards.length; i++) {
        const itemName = initialCards[i].name;
        const itemLink = initialCards[i].link;
        const likesAmount = initialCards[i].likes.length;
        const idOfOwner = initialCards[i].owner._id;
        const idOfCard = initialCards[i]._id;
        const likesArray = initialCards[i].likes;
        const newCardFromCards = createCard(itemName, itemLink, likesAmount, idOfOwner, idOfCard, likesArray);
        placesList.append(newCardFromCards);
    }
};
/*---------------------------------------------------*/


const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
export const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_new-avatar");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");
avatarPopup.classList.add("popup_is-animated");
/*-----------------------avatar popup changes---------------------*/
const avatarElement = document.querySelector(".profile__image");
avatarElement.addEventListener("click", () => {
    openModal(avatarPopup);
})
const closeAvatarPopup = avatarPopup.querySelector(".popup__close")
closeAvatarPopup.addEventListener("click", () => {
    closeModal(avatarPopup);
})
const avatarFormElement = avatarPopup.querySelector(".popup__form");
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarButtonSubmit = avatarFormElement.querySelector(".popup__button");
    avatarButtonSubmit.textContent = "Сохранение...";
    const urlInput = avatarPopup.querySelector(".popup__input_type_avatar-url");
    changeAvatar(urlInput.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            profileImage.style.backgroundImage = `url("${res.avatar}")`;
            avatarButtonSubmit.textContent = "Сохранить";
        })
        .catch(res => console.log(res.status))
    closeModal(avatarPopup);

};
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);
/*-----------------------------------------------------------------*/
const profileButton = document.querySelector(".profile__edit-button");
const closeProfilePopupButton = profilePopup.querySelector(".popup__close");

profileButton.addEventListener("click", function () {
    nameInput.value = document.querySelector(".profile__title").textContent;
    jobInput.value = document.querySelector(".profile__description").textContent;
    openModal(profilePopup);
})

closeProfilePopupButton.addEventListener("click", function () {
    closeModal(profilePopup);
})


const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

/*-----редактирование профиля по кнопке-----*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const profileButtonSubmit = profileFormElement.querySelector(".popup__button");
    profileButtonSubmit.textContent = "Сохранение...";
    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__description").textContent = jobInput.value;
    updateProfile(nameInput.value, jobInput.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(() => profileButtonSubmit.textContent = "Сохранить")
        /*.then(res => console.log(res))*/
        .catch(res => console.log(res.status))
    closeModal(profilePopup);

}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
/*-----------------------------------------*/


const closeImagePopupButton = imagePopup.querySelector(".popup__close");

closeImagePopupButton.addEventListener("click", function () {
    closeModal(imagePopup);
})

const placesList = document.querySelector(".places__list");
const buttonAddCard = document.querySelector(".profile__add-button");
const closePopupCardButton = cardPopup.querySelector(".popup__close");

buttonAddCard.addEventListener("click", function () {
    openModal(cardPopup);
})

closePopupCardButton.addEventListener("click", function () {
    closeModal(cardPopup);
})

const cardFormElement = cardPopup.querySelector(".popup__form");
const namePlaceInput = document.querySelector(".popup__input_type_card-name");
const urlPlaceInput = document.querySelector(".popup__input_type_url");

/*-------------------добавление новой карточки---------------------*/
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardButtonSubmit = cardFormElement.querySelector(".popup__button");
    newCardButtonSubmit.textContent = "Сохранение...";
    const newName = namePlaceInput.value;
    const newImage = urlPlaceInput.value;
    const newCard = createCard(newName, newImage, 0, idMe, '', []);
    placesList.prepend(newCard);
    addNewCard(newName, newImage)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            newCardButtonSubmit.textContent = "Сохранить";
        })
        .catch(res => console.log(res.status))
    closeModal(cardPopup);

    namePlaceInput.value = "";
    urlPlaceInput.value = "";
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);
/*----------------------------------------*/

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
enableValidation(validationSettings);

profilePopup.addEventListener("click", (evt) => {
    closePopupOverlay(evt, profilePopup);
});

cardPopup.addEventListener("click", (evt) => {
    closePopupOverlay(evt, cardPopup);
});

imagePopup.addEventListener("click", (evt) => {
    closePopupOverlay(evt, imagePopup);
});
avatarPopup.addEventListener("click", (evt) => {
    closePopupOverlay(evt, avatarPopup);
})
