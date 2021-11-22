console.log('Loaded')

let carts = document.querySelectorAll('.add-cart');
let price = document.querySelectorAll('.price')
let name = document.querySelectorAll('.name')
let img = document.querySelectorAll('.img')

let quantity_p = document.getElementsByClassName('quantity')

console.log(quantity_p)
// Rellenando valores de los productos en una variable

let products = []

for (let i = 0; i < price.length; i++) {
    products.push(
        {'price': price[i].textContent, 'img': img[i].getAttribute('alt'),
                 'name': name[i].textContent, 'inCart': 0}
    )
}

// -----------------------------------------------------


// Cuando presionan en añadir al carrito
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        // Cuando le dan click al botón, llama a las dos funciones
        
        cartNumbers(products[i]);
        totalCost(products[i]);


    })
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document
            .querySelector('.cart-number')
            .textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document
            .querySelector('.cart-number')
            .textContent = 1;
    }

    setItems(product);

}

// Crando almacenamiento de los productos en el local storage
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }

        cartItems[product.name].inCart += 1;

    } else {
        product.inCart = 1;

        cartItems = {
            [product.name]: product
        }

    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

//Cargando los productos disponibles en el local storage
function loadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document
            .querySelector('.cart-number')
            .textContent = productNumbers;
    }
}

//Poniendo el precio total en el local storage
// function totalCost(product) {
//     let cartCost = localStorage.getItem('totalCost');

//     if (cartCost != null) {
//         localStorage.setItem('totalCost', parseInt(cartCost) + parseInt(product.price));
//     } else {
//         localStorage.setItem('totalCost', parseInt(product.price));
//     }

// }

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    let quantity_p = document.getElementsByClassName('quantity')

    if (cartCost != null) {
        localStorage.setItem('totalCost', parseInt(cartCost) + parseInt(product.price));
    } else {
        localStorage.setItem('totalCost', parseInt(product.price));
    }

}

//Cargando productos ya disponibles en el local storage
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    let cartCost = localStorage.getItem('totalCost');

    let cart_confirm = document.querySelector('.reemplazar_carrito');
    let total = document.querySelector('.total');

    console.log(cartItems);

    if (cartItems && cart_confirm) {
        cart_confirm.innerHTML = '';
        Object
            .values(cartItems)
            .map(item => {
                cart_confirm.innerHTML += `
                <tr>
                    <th scope="row" class="width-img"><img src="../static/product_pics/${item.img}" class="img-cart" alt="dd"></th>
                    <th class='text-center'>
                    <div class='producto_display'>
                        <p class='nombre'>${item.name}</p>
                        <button class='btn-danger btn'>Delete product from cart</button>
                    </div>
                        </th>
                    <td class="max-width-q"><input type=number value=${item.inCart} class='quantity width-img'></td>
                    <td class="price_product">${item.price * item.inCart}</td>
                </tr>
                            `
            });

        total.innerHTML += `
        <h2>Total: $${cartCost}</h2>
        `

    }
}

loadCartNumbers();
displayCart();