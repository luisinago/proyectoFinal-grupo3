document.addEventListener('DOMContentLoaded', () => {
  var usuarioAc = localStorage.getItem('username');
  var carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`)) || [];
  var containerCarro = document.getElementById('containerCarro');
  var totalCarrito = document.getElementById('totalCarrito');

  // Actualiza el contador en el badge del carrito
  document.getElementById('cartCount').innerText = carrito.reduce((total, prod) => total + (prod.cantidad || 1), 0);


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
                              <input id="cantidad-${index}" type="number" value="${prod.cantidad}" style="background-color: lightgray; width: 50px;">
                          </div>
                          <p><strong id="subtotal-${index}">Subtotal: ${(prod.costo * (prod.cantidad))}</strong></p>
                      </div>
                  </div>
      
              </div>
          `;
          containerCarro.innerHTML += productoHTML;

        })

        // Calcula el total del carrito inicial
        costoTotalCarrito();

          // Actualizar subtotal en tiempo real
          carrito.forEach((prod, index) => {
          document.getElementById(`cantidad-${index}`).addEventListener('input', (e) => {
              let cantidad = parseInt(e.target.value) || 1;
              let subtotal = prod.costo * cantidad;
              document.getElementById(`subtotal-${index}`).innerText = `Subtotal: $${subtotal}`;
              prod.cantidad = cantidad; //actualiza cantidad en el carro
              localStorage.setItem(`carritoCompras${usuarioAc}`, JSON.stringify(carrito)); // guarda cantidad nueva en localstorage
            // Actualizar el badge, total general y precios en el modal
            document.getElementById('cartCount').innerText = carrito.reduce((total, p) => total + (p.cantidad || 1), 0);
            costoTotalCarrito();
            actualizarPrecio(); // Actualiza costo de envío y total

              // Suma los subtotales del carrito para mostrar el total general actualizado
              document.getElementById('cartCount').innerText = carrito.reduce((total, p) => total + (p.cantidad || 1), 0);
              costoTotalCarrito();
            });   
            
      });

      // Costo total carrito
      function costoTotalCarrito() {
        let total = carrito.reduce((valorTotal, prod) => valorTotal += (prod.costo * (prod.cantidad || 1)), 0);
        totalCarrito.innerText = `TOTAL: $${total}`;
        return total;
        }

        // Calcula el total del carrito final actualizado
        costoTotalCarrito();


    
    const costoenvio = document.getElementById("costoenvio");
    const subtotalModal = document.getElementById("subtotalModal");
    
    //Función para tipo de envío
    function actualizarPrecio() {
        let opcionesEnvio = document.getElementsByName("shipping"); // Obtener todos los botones de opción de envío
        let porcentajeCostoEnvio = 0;
        let total = costoTotalCarrito();

            for (const opcion of opcionesEnvio) { // Encontrar el botón seleccionado y obtener su valor
                if (opcion.checked) {
                    porcentajeCostoEnvio = total * parseFloat(opcion.value);
                }
            }

            porcentajeCostoEnvio = Math.round(porcentajeCostoEnvio);
            costoenvio.innerText = `Costo de envío: $${porcentajeCostoEnvio}`;

            document.getElementsByName("shipping").forEach(opcion => {
                opcion.addEventListener("change", actualizarPrecio);
            });

        // Calcular el total (subtotal + costo de envío) y mostrarlo
        let totalFinal = total + porcentajeCostoEnvio;
        document.querySelector(".total").innerHTML = `<strong>TOTAL: $${totalFinal}</strong>`;
    }

    actualizarPrecio();


    // Subtotal en Modal
    function actualizarSubtotalModal() {
        let subtotal = costoTotalCarrito(); // Obtén el subtotal
        subtotalModal.innerText = `Subtotal: $${subtotal}`;
        actualizarPrecio(); // Asegura sincronización del total
    }

    actualizarSubtotalModal();

    const AbrirModal = document.querySelector("#abrir-modal");
    const btnCerrar = document.querySelector("#btn-cerrar");
    const modal = document.querySelector("#modal");
}});

