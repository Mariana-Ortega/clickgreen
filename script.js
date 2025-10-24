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

// 🔍 Buscador de productos (funciona con tu sección actual)
document.querySelector('.buscador button').addEventListener('click', function() {
  const texto = document.querySelector('.buscador input').value.toLowerCase().trim();
  const productos = document.querySelectorAll('.producto');

  let resultados = 0;

  productos.forEach(prod => {
    const nombreProducto = prod.querySelector('p').innerText.toLowerCase();
    if (texto === "" || nombreProducto.includes(texto)) {
      prod.style.display = "block";
      resultados++;
    } else {
      prod.style.display = "none";
    }
  });

  if (resultados === 0) {
    alert("No se encontraron productos con ese nombre 🥲");
  }
});

// También permite buscar presionando Enter
document.querySelector('.buscador input').addEventListener('keyup', function(e) {
  if (e.key === "Enter") {
    document.querySelector('.buscador button').click();
  }

  document.getElementById("buscador-input").addEventListener("keyup", buscarProducto);
});


// BANNERS




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

/// 🛒 Agregar al carrito
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

    // ⚡ Agregar el total aquí
    const total = precio * cantidad;

    carrito.push({ nombre, cantidad, presentacion, precio, tipo, total });
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

// Abrir formulario al finalizar compra
function finalizarCompra() {
  // ✅ Cerrar modal carrito
  document.getElementById("modal-carrito").style.display = "none";

  // ✅ Abrir formulario de pedido
  document.getElementById("modal-pedido").style.display = "flex";
}

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

  // 📦 Detalle del carrito
  let detalle = carrito.map(item => 
    `${item.nombre} - ${item.cantidad} ${item.presentacion}(s) - $${(item.cantidad * item.precio).toLocaleString()}`
  ).join("\n");

  let numeroTienda = "573185241371"; // tu número

  let mensaje = `🛒 Nuevo pedido:
👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
🏠 Dirección: ${direccion}
📝 Observaciones: ${observaciones}

📦 Detalle del pedido:
${detalle}

💰 Total: $${carrito.reduce((suma, item) => suma + (item.cantidad * item.precio), 0).toLocaleString()}`;

  // Abrir WhatsApp
  let url = `https://wa.me/${numeroTienda}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  // ✅ Limpiar carrito y cantidades en productos
  carrito = [];
  document.querySelectorAll("[id^='cantidad-']").forEach(elem => elem.innerText = "0");
  mostrarCarrito();

  // ✅ Cerrar todo: formulario y carrito
  document.getElementById("modal-pedido").style.display = "none";
  document.getElementById("modal-carrito").style.display = "none";
});



// Abrir tutorial desde el banner
document.querySelector(".banner a").addEventListener("click", e => {
  e.preventDefault(); // evitar redirección
  document.getElementById("modal-tutorial").style.display = "flex";
});

// Cerrar tutorial
function cerrarTutorial() {
  document.getElementById("modal-tutorial").style.display = "none";
}




