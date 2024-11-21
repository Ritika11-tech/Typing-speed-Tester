const texts = {
    beginner: "The quick brown fox jumps over the lazy dog.\n Simple words make up this beginner test.\n Take your time and focus on accuracy.",
    medium: "Programming is the process of creating a set of instructions.\n Programming tells a computer how to perform a task.\n It can be done using many programming languages.",
    high: "In quantum mechanics, quantum entanglement is a phenomenon.\n Quantum states of particles cannot be described independently.\n Particles remain connected even when separated by large distances."
};

// Function to add extra spaces between words
function addExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').split(' ').join('  ');
}

// Function to add line breaks and extra spaces
function formatText(text) {
    // Add extra spaces between words
    let spacedText = text.split(' ').join('  ');
    
    // Ensure line breaks are preserved
    return spacedText.replace(/\n/g, '\n\n');
}

// Update the texts with formatting
Object.keys(texts).forEach(key => {
    texts[key] = formatText(texts[key]);
});

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
