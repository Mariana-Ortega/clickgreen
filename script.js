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

/* 🛍️ Agregar productos al carrito */
function agregarAlCarrito(id) {
  const modal = document.getElementById("modal-" + id);
  const cantidad = parseInt(document.getElementById("cantidad-" + id).innerText);

  if (cantidad > 0) {
    const nombre = modal.dataset.nombre;
    const tipo = modal.dataset.tipo || "producto";
    let presentacion = "";
    let precio = 0;

    if (tipo === "combo") {
      presentacion = "combo";
      precio = parseInt(modal.querySelector("[data-precio-combo]").dataset.precioCombo);
    } else {
      presentacion = modal.querySelector("select").value;
      if (presentacion === "libra") {
        precio = parseInt(modal.querySelector("[data-precio-libra]").dataset.precioLibra);
      } else if (presentacion === "kg") {
        precio = parseInt(modal.querySelector("[data-precio-kg]").dataset.precioKg);
      }
    }

    const total = precio * cantidad;
    carrito.push({ nombre, cantidad, presentacion, precio, tipo, total });

    mostrarCarrito();
    cerrarProducto(id);
  }
}

/* 🛒 Mostrar contenido del carrito */
function mostrarCarrito() {
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

/* 🗑️ Eliminar un producto del carrito */
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
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




