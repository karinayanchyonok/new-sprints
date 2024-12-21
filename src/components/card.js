import { openModal } from "./modal";
import { imagePopup } from "./index";
import { idMe } from "./index";
import { deleteCard, putLike, deleteLike } from "./api";

const createCard = function (itemName, itemLink, likesAmount, idOfOwner, idOfCard, likesArray) {

    const cardTemplate = document.querySelector("#card-template").content;
    const newCard = cardTemplate.cloneNode(true);

    newCard.querySelector(".card__image").src = itemLink;
    newCard.querySelector(".card__title").textContent = itemName;

    var shownAmountLikes = newCard.querySelector(".card__like-amount");
    shownAmountLikes.textContent = likesAmount;

    const likeButton = newCard.querySelector(".card__like-button");
    
    var IsMeInLikes = false;
    for (var i = 0; i < likesArray.length; i++){
        if (likesArray[i]._id === idMe){
            IsMeInLikes = true;
        }
    }
    if (IsMeInLikes){
        likeButton.classList.add("card__like-button_is-active");
    } else{
        likeButton.classList.remove("card__like-button_is-active");
    }

    likeButton.addEventListener("click", function () {
        if (likeButton.classList.contains("card__like-button_is-active")) {
            deleteLike(idOfCard)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
                .then((res) => {
                    shownAmountLikes.textContent = res.likes.length;
                })
                .catch(res => console.log(res.status))
        } else {
            putLike(idOfCard)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
                .then((res) => {
                    shownAmountLikes.textContent = res.likes.length;
                })
                .catch(res => console.log(res.status))
        }
        likeButton.classList.toggle("card__like-button_is-active");
    })

    const deleteButton = newCard.querySelector(".card__delete-button");
    if (idMe !== idOfOwner) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener("click", function () {
            const elementToDelete = deleteButton.closest(".places__item");
            deleteCard(idOfCard)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
                .catch(res => console.log(res.status))
            elementToDelete.remove();
        })
    }


    const imageOfCard = newCard.querySelector(".card__image");
    const imageOfImagePopup = document.querySelector(".popup__image");
    const captionOfImagePopup = document.querySelector(".popup__caption");

    imageOfCard.addEventListener("click", function () {
        imageOfImagePopup.src = itemLink;
        captionOfImagePopup.textContent = itemName;
        openModal(imagePopup);
    })
    return newCard;
};


export { createCard };