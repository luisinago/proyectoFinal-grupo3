document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){
  document.getElementById("user").innerHTML = "Cliente: " + ObjUsuario;
}

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el campo de búsqueda y los artículos
    const searchInput = document.getElementById('searchInput');
    const articles = document.querySelectorAll('.card');
  
    // Event listener para el campo de búsqueda
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      
      // Filtrar los artículos
      articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const description = article.querySelector('.card-text').textContent.toLowerCase();
  
        if (title.includes(query) || description.includes(query)) {
          article.parentElement.style.display = ''; // Muestra el artículo
        } else {
          article.parentElement.style.display = 'none'; // Oculta el artículo
        }
      });
    });
  });
  
//Menú desplegable en usuario
  document.addEventListener("DOMContentLoaded", function(){
    //Recupero el username del localStorage
    let username = localStorage.getItem("username");


    if (username) {
    //Crear un elemento de lista con el menú desplegable para el usuario 
    let usuarioMenu = document.createElement("li");
    usuarioMenu.className = "nav-item dropdown";

    //Crear el botón con el username y las opciones de menú desplegable
    usuarioMenu.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${username}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                <li><a class="dropdown-item" id="logout" href="#">Cerrar sesión</a></li>
            </ul>
        `;

    //Agregar el menú desplegable a la barra de navegación

    let navbar = document.querySelector(".navbar-nav");
    navbar.appendChild(usuarioMenu);

    //Cerrar sesión, eliminar el usuario de localStorage y redirigir a login

    document.getElementById("logout").addEventListener("click", function() {
      localStorage.removeItem("username"); //Elimina el username del localStorage
      localStorage.removeItem('carritoComprar');
      window.location.href = "login.html"; //Redirigir al login
    });

    }
  });