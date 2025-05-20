import "./styles.css";

const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const emailRegeX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const isValidEmail = () => {
  const validity =
    emailInput.value.length !== 0 && emailRegeX.test(emailInput.value);

  return validity;
};

const setEmailClass = (isValid) => {
  emailInput.className = isValid ? "valid" : "invalid";
};

const setEmailError = (isValid) => {
  if (isValid) {
    emailError.textContent = "";
    emailError.removeAttribute("class");
  } else {
    emailError.textContent = "E-Mail is invalid.";
    emailError.setAttribute("class", "active");
  }
};

const initializeEmail = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
};

const handleEmailInput = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
  setEmailError(emailInput);
};

const handleSubmit = (event) => {
  event.preventDefault();

  const emailInput = isValidEmail();
  setEmailClass(emailInput);
  setEmailError(emailInput);
};

window.addEventListener("load", initializeEmail);
emailInput.addEventListener("blur", handleEmailInput);
form.addEventListener("submit", handleSubmit);
