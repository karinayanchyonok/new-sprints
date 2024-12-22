function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", (evt) => closeByEsc(evt));
}
function closeModal(popup) {
    popup.classList.toggle("popup_is-opened");
    document.removeEventListener("keydown", (evt) => closeByEsc(evt));
}

const closePopupOverlay = (evt, popup) => {
    const overlay = evt.target;
    const s1 = overlay.classList.contains("popup");
    const s2 = overlay.classList.contains("popup__content");
    if (s1 && !s2) {
        closeModal(popup);
    }
}

function closeByEsc(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key == 'Escape' && popup) {
        popup.classList.remove('popup_is-opened');
    }
}

export { openModal, closeModal, closePopupOverlay }
