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

/* Carrito */
let carrito = [];

// Abrir y cerrar modales de productos
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

// 🛒 Agregar al carrito
function agregarAlCarrito(id) {
  const modal = document.getElementById("modal-" + id);
  const cantidad = parseInt(document.getElementById("cantidad-" + id).innerText);

  if (cantidad > 0) {
    const nombre = modal.dataset.nombre;
    const tipo = modal.dataset.tipo || "producto"; // "combo" o "producto"
    let presentacion = "";
    let precio = 0;

    if (tipo === "combo") {
      // Combos solo se venden por unidades
      presentacion = "combo";
      precio = parseInt(modal.querySelector("[data-precio-combo]").dataset.precioCombo);
    } else {
      // Productos normales (libra o kg)
      presentacion = modal.querySelector("select").value;
      if (presentacion === "libra") {
        precio = parseInt(modal.querySelector("[data-precio-libra]").dataset.precioLibra);
      } else if (presentacion === "kg") {
        precio = parseInt(modal.querySelector("[data-precio-kg]").dataset.precioKg);
      }
    }

    carrito.push({ nombre, cantidad, presentacion, precio, tipo });
    mostrarCarrito();
    cerrarProducto(id);
  }
}



// 🛒 Mostrar carrito
function abrirCarrito() {
  document.getElementById("modal-carrito").style.display = "flex";
  actualizarCarrito();
}
function cerrarCarrito() {
  document.getElementById("modal-carrito").style.display = "none";
}
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = ""; }

function mostrarCarrito() {
  const modalCarrito = document.getElementById("modal-carrito");
  const listaCarrito = document.getElementById("lista-carrito");

  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(prod => {
    const subtotal = prod.precio * prod.cantidad;
    total += subtotal;
    listaCarrito.innerHTML += `
      <p>${prod.nombre} - ${prod.cantidad} ${prod.presentacion}(s) - $${subtotal.toLocaleString()}</p>
    `;
  });

  listaCarrito.innerHTML += `<p><b>Total: $${total.toLocaleString()}</b></p>`;
  modalCarrito.style.display = "flex";
}

// Abrir formulario al hacer clic en "Finalizar compra"
document.querySelector(".finalizar-compra").addEventListener("click", () => {
  document.getElementById("modal-pedido").style.display = "flex";
});

// Cerrar formulario
function cerrarPedido() {
  document.getElementById("modal-pedido").style.display = "none";
}

// Enviar pedido a WhatsApp
document.getElementById("form-pedido").addEventListener("submit", e => {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let observaciones = document.getElementById("observaciones").value;

  // Obtener detalle del carrito
  let detalle = carrito.map(item => 
    `${item.nombre} - ${item.cantidad} ${item.unidad}(s) - $${item.total.toLocaleString()}`
  ).join("\n");

  // Mensaje completo
  let mensaje = `🛒 NUEVO PEDIDO\n\n👤 Nombre: ${nombre}\n📞 Teléfono: ${telefono}\n📍 Dirección: ${direccion}\n📝 Observaciones: ${observaciones}\n\n📦 Detalles:\n${detalle}`;

// Simulación: abrir en WhatsApp
let numero = "573185241371"; // ← pon aquí tu número en formato internacional
let url = `https://wa.me/${3185241371}?text=${Prueba}`;
window.open(url, "_blank");


  // Vaciar carrito después de enviar
  carrito = [];
  document.getElementById("modal-pedido").style.display = "none";
  actualizarCarrito(); // refrescar vista del carrito
});

