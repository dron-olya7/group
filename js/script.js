window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) { // Изменяем фон после прокрутки на 50px
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});