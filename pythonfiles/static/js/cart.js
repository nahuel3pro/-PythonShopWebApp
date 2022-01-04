console.log('Cargado');

const add = document.querySelectorAll('.add-cart');
const productName = document.querySelectorAll('.name');
const price = document.querySelectorAll('.price');

add.forEach((value, index) => {
  add[index].onclick = () => {
    console.log(productName[index].textContent);
    console.log(price[index].textContent);
  };
});
