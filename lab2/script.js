// Отримання елементів форми
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Отримання елементів для відображення помилок
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const successMessage = document.getElementById('successMessage');

// Регулярний вираз для перевірки email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Функція для очищення всіх помилок
 */
function clearErrors() {
    const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];
    const errors = [nameError, emailError, passwordError, confirmPasswordError];

    inputs.forEach(input => input.classList.remove('error'));
    errors.forEach(error => error.classList.remove('show'));
    successMessage.classList.remove('show');
}

/**
 * Функція для показу помилки конкретного поля
 */
function showError(input, errorElement) {
    input.classList.add('error');
    errorElement.classList.add('show');
}

/**
 * ПРАВИЛО 1: Перевірка, що ім'я не порожнє
 */
function validateName() {
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError);
        return false;
    }
    return true;
}

/**
 * ПРАВИЛО 2: Перевірка формату email
 */
function validateEmail() {
    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, emailError);
        return false;
    }
    return true;
}

/**
 * ПРАВИЛО 3: Перевірка довжини пароля (мінімум 6 символів)
 */
function validatePassword() {
    if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError);
        return false;
    }
    return true;
}

/**
 * ПРАВИЛО 4: Перевірка збігу паролів
 */
function validateConfirmPassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, confirmPasswordError);
        return false;
    }
    return true;
}

/**
 * Обробник події відправки форми
 */
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Запобігаємо стандартній відправці форми
    clearErrors(); // Очищаємо попередні помилки

    // Виконуємо всі перевірки
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Якщо всі дані коректні
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Показуємо повідомлення про успіх
        successMessage.classList.add('show');
        
        // Очищаємо форму
        form.reset();
        
        // Можна також вивести повідомлення в консоль
        console.log('Форма успішно відправлена!');
        
        // Альтернатива: показати alert
        // alert('Форма успішно відправлена!');
    } else {
        // Якщо є помилки, можна показати alert
        console.log('Будь ласка, виправте помилки у формі');
    }
});

/**
 * Видалення помилки при введенні у поле
 */
[nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
    input.addEventListener('input', function() {
        // Видаляємо клас помилки з поля
        this.classList.remove('error');
        
        // Ховаємо повідомлення про помилку
        const errorId = this.id + 'Error';
        document.getElementById(errorId).classList.remove('show');
    });
});

