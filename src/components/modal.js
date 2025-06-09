// Открытие попапа
function openPopup(popup) {
  if (!popup) return;
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

// Закрытие попапа
function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Закрытие попапа по ESC
function closeByEscape(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) closePopup(activePopup);
  }
}

// Закрытие попапа по клику на "Х" или оверлей
function closePopupByOverlayOrButton(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target === event.currentTarget
  ) {
    const popup = event.target.closest(".popup");
    if (popup && popup.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
  }
}

// Инициализация: добавляем класс popup_is-animated всем попапам
function initPopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
  });
}

// Инициализацию при загрузке DOM
document.addEventListener("DOMContentLoaded", initPopups);

export { openPopup, closePopup, closePopupByOverlayOrButton };
