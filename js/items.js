fetch("../js/productos.json")
  .then(response => response.json())
  .then(data => {
    const productosContainer = document.querySelector('.productos');
    data.products.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="descripcion">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <span>Precio: $</span>
          <span class="precio">${producto.precio}</span><br>
          <button class="btn-add-cart">Agregar al carrito</button>
        </div>
      `;
      productosContainer.appendChild(productoDiv);
    });
   
})
  
.catch((error) => console.error("Error al cargar el JSON:", error));

class MiTienda {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    addProduct(product) {
        const exist = this.products.find(prod => prod.titulo === product.titulo);
        if(exist){
            exist.cantidad++;
        }else{
            product.cantidad = 1;
            this.products.push(product);
        }

        localStorage.setItem('carrito', JSON.stringify(this.products));
    }

    total() {
        let total = 0;
        for (const product of this.products) {
            total += product.precio * product.cantidad;
        }
        return total;
    }
}

const miCarrito = new MiTienda()

const llamadoAJson = async () => {
    const rpt = await fetch("../js/productos.json")
    const data = await rpt.json()
     
    agregarEvento()   
}
    
llamadoAJson()

function agregarEvento (){
    const btns = document.getElementsByClassName("btn-add-cart")
    
    const allBtns = Array.from(btns)

    allBtns .map(btn=>{
        btn.addEventListener("click", (e)=>{
            let precio = Number(e.target.parentElement.children[3].innerText)
            let titulo = e.target.parentElement.children[0].innerText
            miCarrito.addProduct({
                titulo,
                precio,
                cantidad: 0,
            })
            Swal.fire({
                icon: "success",
                iconColor: "#FF3F72",
                title: "Producto agregado!",
                position: "top-end",
                toast: true,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              })
        })
    })

}

