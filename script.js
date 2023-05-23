const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
let flag_username = false;
let flag_password = false;
let flag_email = false;
let flag_confirm_password = false;
//---Show input Error message---//

function showError(input, message) {
  input.parentNode.className = "form-control error";
  input.parentNode.querySelector("small").innerText = message;
}
function showSuccess(input) {
  input.parentElement.className = "form-control success";
}
function checkEmail(email) {
  let valid = String(email.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!valid) {
    showError(email, "Invalid Email");
    return false;
  } else {
    showSuccess(email);
    return true;
  }
}
//--check required feilds//
function checkRequired(input) {
  console.log("fro checkRequired..", input);
  if (input.value.trim() === "") {
    showError(input, `${input.name} is required`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}
function checkLength(input, min, max) {
  if (input.value.length == 0) {
    return false;
  }
  if (input.value.length < min) {
    showError(input, `${input.name} must be atleast ${min} characters`);
    return false;
  }
  if (input.value.length > max) {
    showError(input, `${input.name} cannot be more than ${max} charcters`);
    return false;
  } else {
    return true;
  }
}

function matchPassword(input1, input2) {
  if (input1.value == "") {
    return false;
  }
  if (input1.value !== input2.value) {
    showError(password2, "Passwords do not match");
    return false;
  } else {
    showSuccess(password2);
    return true;
  }
}
//---listeners----//
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("!--submit");
  console.log(flag_username, flag_email, flag_password, flag_confirm_password);
  //   handleTestButton();
  if (flag_username && flag_email && flag_password && flag_confirm_password) {
    handleTestButton();
  } else {
    alert("Please enter valid inputs:
          Username: 5-16 characters
          Password: 6-16 characters");
  }
});
function usernameValidator() {
  const a = checkRequired(username);
  const b = checkLength(username, 5, 15);
  console.log(a, b);
  if (checkRequired(username) & checkLength(username, 5, 15)) {
    console.log("chekrequiredtriggered and success");
    flag_username = true;
  }
}
function emailValidator() {
  if (checkRequired(email) && checkEmail(email)) {
    flag_email = true;
  }
}
function passwordValidator() {
  const a = checkRequired(password);
  const b = checkLength(password, 6, 15);
  if (a && b) {
    flag_password = true;
  }
}
function confirmPasswordValidator() {
  if (matchPassword(password, password2)) {
    flag_confirm_password = true;
  }
}

const formContainer = document.getElementById("form-container");
const searchPage = document.getElementById("search-page");

function handleTestButton() {
  formContainer.classList.add("logged-in");
  setTimeout(() => {
    searchPage.classList.add("visible");
  }, 800);
  console.log(searchPage);
}
