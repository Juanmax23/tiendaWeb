

let articuloCarrito = [];

let totalCompra = 0;

let idAutoNum = 1;

class Articulo {

    constructor(nombre, img, precioAnteriror, precioActual,categoria,stock) {
        this.id = idAutoNum;
        this.name = nombre;
        this.img = img;
        this.precioAnteriror = precioAnteriror;
        this.precioActual = precioActual;
        this.categoria = categoria;
        this.stock = stock;

        idAutoNum++;
    }
}



let articulos = [
    
    {
        "id": 1,
        "name": "Chaleco",
        "description": "para verano o invierno",
        "precioActual": 1000,
        "stock": 5,
        "precioAnteriror": 1500,
        "categoria": "Ropa",
        "img": "img/mochila-cuero-negro-2.jpg"
    },
    {
        "id": 2,
        "name": "Cintos",
        "description": "lo nuevo para el verano",
        "precioActual": 750,
        "stock": 3,
        "precioAnteriror": 1500,
        "categoria": "Ropa",
        "img": "img/mochila-cuero-blanco.jpg"
    },
    {
        "id": 3,
        "name": "chaleco",
        "description": "ponete facha",
        "precioActual": 500,
        "stock": 100,
        "precioAnteriror":1500,
        "categoria": "Descuentos",
        "img": "img/matera-cuero-1.jpg"
    }
   
];

console.log(articulos)