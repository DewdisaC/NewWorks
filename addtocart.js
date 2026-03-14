const product = [
  {
    id: 0,
    image: 'image/gg-1.jpg',
    title: 'Galaxy Z Flip Foldable Phone',
    price: 120000,
    tag: 'New Arrival'
  },
  {
    id: 1,
    image: 'image/hh-2.jpg',
    title: 'AirPods Pro Wireless Earbuds',
    price: 60000,
    tag: 'Best Seller'
  },
  {
    id: 2,
    image: 'image/6108792.jpg',
    title: 'Canon 250D DSLR Camera',
    price: 230000,
    tag: 'Premium'
  },
  {
    id: 3,
    image: 'image/aa-1.jpg',
    title: 'Studio Headphones',
    price: 100000,
    tag: 'Hot Deal'
  }
];

const categories = [...new Set(product.map((item) => item))];
let cart = [];

const formatCurrency = (value) => `LKR ${value.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const productGrid = document.getElementById('root');
productGrid.innerHTML = categories.map((item, index) => {
  const { image, title, price, tag } = item;
  return `
    <div class="box">
      <div class="img-box">
        <img class="images" src="${image}" alt="${title}">
      </div>
      <div class="bottom">
        <p class="product-title">${title}</p>
        <div class="product-meta">
          <h2 class="product-price">${formatCurrency(price)}</h2>
          <span class="product-tag">${tag}</span>
        </div>
        <button class="product-btn" onclick="addtocart(${index})">Add to Cart</button>
      </div>
    </div>`;
}).join('');

function addtocart(index) {
  cart.push({ ...categories[index] });
  displaycart();
}

function delElement(index) {
  cart.splice(index, 1);
  displaycart();
}

function displaycart() {
  const cartCount = document.getElementById('count');
  const cartItem = document.getElementById('cartItem');
  const totalField = document.getElementById('total');
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItem.innerHTML = 'Your cart is empty';
    totalField.textContent = formatCurrency(0);
    return;
  }

  let total = 0;
  cartItem.innerHTML = cart.map((items, itemIndex) => {
    const { image, title, price } = items;
    total += price;
    return `
      <div class="cart-item">
        <div class="row-img">
          <img class="rowimg" src="${image}" alt="${title}">
        </div>
        <p class="item-title">${title}</p>
        <h2 class="item-price">${formatCurrency(price)}</h2>
        <i class="fa-solid fa-trash" onclick="delElement(${itemIndex})" title="Remove item"></i>
      </div>`;
  }).join('');

  totalField.textContent = formatCurrency(total);
}
