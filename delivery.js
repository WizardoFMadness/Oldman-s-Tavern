document.addEventListener("DOMContentLoaded", () => {
    // --- Setup and DOM Elements ---
    const confirmBtn = document.getElementById('confirmBtn');
    const form = document.getElementById('buyForm');
    const totalAmountSpan = document.getElementById('totalAmount');
    
    console.log("delivery.js script is active. Debugging mode enabled.");

    // Function to create and show a temporary success/error notification
    const showNotification = (message, isSuccess = true) => {
        // Create element with styling (Tailwind classes assumed from HTML setup)
        const notification = document.createElement('div');
        notification.textContent = message;
        
        // Tailwind classes for fixed, responsive, styled notification
        notification.className = isSuccess 
            ? 'fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-2xl z-50 transition-opacity duration-500 opacity-0 md:text-base text-sm'
            : 'fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-2xl z-50 transition-opacity duration-500 opacity-0 md:text-base text-sm';
        
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.classList.remove('opacity-0');
        }, 10);

        // Fade out and remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('opacity-0');
            notification.addEventListener('transitionend', () => notification.remove());
        }, 4000); 
    };

    // --- Price Calculation Logic ---
    const weightInput = document.getElementById('weight');
    const quantityInput = document.getElementById('quantity');
    
    if (weightInput && quantityInput) {
        // Initialize hidden input value to 0
        quantityInput.value = 0;

        weightInput.addEventListener('input', () => {
            const weight = parseFloat(weightInput.value);
            let price = 0;

            if (weight >= 1 && weight <= 10) {
                price = 10;
            } else if (weight > 10 && weight <= 20) {
                price = 20;
            } else if (weight > 20 && weight <= 30) {
                price = 30;
            } else if (weight > 30) {
                price = 40;
            } else {
                price = 0; // If weight is 0 or invalid
            }

            if (totalAmountSpan) {
                totalAmountSpan.textContent = `G${price}`;
                // Update the hidden input for PHP
                quantityInput.value = price;
            }
        });
    }

    // --- Form Submission Logic (Captures errors for debugging) ---

    if (confirmBtn && form) {
        const handleFormSubmission = async (event) => {
            event.preventDefault();
            
            // Basic validation check for minimum weight/price
            const currentPrice = parseFloat(quantityInput?.value || 0);
            if (currentPrice === 0) {
                showNotification("Please enter a valid weight (1kg minimum).", false);
                return;
            }

            if (form.checkValidity()) {
                confirmBtn.textContent = 'Processing...';
                confirmBtn.disabled = true;
                const formData = new FormData(form);

                try {
                    // Send data to the dedicated PHP script
                    const response = await fetch('place_delivery.php', {
                        method: 'POST',
                        body: formData,
                    });
                    
                    const responseText = await response.text();

                    // Check for general HTTP error (e.g., 404 file not found, 500 internal server error)
                    if (!response.ok) {
                        // THIS IS WHERE THE ERROR MESSAGE WILL BE PRINTED
                        console.error('PHP Server Error Response (HTTP Status):', response.status, responseText);
                        showNotification(`Order failed. Server Status ${response.status}. Check console for details.`, false);
                        throw new Error(`HTTP error! status: ${response.status}. Server output: ${responseText.substring(0, 100)}...`);
                    }
                    
                    // CRITICAL CHECK: Look for specific database errors printed by the PHP script
                    if (responseText.includes("Database Connection Failed:") || responseText.includes("SQL Execution Error:")) {
                        console.error('PHP Script reported an error:', responseText);
                        showNotification("Order failed. Database error detected. Check console.", false);
                    } else {
                        // SUCCESS HANDLING: 
                        console.log('PHP Response (Success):', responseText);
                        showNotification('Delivery order successfully recorded and placed!', true);
                        
                        // Reset the form and price display for the next order
                        form.reset();
                        if (totalAmountSpan) {
                            totalAmountSpan.textContent = 'G0';
                            quantityInput.value = 0;
                        }
                    }

                } catch (error) {
                    console.error('Order Submission Failed:', error);
                    showNotification("Order failed. Connection/fetch error. Check console.", false);
                    
                } finally {
                    // Re-enable the button regardless of success/failure
                    confirmBtn.textContent = 'Confirm Delivery';
                    confirmBtn.disabled = false;
                }
            } else {
                form.reportValidity();
            }
        };

        confirmBtn.addEventListener('click', handleFormSubmission);
    }
});
