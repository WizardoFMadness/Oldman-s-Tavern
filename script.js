document.addEventListener('DOMContentLoaded', () => {
    // --- Title & Quote Animations ---
    const title = document.querySelector('.pop-title');
    const quote = document.querySelector('.inn-quote');
    const buttons = document.querySelector('.inn-buttons');

    if (title) {
        title.classList.add('show-title');
        setTimeout(() => {
            if (quote) quote.classList.add('show');
            if (buttons) buttons.classList.add('show');
        }, 800);
    }

    // --- Sidebar Toggle ---
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            toggleBtn.classList.toggle('open');
        });
    }

    // --- Gift Box Logic ---
    const giftBox = document.getElementById('giftBox');
    const giftSound = document.getElementById('giftSound');
    if (giftBox && giftSound) {
        giftBox.addEventListener('click', () => {
            giftSound.currentTime = 0;
            giftSound.play().catch(err => console.error('Audio playback error:', err));
        });
    }

    // --- Bird Popup Logic ---
    const birdButton = document.getElementById('birdButton');
    const birdPopup = document.getElementById('birdPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const passwordInput = document.getElementById('passwordInput');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const feedbackText = document.getElementById('passwordFeedback');

    if (birdButton && birdPopup && closePopupBtn && passwordInput && submitPasswordBtn) {
        birdButton.addEventListener('click', () => {
            birdPopup.classList.remove('hidden');
            birdPopup.classList.add('show');
            passwordInput.focus();
        });

        closePopupBtn.addEventListener('click', () => {
            birdPopup.classList.add('hidden');
            birdPopup.classList.remove('show');
            passwordInput.value = '';
            feedbackText.textContent = '';
        });

        const handlePassword = () => {
            const input = passwordInput.value.trim().toLowerCase();
            const correctPassword = 'oldman tavern';

            if (input === correctPassword) {
                feedbackText.textContent = 'Access granted!';
                feedbackText.style.color = '#aaffaa';
                setTimeout(() => {
                    window.location.href = 'delivery.html'; // Changed to a relative path
                }, 1000); 
            } else {
                feedbackText.textContent = 'Incorrect password.';
                feedbackText.style.color = '#ffaaaa';
            }
        };

        submitPasswordBtn.addEventListener('click', handlePassword);
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handlePassword();
            }
        });
    }

    // --- Newsletter Auto-Scroll ---
    const scrollContainer = document.getElementById('scrollContainer');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const scrollAmount = 220; 

    if (scrollContainer && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        let autoScrollInterval;
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }, 10000);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        scrollContainer.addEventListener('mouseenter', stopAutoScroll);
        scrollContainer.addEventListener('mouseleave', startAutoScroll);
        startAutoScroll();
    }
});