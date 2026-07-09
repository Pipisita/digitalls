// Lógica para mostrar y filtrar productos automáticamente

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("productos-grid");
    const botonesFiltro = document.querySelectorAll(".filter-btn");

    // Función que "dibuja" las tarjetas en el HTML
    function mostrarProductos(categoriaFiltro) {
        grid.innerHTML = ""; // Limpiamos la grilla

        // Filtramos la lista según el botón apretado
        const productosFiltrados = categoriaFiltro === "todo" 
            ? productos 
            : productos.filter(prod => prod.categoria === categoriaFiltro);

        // Creamos el HTML para cada producto
        productosFiltrados.forEach(prod => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "prod-card";
            tarjeta.innerHTML = `
                <div class="prod-img-box">
                    ${prod.etiqueta ? `<span class="prod-badge badge-${prod.colorEtiqueta}">${prod.etiqueta}</span>` : ""}
                    <img src="${prod.imagen}" alt="${prod.titulo}" class="prod-img">
                </div>
                <div class="prod-info">
                    <h3 class="prod-title">${prod.titulo}</h3>
                    <p class="prod-desc">${prod.descripcion}</p>
                    <div class="prod-bottom">
                        <span class="prod-price">$${prod.precio.toLocaleString('es-AR')}</span>
                        <button class="btn-agregar" onclick="agregarAlCarrito('${prod.titulo}', ${prod.precio})">Agregar</button>
                    </div>
                </div>
            `;
            grid.appendChild(tarjeta);
        });
    }

    // Eventos para los botones de filtro
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Le sacamos la clase 'active' a todos y se la ponemos al que se hizo clic
            botonesFiltro.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            // Mostramos los productos de esa categoría
            const categoriaSeleccionada = e.target.getAttribute("data-filter");
            mostrarProductos(categoriaSeleccionada);
        });
    });

    // Iniciar mostrando "Todo" por defecto
    mostrarProductos("todo");
});