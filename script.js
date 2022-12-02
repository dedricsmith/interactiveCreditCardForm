'use strict';
// Inputs
const cardNameInput = document.querySelector('#form-name-input');
const cardNumInput = document.querySelector('#form-cardNum-input');
const cardMthInput = document.querySelector('#form-cardExp-month');
const cardYrInput = document.querySelector('#form-cardExp-year');
const cardCVCInput = document.querySelector('#form-cardCVC-input');
// Display on card
const UIcardName = document.querySelector('.card-front__name');
const UIcardNum = document.querySelector('#card-front-num');
const UIcardMth = document.querySelector('#month');
const UIcardYr = document.querySelector('#year');
const UIcardCVC = document.querySelector('.card-back__cvc');
// Buttons
const submitBtn = document.querySelector('.btn-sub');
const confirmBtn = document.querySelector('#thanks-btn');
// Form
const form = document.querySelector('#form');
// Thank you page
const thankYou = document.querySelector('.thanks-page');

// Name Input
function displayName() {
  UIcardName.innerText = cardNameInput.value;
  if (UIcardName.innerText === '') {
    UIcardName.innerText = 'Jane Appleseed';
  }
}

// Update card detials as user fills in form
function displayNumber() {
  let cardNumberInput = cardNumInput.value;
  let cardNumberFormatted = cardNumberInput;

  cardNumberFormatted = cardNumberFormatted.substring(0, 19);
  let cardNumberSection = cardNumberFormatted.match(/\w{1,4}/g);

  if (cardNumberSection !== null) {
    cardNumberFormatted = cardNumberSection.join(' ');
  }

  // Seperates into 4 sections
  if (cardNumberInput !== cardNumberFormatted) {
    cardNumInput.value = cardNumberFormatted;
  }

  UIcardNum.innerHTML = cardNumInput.value;
  if (cardNumInput.value === '') {
    UIcardNum.innerText = '0000 0000 0000 0000';
  }
}

function displayCVC() {
  let cardCVCFormat = cardCVCInput.value;

  cardCVCFormat = cardCVCFormat.substring(0, 3);
  cardCVCInput.value = cardCVCFormat;

  cardCVCInput.value === ''
    ? (UIcardCVC.innerText = '000')
    : (UIcardCVC.innerHTML = cardCVCInput.value);
}

function displayYear() {
  let cardYrFormat = cardYrInput.value;

  cardYrFormat = cardYrFormat.substring(0, 2);
  cardYrInput.value = cardYrFormat;

  cardYrInput.value === ''
    ? (UIcardYr.innerText = '00')
    : (UIcardYr.innerHTML = cardYrInput.value);
}

function displayMonth() {
  let cardMMFormat = cardMthInput.value;

  cardMMFormat = cardMMFormat.substring(0, 2);
  cardMthInput.value = cardMMFormat;

  cardMthInput.value === ''
    ? (UIcardMth.innerText = '00')
    : (UIcardMth.innerHTML = cardMthInput.value);
}

// Check if input is blank
function validateInputs() {
  const cardName_Val = cardNameInput.value;
  const cardNumber_Val = cardNumInput.value;
  const cardMonth_Val = cardMthInput.value;
  const cardYear_Val = cardYrInput.value;
  const cardCVC_Val = cardCVCInput.value;
  const regEx = /^[0-9]+$/;

  // Creates error message
  let htmlFormat = `
  <p class="error--txt">Wrong format, numbers only</p>
  `;
  let htmlBlank = `
  <p class="error--txt">Can't be blank</p>
  `;

  function validateName() {
    const nameInputBox = document.querySelector('#form-name-input');
    if (cardName_Val === '') {
      document
        .querySelector('.form-name__container')
        .insertAdjacentHTML('beforeend', htmlBlank);

      nameInputBox.classList.add('error');

      setTimeout(() => {
        document.querySelector('.error--txt').remove();
        nameInputBox.classList.remove('error');
      }, 3000);
    }
  }

  function validateNumber() {
    const numberInputBox = document.querySelector('#form-cardNum-input');
    if (!regEx.test(cardNumber_Val)) {
      document
        .querySelector('.cardnumber')
        .insertAdjacentHTML(
          'beforeend',
          cardNumber_Val === '' ? htmlBlank : htmlFormat
        );
      numberInputBox.classList.add('error');

      setTimeout(() => {
        document.querySelector('.error--txt').remove();
        numberInputBox.classList.remove('error');
      }, 3000);
      return;
    } else {
      return true;
    }
  }

  function validateExpire() {
    const monthInputBox = document.querySelector('#form-cardExp-month');
    const yearInputBox = document.querySelector('#form-cardExp-year');

    if (!regEx.test(cardMonth_Val)) {
      document
        .querySelector('.cardexp')
        .insertAdjacentHTML(
          'beforeend',
          cardMonth_Val === '' ? htmlBlank : htmlFormat
        );
      monthInputBox.classList.add('error');

      setTimeout(() => {
        document.querySelector('.error--txt').remove();
        monthInputBox.classList.remove('error');
      }, 3000);
    } else {
      return true;
    }

    if (!regEx.test(cardYear_Val) || cardYear_Val === '') {
      yearInputBox.classList.add('error');

      setTimeout(() => {
        yearInputBox.classList.remove('error');
      }, 3000);
      return;
    } else {
      return true;
    }
  }

  function validateCVC() {
    const cvcInputBox = document.querySelector('#form-cardCVC-input');
    if (!regEx.test(cardCVC_Val)) {
      document
        .querySelector('.cardcvc')
        .insertAdjacentHTML(
          'beforeend',
          cardCVC_Val === '' ? htmlBlank : htmlFormat
        );
      cvcInputBox.classList.add('error');

      setTimeout(() => {
        document.querySelector('.error--txt').remove();
        cvcInputBox.classList.remove('error');
      }, 3000);
      return;
    } else {
      return true;
    }
  }

  validateName();
  validateNumber();
  validateExpire();
  validateCVC();

  if (
    cardNumInput.value.length > 0 &&
    cardNumInput.value.length < 19 &&
    UIcardNum.innerText === cardNumInput.ariaPlaceholder &&
    UIcardName.innerText === cardNameInput.ariaPlaceholder &&
    UIcardMth.innerText === '00' &&
    UIcardYr.innerText === '00' &&
    UIcardCVC.innerText === '000' &&
    validateName() !== true &&
    validateNumber() !== true &&
    validateExpire() !== true &&
    validateCVC() !== true
  ) {
    return false;
  } else {
    return true;
  }
}

function resetForm() {
  UIcardName.innerHTML = 'Jane Appleseed';
  UIcardNum.innerHTML = '0000 0000 0000 0000';
  UIcardMth.innerHTML = '00';
  UIcardYr.innerHTML = '00';
  UIcardCVC.innerHTML = '000';
  cardNameInput.value = '';
  cardNumInput.value = '';
  cardMthInput.value = '';
  cardYrInput.value = '';
  cardCVCInput.value = '';
}

// Listeners
cardNameInput.addEventListener('keyup', function () {
  displayName();
});

cardNumInput.addEventListener('keyup', function () {
  displayNumber();
});

cardCVCInput.addEventListener('keyup', function () {
  displayCVC();
});

cardYrInput.addEventListener('keyup', function () {
  displayYear();
});

cardMthInput.addEventListener('keyup', function () {
  displayMonth();
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (validateInputs() === false) {
    e.preventDefault();
    return;
  }
  if (validateInputs() === true) {
    e.preventDefault();
    form.classList.add('hidden');
    thankYou.classList.remove('hidden');
  }
});

// Display form and hide thank you/ Clear all input values
confirmBtn.addEventListener('click', e => {
  e.preventDefault();
  resetForm();
  thankYou.classList.add('hidden');
  form.classList.remove('hidden');
});
