// We're selecting key HTML elements using document.querySelector()
const form = document.querySelector("#rsvpForm");
const input = document.querySelector("input[type='email']");
const button = document.querySelector(".rsvpForm__button");
const statusMessage = document.querySelector(".status-message");
const statusIcon = document.querySelector(".rsvpForm__status-icon");

// Safety check
if (form && input && button && statusMessage && statusIcon) {
  // Define helper functions
  function setError(message) {
    // Adds a CSS class .invalid to the input for styling
    input.classList.add("invalid");
    // This sets the error messages
    statusMessage.textContent = message;
    // This makes the message visible
    statusMessage.style.display = "block";
    // This sets the text color
    statusMessage.style.color = "#f96464";
    // This will change the input border to red
    input.style.borderColor = "#f96464";
    // This will disable the submit button until the input is valid
    button.disabled = true;
    // This inserts the error icon
    statusIcon.innerHTML = `
        <img
            src="./images/icon-error.svg"
            alt="icon-error"
            width="24"
            height="24"
        />

        <figcaption class="offscreen">icon-error</figcaption>
    `;
  }

  function setSuccess(message) {
    input.classList.add("valid");
    statusMessage.textContent = message;
    statusMessage.style.display = "block";
    statusMessage.style.color = "#008000";
    input.style.borderColor = "#008000";
    button.disabled = false;
    statusIcon.innerHTML = `
        <img
            src="./images/icon-success.svg"
            alt="icon-success"
            width="24"
            height="24"
        />

        <figcaption class="offscreen">icon-success</figcaption>
    `;
  }

  function resetFormUI() {
    statusMessage.style.display = "none";
    input.style.borderColor = "hsla(0, 36%, 70%, 0.5)";
    input.classList.remove("valid", "invalid");
    statusIcon.innerHTML = ``;
    button.disabled = true;
    input.value = "";
  }

  // Real time validation
  input.addEventListener("input", () => {
    // This gets the email and removes extra spaces
    const value = input.value.trim();
    // This checks if the input field is empty
    const isValueEmpty = value === "";
    // isValueValid uses an browser-built-in validation
    const isValueValid = input.validity.valid;

    if (isValueEmpty) {
      setError("Email address is required.");
    } else if (!isValueValid) {
      setError("Please enter a valid email address.");
    } else {
      setSuccess("Successful");
    }
  });

  form.addEventListener("submit", (e) => {
    // This will stop the page from reloading
    e.preventDefault();
    /* This will clear all the visual 
    feedback and it will reset the form */
    resetFormUI();
  });
}
