const createCard = function (itemName, itemLink) {
    const cardTemplate = document.querySelector("#card-template").content;
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector(".card__image").src = itemLink;
    newCard.querySelector(".card__title").textContent = itemName;

    const likeButton = newCard.querySelector(".card__like-button");
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("card__like-button_is-active");
    })

    const deleteButton = newCard.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
        const elementToDelete = deleteButton.closest(".places__item");
        elementToDelete.remove();
    })

    const imageOfCard = newCard.querySelector(".card__image");
    imageOfCard.addEventListener("click", function(){
        imageOfImagePopup.src = itemLink;
        captionOfImagePopup.textContent = itemName;
        openModal(imagePopup);
    })
    return newCard;
};

export {createCard};