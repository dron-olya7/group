// считываем кнопку
const goTopBtn = document.querySelector(".go-top");

// обработчик на скролл окна
window.addEventListener("scroll", trackScroll);
// обработчик на нажатии
goTopBtn.addEventListener("click", goTop);

function trackScroll() {
  const scrolled = window.pageYOffset;
  const pageHeight = document.documentElement.scrollHeight;
  const windowHeight = document.documentElement.clientHeight;
  
  // Показывать кнопку после прокрутки 30% страницы
  const scrollThreshold = pageHeight * 0.3;
  
  if (scrolled > windowHeight * 2) {
    goTopBtn.classList.add("go-top--show");
  } else {
    goTopBtn.classList.remove("go-top--show");
  }
}

function goTop() {
  // Используем современный плавный скролл вместо рекурсии
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}