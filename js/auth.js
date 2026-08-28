/* =========================================================
   SUPORLY AUTH
========================================================= */


/* =========================================================
   THEME
========================================================= */

const themeButtons =
  document.querySelectorAll(".theme-btn");


function setTheme(theme) {

  document.body.dataset.theme = theme;

  themeButtons.forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.theme === theme
    );

  });

  localStorage.setItem(
    "suporly-theme",
    theme
  );
}


const savedTheme =
  localStorage.getItem("suporly-theme") || "light";

setTheme(savedTheme);


themeButtons.forEach(button => {

  button.addEventListener("click", () => {

    setTheme(button.dataset.theme);

  });

});


/* =========================================================
   GENERIC MESSAGE
========================================================= */

function showMessage(message, type) {

  const messageElement =
    document.getElementById("authMessage");

  if (!messageElement) return;

  messageElement.textContent = message;

  messageElement.className =
    message
      ? `auth-message visible ${type}`
      : "auth-message";

}


function showElementMessage(element, message, type) {

  if (!element) return;

  element.textContent = message;

  element.className =
    message
      ? `auth-message visible ${type}`
      : "auth-message";

}


/* =========================================================
   =========================================================
   LOGIN
   =========================================================
========================================================= */

const loginForm =
  document.getElementById("loginForm");

const loginStep =
  document.getElementById("loginStep");

const verificationStep =
  document.getElementById("verificationStep");

const verificationEmail =
  document.getElementById("verificationEmail");

const verificationMessage =
  document.getElementById("verificationMessage");

const loginCodeInputs =
  document.querySelectorAll(
    "#verificationStep .code-input"
  );

let currentLoginEmail = "";


/* =========================================================
   SHOW LOGIN VERIFICATION
========================================================= */

function showLoginVerification(email) {

  currentLoginEmail = email;

  if (verificationEmail) {
    verificationEmail.textContent = email;
  }

  loginStep?.classList.add("hidden");

  verificationStep?.classList.remove("hidden");

  loginCodeInputs.forEach(input => {
    input.value = "";
  });

  setTimeout(() => {
    loginCodeInputs[0]?.focus();
  }, 50);

}


/* =========================================================
   LOGIN CODE INPUT
========================================================= */

loginCodeInputs.forEach((input, index) => {

  input.addEventListener("input", event => {

    const value =
      event.target.value
        .replace(/\D/g, "");

    event.target.value =
      value.slice(-1);


    if (
      value &&
      index < loginCodeInputs.length - 1
    ) {

      loginCodeInputs[index + 1].focus();

    }

  });


  input.addEventListener("keydown", event => {

    if (
      event.key === "Backspace" &&
      !input.value &&
      index > 0
    ) {

      loginCodeInputs[index - 1].focus();

    }

  });


  input.addEventListener("paste", event => {

    event.preventDefault();

    const pasted =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);


    pasted
      .split("")
      .forEach((digit, i) => {

        if (loginCodeInputs[i]) {
          loginCodeInputs[i].value = digit;
        }

      });


    if (pasted.length) {

      const nextIndex =
        Math.min(
          pasted.length,
          loginCodeInputs.length - 1
        );

      loginCodeInputs[nextIndex].focus();

    }

  });

});


/* =========================================================
   LOGIN SUBMIT
========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document
          .getElementById("email")
          .value
          .trim();

      const password =
        document
          .getElementById("password")
          .value;

      const remember =
        document
          .getElementById("remember")
          .checked;


      if (!email || !password) {

        showMessage(
          "Please enter your email and password.",
          "error"
        );

        return;

      }


      const submitButton =
        loginForm.querySelector(".auth-submit");


      submitButton.disabled = true;

      submitButton.textContent =
        "Signing in...";


      /*
       * ====================================================
       * PYTHON BACKEND
       * ====================================================
       *
       * const response = await fetch(
       *   "http://localhost:8000/api/login",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json"
       *     },
       *     body: JSON.stringify({
       *       email,
       *       password,
       *       remember
       *     })
       *   }
       * );
       *
       * const data = await response.json();
       *
       * if (data.requires_verification) {
       *   showLoginVerification(email);
       *   return;
       * }
       *
       * if (data.success) {
       *   window.location.href = "index.html";
       * }
       */


      /* TEMPORARY DEMO */

      await new Promise(
        resolve => setTimeout(resolve, 700)
      );


      submitButton.disabled = false;

      submitButton.textContent =
        "Sign in";


      showLoginVerification(email);

    }
  );

}


/* =========================================================
   VERIFY LOGIN CODE
========================================================= */

const verifyCode =
  document.getElementById("verifyCode");


if (verifyCode) {

  verifyCode.addEventListener(
    "click",
    async () => {

      const code =
        Array.from(loginCodeInputs)
          .map(input => input.value)
          .join("");


      if (code.length !== 6) {

        showElementMessage(
          verificationMessage,
          "Please enter the 6-digit code.",
          "error"
        );

        return;

      }


      verifyCode.disabled = true;

      verifyCode.textContent =
        "Verifying...";


      /*
       * PYTHON BACKEND
       *
       * const response = await fetch(
       *   "http://localhost:8000/api/verify-login",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json"
       *     },
       *     body: JSON.stringify({
       *       email: currentLoginEmail,
       *       code
       *     })
       *   }
       * );
       *
       * const data = await response.json();
       *
       * if (data.success) {
       *   window.location.href = "index.html";
       * }
       */


      /* TEMPORARY DEMO */

      await new Promise(
        resolve => setTimeout(resolve, 700)
      );


      showElementMessage(
        verificationMessage,
        "Frontend demo: verification code accepted.",
        "success"
      );


      verifyCode.disabled = false;

      verifyCode.textContent =
        "Verify code";

    }
  );

}


/* =========================================================
   RENEW LOGIN CODE
========================================================= */

const renewLoginCode =
  document.getElementById("renewCode");


if (renewLoginCode) {

  renewLoginCode.addEventListener(
    "click",
    async () => {

      if (!currentLoginEmail) return;


      renewLoginCode.disabled = true;

      renewLoginCode.textContent =
        "Sending...";


      /*
       * PYTHON BACKEND
       *
       * await fetch(
       *   "http://localhost:8000/api/renew-login-code",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json"
       *     },
       *     body: JSON.stringify({
       *       email: currentLoginEmail
       *     })
       *   }
       * );
       */


      /* TEMPORARY DEMO */

      await new Promise(
        resolve => setTimeout(resolve, 700)
      );


      showElementMessage(
        verificationMessage,
        `A new confirmation code was sent to ${currentLoginEmail}.`,
        "success"
      );


      renewLoginCode.disabled = false;

      renewLoginCode.innerHTML =
        "Didn't receive the code? <strong>Renew code</strong>";

    }
  );

}


/* =========================================================
   BACK TO LOGIN
========================================================= */

const backToLogin =
  document.getElementById("backToLogin");


if (backToLogin) {

  backToLogin.addEventListener(
    "click",
    () => {

        verificationStep?.classList.add("hidden");

        loginStep?.classList.remove("hidden");

        loginCodeInputs.forEach(input => {
            input.value = "";
        });

        showMessage("", "");
        

        document
        .getElementById("password")
        ?.focus();

    }
  );

}


/* =========================================================
   =========================================================
   SIGN UP
   =========================================================
========================================================= */

const signupForm =
  document.getElementById("signupForm");

const signupStep =
  document.getElementById("signupStep");

const activationStep =
  document.getElementById("activationStep");

const activationEmail =
  document.getElementById("activationEmail");

const signupMessage =
    document.getElementById("signupMessage");

const activationMessage =
    document.getElementById("activationMessage");

let currentSignupEmail = "";


/* =========================================================
   SHOW ACTIVATION
========================================================= */

function showActivation(email) {

  currentSignupEmail = email;

  if (activationEmail) {
    activationEmail.textContent = email;
  }

  signupStep?.classList.add("hidden");

  activationStep?.removeAttribute("hidden");

  activationStep?.classList.remove("hidden");

  document
    .querySelectorAll(
      "#activationStep .code-input"
    )
    .forEach(input => {

      input.value = "";

    });

  setTimeout(() => {

    document
      .querySelector(
        "#activationStep .code-input"
      )
      ?.focus();

  }, 50);

}


/* =========================================================
   SIGNUP
========================================================= */

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const username =
        document
          .getElementById("username")
          .value
          .trim();

      const email =
        document
          .getElementById("signupEmail")
          .value
          .trim();

      const password =
        document
          .getElementById("signupPassword")
          .value;

      const confirmPassword =
        document
          .getElementById("confirmPassword")
          .value;

      const terms =
        document
          .getElementById("terms")
          .checked;


      /* ================================================
         VALIDATION
      ================================================= */

      if (
        username.length < 3 ||
        username.length > 30
      ) {

        showElementMessage(
          signupMessage,
          "Username must contain 3–30 characters.",
          "error"
        );

        return;

      }


      if (password.length < 8) {

        showElementMessage(
          signupMessage,
          "Password must contain at least 8 characters.",
          "error"
        );

        return;

      }


      if (password !== confirmPassword) {

        showElementMessage(
          signupMessage,
          "Passwords do not match.",
          "error"
        );

        return;

      }


      if (!terms) {

        showElementMessage(
          signupMessage,
          "You must agree to the Suporly guidelines.",
          "error"
        );

        return;

      }


      /* ================================================
         SUBMIT
      ================================================= */

      const submitButton =
        document.getElementById("signupSubmit");


      submitButton.disabled = true;

      submitButton.textContent =
        "Creating account...";


      /*
       * ====================================================
       * PYTHON BACKEND
       * ====================================================
       *
       * const response = await fetch(
       *   "http://localhost:8000/api/register",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json"
       *     },
       *     body: JSON.stringify({
       *       username,
       *       email,
       *       password
       *     })
       *   }
       * );
       *
       * const data = await response.json();
       *
       * if (!response.ok) {
       *
       *   showElementMessage(
       *     signupMessage,
       *     data.message || "Unable to create account.",
       *     "error"
       *   );
       *
       *   return;
       * }
       *
       * showActivation(email);
       */


      /* TEMPORARY DEMO */

      await new Promise(
        resolve => setTimeout(resolve, 700)
      );


      submitButton.disabled = false;

      submitButton.textContent =
        "Create account";


      showActivation(email);

    }
  );

}


/* =========================================================
   ACTIVATION CODE INPUT
========================================================= */

const activationInputs =
  document.querySelectorAll(
    "#activationStep .code-input"
  );


activationInputs.forEach((input, index) => {

  input.addEventListener(
    "input",
    event => {

      const value =
        event.target.value
          .replace(/\D/g, "");

      event.target.value =
        value.slice(-1);


      if (
        value &&
        index < activationInputs.length - 1
      ) {

        activationInputs[index + 1].focus();

      }

    }
  );


  input.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Backspace" &&
        !input.value &&
        index > 0
      ) {

        activationInputs[index - 1].focus();

      }

    }
  );


  input.addEventListener(
    "paste",
    event => {

      event.preventDefault();

      const pasted =
        event.clipboardData
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, 6);


      pasted
        .split("")
        .forEach((digit, i) => {

          if (activationInputs[i]) {
            activationInputs[i].value = digit;
          }

        });


      if (pasted.length) {

        const nextIndex =
          Math.min(
            pasted.length,
            activationInputs.length - 1
          );

        activationInputs[nextIndex].focus();

      }

    }
  );

});


/* =========================================================
   ACTIVATE ACCOUNT
========================================================= */

const activateAccount =
  document.getElementById("activateAccount");


if (activateAccount) {

  activateAccount.addEventListener(
    "click",
    async () => {

      const code =
        Array.from(activationInputs)
          .map(input => input.value)
          .join("");


      if (code.length !== 6) {

        showElementMessage(
          activationMessage,
          "Please enter the 6-digit activation code.",
          "error"
        );

        return;

      }


      activateAccount.disabled = true;

      activateAccount.textContent =
        "Activating...";


      /*
       * ====================================================
       * PYTHON BACKEND
       * ====================================================
       *
       * const response = await fetch(
       *   "http://localhost:8000/api/activate",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json"
       *     },
       *     body: JSON.stringify({
       *       email: currentSignupEmail,
       *       code
       *     })
       *   }
       * );
       *
       * const data = await response.json();
       *
       * if (data.success) {
       *
       *   window.location.href =
       *     "login.html";
       *
       * }
       */


      /* TEMPORARY DEMO */

      await new Promise(
        resolve => setTimeout(resolve, 700)
      );


      showElementMessage(
        activationMessage,
        "Frontend demo: account activated successfully.",
        "success"
      );


      activateAccount.disabled = false;

      activateAccount.textContent =
        "Activate account";

    }
  );

}


/* =========================================================
   RENEW ACTIVATION CODE
========================================================= */

const renewSignupCode =
  document.getElementById("renewCode");


if (
  renewSignupCode &&
  activationStep
) {

  renewSignupCode.addEventListener(
    "click",
    async () => {

      if (!currentSignupEmail) return;


      renewSignupCode.disabled = true;

      renewSignupCode.innerHTML =
        "Sending...";


      /*
       * ====================================================
       * PYTHON BACKEND
       * ====================================================
       *
       * await fetch(
       *   "http://localhost:8000/api/renew-activation-code",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json"
       *     },
       *     body: JSON.stringify({
       *       email: currentSignupEmail
       *     })
       *   }
       * );
       */


      /* TEMPORARY DEMO */

      await new Promise(
        resolve => setTimeout(resolve, 700)
      );


      showElementMessage(
        activationMessage,
        `A new activation code was sent to ${currentSignupEmail}.`,
        "success"
      );


      renewSignupCode.disabled = false;

      renewSignupCode.innerHTML =
        "Didn't receive the code? <strong>Renew code</strong>";

    }
  );

}


/* =========================================================
   CHANGE EMAIL
========================================================= */

const changeEmail =
  document.getElementById("changeEmail");


if (changeEmail) {

  changeEmail.addEventListener(
    "click",
    () => {

      activationStep?.classList.add("hidden");

      activationStep?.setAttribute(
        "hidden",
        ""
      );

      signupStep?.classList.remove("hidden");

      document
        .getElementById("signupEmail")
        ?.focus();

    }
  );

}