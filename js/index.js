const containerCartProducts = document.getElementsByClassName("container-cart-products")

const cartInfo = document.querySelector(".cart-product")

const rowProduct = document.querySelector('.row')

const productsList = document.querySelector(".productos")

let allProducts = JSON.parse(localStorage.getItem("carrito")) || []

const countProducts = document.querySelector("#contador-productos")

const total= document.querySelector("#valor-total")

productsList.addEventListener("click", ev => {
    if(ev.target.classList.contains("btn-add-cart")){
        const product = ev.target.parentElement
        
        const infoProduct = {
            quantity: 1,
            title: product.querySelector("h3").textContent,
            price: product.querySelector(".precio").textContent
        }

        const infoTotal = {
            total: 0
        }

        const exist = allProducts.some(product => product.title === infoProduct.title)
        
        if(exist){
            const products = allProducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++
                    return product
                }else{
                    return product
                }
            })
            allProducts = products
        }else{
            allProducts.push(infoProduct)
        }

        localStorage.setItem("carrito", JSON.stringify(allProducts))

        showCart()
    }
})

rowProduct.addEventListener("click", ev=>{
    if(ev.target.classList.contains("btn-sup-cart")){
        const product = ev.target.parentElement
        const title = product.querySelector("p").textContent.slice(10)
        let qty = Number(product.querySelector("span").textContent.slice(10))

        const products = allProducts.map(product =>{

        if(product.title == title){
            qty --
            product.quantity = qty
            return product 
        }else{
            return product
        }
        })
        allProducts = products
        localStorage.setItem("carrito", JSON.stringify(allProducts))

        showCart()
    }
})

rowProduct.addEventListener("click", ev=>{
    if(ev.target.classList.contains("terminar-compra")){
        localStorage.clear()
        allProducts = []
        showCart()
    }
})


function showCart(){
    //Limpiar el carrito
    rowProduct.innerHTML = ""

    let totalQty= 0

    let totalOfProducts= 0

    allProducts.forEach(product => {
        const containerProduct = document.createElement("div")

        containerProduct.classList.add("cart-product")

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">Cantidad: ${product.quantity}</span>
                <p class="titulo-producto-carrito">Producto: ${product.title}</p>
                <span class="precio-producto-carrito">Precio unitario: $ ${product.price}</span>
                <button class="btn-sup-cart">Eliminar del carrito</button>
            </div>
            
        `
       rowProduct.append(containerProduct)
       
       totalQty = totalQty + parseInt(product.quantity * product.price)    

       totalOfProducts = totalOfProducts + product.quantity
              
    })

    total.innerText = totalQty
    countProducts.innerText = totalOfProducts

    const containerTotal = document.createElement("div")

    containerTotal.classList.add(".cantidad-producto-carrito-total")
    containerTotal.innerHTML = `
            <div class="info-cart-total">
                <span class="cantidad-producto-carrito-total">Total a pagar: $ ${total.innerText}</span>
                <button class="terminar-compra">Terminar compra</button>
            </div>
        `
    rowProduct.append(containerTotal)

}

