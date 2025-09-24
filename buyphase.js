document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmBtn");
  const title = document.querySelector('.buy-title');
  const subtitle = document.querySelector('.buy-subtitle');

  // Animate title & subtitle
  setTimeout(() => title.classList.add('show-title'), 200);
  setTimeout(() => subtitle.classList.add('show-subtitle'), 1000);

  // Animate labels
  const labels = document.querySelectorAll('.buy-form label');
  labels.forEach((label, index) => {
    setTimeout(() => label.classList.add('show-label'), 1200 + index * 200);
  });

  // Confirm purchase
  confirmBtn.addEventListener("click", () => {
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    if (!phone || !address || !email) {
      alert("Please fill in all details!");
      return;
    }

    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userAddress", address);
    localStorage.setItem("userEmail", email);

    alert("Purchase confirmed! Thank you.");
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const totalAmount = document.getElementById("totalAmount");

    const cartData = JSON.parse(localStorage.getItem("cartData"));
    if (cartData) {
        totalAmount.textContent = `${cartData.total}G`;
    }
});