if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")) {
  document.getElementById("user").innerHTML = "Cliente: " + username;
}

document.addEventListener('DOMContentLoaded', () => {

  let usuarioAc = localStorage.getItem('username');
  let carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`));


  let containerCarro = document.getElementById('containerCarro');

  if (!carrito) {
    containerCarro.innerHTML = '<div class="alert alert-dark" role="alert">No hay productos en el carrito!</div>'
  } else {
    carrito.forEach((prod, index) => {
      let productoHTML = `
        
        <div class="container card col-lg-6 md-8 sm-12"">
  <div class="row g-0">
        <tr>
        <div class="card-img">
          <td><img src="${prod.imagen}" class="img-fluid" alt="${prod.nombre}"></td>
          </div>
          <div class="card-body">
          <td><h5>${prod.nombre}</h5></td>
          <td><p>Precio: <strong>${prod.costo}</strong></p></td>
          <td><p>Moneda: ${prod.moneda}</p></td>
          <div class="d-flex align-items-center">
          <label for="cantidad-${index}" style="margin-right: 5px;">Cantidad:</label>
          <input id="cantidad-${index}" type="number" value="1" min="1" 
          style="background-color: lightgray; width: 30px;">
          </div>
           <p><strong id="subtotal-${index}">Total: $${prod.costo}</strong></p>
        </tr>
        </div>
  </div>
</div>


      `;
      containerCarro.innerHTML += productoHTML;

      // Acá actualizamos el subtotal en tiempo real despúes de que el usuario pone la cantidad
      document.getElementById(`cantidad-${index}`).addEventListener('input', (e) => {
        let cantidad = parseInt(e.target.value) || 1; // Si no hay un valor se asume que es 1
        let subtotal = prod.costo * cantidad;
        document.getElementById(`subtotal-${index}`).innerText = `Total: $${subtotal}`;

      });
    });
  }
});



