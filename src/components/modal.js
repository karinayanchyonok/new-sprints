function openModal(popup) {
    popup.classList.add('popup_is-opened');
    
}
function closeModal(popup) {
    popup.classList.toggle("popup_is-opened");
}

const closePopupOverlay = (evt, popup) =>{
    const overlay = evt.target;
    if (!overlay.classList.contains(".popup__content")){
        closeModal(popup);
    }
}

export { openModal, closeModal, closePopupOverlay }
