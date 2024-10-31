if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){ document.getElementById("user").innerHTML = "Cliente: " + username;
}

document.addEventListener('DOMContentLoaded', ()=>{

let usuarioAc= localStorage.getItem('username');
let carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`));


let containerCarro= document.getElementById('containerCarro');

if(!carrito){
    containerCarro.innerHTML = '<div class="alert alert-dark" role="alert">No hay productos en el carrito!</div>'
}else{
    carrito.forEach(prod => {
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
          <td><label for="cantidad">Cantidad:</label>
          <input id="cantidad" type="text" value="${prod.cantidad}"></td>
          <td><p>Subtotal: $ ${prod.costo} </p></td>
        </tr>
        </div>
  </div>
</div>


      `;
      containerCarro.innerHTML += productoHTML;
        
    });
}



});



