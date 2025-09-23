function abrirProducto(id) {
  document.getElementById("modal-" + id).style.display = "flex";
}

function cerrarProducto(id) {
  document.getElementById("modal-" + id).style.display = "none";
}

function cambiarCantidad(id, valor) {
  let cantidadElem = document.getElementById("cantidad-" + id);
  let cantidad = parseInt(cantidadElem.innerText) + valor;
  if (cantidad < 0) cantidad = 0;
  cantidadElem.innerText = cantidad;
}

// FILTRO DE PRODUCTOS
document.querySelectorAll(".filtro").forEach(boton => {
  boton.addEventListener("click", e => {
    e.preventDefault();
    const filtro = boton.getAttribute("data-filtro");
    
    document.querySelectorAll(".producto").forEach(prod => {
      if (filtro === "todos" || prod.classList.contains(filtro)) {
        prod.style.display = "block";
      } else {
        prod.style.display = "none";
      }
    });
  });
});


