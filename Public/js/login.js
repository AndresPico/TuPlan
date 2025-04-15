document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const btnRegister = document.getElementById("btnRegister");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
  
    btnLogin.addEventListener("click", () => {
      btnLogin.classList.add("activo");
      btnRegister.classList.remove("activo");
      loginForm.classList.remove("oculto");
      registerForm.classList.add("oculto");
    });
  
    btnRegister.addEventListener("click", () => {
      btnRegister.classList.add("activo");
      btnLogin.classList.remove("activo");
      registerForm.classList.remove("oculto");
      loginForm.classList.add("oculto");
    });
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("🔐 Iniciar sesión...");
    });
  
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("📝 Registro enviado...");
    });
  });

  
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("formLogin");
  
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const correo = document.getElementById("correoLogin").value.trim();
      const contrasena = document.getElementById("contrasenaLogin").value.trim();
  
      if (!correo || !contrasena) {
        mostrarAlerta("Por favor completa todos los campos", "error");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ correo, contrasena })
        });
  
        const data = await response.json();
  
        if (data.success) {
          mostrarAlerta("Inicio de sesión exitoso", "exito");
  
          // Guardar token y usuario en localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
  
          setTimeout(() => {
            window.location.href = "simulador.html"; // Redirección
          }, 1500);
        } else {
          mostrarAlerta("Correo o contraseña incorrectos", "error");
        }
      } catch (error) {
        console.error("Error en el login:", error);
        mostrarAlerta("Ocurrió un error al iniciar sesión", "error");
      }
    });
  });
  
  function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement("div");
    alerta.className = `alerta ${tipo}`;
    alerta.textContent = mensaje;
  
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("formRegister");
  
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const nombre = document.getElementById("nombreRegistro").value.trim();
      const correo = document.getElementById("correoRegistro").value.trim();
      const contrasena = document.getElementById("contrasenaRegistro").value.trim();
  
      if (!nombre || !correo || !contrasena) {
        mostrarAlerta("Completa todos los campos", "error");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/api/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nombre, correo, contrasena })
        });
  
        const data = await response.json();
  
        if (data.success) {
          mostrarAlerta("Registro exitoso. Ya puedes iniciar sesión", "exito");
  
          setTimeout(() => {
            document.getElementById("btnLogin").click(); // Cambia al formulario login
          }, 2000);
        } else {
          mostrarAlerta(data.mensaje || "Hubo un error al registrar", "error");
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        mostrarAlerta("Ocurrió un error al registrar", "error");
      }
    });
  });
  