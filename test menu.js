let cart = {};

const cartBtn = document.getElementById("cartBtn");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");

document.querySelectorAll(".menu-item").forEach(item => {
  const plus = item.querySelector(".plus");
  const minus = item.querySelector(".minus");
  const count = item.querySelector(".count");
  const foodName = item.querySelector(".food-title").textContent.trim(); // FIXED
  const price = parseFloat(item.querySelector(".price").dataset.price);

  plus.addEventListener("click", e => {
    e.stopPropagation();
    if (!cart[foodName]) cart[foodName] = 0;
    cart[foodName]++;
    count.textContent = cart[foodName];
    renderCart();
  });

  minus.addEventListener("click", e => {
    e.stopPropagation();
    if (cart[foodName]) {
      cart[foodName]--;
      if (cart[foodName] <= 0) {
        delete cart[foodName];
        count.textContent = 0;
      } else {
        count.textContent = cart[foodName];
      }
      renderCart();
    }
  });
});

cartBtn.addEventListener("click", () => {
  cartPopup.classList.toggle("show");
});

closeCart.addEventListener("click", () => {
  cartPopup.classList.remove("show");
});

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  for (let food in cart) {
    const qty = cart[food];
    const itemElement = Array.from(document.querySelectorAll(".menu-item")).find(el =>
      el.querySelector(".food-title").textContent.trim() === food // FIXED
    );
    const price = parseFloat(itemElement.querySelector(".price").dataset.price);
    const itemTotal = qty * price;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span class="cart-food-name">${food}</span>
      <span class="cart-food-total">${itemTotal}G</span>`;
    cartItems.appendChild(div);
  }

  cartTotal.textContent = `Total: ${total}G`;
}

// Sidebar toggle
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  toggleBtn.classList.toggle('open');
});

// Animate title on page load
window.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.pop-title');
  if (title) {
    setTimeout(() => {
      title.classList.add('animate-title');
    }, 200); // delay for effect
  }
});
