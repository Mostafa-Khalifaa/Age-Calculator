const inputEl = document.querySelectorAll(".card__input");
const submitBtn = document.querySelector(".card__button");

const validateDay = (day) => day && day > 0 && day <= 31;
const validateMonth = (month) => month && month > 0 && month <= 12;

const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year && year > 0 && year <= currentYear;
};

const isDateValid = (day, month, year) => {
    return validateDay(day) && validateMonth(month) && validateYear(year);
};

const showError = (inputEl, message) => {
    inputEl.classList.add("card__input--error");
    const errorEl = inputEl.nextElementSibling;
    errorEl.textContent = message;
};

const clearError = (inputEl) => {
    inputEl.classList.remove("card__input--error");
    const errorEl = inputEl.nextElementSibling;
    errorEl.textContent = "";
};

const calculateAge = (year, month, day) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const onClickHandler = () => {
    const dayEl = document.querySelector('.card__input[name="day"]');
    const monthEl = document.querySelector('.card__input[name="month"]');
    const yearEl = document.querySelector('.card__input[name="year"]');
    const resultEl = document.querySelector(".card__resultValue");

    const day = parseInt(dayEl.value);
    const month = parseInt(monthEl.value);
    const year = parseInt(yearEl.value);

    if (!isDateValid(day, month, year)) {
        showError(dayEl, "Invalid date");
        showError(monthEl, "Invalid date");
        showError(yearEl, "Invalid date");
        resultEl.textContent = "--";
        return;
    }

    clearError(dayEl);
    clearError(monthEl);
    clearError(yearEl);

    resultEl.textContent = calculateAge(year, month, day).toString();
};

inputEl.forEach((el) => {
    el.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            onClickHandler();
        }
    });
});

submitBtn.addEventListener("click", onClickHandler);



