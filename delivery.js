document.addEventListener("DOMContentLoaded", () => {
    const weightInput = document.getElementById('weight');
    const totalAmount = document.getElementById('totalAmount');
    const quantityInput = document.getElementById('quantity');

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
});
