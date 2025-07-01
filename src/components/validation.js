//=====ФУНКЦИИ===АКТИВАЦИИ===ВАЛИДНОСТИ=====

// функция сообщения ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// функция очистки ошибок
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = '';
};

// функция проверки валидности
const isValid = (formElement, inputElement, validationObj) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        inputElement.setCustomValidity("");
  }

  inputElement.checkValidity();

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
        hideInputError(formElement, inputElement);
  }
};



//функция проверки перед отправкой
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


//функция управления состоянии кнопки
const toggleButtonState =(inputList, buttonElement) => {
if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
} else {
    buttonElement.disabled = false;
  buttonElement.classList.remove("popup__button_inactive");
} 
}

const setEventListener = (formElement, validationObj) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
    const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationObj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationObj)
            toggleButtonState(inputList, buttonElement, validationObj)
        });
    });
};

const enableValidation = (validationObj) => {
    const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
    formList.forEach((formElement) => {
        setEventListener(formElement, validationObj);
    });
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
};

// Функция очистки валидации формы
const clearValidation = (formElement, validationObj) => {
    const listErrorSpan = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
    const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);
    listErrorSpan.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationObj);
    });
    toggleButtonState(listErrorSpan, buttonElement, validationObj)
}
export {enableValidation, clearValidation};





