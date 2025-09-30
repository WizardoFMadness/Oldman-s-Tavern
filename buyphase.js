document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmBtn");
  const buyForm = document.getElementById('buyForm');
  const buyContainer = document.querySelector('.buy-container');

  confirmBtn.addEventListener("click", () => {
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!phone || !address || !email) {
      alert("Please fill in all details!");
      return;
    }

    // Save data to localStorage
    const order = { phone, address, email, food_id: 1, quantity: 1, total_amount: 0 };
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the form and show confirmation message
    buyForm.style.display = 'none';
    const confirmation = document.createElement('h2');
    confirmation.textContent = "Order successfully placed!";
    buyContainer.appendChild(confirmation);
  });
});
