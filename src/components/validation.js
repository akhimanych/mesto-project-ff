//=====ФУНКЦИИ===АКТИВАЦИИ===ВАЛИДНОСТИ=====

// функция сообщения ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationObj
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObj.errorClass);
};

// функция очистки ошибок
const hideInputError = (formElement, inputElement, validationObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObj.inputErrorClass);
  errorElement.classList.remove(validationObj.errorClass);
  errorElement.textContent = "";
};

// функция проверки валидности
const isValid = (formElement, inputElement, validationObj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationObj
    );
  } else {
    hideInputError(formElement, inputElement, validationObj);
  }
};

// функция проверки перед отправкой
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция управления состоянии кнопки
const toggleButtonState = (inputList, buttonElement, validationObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationObj.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationObj.inactiveButtonClass);
  }
};

const setEventListener = (formElement, validationObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationObj.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationObj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationObj);
      toggleButtonState(inputList, buttonElement, validationObj);
    });
  });
};

const enableValidation = (validationObj) => {
  const formList = Array.from(
    document.querySelectorAll(validationObj.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListener(formElement, validationObj);
  });
};

// Функция очистки валидации формы
const clearValidation = (formElement, validationObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationObj.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationObj);
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, buttonElement, validationObj);
};

export { enableValidation, clearValidation };
