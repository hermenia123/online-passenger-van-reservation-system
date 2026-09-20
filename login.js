const form = document.getElementById("loginForm");
const role = document.getElementById("role");
const identity = document.getElementById("identity");
const password = document.getElementById("password");
const identityError = document.getElementById("identityError");
const passwordError = document.getElementById("passwordError");
const togglePassword = document.getElementById("togglePassword");
const forgotPassword = document.getElementById("forgotPassword");
const supportButton = document.getElementById("supportButton");
const formMessage = document.getElementById("formMessage");
const loginButton = document.getElementById("loginButton");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalAction = document.getElementById("modalAction");
const modalText = document.getElementById("modalText");

function setFieldError(input, errorElement, message) {
    input.closest(".input-shell").classList.add("invalid");
    errorElement.textContent = message;
    errorElement.classList.add("visible");
}

function clearFieldError(input, errorElement) {
    input.closest(".input-shell").classList.remove("invalid");
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `message-box show ${type}`;
}

function clearMessage() {
    formMessage.textContent = "";
    formMessage.className = "message-box";
}

function validateForm() {
    let valid = true;
    clearMessage();

    if (!identity.value.trim()) {
        setFieldError(identity, identityError, "Enter your email or username.");
        valid = false;
    } else {
        clearFieldError(identity, identityError);
    }

    if (!password.value) {
        setFieldError(password, passwordError, "Enter your password.");
        valid = false;
    } else if (password.value.length < 6) {
        setFieldError(password, passwordError, "Password must contain at least 6 characters.");
        valid = false;
    } else {
        clearFieldError(password, passwordError);
    }

    return valid;
}

function openModal(message) {
    modalText.textContent = message;
    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalAction.focus();
}

function closeModal() {
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

togglePassword.addEventListener("click", () => {
    const visible = password.type === "text";
    password.type = visible ? "password" : "text";
    togglePassword.textContent = visible ? "Show password" : "Hide password";
});

identity.addEventListener("input", () => {
    if (identity.value.trim()) {
        clearFieldError(identity, identityError);
    }
});

password.addEventListener("input", () => {
    if (password.value.length >= 6) {
        clearFieldError(password, passwordError);
    }
});

forgotPassword.addEventListener("click", () => {
    openModal("Password recovery is not connected to a backend in this front-end-only login. Connect this action to the system's recovery process when authentication is implemented.");
});

supportButton.addEventListener("click", () => {
    openModal("For account access concerns, contact the system administrator or dispatcher assigned to your account.");
});

modalClose.addEventListener("click", closeModal);
modalAction.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalBackdrop.classList.contains("open")) {
        closeModal();
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
        showMessage("Please correct the highlighted fields before continuing.", "error");
        return;
    }

    loginButton.classList.add("loading");

    window.setTimeout(() => {
        loginButton.classList.remove("loading");
        const roleName = role.options[role.selectedIndex].text;
        showMessage(`Front-end validation passed for ${roleName}. Connect this form to your authentication backend for real account verification.`, "success");
    }, 520);
});
