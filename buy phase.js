// food-menu.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Food Menu JS loaded");

  const cartTotalEl = document.getElementById("cartTotal");
  const buyButton = document.getElementById("buyButton");
  let total = 0;

  // Add items to cart
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const price = parseInt(button.dataset.price, 10);
      total += price;
      cartTotalEl.textContent = "Total: $" + total;
    });
  });

  // ✅ Redirect to Buy Phase when Buy button is clicked
  if (buyButton) {
    buyButton.addEventListener("click", () => {
      if (total > 0) {
        // 👉 Redirect to buy phase with total
        window.location.href = "../buy-phase/buy.html?total=" + total;
      } else {
        alert("Please add something to your cart first 🛒");
      }
    });
  }
});
