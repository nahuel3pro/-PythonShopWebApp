console.log('Loaded')

let carts = document.querySelectorAll('.add-cart');
let price = document.querySelectorAll('.price')
let name = document.querySelectorAll('.name')
let img = document.querySelectorAll('.img')

// Rellenando valores de los productos en una variable

let products = [

]

for (let i = 0; i< price.length; i++){
    products.push({'price': price[i].textContent,
                'img': img[i].getAttribute('alt'),
                'name': name[i].textContent,
                'inCart': 0
})
}

/// -------->  


for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-number').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-number').textContent = 1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    
    if (cartItems!= null){

        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }

        cartItems[product.name].inCart +=1;
        
    }else{
        product.inCart = 1;
    
        cartItems = {
            [product.name]: product
        }

    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function loadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart-number').textContent = productNumbers;
    }
}


function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    
    if(cartCost != null){
        localStorage.setItem('totalCost', parseInt(cartCost) + parseInt(product.price));                
        console.log(typeof parseInt(cartCost), parseInt(cartCost));
    }else{
        localStorage.setItem('totalCost', parseInt(product.price));        
        console.log(typeof parseInt(cartCost), parseInt(cartCost));
    }
    
}

loadCartNumbers();