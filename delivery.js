
document.addEventListener("DOMContentLoaded", () => {
    const weightInput = document.getElementById('weight');
    const totalAmount = document.getElementById('totalAmount');
    const quantityInput = document.getElementById('quantity');

    // --- TITLE & SUBTITLE SHOW ---
    const title = document.querySelector(".buy-title");
    const subtitle = document.querySelector(".buy-subtitle");
    setTimeout(() => {
        title.classList.add("show-title");
    }, 300); // delay for smooth effect
    setTimeout(() => {
        subtitle.classList.add("show-subtitle");
    }, 800);

    // --- PRICE CALCULATION ---
    weightInput.addEventListener('input', () => {
        const weight = parseFloat(weightInput.value);
        let price = 0;

        if (weight >= 1 && weight <= 10) {
            price = 10;
        } else if (weight >= 11 && weight <= 20) {
            price = 20;
        } else if (weight >= 21 && weight <= 30) {
            price = 30;
        } else if (weight > 30) {
            price = 40;
        }

        totalAmount.textContent = `G${price}`;
        quantityInput.value = price; // store for backend
    });
<<<<<<< HEAD
=======
});
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".buy-title");
  const subtitles = document.querySelectorAll(".buy-subtitle");

  // Animate main title
  setTimeout(() => {
    title.classList.add("show-title");
  }, 200);

  // Animate each subtitle one after another
  subtitles.forEach((subtitle, index) => {
    setTimeout(() => {
      subtitle.classList.add("show-subtitle");
    }, 600 + index * 400); 
    // First subtitle at 600ms, then every 400ms later
  });


  document.getElementById('confirmBtn').addEventListener('click', () => {
    // Optional: you can alert or log total before redirect
    const total = document.getElementById('totalAmount').textContent;
    console.log('Total Amount:', total);

    // Redirect to buy phase page
    window.location.href = 'BuyPhase.html';
});
>>>>>>> f9088f1d7aa2caee6b8a2c2fe498c43301b6f64b
});