/* eslint-disable max-len */
/* eslint-disable radix */
const add = document.querySelectorAll('.add-cart');
const price = document.querySelectorAll('.price');
const name = document.querySelectorAll('.name');
const img = document.querySelectorAll('.img');

const productos = [];

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

function detectarCambiosValues() {
  const $quantityPrice = document.querySelectorAll('.quantity');
  const $product = document.querySelectorAll('.nombre');

  // Los productos en el carrito y sus propiedades (Se usa el inCart para saber su cantidad ordenada)
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  $quantityPrice.forEach((value, index) => {
    value.addEventListener('change', () => {
      if (value.valueAsNumber > 0) {
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

function displayCart() {
  const totalCostCart = localStorage.getItem('totalCost');
  const cartConfirm = document.querySelector('.reemplazar_carrito');

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  //   console.log(cartItems);

  if (cartItems && cartConfirm) {
    cartConfirm.innerHTML = '';
    Object.values(cartItems).map((item) => {
      cartConfirm.innerHTML += `
          <tr>
          <th scope="row" class="" style='max-width: 12rem'><img src="../static/product_pics/${item.img}" class="img-cart" alt="dd"></th>
          <th class='text-center'>
          <div class='producto_display'>
          <p class='nombre'>${item.name}</p>
          <button class='btn-danger btn'>Delete product from cart</button>
          </div>
          </th>
          <td class="max-width-q"><input type=number value=${item.inCart} class='quantity width-img' min=1></td>
          <td class="price_product">${item.price}</td>
          </tr>
          `;

      return null;
    });
    totalCostDisplay(totalCostCart);
    detectarCambiosValues();
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

add.forEach((value, index) => {
  add[index].onclick = () => {
    add[index].classList.add('disabled');

    console.log(productos[index]);

    cartNumbers(productos[index]);
    totalCost(productos[index]);
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

loadCartNumbers();
displayCart();
