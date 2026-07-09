// =========================================
// LÓGICA PARA MOSTRAR Y FILTRAR PRODUCTOS
// =========================================

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
            tarjeta.className = "prod-card"; // <- ESTA ES LA CLASE CLAVE
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
            
            // Si el usuario cambia de categoría, limpiamos el buscador
            const buscadorInput = document.getElementById("buscador-productos");
            if(buscadorInput) buscadorInput.value = "";
        });
    });

    // Iniciar mostrando "Todo" por defecto
    mostrarProductos("todo");
});

// =========================================
// BUSCADOR CON AUTOCOMPLETADO
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const buscadorInput = document.getElementById("buscador-productos");
    const contenedorGrid = document.getElementById("productos-grid");
    const suggestionsList = document.getElementById("search-suggestions");

    if (buscadorInput && suggestionsList) {
        
        // 1. Lo que pasa cuando ESCRIBIMOS
        buscadorInput.addEventListener("input", (e) => {
            const textoBuscado = e.target.value.toLowerCase().trim();
            // CORREGIDO: Ahora busca .prod-card en lugar de .product-card
            const tarjetas = contenedorGrid.querySelectorAll('.prod-card'); 

            if (textoBuscado.length === 0) {
                suggestionsList.innerHTML = "";
                suggestionsList.classList.remove("active");
                tarjetas.forEach(t => t.style.display = "block");
                return;
            }

            const productosFiltrados = productos.filter(prod => 
                prod.titulo.toLowerCase().includes(textoBuscado)
            ).slice(0, 5); 

            suggestionsList.innerHTML = ""; 

            if (productosFiltrados.length > 0) {
                suggestionsList.classList.add("active");
                
                productosFiltrados.forEach(prod => {
                    const li = document.createElement("li");
                    li.className = "suggestion-item";
                    li.textContent = prod.titulo;
                    
                    li.addEventListener("click", () => {
                        buscadorInput.value = prod.titulo; 
                        suggestionsList.classList.remove("active"); 
                        
                        tarjetas.forEach(tarjeta => {
                            const tituloTarjeta = tarjeta.querySelector('h3').textContent.toLowerCase();
                            if (tituloTarjeta === prod.titulo.toLowerCase()) {
                                tarjeta.style.display = "block";
                            } else {
                                tarjeta.style.display = "none";
                            }
                        });
                    });
                    
                    suggestionsList.appendChild(li);
                });
            } else {
                suggestionsList.classList.remove("active");
            }

            tarjetas.forEach(tarjeta => {
                const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
                if (titulo.includes(textoBuscado)) {
                    tarjeta.style.display = "block";
                } else {
                    tarjeta.style.display = "none";
                }
            });
        });

        // 2. Lo que pasa cuando APRETAMOS ENTER (A prueba de balas)
        buscadorInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); 
                
                const primeraSugerencia = suggestionsList.querySelector(".suggestion-item");
                
                if (suggestionsList.classList.contains("active") && primeraSugerencia) {
                    buscadorInput.value = primeraSugerencia.textContent;
                }
                
                suggestionsList.classList.remove("active"); 
                
                const textoFinal = buscadorInput.value.toLowerCase().trim();
                // CORREGIDO: Acá también busca .prod-card
                const tarjetas = contenedorGrid.querySelectorAll('.prod-card');
                
                tarjetas.forEach(tarjeta => {
                    const tituloTarjeta = tarjeta.querySelector('h3').textContent.toLowerCase();
                    if (tituloTarjeta.includes(textoFinal)) {
                        tarjeta.style.display = "block";
                    } else {
                        tarjeta.style.display = "none";
                    }
                });
            }
        });

        // 3. Cerrar la lista si hacemos clic en el fondo de la página
        document.addEventListener("click", (e) => {
            if (e.target !== buscadorInput && e.target !== suggestionsList) {
                suggestionsList.classList.remove("active");
            }
        });
    }
});