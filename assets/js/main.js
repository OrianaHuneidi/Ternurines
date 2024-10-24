function verifyLogin() {
  const statusLogin = localStorage.getItem("login") === "true";
  
  if (statusLogin) {
    const registroForm = document.getElementById("registroForm");
    const buttonLogin = document.getElementById("buttonLogin");
    const buttonLogout = document.getElementById("buttonLogout");
    const contactameForm = document.getElementById("contactameForm");

    if (registroForm) registroForm.style.display = "none";
    if (buttonLogin) buttonLogin.style.display = "none";
    if (buttonLogout) buttonLogout.style.display = "block";
    if (contactameForm) contactameForm.style.display = "block";
  } else {
    const registroForm = document.getElementById("registroForm");
    const buttonLogin = document.getElementById("buttonLogin");
    const buttonLogout = document.getElementById("buttonLogout");
    const contactameForm = document.getElementById("contactameForm");

    if (registroForm) registroForm.style.display = "block";
    if (buttonLogin) buttonLogin.style.display = "block";
    if (contactameForm) contactameForm.style.display = "none";
    if (buttonLogout) buttonLogout.style.display = "none";
  }
}

async function logoutUser() {
  localStorage.setItem("login", "false");
  setTimeout(() => verifyLogin());
}

async function loginUser(email, password) {
  try {
    const response = await fetch("server/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&password=${password}`,
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem("login", "true");
      document.getElementById("formLogin").reset();
      alert("Ya iniciaste session");
      setTimeout(() => verifyLogin());
    } else {
      logoutUser();
      alert("Error al iniciar session");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al logearte");
    logoutUser();
  }
}

async function registerUser(name, email, phone, password) {
  try {
    const response = await fetch("server/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&name=${name}&phone=${phone}&password=${password}`,
    });

    const result = await response.json();
    if (result.success) {
      document.getElementById("formRegister").reset();
      alert("Usuario registrado exitosamente");
    } else {
      alert("Error al registrarse");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al registrarse");
  }
}

const init = () => {
  const formRegister = document.getElementById("formRegister");
  if (formRegister) {
    formRegister.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("nameUser").value;
      const email = document.getElementById("emailUser").value;
      const phone = document.getElementById("phoneUser").value;
      const password = document.getElementById("passwordUser").value;

      await registerUser(name, email, phone, password);
    });
  }

  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    document
      .getElementById("formLogin")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("emailUserLogin").value;
        const password = document.getElementById("passwordUserLogin").value;

        await loginUser(name, password);
      });
  }

  const buttonLogout = document.getElementById("buttonLogout");
  if (buttonLogout) {
    document
      .getElementById("buttonLogout")
      .addEventListener("click", async (event) => {
        logoutUser();
      });
  }

  verifyLogin();
};

init();
