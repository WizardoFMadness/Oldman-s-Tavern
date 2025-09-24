window.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.top-title');
  if (title) setTimeout(() => title.classList.add('show-title'), 300);

  const subtitles = document.querySelectorAll('.blog-subtitle');
  subtitles.forEach((sub, i) => {
    setTimeout(() => sub.classList.add('show'), 600 + i * 300);
  });
});
