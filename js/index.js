const containerCartProducts = document.getElementsByClassName("container-cart-products")

const cartInfo = document.querySelector(".cart-product")
const rowProduct = document.querySelector('.row')

const productsList = document.querySelector(".productos")

let allProducts = []

const countProducts = document.querySelector("#contador-productos")

const valorTotal = document.querySelector("#valor-total")

console.log(valorTotal)
console.log(countProducts)

productsList.addEventListener("click", ev => {
    if(ev.target.classList.contains("btn-add-cart")){
        const product = ev.target.parentElement
        
        const infoProduct = {
            quantity: 1,
            title: product.querySelector("h3").textContent,
            price: product.querySelector(".precio").textContent
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
            allProducts = [...products]
        }else{
            allProducts = [...allProducts, infoProduct]
        }

        showCart()
    }
})

function showCart(){

    //Limpiar el carrito
    rowProduct.innerHTML = ""

    let total= 0
    let totalOfProducts= 0


    allProducts.forEach(product => {
        const containerProduct = document.createElement("div")

        
        containerProduct.classList.add("cart-product")

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
        `
       rowProduct.append(containerProduct)

       total = total + parseInt(product.quantity * product.price)

       console.log(total)
       

       totalOfProducts = totalOfProducts + product.quantity
       console.log(totalOfProducts)
    })

    valorTotal.innerText = `${total}`
    countProducts.innerText = totalOfProducts

}