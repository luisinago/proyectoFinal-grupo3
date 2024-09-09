if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){ document.getElementById("user").innerHTML = "Cliente: " + username;
}




let productoID = localStorage.getItem("productoID");
let categoriaID = localStorage.getItem("categoriaID");

// Categorías con las URL de los JSON
let categoriasURL = {
  101: "https://japceibal.github.io/emercado-api/cats_products/101.json",  // Autos
  102: "https://japceibal.github.io/emercado-api/cats_products/102.json",  // Juguetes
  103: "https://japceibal.github.io/emercado-api/cats_products/103.json",  // Muebles
  105: "https://japceibal.github.io/emercado-api/cats_products/105.json"   // Computadoras
};

// fetch según categoría seleccionada
let fetchProductosInfo = async () => {
  if (categoriaID && categoriasURL[categoriaID]) {
    let response = await fetch(categoriasURL[categoriaID]);
    let datos = await response.json();

    // Buscamos el producto por su ID dentro del JSON
    let producto = datos.products.find(p => p.id == productoID);

    if (producto) {
      // Actualizamos el contenido en el HTML
      document.querySelector('h1').innerText = producto.name;
      document.querySelector('.imagen-producto img').src = producto.image;
      document.querySelector('.descripcion-producto p').innerText = producto.description;

      // Actualizamos la categoría y las unidades vendidas
      document.querySelector('.categoria-producto').innerText = datos.catName;  // Nombre de la categoría
      document.querySelector('.unidades-vendidas').innerText = `Unidades vendidas: ${producto.soldCount}`;  
    } else {
      console.log('Producto no encontrado');
    }
  } else {
    console.log('Categoría no encontrada');
  }
};

fetchProductosInfo();


