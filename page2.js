const texts = {
    beginner: "The quick brown fox jumps over the lazy dog. Simple words make up this beginner test. Take your time and focus on accuracy.",
    medium: "Programming is the process of creating a set of instructions. Programming tells a computer how to perform a task. It can be done using many programming languages.",
    high: "In quantum mechanics, quantum entanglement is a phenomenon. Quantum states of particles cannot be described independently. Particles remain connected even when separated by large distances."
};

// Function to add extra spaces between words if needed
function formatText(text) {
    // Add extra spaces between words (optional, can be removed if not required)
    let spacedText = text.split(' ').join('  ');
    return spacedText;
}

// Update the texts with formatting
Object.keys(texts).forEach(key => {
    texts[key] = formatText(texts[key]);
});

function setDifficulty(level) {
    currentText = texts[level];
    currentDifficulty = level;
    saveToLocalStorage('currentDifficulty', level);
    
    const textDisplay = document.querySelector('.text-display');
    textDisplay.innerHTML = currentText.split('').map(char =>
        `<span>${char}</span>`
    ).join('');
    
    document.querySelector('.typing-container').style.display = 'block';
    document.querySelector('.difficulty-container').style.display = 'none';
    
    const typingInput = document.getElementById('typing-input');
    typingInput.value = '';
    typingInput.focus();
    saveToLocalStorage('startTime', null);
    
    typingInput.addEventListener('click', startTimerOnFirstClick);
    typingInput.addEventListener('input', handleTyping);
}

function startTimerOnFirstClick() {
    if (!typingStarted) {
        typingStarted = true;
        startTime = new Date();
        saveToLocalStorage('startTime', startTime);
        startTimer();
        document.getElementById('typing-input').removeEventListener('click', startTimerOnFirstClick);
    }
}

function startTimer() {
    timeLeft = 0;
    updateTimer();
    timer = setInterval(() => {
        timeLeft++;
        updateTimer();
    }, 1000);
}

function handleTyping(e) {
    const typedText = e.target.value;
    const characters = document.querySelectorAll('.text-display span');
    
    characters.forEach((char, index) => {
        char.classList.remove('correct', 'incorrect', 'current');
        if (index < typedText.length) {
            if (char.innerText === typedText[index]) {
                char.classList.add('correct');
            } else {
                char.classList.add('incorrect');
            }
        } else if (index === typedText.length) {
            char.classList.add('current');
        }
    });
    
    if (typedText === currentText) {
        endTest();
    }
}

function submitTest() {
    endTest();
}

function updateTimer() {
    document.querySelector('.timer').textContent = timeLeft;
}

function endTest() {
    clearInterval(timer);
    endTime = new Date();
    saveToLocalStorage('endTime', endTime);
    saveToLocalStorage('typedText', document.getElementById('typing-input').value);
    navigateToPage(3);
}
