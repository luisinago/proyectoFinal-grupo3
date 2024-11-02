document.addEventListener('DOMContentLoaded', () => {
  let usuarioAc = localStorage.getItem('username');
  let carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`)) || [];
  // Actualiza el contador en el badge del carrito
  document.getElementById('cartCount').innerText = carrito.length;

  let containerCarro = document.getElementById('containerCarro');

  if (carrito.length === 0) {
      containerCarro.innerHTML = '<div class="alert alert-dark" role="alert">No hay productos en el carrito!</div>';
  } else {
      carrito.forEach((prod, index) => {
          let productoHTML = `
              <div class="container card col-lg-6 md-8 sm-12">
                  <div class="row g-0">
                      <div class="card-img">
                          <img src="${prod.imagen}" class="img-fluid" alt="${prod.nombre}">
                      </div>
                      <div class="card-body">
                          <h5>${prod.nombre}</h5>
                          <p>Precio: <strong>${prod.costo}</strong></p>
                          <p>Moneda: ${prod.moneda}</p>
                          <div class="d-flex align-items-center">
                              <label for="cantidad-${index}" style="margin-right: 5px;">Cantidad:</label>
                              <input id="cantidad-${index}" type="text" value="1" style="background-color: lightgray; width: 30px;">
                          </div>
                          <p><strong id="subtotal-${index}">Subtotal: $${prod.costo}</strong></p>
                      </div>
                  </div>
      
              </div>
          `;
          containerCarro.innerHTML += productoHTML;

        })

          // Actualizar subtotal en tiempo real
          carrito.forEach((prod, index) => {
          document.getElementById(`cantidad-${index}`).addEventListener('input', (e) => {
              let cantidad = parseInt(e.target.value) || 1;
              let subtotal = prod.costo * cantidad;
              document.getElementById(`subtotal-${index}`).innerText = `Subtotal: $${subtotal}`;
            });   
            
            
      });


  }
});
