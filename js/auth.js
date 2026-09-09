
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
let currentLoginChallenge = "";


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

  showElementMessage(
    verificationMessage,
    "",
    ""
  );

  setTimeout(() => {

    loginCodeInputs[0]?.focus();

  }, 50);

}


/* =========================================================
   LOGIN CODE INPUT
========================================================= */

loginCodeInputs.forEach((input, index) => {

  input.addEventListener(
    "input",
    event => {

      const value =
        event.target.value
          .replace(/[^0-9]/g, "");

      event.target.value =
        value.slice(-1);


      if (
        value &&
        index < loginCodeInputs.length - 1
      ) {

        loginCodeInputs[index + 1].focus();

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

        loginCodeInputs[index - 1].focus();

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
          .replace(/[^0-9]/g, "")
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

    }
  );

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


      try {

        const response = await fetch(
          "https://suporly-backend.onrender.com/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password,
              session_id: localStorage.getItem("suporly-session")
            })
          }
        );


        const data =
          await response.json();


        /* =================================================
           ACCOUNT NOT VERIFIED
        ================================================= */

        if (
          data.success ===
          "NotVerified"
        ) {

          showMessage(
            "Please activate your account first.",
            "error"
          );

          return;

        }


        /* =================================================
           TWO-FACTOR AUTHENTICATION REQUIRED
        ================================================= */

        if (
          data.success &&
          typeof data.success === "object" &&
          data.success.status ===
            "TwoFactorRequired"
        ) {

          currentLoginChallenge =
            data.success.challenge;


          if (!currentLoginChallenge) {

            showMessage(
              "Unable to start two-factor authentication.",
              "error"
            );

            return;

          }


          showLoginVerification(
            email
          );

          return;

        }


        /* =================================================
           INVALID LOGIN
        ================================================= */

        if (!data.success) {

          showMessage(
            "Invalid email or password.",
            "error"
          );

          return;

        }


        /* =================================================
           LOGIN WITHOUT 2FA
        ================================================= */

        localStorage.setItem(
          "suporly-session",
          data.success
        );


        window.location.href =
          "home.html";


      } catch (error) {

        console.error(error);

        showMessage(
          "Unable to connect to the server.",
          "error"
        );

      } finally {

        submitButton.disabled = false;

        submitButton.textContent =
          "Sign in";

      }

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


      if (!currentLoginChallenge) {

        showElementMessage(
          verificationMessage,
          "Your login verification has expired. Please sign in again.",
          "error"
        );

        return;

      }


      verifyCode.disabled = true;

      verifyCode.textContent =
        "Verifying...";


      try {

        const response = await fetch(
          "https://suporly-backend.onrender.com/api/verify-login-two-factor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              challenge:
                currentLoginChallenge,

              code:
                code,

              recovery:
                false
            })
          }
        );


        const data =
          await response.json();


        /* =================================================
           SUCCESS
        ================================================= */

        if (
          typeof data.success === "string" &&
          data.success
        ) {

          localStorage.setItem(
            "suporly-session",
            data.success
          );


          currentLoginChallenge = "";


          window.location.href =
            "home.html";


          return;

        }


        /* =================================================
           INVALID CODE
        ================================================= */

        if (
          data.success ===
          "TwoFactorInvalid"
        ) {

          showElementMessage(
            verificationMessage,
            "Incorrect authentication code.",
            "error"
          );

          return;

        }


        /* =================================================
           EXPIRED CHALLENGE
        ================================================= */

        if (
          data.success ===
          "ChallengeExpired"
        ) {

          currentLoginChallenge = "";

          showElementMessage(
            verificationMessage,
            "This verification request has expired. Please sign in again.",
            "error"
          );

          return;

        }


        /* =================================================
           INVALID CHALLENGE
        ================================================= */

        if (
          data.success ===
          "ChallengeInvalid"
        ) {

          currentLoginChallenge = "";

          showElementMessage(
            verificationMessage,
            "This verification request is no longer valid. Please sign in again.",
            "error"
          );

          return;

        }


        /* =================================================
           TOO MANY ATTEMPTS
        ================================================= */

        if (
          data.success ===
          "ChallengeLocked"
        ) {

          currentLoginChallenge = "";

          showElementMessage(
            verificationMessage,
            "Too many incorrect attempts. Please sign in again.",
            "error"
          );

          return;

        }


        /* =================================================
           UNKNOWN ERROR
        ================================================= */

        showElementMessage(
          verificationMessage,
          "Unable to verify the authentication code.",
          "error"
        );


      } catch (error) {

        console.error(error);

        showElementMessage(
          verificationMessage,
          "Unable to connect to the server.",
          "error"
        );

      } finally {

        verifyCode.disabled = false;

        verifyCode.textContent =
          "Verify code";

      }

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
    () => {

      showElementMessage(
        verificationMessage,
        "Please sign in again to request a new verification.",
        "error"
      );

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

      currentLoginChallenge = "";

      verificationStep?.classList.add(
        "hidden"
      );

      loginStep?.classList.remove(
        "hidden"
      );


      loginCodeInputs.forEach(input => {
        input.value = "";
      });


      showElementMessage(
        verificationMessage,
        "",
        ""
      );

      showMessage(
        "",
        ""
      );


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
let currentSignupUserId = "";


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


      /* ================================================
         PYTHON BACKEND
      ================================================= */

      try {

        const response = await fetch(
          "https://suporly-backend.onrender.com/api/sign-new-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username,
              email,
              password
            })
          }
        );


        const data = await response.json();


        if (data.success === "UsernameTaken") {

          showElementMessage(
            signupMessage,
            "That username is already taken.",
            "error"
          );

          return;

        }


        if (data.success === "EmailTaken") {

          showElementMessage(
            signupMessage,
            "That email is already registered.",
            "error"
          );

          return;

        }


        if (!data.success) {

          showElementMessage(
            signupMessage,
            "Unable to create account.",
            "error"
          );

          return;

        }


        currentSignupUserId =
          data.success;


        showActivation(email);


      } catch (error) {

        console.error(error);

        showElementMessage(
          signupMessage,
          "Unable to connect to the server.",
          "error"
        );

      } finally {

        submitButton.disabled = false;

        submitButton.textContent =
          "Create account";

      }

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
          .replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

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
          .replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
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


      if (!currentSignupUserId) {

        showElementMessage(
          activationMessage,
          "Unable to identify your account. Please sign up again.",
          "error"
        );

        return;

      }


      activateAccount.disabled = true;

      activateAccount.textContent =
        "Activating...";


      try {

        const response = await fetch(
          "https://suporly-backend.onrender.com/api/check-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userid: currentSignupUserId,
              code
            })
          }
        );


        const data = await response.json();


        /*
         * Backend response:
         *
         * session ID = success
         * 1 = wrong code
         * 2 = locked
         * 3 = expired
         * 4 = error
         */


        if (typeof data.success === "string") {

          localStorage.setItem(
            "suporly-session",
            data.success
          );

          window.location.href =
            "home.html";

          return;

        }


        if (data.success === 1) {

          showElementMessage(
            activationMessage,
            "Incorrect activation code.",
            "error"
          );

          return;

        }


        if (data.success === 2) {

          showElementMessage(
            activationMessage,
            "Too many incorrect attempts. Please request a new activation code.",
            "error"
          );

          return;

        }


        if (data.success === 3) {

          showElementMessage(
            activationMessage,
            "This activation code has expired. Please request a new code.",
            "error"
          );

          return;

        }


        showElementMessage(
          activationMessage,
          "Unable to activate your account.",
          "error"
        );


      } catch (error) {

        console.error(error);

        showElementMessage(
          activationMessage,
          "Unable to connect to the server.",
          "error"
        );

      } finally {

        activateAccount.disabled = false;

        activateAccount.textContent =
          "Activate account";

      }

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

