document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmBtn");
  const buyForm = document.getElementById('buyForm');
  const buyContainer = document.querySelector('.buy-container');

  confirmBtn.addEventListener("click", () => {
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const weight = document.getElementById("weight").value.trim();

    if (!phone || !address || !weight) {
      alert("Please fill in all details!");
      return;
    }

    // Save data to localStorage
    const delivery = { item: phone, address, weight, price: 1 };
    let deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    deliveries.push(delivery);
    localStorage.setItem('deliveries', JSON.stringify(deliveries));

    // Clear the form and show confirmation message
    buyForm.style.display = 'none';
    const confirmation = document.createElement('h2');
    confirmation.textContent = "New delivery order successfully recorded.";
    buyContainer.appendChild(confirmation);
  });
});
