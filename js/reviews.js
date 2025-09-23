document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация для двух попапов
    const popupConfigs = [
        {
            openButtons: '.button-contact',
            popupBg: '.popup__bg',
            popup: '.popup',
            closeButton: '.close-popup',
            formId: 'popup__form',
            type: 'contact'
        },
        {
            openButtons: '.button-reviews',
            popupBg: '.popup-rev',
            popup: '.modal',
            closeButton: '.close-popup-rev',
            formId: 'review-form',
            type: 'review'
        }
    ];

    // Инициализация всех попапов
    popupConfigs.forEach(config => {
        initPopup(config);
    });

    function initPopup(config) {
        const popupBg = document.querySelector(config.popupBg);
        const popup = document.querySelector(config.popup);
        const openPopupButtons = document.querySelectorAll(config.openButtons);
        const closePopupButton = document.querySelector(config.closeButton);
        const form = document.getElementById(config.formId);

        if (!popupBg || !popup || openPopupButtons.length === 0 || !closePopupButton || !form) {
            console.log(`Не все элементы попапа ${config.type} найдены`);
            return;
        }

        console.log(`Попап ${config.type} инициализирован`);

        function openPopup(e) {
            if (e) e.preventDefault();
            console.log(`Открываем попап ${config.type}`);
            
            popupBg.classList.add('active');
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
            clearErrors(form);
        }

        function closePopup() {
            console.log(`Закрываем попап ${config.type}`);
            
            popupBg.classList.remove('active');
            popup.classList.remove('active');
            document.body.style.overflow = '';
            clearErrors(form);
        }

        function showError(input, message) {
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#ff3860';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            
            input.classList.add('error');
            input.classList.remove('success');
            
            input.parentNode.appendChild(errorElement);
        }

        function showSuccess(input) {
            input.classList.remove('error');
            input.classList.add('success');
            
            const errorElement = input.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }

        function validateName() {
            const nameInput = form.querySelector('.name__input');
            if (!nameInput) return true;
            
            const name = nameInput.value.trim();
            
            if (name === '') {
                showError(nameInput, 'Поле обязательно для заполнения');
                return false;
            }
            
            if (name.length < 2) {
                showError(nameInput, 'Имя должно содержать минимум 2 символа');
                return false;
            }
            
            if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name)) {
                showError(nameInput, 'Имя может содержать только буквы, пробелы и дефисы');
                return false;
            }
            
            showSuccess(nameInput);
            return true;
        }

        function validatePhone() {
            const phoneInput = form.querySelector('.tel__input');
            if (!phoneInput) return true;
            
            const phone = phoneInput.value.trim();
            
            if (phone === '') {
                showError(phoneInput, 'Поле обязательно для заполнения');
                return false;
            }
            
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
            if (!phoneRegex.test(phone)) {
                showError(phoneInput, 'Введите корректный номер телефона');
                return false;
            }
            
            showSuccess(phoneInput);
            return true;
        }

        function validateEmail() {
            const emailInput = form.querySelector('.email__input');
            if (!emailInput) return true;
            
            const email = emailInput.value.trim();
            
            if (email === '') {
                showError(emailInput, 'Поле обязательно для заполнения');
                return false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(emailInput, 'Введите корректный email адрес');
                return false;
            }
            
            showSuccess(emailInput);
            return true;
        }

        function validateMessage() {
            const messageInput = form.querySelector('.message__input');
            if (!messageInput) return true;
            
            const message = messageInput.value.trim();
            
            if (message === '') {
                showError(messageInput, 'Поле "Отзыв" обязательно для заполнения');
                return false;
            }
            
            if (message.length < 10) {
                showError(messageInput, 'Отзыв должен содержать минимум 10 символов');
                return false;
            }
            
            if (message.length > 1000) {
                showError(messageInput, 'Отзыв не должен превышать 1000 символов');
                return false;
            }
            
            showSuccess(messageInput);
            return true;
        }

        function validateForm() {
            clearErrors(form);
            
            const isNameValid = validateName();
            const isPhoneValid = validatePhone();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            return isNameValid && isPhoneValid && isEmailValid && isMessageValid;
        }

        function setupRealTimeValidation() {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.classList.contains('name__input')) {
                    input.addEventListener('blur', validateName);
                } else if (input.classList.contains('tel__input')) {
                    input.addEventListener('blur', validatePhone);
                } else if (input.classList.contains('email__input')) {
                    input.addEventListener('blur', validateEmail);
                } else if (input.classList.contains('message__input')) {
                    input.addEventListener('blur', validateMessage);
                }
                
                input.addEventListener('focus', function() {
                    this.classList.remove('error');
                    const errorElement = this.parentNode.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.remove();
                    }
                });
            });
        }

        function clearErrors(formElement) {
            const errorElements = formElement.querySelectorAll('.error-message');
            errorElements.forEach(error => error.remove());
            
            const inputs = formElement.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('error');
                input.classList.remove('success');
            });
        }

        // Функция для добавления нового отзыва
        function addNewReview(reviewData) {
            const reviewsContainer = document.getElementById('reviews-container');
            
            // Создаем новый элемент отзыва
            const newReview = document.createElement('div');
            newReview.className = 'people-rewies';
            
            // Форматируем дату
            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;
            
            newReview.innerHTML = `
                <h4>${reviewData.name}</h4>
                <p class="people-rewies-des">${reviewData.message}</p>
                <span class="review-date">${formattedDate}</span>
            `;
            
            // Добавляем новый отзыв в начало списка
            reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
            
            // Обновляем слайдер (если используется)
            updateSlider();
        }

        // Функция для обновления слайдера
        function updateSlider() {
            // Если у вас используется slick slider или другой слайдер
            if (typeof $ !== 'undefined' && $.fn.slick) {
                $('.multiple-items').slick('refresh');
            }
        }

        // Обработка отправки формы отзыва
        if (config.type === 'review') {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    const formData = {
                        name: form.querySelector('.name__input').value.trim(),
                        message: form.querySelector('.message__input').value.trim()
                    };
                    
                    // Добавляем новый отзыв
                    addNewReview(formData);
                    
                    // Показываем сообщение об успехе
                    alert('Отзыв успешно добавлен! Спасибо за ваш отзыв!');
                    
                    // Закрываем попап и очищаем форму
                    closePopup();
                    form.reset();
                    clearErrors(form);
                }
            });
        } else {
            // Обработка для контактной формы (остается без изменений)
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                    closePopup();
                    form.reset();
                    clearErrors(form);
                }
            });
        }

        openPopupButtons.forEach((button) => {
            button.addEventListener('click', openPopup);
        });

        closePopupButton.addEventListener('click', closePopup);

        popupBg.addEventListener('click', function(e) {
            if (e.target === popupBg) {
                closePopup();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const isContactOpen = document.querySelector('.popup__bg.active');
                const isReviewOpen = document.querySelector('.popup-rev.active');
                
                if (isContactOpen || isReviewOpen) {
                    closePopup();
                }
            }
        });

        setupRealTimeValidation();
    }
});
