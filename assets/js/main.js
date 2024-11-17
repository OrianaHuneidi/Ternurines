function verifyLogin() {
  const statusLogin = localStorage.getItem("login") === "true";
  
  if (statusLogin) {
   // const registroForm = document.getElementById("registroForm");
    const registroForm = $("#registroForm");
   // const buttonLogin = document.getElementById("buttonLogin");
    const buttonLogin = $("#buttonLogin");
    //const buttonLogout = document.getElementById("buttonLogout");
    const buttonLogout = $("#buttonLogout");
    //const contactameForm = document.getElementById("contactameForm");
    const contactameForm = $("#contactameForm");

    if (registroForm) registroForm.css("display","none");
    if (buttonLogin) buttonLogin.css("display","none");
    if (buttonLogout) buttonLogout.css("display","block");
    if (contactameForm) contactameForm.css("display","block");
  } else {
    const registroForm = $("#registroForm");
    const buttonLogin = $("#buttonLogin");
    const buttonLogout = $("#buttonLogout");
    const contactameForm = $("#contactameForm");
    //const registroForm = document.getElementById("registroForm");
    //const buttonLogin = document.getElementById("buttonLogin");
    //const buttonLogout = document.getElementById("buttonLogout");
    //const contactameForm = document.getElementById("contactameForm");

    if (registroForm) registroForm.css("display","block");
    if (buttonLogin) buttonLogin.css("display","block");
    if (contactameForm) contactameForm.css("display","none");
    if (buttonLogout) buttonLogout.css("display","none");
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
      //document.getElementById("formLogin").reset();
      $("#formLogin").trigger("reset");
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
      //document.getElementById("formRegister").reset();
      $("#formRegister").trigger("reset");
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
  //const formRegister = document.getElementById("formRegister");
  const formRegister = $("#formRegister");
  if (formRegister) {
    //formRegister.addEventListener("submit", async (event) => {
    formRegister.on("submit", async (event) => {
      event.preventDefault();

      const name = $("#nameUser").val();
      const email = $("#emailUser").val();
      const phone = $("#phoneUser").val();
      const password = $("#passwordUser").val();
      //const name = document.getElementById("nameUser").value;
      //const email = document.getElementById("emailUser").value;
      //const phone = document.getElementById("phoneUser").value;
      //const password = document.getElementById("passwordUser").value;


      await registerUser(name, email, phone, password);
    });
  }

 // const formLogin = document.getElementById("formLogin");
  const formLogin = $("#formLogin");
  if (formLogin) {
   // document
    //  .getElementById("formLogin")
    $("#formLogin")
      .on("submit", async (event) => {
        event.preventDefault();

        const name = $("#emailUserLogin").val();
        const password = $("#passwordUserLogin").val();
       // const name = document.getElementById("emailUserLogin").value;
       // const password = document.getElementById("passwordUserLogin").value;

        await loginUser(name, password);
      });
  }

  //const buttonLogout = document.getElementById("buttonLogout");
  const buttonLogout = $("#buttonLogout");
  if (buttonLogout) {
    //document
    //  .getElementById("buttonLogout")
    //  .addEventListener("click", async (event) => {
    //    logoutUser();
    //  });
    $("#buttonLogout")
      .on("click", () => logoutUser() );
  }

  verifyLogin();
};

init();
