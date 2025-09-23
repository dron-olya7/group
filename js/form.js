document.addEventListener('DOMContentLoaded', function() {
    // Находим форму записи
    const recordForm = document.querySelector('.record');
    const recordButton = document.querySelector('.btn-record');
    
    if (!recordForm || !recordButton) {
        console.log('Форма записи не найдена');
        return;
    }

    // Получаем поля формы
    const nameInput = recordForm.querySelector('.input-name');
    const emailInput = recordForm.querySelector('input[placeholder="mail@mail.ru"]');
    const phoneInput = recordForm.querySelector('input[placeholder="+7 xxx xxx xx xx"]');

    // Функция для показа ошибки
    function showError(input, message) {
        // Удаляем предыдущую ошибку
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Создаем элемент ошибки
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff3860';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.style.textAlign = 'left';
        
        // Добавляем стили для поля с ошибкой
        input.classList.add('error');
        input.classList.remove('success');
        
        // Добавляем ошибку после поля
        input.parentNode.appendChild(errorElement);
    }

    // Функция для показа успеха
    function showSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        
        // Удаляем сообщение об ошибке
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Валидация имени
    function validateName() {
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

    // Валидация email
    function validateEmail() {
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

    // Валидация телефона
    function validatePhone() {
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

    // Общая валидация формы
    function validateRecordForm() {
        // Очищаем предыдущие ошибки
        clearErrors();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        
        return isNameValid && isEmailValid && isPhoneValid;
    }

    // Функция очистки ошибок
    function clearErrors() {
        const errorElements = recordForm.querySelectorAll('.error-message');
        errorElements.forEach(error => error.remove());
        
        const inputs = recordForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('error');
            input.classList.remove('success');
        });
    }

    // Валидация в реальном времени
    function setupRealTimeValidation() {
        // Валидация при потере фокуса
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        phoneInput.addEventListener('blur', validatePhone);
        
        // Очистка ошибок при фокусе
        const inputs = recordForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            });
        });
    }

    // Обработка отправки формы
    recordButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateRecordForm()) {
            // Собираем данные формы
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim()
            };
            
            console.log('Данные для записи:', formData);
            
            // Показываем сообщение об успехе
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время для уточнения деталей.');
            
            // Очищаем форму
            recordForm.reset();
            clearErrors();
            
            // Можно добавить отправку на сервер
            // sendToServer(formData);
            
        } else {
            console.log('Форма содержит ошибки');
        }
    });

    // Настраиваем валидацию в реальном времени
    setupRealTimeValidation();
});