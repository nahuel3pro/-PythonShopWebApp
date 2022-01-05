/* eslint-disable max-len */
/* eslint-disable radix */
const add = document.querySelectorAll('.add-cart');
const price = document.querySelectorAll('.price');
const name = document.querySelectorAll('.name');
const img = document.querySelectorAll('.img');
// const quantityPrice = document.getElementsByClassName('quantity');

const productos = [];

function setItems(producto) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null && cartItems[producto.name] === undefined) {
    cartItems = {
      ...cartItems,
      [producto.name]: producto,
    };
    producto.inCart = 1;
  } else {
    producto.inCart = 1;

    cartItems = {
      [producto.name]: producto,
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

function totalCostDisplay(totalCostCar) {
  const total = document.querySelector('.total');

  total.innerHTML = `
    <h2>Total: $${totalCostCar}</h2>
    `;
}

function detectarCambiosValues(product) {
  const $quantityPrice = document.querySelectorAll('.quantity');
  const $price = document.querySelectorAll('.price_product');
  const $producto = document.querySelectorAll('.nombre');

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  $quantityPrice.forEach((value, index) => {
    value.addEventListener('change', () => {
      const totalCost1 = localStorage.getItem('totalCost');

      //   const totalCostCart = parseInt(tC) + parseInt($price[index].textContent) * value.valueAsNumber;
      //   localStorage.setItem('totalCost1', totalCostCart);
      //   console.log(value.valueAsNumber);
      cartItems[$producto[index].textContent].inCart = value.valueAsNumber - 1;

      localStorage.setItem('totalCost', parseInt(totalCost1) + parseInt(cartItems[$producto[index].textContent].price));

      const totalPrice = parseInt(totalCost1) + parseInt(cartItems[$producto[index].textContent].price);
      //   localStorage.setItem('totalCost', parseInt(cartCost) + parseInt(product.price));
      totalCostDisplay(totalPrice);
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
          <td class="price_product">${item.price * item.inCart}</td>
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
