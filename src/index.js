import "./styles.css";

const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const postalCodeInput = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code-error");

//E-Mail Checking

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

  console.log(postalCodeConstraints[countryInput][0]);
  console.log(postalCodeInput);

  const validity = postalCodeConstraints[countryInput][0].test(
    postalCodeInput.toString(),
  );

  return validity;
};

const isValidPostalCode = () => {
  const postalCodeLength = isValidPostalCodeLength();
  const postalCodePattern = isValidPostalCodePattern();
  const validity = postalCodeLength && postalCodePattern;
  console.log(postalCodeLength);
  console.log(postalCodePattern);
  return validity;
};

const setPostalCodeClass = (isValid) => {
  postalCodeInput.className = isValid ? "valid" : "invalid";
};

const setPostalCodeError = (isValid) => {
  const postalCodeLength = isValidPostalCodeLength();
  const countryInput = document.querySelector("#country").value;

  if (isValid) {
    postalCodeError.textContent = "";
    postalCodeError.removeAttribute("class");
    return;
  } else if (!postalCodeLength) {
    postalCodeError.textContent = "Please enter a postal code.";
    postalCodeError.setAttribute("class", "active");
  } else {
    postalCodeError.textContent = postalCodeConstraints[countryInput][1];
    postalCodeError.setAttribute("class", "active");
  }
};

const initializeEmail = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
};

const initializePostalCode = () => {
  const postalCodeInput = isValidPostalCode();
  setPostalCodeClass(postalCodeInput);
};

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

// Checks once the user clicks the submit button
const handleSubmit = (event) => {
  event.preventDefault();

  const emailInput = isValidEmail();
  const postalCodeInput = isValidPostalCode();
  setEmailClass(emailInput);
  setEmailError(emailInput);
  setPostalCodeClass(postalCodeInput);
  setPostalCodeError(postalCodeInput);
};

window.addEventListener("load", () => {
  initializeEmail();
  initializePostalCode();
});
emailInput.addEventListener("blur", handleEmailInput);
postalCodeInput.addEventListener("blur", handlePostalCodeInput);
form.addEventListener("submit", handleSubmit);
