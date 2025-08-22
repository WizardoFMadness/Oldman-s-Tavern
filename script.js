window.addEventListener('DOMContentLoaded', function () {
  // Title animation
  const title = document.querySelector('.pop-title');
  if (title) {
    title.classList.add('show-title');
    setTimeout(() => {
      document.querySelector('.inn-quote')?.classList.add('show');
      document.querySelector('.inn-buttons')?.classList.add('show');
    }, 800);
  }

  // Sidebar toggle
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      toggleBtn.classList.toggle('open');
    });
  }

  // Gift box
  const giftBox = document.getElementById('giftBox');
  const giftSound = document.getElementById('giftSound');
  const giftMessage = document.getElementById('giftMessage');
  if (giftBox) {
    giftBox.addEventListener('click', () => {
      if (giftSound) {
        giftSound.currentTime = 0;
        giftSound.play().catch(err => console.error('Audio error:', err));
      }
      if (giftMessage) {
        giftMessage.classList.add('show');
        giftMessage.classList.remove('hidden');
        setTimeout(() => {
          giftMessage.classList.remove('show');
          giftMessage.classList.add('hidden');
        }, 4000);
      }
    });
  }

  // Bird popup
  const birdButton = document.getElementById('birdButton');
  const birdPopup = document.getElementById('birdPopup');
  const closePopup = document.getElementById('closePopup');
  const submitPassword = document.getElementById('submitPassword');
  const passwordInput = document.getElementById('passwordInput');
  const feedback = document.getElementById('passwordFeedback');

  if (birdButton) {
    birdButton.addEventListener('click', () => {
      birdPopup.classList.remove('hidden');
      birdPopup.classList.add('show');
    });
  }

  if (closePopup) {
    closePopup.addEventListener('click', () => {
      birdPopup.classList.remove('show');
      birdPopup.classList.add('hidden');
      passwordInput.value = '';
      feedback.textContent = '';
    });
  }

  if (submitPassword) {
    submitPassword.addEventListener('click', () => {
      const input = passwordInput.value.trim().toLowerCase();
      if (input === 'oldman tavern') {
        feedback.textContent = 'Access granted.';
        feedback.style.color = '#aaffaa';
        setTimeout(() => {
          birdPopup.classList.remove('show');
          birdPopup.classList.add('hidden');
          passwordInput.value = '';
          feedback.textContent = '';
        }, 1500);
      } else {
        feedback.textContent = 'Incorrect password.';
        feedback.style.color = '#ffaaaa';
      }
    });
  }
if (passwordInput && submitPassword) {
  // Stop the form from submitting normally
  passwordInput.form?.addEventListener('submit', function(e) {
    e.preventDefault();
    submitPassword.click();
  });

  // Also handle Enter key directly on the input
  passwordInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitPassword.click();
    }
  });
}

});
