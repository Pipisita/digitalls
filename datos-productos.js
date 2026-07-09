// ARCHIVO PARA QUE EL DUEÑO CARGUE LOS PRODUCTOS
// Solo hay que copiar un bloque {...} , pegarlo abajo y cambiarle los textos.

const productos = [
    {
        categoria: "computadoras",
        etiqueta: "Nuevo",
        colorEtiqueta: "teal", // Colores disponibles: teal, orange, blue, red, purple, dark
        imagen: "https://statics.qloud.ar/gaming-point-06-2021/221_13-03-2023-03-03-39-pc-gamer-ryzen-3-3200g-16gb-ram-ssd-480gb-gabinete-kit.png", // Acá va la ruta de la foto, ej: "img/pc1.jpg"
        titulo: "PC Gamer Ryzen 5 5600G",
        descripcion: "AMD Ryzen 5 · 16GB RAM · SSD 512GB · RTX 3060",
        precio: "620000"
    },
    {
        categoria: "notebooks",
        etiqueta: "Oferta",
        colorEtiqueta: "orange",
        imagen: "https://p4-ofp.static.pub//fes/cms/2024/05/28/kz0o3bgt3ajxnjjk5tutg4rc8gnu3c631440.png",
        titulo: "Notebook Lenovo IdeaPad 3",
        descripcion: "Intel Core i5 · 8GB RAM · SSD 256GB · 15.6\" FHD",
        precio: "480000"
    },
    {
        categoria: "impresoras",
        etiqueta: "Más vendido",
        colorEtiqueta: "blue",
        imagen: "https://nanotroniconline.com/wp-content/uploads/2023/05/1-1.png",
        titulo: "Epson EcoTank L3250",
        descripcion: "Multifunción · WiFi · Tinta continua · Color",
        precio: "165000"
    },
    {
        categoria: "insumos",
        etiqueta: "Original",
        colorEtiqueta: "dark",
        imagen: "https://ar-media.hptiendaenlinea.com/catalog/product/F/6/F6V29AL-1_T1679641584.png",
        titulo: "Cartucho HP 664 Negro Original",
        descripcion: "Compatible con HP DeskJet · 120 páginas",
        precio: "8500"
    }
];