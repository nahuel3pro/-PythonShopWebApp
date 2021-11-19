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
                'tag': img[i].getAttribute('alt'),
                'name': name[i].textContent,
                'InCart': 0 
})
}

console.log(products)



for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        carNumbers();
    })
}

function carNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart-number').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart-number').textContent = 1;
    }

}

function loadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart-number').textContent = productNumbers;
    }
}

loadCartNumbers();