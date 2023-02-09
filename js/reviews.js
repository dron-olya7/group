let modal = document.querySelector('.modal'); // Фон попап окна
let popupRev = document.querySelector('.popup-rev'); // Само окно
let openPopupRevButtons = document.querySelectorAll('.open-popup-rev'); // Кнопки для показа окна
let closePopupRevButton = document.querySelector('.close-popup-rev'); // Кнопка для скрытия окна

openPopupRevButtons.forEach((button) => { // Перебираем все кнопки
  button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
      e.preventDefault(); // Предотвращаем дефолтное поведение браузера
      modal.classList.add('active'); // Добавляем класс 'active' для фона
      popupRev.classList.add('active'); // И для самого окна
  })
});

closePopupRevButton.addEventListener('click',() => { // Вешаем обработчик на крестик
  modal.classList.remove('active'); // Убираем активный класс с фона
  popupRev.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
  if(e.target === modal) { // Если цель клика - фот, то:
      modal.classList.remove('active'); // Убираем активный класс с фона
      popupRev.classList.remove('active'); // И с окна
  }
});