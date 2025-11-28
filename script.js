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


// 🖼️ Carruseles por producto
const imagenesProductos = {
  limones: [
    "Fotos editadas/1.Frutas/Citricas/Limones.png",
    "Fotos editadas/1.Frutas/Citricas/Limones2.png",
    "Fotos editadas/1.Frutas/Citricas/Limones3.png"
  ],
  naranjas: [
    "Fotos editadas/1.Frutas/Citricas/Narajas.png",
    "Fotos editadas/1.Frutas/Citricas/Narajas2.png",
    "Fotos editadas/1.Frutas/Citricas/Naraja3.png"
  ],
  mandarinas: [
    "Fotos editadas/1.Frutas/Citricas/Mandarinas.png",
    "Fotos editadas/1.Frutas/Citricas/Mandarinas2.png",
    "Fotos editadas/1.Frutas/Citricas/Mandarinas3.png"
  ],
  papaya: [
    "Fotos editadas/1.Frutas/Tropicales/Papaya.png",
    "Fotos editadas/1.Frutas/Tropicales/Papaya2.png",
    "Fotos editadas/1.Frutas/Tropicales/Papaya3.png"
  ],
  piña: [
    "Fotos editadas/1.Frutas/Tropicales/Piña.png",
    "Fotos editadas/1.Frutas/Tropicales/Piña2.png",
    "Fotos editadas/1.Frutas/Tropicales/Piña3.png"
  ],
  mango: [
    "Fotos editadas/1.Frutas/Tropicales/Mango.png",
    "Fotos editadas/1.Frutas/Tropicales/Mango2.png",
    "Fotos editadas/1.Frutas/Tropicales/Mango3.png"
  ],
  acelga: [
    "Fotos editadas/2.Verduras/Hortalizas/Acelga.png",
    "Fotos editadas/2.Verduras/Hortalizas/Acelga2.png",
    "Fotos editadas/2.Verduras/Hortalizas/Acelga3.png"
  ],
  espinaca: [
    "Fotos editadas/2.Verduras/Hortalizas/Espinaca.png",
    "Fotos editadas/2.Verduras/Hortalizas/Espinaca2.png",
    "Fotos editadas/2.Verduras/Hortalizas/Espinaca3.png"
  ],
  lechuga: [
    "Fotos editadas/2.Verduras/Hortalizas/Lechuga.png",
    "Fotos editadas/2.Verduras/Hortalizas/Lechuga2.png",
    "Fotos editadas/2.Verduras/Hortalizas/Lechuga3.png"
  ],
  papas: [
    "Fotos editadas/2.Verduras/Tuberculos/Papas.png",
    "Fotos editadas/2.Verduras/Tuberculos/Papas2.png",
    "Fotos editadas/2.Verduras/Tuberculos/Papas3.png"
  ],
  zanahorias: [
    "Fotos editadas/2.Verduras/Tuberculos/Zanahorias.png",
    "Fotos editadas/2.Verduras/Tuberculos/Zanahoria2.png",
    "Fotos editadas/2.Verduras/Tuberculos/Zanahoria3.png"
  ],
  yuca: [
    "Fotos editadas/2.Verduras/Tuberculos/Yuca.png",
    "Fotos editadas/2.Verduras/Tuberculos/Yuca2.png",
    "Fotos editadas/2.Verduras/Tuberculos/Yuca3.png"
  ],
  // puedes seguir agregando más productos aquí
};

let indiceActual = {};

// Cambiar imagen del carrusel
function cambiarImagen(id, direccion) {
  if (!imagenesProductos[id]) return;
  
  // inicializar índice
  if (indiceActual[id] === undefined) indiceActual[id] = 0;
  
  indiceActual[id] += direccion;

  // volver al inicio si pasa el límite
  if (indiceActual[id] < 0) indiceActual[id] = imagenesProductos[id].length - 1;
  if (indiceActual[id] >= imagenesProductos[id].length) indiceActual[id] = 0;

  document.getElementById("imagen-" + id).src = imagenesProductos[id][indiceActual[id]];
}



/* Carrito */
/* -------------------------------
   🛒 Lógica de productos y carrito
---------------------------------- */

let carrito = [];

/* 🟢 Abrir y cerrar modales de productos */
function abrirProducto(id) {
  document.getElementById("modal-" + id).style.display = "flex";
}

function cerrarProducto(id) {
  document.getElementById("modal-" + id).style.display = "none";
}

/* 🔢 Cambiar cantidad en los modales */
function cambiarCantidad(id, valor) {
  let cantidadElem = document.getElementById("cantidad-" + id);
  let cantidad = parseInt(cantidadElem.innerText) + valor;
  if (cantidad < 0) cantidad = 0;
  cantidadElem.innerText = cantidad;
}

/* 🛍️ Agregar productos al carrito (mejorado: combina iguales y valida datos) */
function agregarAlCarrito(id) {
  const modal = document.getElementById("modal-" + id);
  const cantidad = parseInt(document.getElementById("cantidad-" + id).innerText, 10) || 0;

  if (cantidad <= 0) {
    // nada que agregar
    return;
  }

  const nombre = modal.dataset.nombre;
  const tipo = modal.dataset.tipo || "producto";
  let presentacion = "";
  let precio = 0;

  if (tipo === "combo") {
    presentacion = "combo";
    precio = Number(modal.querySelector("[data-precio-combo]")?.dataset.precioCombo) || 0;
  } else {
    presentacion = modal.querySelector("select")?.value || "unidad";
    if (presentacion === "libra") {
      precio = Number(modal.querySelector("[data-precio-libra]")?.dataset.precioLibra) || 0;
    } else if (presentacion === "kg") {
      precio = Number(modal.querySelector("[data-precio-kg]")?.dataset.precioKg) || 0;
    } else {
      // intenta tomar un precio por defecto si hay uno
      precio = Number(modal.querySelector("[data-precio]")?.dataset.precio) || precio;
    }
  }

  if (precio === 0) {
    console.warn(`Producto "${nombre}" agregado con precio 0 — revisa los data-attributes del modal id=${id}`);
  }

  // Buscar si ya existe el mismo producto+presentacion -> sumar cantidad
  const existenteIndex = carrito.findIndex(item => item.nombre === nombre && item.presentacion === presentacion);
  if (existenteIndex > -1) {
    // actualizar cantidad y total
    carrito[existenteIndex].cantidad = Number(carrito[existenteIndex].cantidad) + cantidad;
    carrito[existenteIndex].precio = precio; // opcional: actualizar precio si cambió
    carrito[existenteIndex].total = carrito[existenteIndex].cantidad * carrito[existenteIndex].precio;
  } else {
    const total = precio * cantidad;
    carrito.push({ nombre, cantidad, presentacion, precio, tipo, total });
  }

  mostrarCarrito();
  actualizarBadge();
  cerrarProducto(id);
}

/* 🗑️ Eliminar un producto del carrito (sin cambios lógicos, sólo actualiza badge) */
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
  actualizarBadge();
}

/* 🔴 Actualizar numerito del carrito (mejor manejo de tipos) */
function actualizarBadge() {
  const badge = document.getElementById("badge-carrito");
  if (!badge) return;

  const totalItems = carrito.reduce((sum, item) => sum + (Number(item.cantidad) || 0), 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "flex" : "none";
}

/* Inicializar estado del badge al cargar la página */
window.addEventListener("DOMContentLoaded", () => {
  actualizarBadge();
});

/* 🛒 Mostrar contenido del carrito */
function mostrarCarrito()  {
  const listaCarrito = document.getElementById("lista-carrito");
  const btnFinalizar = document.getElementById("btn-finalizar-compra");

  listaCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `<p style="text-align:center; color:#555;">Tu carrito está vacío 🛒</p>`;
    if (btnFinalizar) {
      btnFinalizar.disabled = true;
      btnFinalizar.style.opacity = "0.5";
      btnFinalizar.style.cursor = "not-allowed";
    }
  } else {
    carrito.forEach((prod, index) => {
      const subtotal = prod.precio * prod.cantidad;
      total += subtotal;

      listaCarrito.innerHTML += `
        <div style="display:flex; justify-content:space-between; align-items:center; margin:5px 0; padding:5px; background:#fff; border-radius:6px;">
          <span>${prod.nombre} - ${prod.cantidad} ${prod.presentacion}(s)</span>
          <span>$${subtotal.toLocaleString()}</span>
          <button onclick="eliminarDelCarrito(${index})" style="background:red; color:white; border:none; border-radius:4px; padding:3px 6px; cursor:pointer;">✖</button>
        </div>
      `;
    });

    listaCarrito.innerHTML += `<p><b>Total: $${total.toLocaleString()}</b></p>`;

    if (btnFinalizar) {
      btnFinalizar.disabled = false;
      btnFinalizar.style.opacity = "1";
      btnFinalizar.style.cursor = "pointer";
    }
  }
}


/* 🔍 Abrir y cerrar el carrito */
function abrirCarrito() {
  document.getElementById("modal-carrito").style.display = "flex";
  mostrarCarrito();
}

function cerrarCarrito() {
  document.getElementById("modal-carrito").style.display = "none";
}

/* 📦 Finalizar compra */
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("⚠️ Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    return;
  }

  // Mostrar modal de pedido
  document.getElementById("modal-pedido").style.display = "flex";
  document.getElementById("modal-carrito").style.display = "none";
}

/* 🔴 Actualizar numerito del carrito */
function actualizarBadge() {
  const badge = document.getElementById("badge-carrito");
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  badge.textContent = totalItems;

  // Ocultar si no hay productos
  badge.style.display = totalItems > 0 ? "flex" : "none";
}


/* ❌ Cerrar el modal de pedido */
function cerrarPedido() {
  document.getElementById("modal-pedido").style.display = "none";
}

/* ✅ Enviar pedido a WhatsApp */
document.getElementById("form-pedido")?.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const observaciones = document.getElementById("observaciones").value;

  // 📦 Detalle del carrito
  const detalle = carrito.map(item => 
    `${item.nombre} - ${item.cantidad} ${item.presentacion}(s) - $${(item.cantidad * item.precio).toLocaleString()}`
  ).join("\n");

  const numeroTienda = "573185241371"; // ← tu número de WhatsApp
  const totalCompra = carrito.reduce((suma, item) => suma + (item.cantidad * item.precio), 0);

  const mensaje = `🛒 *Nuevo pedido desde Click Green* 🌱
👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
🏠 *Dirección:* ${direccion}
📝 *Observaciones:* ${observaciones || "Ninguna"}

📦 *Detalle del pedido:*
${detalle}

💰 *Total:* $${totalCompra.toLocaleString()}`;

  // Enviar a WhatsApp
  const url = `https://wa.me/${numeroTienda}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  // Limpiar carrito
  carrito = [];
  document.querySelectorAll("[id^='cantidad-']").forEach(elem => elem.innerText = "0");
  mostrarCarrito();
  actualizarBadge();


  // Cerrar modales
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


// TESTIMONIOS
function agregarTestimonio() {
  const nombre = document.getElementById("nombre-testimonio").value.trim();
  const comentario = document.getElementById("comentario-testimonio").value.trim();

  if (nombre === "" || comentario === "") {
    alert("Por favor completa ambos campos.");
    return;
  }

  // Crear contenedor
  const nuevoTestimonio = document.createElement("div");
  nuevoTestimonio.classList.add("testimonio");
  
  nuevoTestimonio.innerHTML = `
    <h4>${nombre}</h4>
    <p>${comentario}</p>
  `;

  // Insertar al inicio de la lista
  const lista = document.getElementById("lista-testimonios");
  lista.insertBefore(nuevoTestimonio, lista.firstChild);

  // Limpiar campos
  document.getElementById("nombre-testimonio").value = "";
  document.getElementById("comentario-testimonio").value = "";
}





