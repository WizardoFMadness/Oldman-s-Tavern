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

  // Get cart from localStorage
  const cartData = JSON.parse(localStorage.getItem("cartData") || '{}');

  const buyForm = document.getElementById('buyForm');

  if (cartData.items) {
      // Show ordered items in the form (as a paragraph)
      const itemsList = document.createElement('p');
      itemsList.id = 'orderedItems';
      itemsList.textContent = "Items: ";
      for (let food in cartData.items) {
          itemsList.textContent += `${food} (x${cartData.items[food]}), `;
      }
      buyForm.insertBefore(itemsList, buyForm.firstChild);

      // Store items and total in hidden fields for backend
      let itemsInput = document.createElement('input');
      itemsInput.type = 'hidden';
      itemsInput.name = 'ordered_items';
      itemsInput.value = JSON.stringify(cartData.items);
      buyForm.appendChild(itemsInput);

      let totalInput = document.createElement('input');
      totalInput.type = 'hidden';
      totalInput.name = 'total_amount';
      totalInput.value = cartData.total;
      buyForm.appendChild(totalInput);

      document.getElementById('totalAmount').textContent = `G${cartData.total}`;
      document.getElementById('quantity').value = cartData.total;
  }

  // Confirm purchase
  confirmBtn.addEventListener("click", () => {
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    if (!phone || !address || !email) {
      alert("Please fill in all details!");
      return;
    }

    // Optional: save user info to localStorage
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userAddress", address);
    localStorage.setItem("userEmail", email);

    // Submit the form to PHP backend
    buyForm.submit();
  });
});
