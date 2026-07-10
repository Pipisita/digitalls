let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // 1. ABRIR Y CERRAR EL CARRITO
    // =========================================
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.getElementById("close-cart");
    const openCartBtn = document.getElementById("open-cart"); 

    if (openCartBtn) {
        openCartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            cartOverlay.classList.add("active");
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener("click", () => {
            cartOverlay.classList.remove("active");
        });
    }
    
    cartOverlay.addEventListener("click", (e) => {
        if (e.target === cartOverlay) cartOverlay.classList.remove("active");
    });

    // =========================================
    // 2. LÓGICA DE LOS 2 PASOS (PRODUCTOS -> FORMULARIO)
    // =========================================
    const paso1 = document.getElementById("cart-paso-1");
    const paso2 = document.getElementById("cart-paso-2");
    const btnConfirmar = document.getElementById("btn-confirmar-pedido");
    const btnVolver = document.getElementById("btn-volver-paso1");
    const btnEnviarWA = document.getElementById("btn-enviar-wa");

    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", () => {
            if (carrito.length === 0) {
                mostrarNotificacion("El carrito está vacío. ¡Agregá productos primero!");
                return;
            }
            paso1.style.display = "none";
            paso2.style.display = "block";
        });
    }

    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            paso2.style.display = "none";
            paso1.style.display = "block";
        });
    }

    if (btnEnviarWA) {
        btnEnviarWA.addEventListener("click", () => {
            // 1. Capturamos TODOS los datos
            const nombre = document.getElementById("wa-nombre").value.trim();
            const apellido = document.getElementById("wa-apellido").value.trim();
            const telefono = document.getElementById("wa-telefono").value.trim();
            const email = document.getElementById("wa-email").value.trim();
            const empresa = document.getElementById("wa-empresa").value.trim(); // Acá capturamos la empresa
            const provincia = document.getElementById("wa-provincia").value.trim();
            const ciudad = document.getElementById("wa-ciudad").value.trim();

            // 2. Validación de obligatorios
            if (nombre === "" || apellido === "" || telefono === "" || provincia === "" || ciudad === "") {
                mostrarNotificacion("Por favor, completá todos los campos obligatorios.");
                return;
            }

            // Número de Olavarría
            const numeroWhatsApp = "5492284656431"; 

            let textoWA = `*¡Hola Currá! Quiero hacer un pedido:*%0A%0A`;
            textoWA += ` *PRODUCTOS:*%0A`;

            let total = 0;
            carrito.forEach(prod => {
                let subtotal = prod.precio * prod.cantidad;
                textoWA += `- ${prod.cantidad}x ${prod.titulo} ($${subtotal.toLocaleString('es-AR')})%0A`;
                total += subtotal;
            });

            textoWA += `%0A *TOTAL: $${total.toLocaleString('es-AR')}*%0A%0A`;
            
            // 3. Sumamos los datos al mensaje
            textoWA += ` *DATOS DEL CLIENTE:*%0A`;
            textoWA += `- Nombre: ${nombre} ${apellido}%0A`;
            textoWA += `- Teléfono: ${telefono}%0A`;
            
            // Si completaron email o empresa, lo sumamos al texto:
            if (email !== "") textoWA += `- Email: ${email}%0A`;
            if (empresa !== "") textoWA += `- Empresa: ${empresa}%0A`; 
            
            textoWA += `- Ubicación: ${ciudad}, ${provincia}%0A`;

            // 4. Abrimos el WhatsApp
            const urlFinal = `https://wa.me/${numeroWhatsApp}?text=${textoWA}`;
            window.open(urlFinal, "_blank");
        });
    }
});

// =========================================
// 3. FUNCIONES GLOBALES DEL CARRITO
// =========================================
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

// NUEVAS FUNCIONES: Sumar y Restar
window.aumentarCantidad = (index) => {
    carrito[index].cantidad++;
    actualizarCarritoVisual();
};

window.disminuirCantidad = (index) => {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarCarritoVisual();
    } else {
        // Si tiene 1 y le da al menos, lo eliminamos directamente
        eliminarDelCarrito(index);
    }
};

function actualizarCarritoVisual() {
    const cartItems = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");
    
    cartItems.innerHTML = ""; 
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        cartTotalPrice.textContent = "0";
        return;
    }
    
    let total = 0;
    
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        
        const div = document.createElement("div");
        div.style = "display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 15px 0; color: white;";
        
        // ACÁ CAMBIÓ EL DISEÑO PARA AGREGAR LOS BOTONCITOS + Y -
        div.innerHTML = `
            <div style="flex-grow: 1; padding-right: 10px;">
                <p style="margin: 0 0 8px 0; font-size: 0.95rem;">${item.titulo}</p>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="display: flex; align-items: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 2px 8px;">
                        <button onclick="disminuirCantidad(${index})" style="background: none; border: none; color: #aaa; cursor: pointer; font-size: 1.1rem; padding: 0 5px; transition: color 0.3s;">-</button>
                        <span style="margin: 0 10px; font-weight: 600; min-width: 15px; text-align: center;">${item.cantidad}</span>
                        <button onclick="aumentarCantidad(${index})" style="background: none; border: none; color: #aaa; cursor: pointer; font-size: 1.1rem; padding: 0 5px; transition: color 0.3s;">+</button>
                    </div>
                    <p style="margin: 0; color: var(--accent-blue); font-weight: 600;">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
                </div>
            </div>
            <button class="btn-delete-item" onclick="eliminarDelCarrito(${index})" title="Eliminar producto" style="background: none; border: none; color: #ff4d4d; cursor: pointer; padding: 5px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        cartItems.appendChild(div);
    });
    
    cartTotalPrice.textContent = total.toLocaleString('es-AR');
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

