let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.getElementById("close-cart");
    const openCartBtn = document.getElementById("open-cart"); 

    if (openCartBtn) {
        openCartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            cartOverlay.classList.add("active");
        });
    }

    closeCartBtn.addEventListener("click", () => cartOverlay.classList.remove("active"));
    cartOverlay.addEventListener("click", (e) => {
        if (e.target === cartOverlay) cartOverlay.classList.remove("active");
    });
});

window.agregarAlCarrito = (titulo, precio) => {
    const productoExistente = carrito.find(item => item.titulo === titulo);
    
    if (productoExistente) {
        productoExistente.cantidad++; 
    } else {
        carrito.push({ titulo: titulo, precio: precio, cantidad: 1 }); 
    }
    
    mostrarNotificacion(`Agregado: ${titulo}`);
    actualizarCarritoVisual();
};

window.eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    actualizarCarritoVisual();
};

function actualizarCarritoVisual() {
    const cartItems = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const clientInfo = document.getElementById("cart-client-info");
    
    cartItems.innerHTML = ""; 
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        cartTotalPrice.textContent = "$0";
        clientInfo.style.display = "none"; // Ocultar formulario si está vacío
        return;
    }
    
    clientInfo.style.display = "block"; // Mostrar formulario si hay productos
    let total = 0;
    
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        
        const div = document.createElement("div");
        div.style = "display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 15px 0; color: white;";
        div.innerHTML = `
            <div style="flex-grow: 1; padding-right: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 0.95rem;"><strong>${item.cantidad}x</strong> ${item.titulo}</p>
                <p style="margin: 0; color: var(--accent-blue); font-weight: 600;">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
            </div>
            <button class="btn-delete-item" onclick="eliminarDelCarrito(${index})" title="Eliminar producto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        cartItems.appendChild(div);
    });
    
    cartTotalPrice.textContent = "$" + total.toLocaleString('es-AR');
}

function mostrarNotificacion(mensaje) {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = mensaje;
    
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

document.getElementById("btn-checkout").addEventListener("click", () => {
    if (carrito.length === 0) {
        mostrarNotificacion("El carrito está vacío");
        return;
    }

    // Obtener valores del formulario
    const nombre = document.getElementById("cliente-nombre").value.trim();
    const telefono = document.getElementById("cliente-telefono").value.trim();
    const ciudad = document.getElementById("cliente-ciudad").value.trim();
    const provincia = document.getElementById("cliente-provincia").value.trim();
    const empresa = document.getElementById("cliente-empresa").value.trim();

    // Validación de campos obligatorios
    if (!nombre || !telefono || !ciudad || !provincia) {
        mostrarNotificacion("Completá los campos obligatorios (*)");
        return;
    }
    
    let mensaje = "Hola, quiero realizar el siguiente pedido:%0A%0A";
    
    // Datos del cliente en el mensaje
    mensaje += "*DATOS DEL CLIENTE*%0A";
    mensaje += `- Nombre: ${nombre}%0A`;
    mensaje += `- Teléfono: ${telefono}%0A`;
    mensaje += `- Ubicación: ${ciudad}, ${provincia}%0A`;
    if (empresa) {
        mensaje += `- Empresa: ${empresa}%0A`;
    }
    
    // Detalles del pedido
    mensaje += "%0A*PEDIDO*%0A";
    let totalPedido = 0;
    
    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad;
        mensaje += `- ${item.cantidad}x ${item.titulo} ($${subtotal.toLocaleString('es-AR')})%0A`;
        totalPedido += subtotal;
    });
    
    mensaje += `%0A*TOTAL: $${totalPedido.toLocaleString('es-AR')}*%0A%0A¿Cómo podemos coordinar el pago y la entrega?`;
    
    
    const numeroWhatsApp = "5492284656431"; 
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    
    window.open(url, '_blank');
});