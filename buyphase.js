document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmBtn");
  const buyForm = document.getElementById('buyForm');
  const buyContainer = document.querySelector('.buy-container');
  const buyTitle = document.querySelector('.buy-title');
  const buySubtitle = document.querySelector('.buy-subtitle');
  const labels = document.querySelectorAll('.buy-form label');
  const totalAmount = document.getElementById('totalAmount');

  // Load cart data from localStorage
  const cartData = JSON.parse(localStorage.getItem('cartData'));
  if (cartData) {
    totalAmount.textContent = `Total: ${cartData.total}G`;
  } else {
    totalAmount.textContent = 'Total: 0G';
  }

  // Animate title
  setTimeout(() => {
    buyTitle.classList.add('show-title');
  }, 200);

  // Animate subtitle
  setTimeout(() => {
    buySubtitle.classList.add('show-subtitle');
  }, 600);

  // Animate labels
  labels.forEach((label, index) => {
    setTimeout(() => {
      label.classList.add('show-label');
    }, 1000 + index * 200);
  });

  confirmBtn.addEventListener("click", () => {
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!phone || !address || !email) {
      alert("Please fill in all details!");
      return;
    }

    // Save data to localStorage
    const order = { phone, address, email, food_id: 1, quantity: 1, total_amount: cartData ? cartData.total : 0 };
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the form and show confirmation message
    buyForm.style.display = 'none';
    const confirmation = document.createElement('h2');
    confirmation.textContent = "Order successfully placed!";
    confirmation.style.fontFamily = "'1756 Dutchfont', Georgia, serif";
    confirmation.style.color = "#fff";
    buyContainer.appendChild(confirmation);
  });
});
