document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmBtn");
  const buyForm = document.getElementById('buyForm');
  const buyContainer = document.querySelector('.buy-container');
  const buyTitle = document.querySelector('.buy-title');
  const buySubtitle = document.querySelector('.buy-subtitle');
  const labels = document.querySelectorAll('.buy-form label');

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
    confirmation.style.fontFamily = "'1756 Dutchfont', Georgia, serif";
    confirmation.style.color = "#fff";
    buyContainer.appendChild(confirmation);
  });
});
