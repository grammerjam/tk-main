// validating fields
function check() {
    let valid = true, error = '', field = '';
    field = document.getElementById('name');
    error = document.getElementById('c-name');
    if (!field.checkValidity()) {
      valid = false;
      field.classList.add('err');
      error.innerHTML = "Name may only contain letters A-Z"
    } else {
      field.classList.remove("err");
      error.innerHTML = ''
    }

    field = document.getElementById("number");
    error = document.getElementById("c-number");
    if (!field.checkValidity()) {
      valid = false;
      field.classList.add("err");
      error.innerHTML = "Please enter 16-digit card number";
    } else {
      field.classList.remove("err");
      error.innerHTML = "";
    }

    field = document.getElementById("exp-m");
    error = document.getElementById("c-month");
    if (!field.checkValidity()) {
      valid = false;
      field.classList.add("err");
      error.innerHTML = "Cannot be empty. Enter 2-digit exp. month";
    } else {
      field.classList.remove("err");
      error.innerHTML = "";
    }

    field = document.getElementById("exp-y");
    error = document.getElementById("c-year");
    if (!field.checkValidity()) {
      valid = false;
      field.classList.add("err");
      error.innerHTML = "Cannot be empty. Enter 2-digit exp. year";
    } else {
      field.classList.remove("err");
      error.innerHTML = "";
    }

    let month = document.getElementById("exp-m");
    let year = document.getElementById("exp-y");
    let expDate = new Date();
    let today = new Date();
    expDate.setFullYear(year, month)
    console.log(expDate)
    console.log(today)
    if (expDate < today) {
      valid = false;
      field.classList.add("err");
      error.innerHTML = "Card expired.";
    } else {
      field.classList.remove("err");
      error.innerHTML = "";
    }

    field = document.getElementById("cvc");
    error = document.getElementById("c-cvc");
    if (!field.checkValidity()) {
      valid = false;
      field.classList.add("err");
      error.innerHTML = "Cannot be empty. Enter 3-digit CVC";
    } else {
      field.classList.remove("err");
      error.innerHTML = "";
    }
    return valid;
}

function onSuccess() {
    let result = check();
    let form = document.getElementById("form-container")
    let success = document.getElementById("success-container")
    if (result === true) {
      form.className = "no-form-container";
      success.className = "success-container"
    };
    event.preventDefault();
    return form
  }
