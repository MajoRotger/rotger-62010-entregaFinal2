document.addEventListener('DOMContentLoaded', () => {
    const containerCartProducts = document.getElementById("main");

    function showCart() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        containerCartProducts.innerHTML = "";

        if (carrito.length === 0) {
            containerCartProducts.innerHTML = '';
            Swal.fire({
                title: "Su carrito esta vacio!",
                text: "Si quiere iniciar un nuevo proceso de compra dirijase al link Productos.",
                icon: "info",
                iconColor: "#FF3F72",
                showConfirmButton:false,
                timer: 1000,
            });
            return;
        }

        carrito.forEach(product => {
            containerCartProducts.innerHTML += `<div class="prodEnCarrito">
                <h6 class="tituloProducto">Producto: ${product.titulo}</h6>
                <div class="precioYCantidad">
                    <h6>Precio: $ ${product.precio}</h6>
                    <h6>Cantidad: ${product.cantidad}</h6>
                </div>
            </div>`;
        });

        const total = carrito.reduce((acc, product) => acc + (product.precio * product.cantidad), 0);
        containerCartProducts.innerHTML += `<div>
            <h4>Total: $${total.toFixed(2)}</h4>
            <button id="terminar">Terminar Compra</button>
            <button id="cancelar">Vaciar carrito</button>
        </div>`;

        document.getElementById("cancelar").addEventListener("click", () => {
            Swal.fire({
                title: "Esta seguro que desea cancelar el proceso de compra?",
                text: "Se perderan todos los datos y no podra recuperarlos!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, quiero borrar los datos!",
                cancelButtonText: "Cancelar, quiero seguir!"
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear()
                    showCart();
                    Swal.fire({
                        title: "Los datos fueron eliminados!",
                        text: "Si quiere iniciar un nuevo proceso de compra dirijase al link Productos.",
                        icon: "success",
                        iconColor: "#FF3F72",
                    });
                }
              })
            
        });

        document.getElementById("terminar").addEventListener("click", () => {
            
            Swal.fire({
                title: "Esta seguro que desea terminar el proceso de compra?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Si, quiero pagar",
                denyButtonText: "No, quiero seguir comprando",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear()
                    showCart()
                    Swal.fire({
                        title: "Gracias por su compra!!",
                        color: "rgba(255, 63, 114, 0.7)",
                        timer: 1000,
                        showConfirmButton: false
                    })
                } else if (result.isDenied) {
                Swal.fire({
                    title: "Bien pensado!, Continue en el link de Productos",
                    color: "rgba(255, 63, 114, 0.5)",
                    timer: 1000,
                    showConfirmButton: false
                })
                }
            });        
        });
    }
    showCart();
    
});

