document.getElementById("loginBtn").addEventListener("click", function () {
    const btn = this;
    btn.disabled = true;
    const originalHTML = btn.innerHTML;
  
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Cargando...`;
  
    // Simula login (reemplaza esto con tu lógica real)
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      // Aquí iría la redirección o validación
    }, 2000);
  });

  document.getElementById("loginBtn").addEventListener("click", function () {
    const btn = this;
    const loader = document.getElementById("loader");
  
    // Activamos el loader y deshabilitamos el botón
    btn.disabled = true;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Cargando...`;
    
    loader.style.display = "flex";  // Mostrar el loader
    
    // Simulación de proceso de login (reemplaza con tu lógica de validación)
    setTimeout(() => {
      loader.style.display = "none"; // Ocultar el loader cuando termine
      btn.innerHTML = originalHTML;  // Restaurar el texto del botón
      btn.disabled = false;
  
      // Aquí va tu redirección o lo que quieras hacer tras el login exitoso
      // Por ejemplo: window.location.href = "dashboard.html";
    }, 2000); // Simulamos un tiempo de carga de 2 segundos
  });

  document.getElementById("goToRegister").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
  });
  
  document.getElementById("goToLogin").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
  });
  