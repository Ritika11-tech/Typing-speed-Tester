const texts = {
    beginner: "The quick brown fox jumps over the lazy dog.\n Simple words make up this beginner test.\n Take your time and focus on accuracy.",
    medium: "Programming is the process of creating a set of instructions.\n Programming tells a computer how to perform a task.\n It can be done using many programming languages.",
    high: "In quantum mechanics, quantum entanglement is a phenomenon.\n Quantum states of particles cannot be described independently.\n Particles remain connected even when separated by large distances."
};
let currentPage = 1;
let timer;
let timeLeft = 60;
let typingStarted = false;
let username = '';
let startTime, endTime;
let currentText = '';
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

// Updated function to format text with non-breaking spaces and double line breaks
function formatText(text) {
    // Replace single line breaks with double line breaks
    let formattedText = text.replace(/\n/g, '\n\n');
    
    // Add extra spaces between words using non-breaking spaces
    formattedText = formattedText.split(' ').join(' \u00A0');
    
    return formattedText;
}

// Update the texts with formatting
Object.keys(texts).forEach(key => {
    texts[key] = formatText(texts[key]);
});
