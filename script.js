'use strict';
const formInputs = document.querySelectorAll('.form__input');
const cardName = document.querySelector('.cardholder--i');
const UIcardName = document.querySelector('.card__holder');
const cardNum = document.querySelector('.cardnumber--i');
const UIcardNum = document.querySelector('.card__number');
const cardMth = document.querySelector('.cardexp--i');
const UIcardMth = document.querySelector('.MM');
const cardYr = document.querySelector('.cardexp--ii');
const UIcardYr = document.querySelector('.YY');
const cardCVC = document.querySelector('.card__cvc--i');
const UIcardCVC = document.querySelector('.card__cvc');
const submitBtn = document.querySelector('.btn-sub');
const confirmBtn = document.querySelector('#form--btn-continue');
const form = document.querySelector('#form');
const thankYou = document.querySelector('.form--submit');

// Name Input
function displayName() {
  UIcardName.innerText = cardName.value;
  if (UIcardName.innerText === '')
    UIcardName.innerText = cardName.ariaPlaceholder;
}

// Update card detials as user fills in form
function displayNumber() {
  let cardNumberInput = cardNum.value;
  let cardNumberFormatted = cardNumberInput;

  cardNumberFormatted = cardNumberFormatted.substring(0, 19);
  let cardNumberSection = cardNumberFormatted.match(/\w{1,4}/g);

  if (cardNumberSection !== null) {
    cardNumberFormatted = cardNumberSection.join(' ');
  }

  // Seperates into 4 sections
  if (cardNumberInput !== cardNumberFormatted) {
    cardNum.value = cardNumberFormatted;
  }

  UIcardNum.innerHTML = cardNum.value;
  if (cardNum.value === '') {
    UIcardNum.innerText = cardNum.ariaPlaceholder;
  }
}

function displayCVC() {
  let cardCVCFormat = cardCVC.value;

  cardCVCFormat = cardCVCFormat.substring(0, 3);
  cardCVC.value = cardCVCFormat;

  cardCVC.value === ''
    ? (UIcardCVC.innerText = '000')
    : (UIcardCVC.innerHTML = cardCVC.value);
}

function displayYear() {
  let cardYrFormat = cardYr.value;

  cardYrFormat = cardYrFormat.substring(0, 2);
  cardYr.value = cardYrFormat;

  cardYr.value === ''
    ? (UIcardYr.innerText = '00')
    : (UIcardYr.innerHTML = cardYr.value);
}

function displayMonth() {
  let cardMMFormat = cardMth.value;

  cardMMFormat = cardMMFormat.substring(0, 2);
  cardMth.value = cardMMFormat;

  cardMth.value === ''
    ? (UIcardMth.innerText = '00')
    : (UIcardMth.innerHTML = cardMth.value);
}

// Check if input is blank
function validateInputs() {
  const cardName_Val = cardName.value;
  const cardNumber_Val = cardNum.value;
  const cardMonth_Val = cardMth.value;
  const cardYear_Val = cardYr.value;
  const cardCVC_Val = cardCVC.value;
  const regEx = /^[0-9]+$/;

  let htmlFormat = `
  <p class="error--txt">Wrong format, numbers only</p>
  `;
  let htmlBlank = `
  <p class="error--txt">Can't be blank</p>
  `;

  function validateName() {
    const nameInputBox = document.querySelector('.cardholder--i');

    if (cardName_Val === '') {
      document
        .querySelector('.cardholder')
        .insertAdjacentHTML('beforeend', htmlBlank);

      nameInputBox.classList.add('error');

      setTimeout(() => {
        document.querySelector('.error--txt').remove();
        nameInputBox.classList.remove('error');
      }, 3000);
    }
  }

  function validateNumber() {
    const numberInputBox = document.querySelector('.cardnumber--i');

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
    }
  }

  function validateExpire() {
    const monthInputBox = document.querySelector('.cardexp--i');
    const yearInputBox = document.querySelector('.cardexp--ii');

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
    }

    if (!regEx.test(cardYear_Val) || cardYear_Val === '') {
      yearInputBox.classList.add('error');

      setTimeout(() => {
        yearInputBox.classList.remove('error');
      }, 3000);
    }
  }

  function validateCVC() {
    const cvcInputBox = document.querySelector('.card__cvc--i');

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
    }
  }

  validateName();
  validateNumber();
  validateExpire();
  validateCVC();

  if (
    (cardNum.value.length > 0 && cardNum.value.length < 19) ||
    UIcardNum.innerText === cardNum.ariaPlaceholder ||
    UIcardName.innerText === cardName.ariaPlaceholder ||
    UIcardMth.innerText === '00' ||
    UIcardYr.innerText === '00' ||
    UIcardCVC.innerText === '000'
  ) {
    return false;
  } else {
    return true;
  }
}

function clearForm() {
  UIcardName.innerHTML = cardName.ariaPlaceholder;
  UIcardNum.innerHTML = cardNum.ariaPlaceholder;
  UIcardMth.innerHTML = '00';
  UIcardYr.innerHTML = '00';
  UIcardCVC.innerHTML = '000';
  cardName.value = '';
  cardNum.value = '';
  cardMth.value = '';
  cardYr.value = '';
  cardCVC.value = '';
  document.querySelector('.error--txt').innerText = '';
}

// Listeners
cardName.addEventListener('keyup', function () {
  displayName();
});

cardNum.addEventListener('keyup', function () {
  displayNumber();
});

cardCVC.addEventListener('keyup', function () {
  displayCVC();
});

cardYr.addEventListener('keyup', function () {
  displayYear();
});

cardMth.addEventListener('keyup', function () {
  displayMonth();
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  validateInputs();
  if (validateInputs() === false) {
    e.preventDefault();
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
  clearForm();
  thankYou.classList.add('hidden');
  form.classList.remove('hidden');
});
