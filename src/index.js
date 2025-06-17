import "./styles.css";

const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const postalCodeInput = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code-error");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");
const passwordConfirmationInput = document.querySelector(
  "#password-confirmation",
);
const passwordConfirmationError = document.querySelector(
  "#password-confirmation-error",
);

// E-Mail Checking
const isValidEmailLength = () => {
  const validity = emailInput.value.length !== 0;
  return validity;
};

const isValidEmailPattern = () => {
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const validity = emailRegEx.test(emailInput.value);
  return validity;
};

const isValidEmail = () => {
  const emailLength = isValidEmailLength();
  const emailPattern = isValidEmailPattern();
  const validity = emailLength && emailPattern;

  return validity;
};

const setEmailClass = (isValid) => {
  emailInput.className = isValid ? "valid" : "invalid";
};

const setEmailError = (isValid) => {
  const emailLength = isValidEmailLength();
  const emailPattern = isValidEmailPattern();

  if (isValid) {
    emailError.textContent = "";
    emailError.removeAttribute("class");
    return;
  } else if (!emailLength) {
    emailError.textContent = "Please enter an e-mail.";
    emailError.setAttribute("class", "active");
  } else if (!emailPattern) {
    emailError.textContent = "E-Mail is invalid.";
    emailError.setAttribute("class", "active");
  }
};

// Postal Code Checking
const isValidPostalCodeLength = () => {
  const validity = postalCodeInput.value.length !== 0;
  return validity;
};

const postalCodeConstraints = {
  "United States": [
    /^\d{5}(?:[-\s]\d{4})?$/g,
    "United States Must Be NNNNN or NNNNN-NNNN",
  ],
  Canada: [
    /[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]/g,
    "Canada Must Be ANA NAN (A = Letter, N = Number)",
  ],
  Japan: [/[0-9]{3}-[0-9]{4}/g, "Japan Must Be NNN-NNNN"],
  China: [/[0-9]{6}/g, "China Must Be NNNNNN"],
};

const isValidPostalCodePattern = () => {
  const countryInput = document.querySelector("#country").value;
  const postalCodeInput = document.querySelector("#postal-code").value;

  const validity = postalCodeConstraints[countryInput][0].test(
    postalCodeInput.toString(),
  );

  return validity;
};

const isValidPostalCode = () => {
  const postalCodeLength = isValidPostalCodeLength();
  const postalCodePattern = isValidPostalCodePattern();
  const validity = postalCodeLength && postalCodePattern;

  return validity;
};

const setPostalCodeClass = (isValid) => {
  postalCodeInput.className = isValid ? "valid" : "invalid";
};

const setPostalCodeError = (isValid) => {
  const postalCodeLength = isValidPostalCodeLength();
  const postalCodePattern = isValidPostalCodePattern();
  const countryInput = document.querySelector("#country").value;

  if (isValid) {
    postalCodeError.textContent = "";
    postalCodeError.removeAttribute("class");
    return;
  } else if (!postalCodeLength) {
    postalCodeError.textContent = "Please enter a postal code.";
    postalCodeError.setAttribute("class", "active");
  } else if (!postalCodePattern) {
    postalCodeError.textContent = postalCodeConstraints[countryInput][1];
    postalCodeError.setAttribute("class", "active");
  }
};

// Password Checking
const isValidPasswordLength = () => {
  const validity = passwordInput.value.length !== 0;
  return validity;
};

const isValidPasswordStrength = () => {
  const passwordInput = document.querySelector("#password").value;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const validity = passwordRegEx.test(passwordInput);
  return validity;
};

const isValidPassword = () => {
  const passwordLength = isValidPasswordLength();
  const passwordStrength = isValidPasswordStrength();

  const validity = passwordLength && passwordStrength;
  return validity;
};

const setPasswordClass = (isValid) => {
  passwordInput.className = isValid ? "valid" : "invalid";
};

const setPasswordError = (isValid) => {
  const passwordLength = isValidPasswordLength();
  const passwordStrength = isValidPasswordStrength();

  if (isValid) {
    passwordError.textContent = "";
    passwordError.removeAttribute("class");
  } else if (!passwordLength) {
    passwordError.textContent = "Please enter a password.";
    passwordError.setAttribute("class", "active");
  } else if (!passwordStrength) {
    passwordError.textContent =
      "Please enter a stronger password. (8+ Characters, 1 Uppercase, 1 Lowercase, 1 Digit, 1 Special Character)";
    passwordError.setAttribute("class", "active");
  }
};

// Password Confirmation Checking
const isValidPasswordConfirmationLength = () => {
  const validity = passwordConfirmationInput.value.length !== 0;
  return validity;
};

const isValidPasswordConfirmationMatch = () => {
  const passwordValue = document.querySelector("#password").value;
  const passwordConfirmationValue = document.querySelector(
    "#password-confirmation",
  ).value;

  const validity = passwordValue === passwordConfirmationValue;
  return validity;
};

const isValidPasswordConfirmation = () => {
  const passwordConfirmationLength = isValidPasswordConfirmationLength();
  const passwordConfirmationMatch = isValidPasswordConfirmationMatch();

  const validity = passwordConfirmationLength && passwordConfirmationMatch;
  return validity;
};

const setPasswordConfirmationClass = (isValid) => {
  passwordConfirmationInput.className = isValid ? "valid" : "invalid";
};

const setPasswordConfirmationError = (isValid) => {
  const passwordConfirmationLength = isValidPasswordConfirmationLength();
  const passwordConfirmationMatch = isValidPasswordConfirmationMatch();

  if (isValid) {
    passwordConfirmationError.textContent = "";
    passwordConfirmationError.removeAttribute("class");
  } else if (!passwordConfirmationLength) {
    passwordConfirmationError.textContent =
      "Please enter password confirmation.";
    passwordConfirmationError.setAttribute("class", "active");
  } else if (!passwordConfirmationMatch) {
    passwordConfirmationError.textContent =
      "Password confirmation does not match password.";
    passwordConfirmationError.setAttribute("class", "active");
  }
};

// Initialization to set the class of inputs on page load.
const initializeEmail = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
};

const initializePostalCode = () => {
  const postalCodeInput = isValidPostalCode();
  setPostalCodeClass(postalCodeInput);
};

const initializePassword = () => {
  const passwordInput = isValidPassword();
  setPasswordClass(passwordInput);
};

const initializePasswordConfirmation = () => {
  const passwordConfirmationInput = isValidPasswordConfirmation();
  setPasswordConfirmationClass(passwordConfirmationInput);
};

// Handles actions whenever the value of inputs changes.
const handleEmailInput = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
  setEmailError(emailInput);
};

const handlePostalCodeInput = () => {
  const postalCodeInput = isValidPostalCode();
  setPostalCodeClass(postalCodeInput);
  setPostalCodeError(postalCodeInput);
};

const handlePasswordInput = () => {
  const passwordInput = isValidPassword();
  setPasswordClass(passwordInput);
  setPasswordError(passwordInput);
};

const handlePasswordConfirmationInput = () => {
  const passwordConfirmationInput = isValidPasswordConfirmation();
  setPasswordConfirmationClass(passwordConfirmationInput);
  setPasswordConfirmationError(passwordConfirmationInput);
};

// Checks that run once the user clicks the submit button.
const handleSubmit = (event) => {
  event.preventDefault();

  const emailInput = isValidEmail();
  const postalCodeInput = isValidPostalCode();
  const passwordInput = isValidPassword();
  const passwordConfirmationInput = isValidPasswordConfirmation();
  setEmailClass(emailInput);
  setEmailError(emailInput);
  setPostalCodeClass(postalCodeInput);
  setPostalCodeError(postalCodeInput);
  setPasswordClass(passwordInput);
  setPasswordError(passwordInput);
  setPasswordConfirmationClass(passwordConfirmationInput);
  setPasswordConfirmationError(passwordConfirmationInput);

  if (
    emailInput &&
    postalCodeInput &&
    passwordInput &&
    passwordConfirmationInput
  ) {
    alert(`Form "Submitted"`);
  }
};

// The code that runs the first time the page loads/refreshes.
window.addEventListener("load", () => {
  initializeEmail();
  initializePostalCode();
  initializePassword();
  initializePasswordConfirmation();
});
emailInput.addEventListener("blur", handleEmailInput);
postalCodeInput.addEventListener("blur", handlePostalCodeInput);
passwordInput.addEventListener("blur", handlePasswordInput);
passwordConfirmationInput.addEventListener(
  "blur",
  handlePasswordConfirmationInput,
);
form.addEventListener("submit", handleSubmit);
