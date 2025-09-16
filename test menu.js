document.addEventListener("DOMContentLoaded", () => {
    // Cart
    let cart = {};
    const cartBtn = document.getElementById("cartBtn");
    const cartPopup = document.getElementById("cartPopup");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const closeCart = document.getElementById("closeCart");
    const buyButton = document.getElementById("buyButton");

    // Menu item buttons
    document.querySelectorAll(".menu-item").forEach(item => {
        const plus = item.querySelector(".plus");
        const minus = item.querySelector(".minus");
        const count = item.querySelector(".count");
        const foodName = item.querySelector(".food-title").textContent.trim();

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

    // Show / hide cart popup
    cartBtn.addEventListener("click", () => cartPopup.classList.toggle("show"));
    closeCart.addEventListener("click", () => cartPopup.classList.remove("show"));

    // Render cart
    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;
        for (let food in cart) {
            const qty = cart[food];
            const itemElement = Array.from(document.querySelectorAll(".menu-item")).find(el =>
                el.querySelector(".food-title").textContent.trim() === food
            );
            const price = parseFloat(itemElement.querySelector(".price").dataset.price);
            const itemTotal = qty * price;
            total += itemTotal;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `<span class="cart-food-name">${food}</span>
                             <span class="cart-food-total">${itemTotal}G</span>`;
            cartItems.appendChild(div);
        }
        cartTotal.textContent = `Total: ${total}G`;
    }

    // Buy button
    buyButton.addEventListener("click", () => {
        if (Object.keys(cart).length === 0) {
            alert("Cart is empty!");
            return;
        }

        const cartData = { items: cart, total: 0 };

        for (let food in cart) {
            const itemElement = Array.from(document.querySelectorAll(".menu-item")).find(el =>
                el.querySelector(".food-title").textContent.trim() === food
            );
            const price = parseFloat(itemElement.querySelector(".price").dataset.price);
            cartData.total += cart[food] * price;
        }

        localStorage.setItem("cartData", JSON.stringify(cartData));

        // Redirect to Buy Phase
        window.location.href = "BuyPhase.html";
    });
});
