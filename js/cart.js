let usuarioAc = localStorage.getItem('username');
let carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`)) || [];
let containerCarro = document.getElementById('containerCarro');
let totalCarrito = document.getElementById('totalCarrito');



document.addEventListener('DOMContentLoaded', () => {
 // Actualiza el contador en el badge del carrito
  document.getElementById('cartCount').innerText = carrito.reduce((total, prod) => total + (prod.cantidad || 1), 0);

function mostrarCarro(){
  if (carrito.length === 0) {
      containerCarro.innerHTML = '<div class="alert alert-danger animate__animated animate__flash animate__slow" role="alert" style="margin-top: 40px;">No hay productos en el carrito!</div>';
  } else {
    let productoHTML = '';
      carrito.forEach((prod, index) => {
          productoHTML += `
              <div class="container card col-lg-6 md-8 sm-12 animate__animated animate__zoomIn" data-id="${prod.id}">
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
                          <button type="button" data-id="${prod.id}" class="btn btn-danger borraItem" style="margin-bottom:10px; width: 70px;"><i class="bi bi-trash"></i></button>
                      </div>
                  </div>
      
              </div>
          `;
          containerCarro.innerHTML = productoHTML;

        })

        actualizaSubtotal();
        costoTotalCarrito();
        actualizarPrecio(); // Actualiza costo de envío y total
        borrandoProducto();
        actualizarSubtotalModal();

    }

};

  // Actualizar subtotal en tiempo real
  function actualizaSubtotal(){
  carrito.forEach((prod, index) => {
    document.getElementById(`cantidad-${index}`).addEventListener('input', (e) => {
        let cantidad = parseInt(e.target.value) || 1;
        let subtotal = prod.costo * cantidad;
        document.getElementById(`subtotal-${index}`).innerText = `Subtotal: $${subtotal}`;
        prod.cantidad = cantidad; //actualiza cantidad en el carro
        localStorage.setItem(`carritoCompras${usuarioAc}`, JSON.stringify(carrito)); // guarda cantidad nueva en localstorage
        //actualiza el badge
        document.getElementById('cartCount').innerText = carrito.reduce((total, p) => total + (p.cantidad || 1), 0); 

        // Suma los subtotales del carrito para mostrar el total general actualizado
        document.getElementById('cartCount').innerText = carrito.reduce((total, p) => total + (p.cantidad || 1), 0);
        costoTotalCarrito();
        actualizarSubtotalModal();
      });   
    
});
  }
      // Costo total carrito
      function costoTotalCarrito() {
        let total = carrito.reduce((valorTotal, prod) => valorTotal += (prod.costo * (prod.cantidad || 1)), 0);
        totalCarrito.innerText = `TOTAL: $${total}`;
        return total;
        }


    const costoenvio = document.getElementById("costoenvio");
    const subtotalModal = document.getElementById("subtotalModal");
    
    //Función para tipo de envío
    function actualizarPrecio() {
        const opcionesEnvio = document.getElementsByName("shipping");
        let porcentajeCostoEnvio = 0;
        const total = costoTotalCarrito();

        opcionesEnvio.forEach(opcion => {
            if (opcion.checked) {
                porcentajeCostoEnvio = total * parseFloat(opcion.value);
            }
        });

        porcentajeCostoEnvio = Math.round(porcentajeCostoEnvio);
        costoenvio.innerText = `Costo de envío: $${porcentajeCostoEnvio}`;
        const totalFinal = total + porcentajeCostoEnvio;
        document.querySelector(".total").innerHTML = `<strong>TOTAL: $${totalFinal}</strong>`;
    }

    document.getElementsByName("shipping").forEach(opcion => {
        opcion.addEventListener("change", actualizarPrecio);
    });

    //actualizarPrecio();


     // Subtotal en Modal
    function actualizarSubtotalModal() {
        let subtotal = costoTotalCarrito(); // Obtén el subtotal
        subtotalModal.innerText = `Subtotal: $${subtotal}`;
        actualizarPrecio(); // Asegura sincronización del total
    }
    //actualizarSubtotalModal();

    //funcion para eliminar un producto
function borrandoProducto() {
    const botonesBorrar = document.querySelectorAll('.borraItem'); //trae los botones de eliminar
    botonesBorrar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const idBorrar = boton.getAttribute('data-id'); 
            console.log(idBorrar);
            // Filtra el carrito para eliminar el producto con el id correspondiente
            carrito = carrito.filter(prod => prod.id != idBorrar); // filtra los productos sin el que vamos a borrar
            localStorage.setItem(`carritoCompras${usuarioAc}`, JSON.stringify(carrito)); //vuelve a guardar en ls el carro actualizado
            containerCarro.innerHTML=''; //limpia la pagina
            mostrarCarro(); // Vuelve a mostrar el carrito actualizado
            costoTotalCarrito();// calcula el total nuevo
            actualizarPrecio();
            actualizaSubtotal();
            actualizarSubtotalModal();
            document.getElementById('cartCount').innerText = carrito.reduce((total, p) => total + (p.cantidad || 1), 0);//actualiza badge
        });
    });
}

        mostrarCarro(); 

        const AbrirModal = document.querySelector("#abrir-modal");
        const btnCerrar = document.querySelector("#btn-cerrar");
        const modal = document.querySelector("#modal");

});
  

// Validación de inputs en "Completa los datos"


//let carrito = [];


const finalizarCompraBtn = document.querySelector(".btn-success");


const alertContainer = document.createElement("div");
alertContainer.classList.add("alert-container", "mt-3");
document.querySelector("#checkoutModal .modal-body").prepend(alertContainer);

finalizarCompraBtn.addEventListener("click", () => {
    alertContainer.innerHTML = "";
    const errores = [];


    //validaciones individuales 

    const camposDireccion = ["departamento", "localidad", "calle", "numero", "esquina"];
    camposDireccion.forEach((campo) => {
        const input = document.getElementById(campo);
        if (!input.value.trim()) {
            errores.push(`El campo: ${campo}`);
        }
    });


    const envioSeleccionado = document.querySelector("input[name='shipping']:checked");
    if (!envioSeleccionado) {
        errores.push("Es necesario seleccionar una forma de envío.");
    }


    const cantidadesValidas = carrito.every((prod, index) => {
        const inputCantidad = document.getElementById(`cantidad-${index}`);
        return inputCantidad && parseInt(inputCantidad.value) > 0;
    });
    if (!cantidadesValidas) {
        errores.push("La cantidad de cada producto debe ser mayor a 0.");
    }


    const formaPagoSeleccionada = document.querySelector("input[name='ejemploRadio']:checked");
    if (!formaPagoSeleccionada) {
        errores.push("Es necesario seleccionar una forma de pago.");
    }

    // mostrar el mensaje de error
    if (errores.length > 0) {
        const alertError = document.createElement("div");
        alertError.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
        alertError.innerHTML = `
      <strong>Es necesario completar:</strong>
      <ul>
        ${errores.map((error) => `<li>${error}</li>`).join("")}
      </ul>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;
        alertContainer.appendChild(alertError);

        // elimina alertas de error automáticamente después de 5 segundos
        setTimeout(() => {
            alertContainer.innerHTML = "";
        }, 5000);
    } else {

        const alertSuccess = document.createElement("div");
        alertSuccess.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
        alertSuccess.innerHTML = `
      ¡Compra exitosa!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;
        alertContainer.appendChild(alertSuccess);

        // el modal con mensaje de éxito se cierra automáticamente después de 3 segundos
        setTimeout(() => {
            alertContainer.innerHTML = "";
            const modal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
            modal.hide();
        }, 3000);
    }
});

