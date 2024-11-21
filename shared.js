let currentPage = 1;
let timer;
let timeLeft = 60;
let typingStarted = false;
let username = '';
let startTime, endTime;
let currentText = ' ';
let currentDifficulty = '';

function navigateToPage(pageNumber) {
    window.location.href = `page${pageNumber}.html`;
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}
