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
    }else{
        localStorage.setItem('totalCost', parseInt(product.price));        
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart_confirm = document.querySelector('.cartShow');

    console.log(cartItems);


    if(cartItems && cart_confirm){
        cart_confirm.innerHTML = '';
        Object.values(cartItems).map(item => {
            cart_confirm.innerHTML += `
            <div class="container-fluid pb-5 mt-n2 mt-md-n3">
    <div class="row">
        <div class="col-xl-9 col-md-8">
            <h2 class="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-secondary"><span>Products</span><a class="font-size-sm" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left" style="width: 1rem; height: 1rem;"><polyline points="15 18 9 12 15 6"></polyline></svg>Continue shopping</a></h2>
            <!-- Item-->
            <div class="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
                <div class="media d-block d-sm-flex text-center text-sm-left">
                    <img src="../static/product_pics/${item.img}" alt="${item.img}">
                    <div class="media-body pt-3">
                        <h3 class="product-card-title font-weight-semibold border-0 pb-0">${item.name}</h3>
                    <!--    <div class="font-size-sm"><span class="text-muted mr-2">Size:</span>8.5</div>    -->
                    <!--    <div class="font-size-sm"><span class="text-muted mr-2">Color:</span>Black</div> -->
                        <div class="font-size-lg text-primary pt-2">$${item.price}</div>
                    </div>
                </div>
                <div class="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left" style="max-width: 10rem;">
                    <div class="form-group mb-2">
                       <label for="quantity1">Quantity</label>
                        <p>${item.inCart}</p>
                    </div>
                    <!-- 
                    <button class="btn btn-outline-secondary btn-sm btn-block mb-2" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw mr-1">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>Update cart</button> -->
                    <button class="btn btn-outline-danger btn-sm btn-block mb-2" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-1">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>Remove</button>
                </div>
            </div>

            `
        })
    }
}

loadCartNumbers();
displayCart();