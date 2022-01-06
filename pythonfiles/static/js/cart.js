/* eslint-disable max-len */
/* eslint-disable radix */
const add = document.querySelectorAll('.add-cart');
const price = document.querySelectorAll('.price');
const name = document.querySelectorAll('.name');
const img = document.querySelectorAll('.img');
const $cart = document.querySelector('#cart');
const $carrito = document.querySelector('#carrito');

const productos = [];

function cartAnimationWhite() {
  $carrito.classList.add('text-white');
  setTimeout(() => {
    $carrito.classList.remove('text-white');
  }, 600);
}

function cartAnimation() {
  $cart.classList.add('scale-up-center');
  setTimeout(() => {
    $cart.classList.remove('scale-up-center');
  }, 600);
}

function hide($element) {
  $element.classList.add('d-none');
}

function display($element) {
  $element.classList.remove('d-none');
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null && cartItems[product.name] === undefined) {
    cartItems = {
      ...cartItems,
      [product.name]: product,
    };
    product.inCart = 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.name]: product,
    };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function cartNumbers(producto) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers, 10);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart-number').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart-number').textContent = 1;
  }

  setItems(producto);
}

function loadCartNumbers() {
  const productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart-number').textContent = productNumbers;
  }
}

function totalCostDisplay(totalCostCart) {
  const total = document.querySelector('.total');

  total.innerHTML = `
    <h2>Total: $${totalCostCart}</h2>
    `;
}

function changeValues() {
  const $quantityPrice = document.querySelectorAll('.quantity');
  const $product = document.querySelectorAll('.nombre');

  // Los productos en el carrito y sus propiedades (Se usa el inCart para saber su cantidad ordenada)
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  $quantityPrice.forEach((value, index) => {
    value.addEventListener('change', () => {
      if (value.valueAsNumber > 0 && value.valueAsNumber < 1000000) {
        // Precio total en local storage
        const costoTotal = localStorage.getItem('totalCost');
        // Los productos en el carrito y sus propiedades (Se usa el inCart para saber su cantidad ordenada)
        let productsInCart = localStorage.getItem('productsInCart');
        productsInCart = JSON.parse(productsInCart);

        let totalPrice;

        if (value.valueAsNumber > productsInCart[$product[index].textContent].inCart) {
          totalPrice = parseInt(costoTotal) + parseInt(cartItems[$product[index].textContent].price) * (value.valueAsNumber - productsInCart[$product[index].textContent].inCart);
          productsInCart[$product[index].textContent].inCart = value.valueAsNumber;
        } else {
          totalPrice = parseInt(costoTotal) - parseInt(cartItems[$product[index].textContent].price) * (productsInCart[$product[index].textContent].inCart - value.valueAsNumber);
          productsInCart[$product[index].textContent].inCart = value.valueAsNumber;
        }

        localStorage.setItem('totalCost', totalPrice);
        localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
        totalCostDisplay(totalPrice);
      } else {
        $quantityPrice[index].value = 1;
      }
    });
  });
}

function deleteAllProducts() {
  localStorage.removeItem('totalCost');
  localStorage.removeItem('cartNumbers');
  localStorage.removeItem('productsInCart');
}

function deleteIfNoProducts() {
  let cartNumbersLS = localStorage.getItem('cartNumbers');
  cartNumbersLS = JSON.parse(cartNumbersLS);

  if (!cartNumbersLS) {
    deleteAllProducts();
    hide(document.querySelector('#cartDisplay'));
    display(document.querySelector('#nothing'));
  }
}

function deleteFromLS($element) {
  let product = localStorage.getItem('productsInCart');
  product = JSON.parse(product);
  let cartNumbersLS = localStorage.getItem('cartNumbers');
  cartNumbersLS = JSON.parse(cartNumbersLS);
  let totalCostLS = localStorage.getItem('totalCost');
  totalCostLS = JSON.parse(totalCostLS);

  totalCostLS -= (product[$element.textContent].price * product[$element.textContent].inCart);
  cartNumbersLS -= 1;
  delete product[$element.textContent];

  localStorage.setItem('totalCost', totalCostLS);
  localStorage.setItem('productsInCart', JSON.stringify(product));
  localStorage.setItem('cartNumbers', cartNumbersLS);
}

function deleteFromPage($product) {
  $product.remove();
}

function updateValues() {
  let totalPrice = localStorage.getItem('totalCost');
  totalPrice = JSON.parse(totalPrice);
  let cartNumbersLS = localStorage.getItem('cartNumbers');
  cartNumbersLS = JSON.parse(cartNumbersLS);

  document.querySelector('.cart-number').textContent = cartNumbersLS;
  totalCostDisplay(totalPrice);
}

function deleteProduct() {
  const $delete = document.querySelectorAll('.delete');
  const $productName = document.querySelectorAll('.nombre');
  const $product = document.querySelectorAll('.productItSelf');

  $delete.forEach((element, index) => {
    element.onclick = () => {
      deleteFromLS($productName[index]);
      deleteFromPage($product[index]);
      updateValues();
      deleteIfNoProducts();
      cartAnimation();
    };
  });
}

function displayCart() {
  const totalCostCart = localStorage.getItem('totalCost');
  const cartConfirm = document.querySelector('.reemplazar_carrito');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems && cartConfirm) {
    display(document.querySelector('#cartDisplay'));
    hide(document.querySelector('#nothing'));

    cartConfirm.innerHTML = '';
    Object.values(cartItems).map((item) => {
      cartConfirm.innerHTML += `
      <tr class="${item.name} productItSelf">
      <th scope="row" class="" style='max-width: 12rem'><img src="../static/product_pics/${item.img}" class="img-cart" alt="dd"></th>
      <th class='text-center'>
      <div class='producto_display'>
      <p class='nombre'>${item.name}</p>
      <button class='btn-danger btn delete'>Delete product from cart</button>
      </div>
      </th>
          <td class="max-width-q"><input type=number value=${item.inCart} class="mt-2 quantity width-img" min=1></td>
          <td class="price_product">${item.price}</td>
          </tr>
          `;

      return null;
    });
    totalCostDisplay(totalCostCart);
    changeValues();
    deleteProduct();
  } else if (!cartItems) {
    hide(document.querySelector('#cartDisplay'));
    display(document.querySelector('#nothing'));
  }
}

function totalCost(product) {
  const cartCost = localStorage.getItem('totalCost');
  //   const quantityPrice = document.getElementsByClassName('quantity');

  if (cartCost != null) {
    localStorage.setItem('totalCost', parseInt(cartCost) + parseInt(product.price));
  } else {
    localStorage.setItem('totalCost', parseInt(product.price));
  }
}

function markAsUnavailable() {
  const $name = document.querySelectorAll('.name');
  const $add = document.querySelectorAll('.add-cart');

  if (window.location.pathname === '/HomePage') {
    let productsInCart = localStorage.getItem('productsInCart');
    productsInCart = JSON.parse(productsInCart);

    Object.keys(productsInCart).forEach((productNameInCart) => {
      $name.forEach((value, index) => {
        if (value.textContent === productNameInCart) {
          $add[index].classList.add('disabled');
        }
      });
    });
  }
}

add.forEach((value, index) => {
  add[index].onclick = () => {
    add[index].classList.add('disabled');

    cartNumbers(productos[index]);
    totalCost(productos[index]);
    cartAnimation();
    cartAnimationWhite();
  };
});

for (let i = 0; i < add.length; i += 1) {
  productos.push(
    {
      price: price[i].textContent,
      img: img[i].getAttribute('alt'),
      name: name[i].textContent,
      inCart: 0,
    },
  );
}

if (document.querySelector('#order')) {
  document.querySelector('#order').onclick = () => {
    deleteAllProducts();
    updateValues();
    display(document.querySelector('#thanks'));
    hide(document.querySelector('#cartDisplay'));
    hide(document.querySelector('#nothing'));
  };
}

if (document.querySelector('#deleteAll')) {
  document.querySelector('#deleteAll').onclick = () => {
    deleteAllProducts();
    updateValues();
    cartAnimation();
    hide(document.querySelector('#cartDisplay'));
    display(document.querySelector('#nothing'));
  };
}

loadCartNumbers();
displayCart();
markAsUnavailable();
