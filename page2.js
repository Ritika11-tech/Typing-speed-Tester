function setDifficulty(level) {
    // Add extra line breaks and spacing
    let formattedText = formatText(texts[level]);
    
    currentText = formattedText;
    currentDifficulty = level;
    saveToLocalStorage('currentDifficulty', level);
    
    const textDisplay = document.querySelector('.text-display');
    textDisplay.innerHTML = currentText.split('').map(char =>
        `<span>${char === '\n' ? '<br>' : char}</span>`
    ).join('');
    
    document.querySelector('.typing-container').style.display = 'block';
    document.querySelector('.difficulty-container').style.display = 'none';
    
    const typingInput = document.getElementById('typing-input');
    typingInput.value = '';
    typingInput.focus();
    saveToLocalStorage('startTime', null);
    
    // Add click event listener to start timer
    typingInput.addEventListener('click', startTimerOnFirstClick);
    typingInput.addEventListener('input', handleTyping);
}

// Function to add extra spaces and line breaks
function formatText(text) {
    // Replace single line breaks with double line breaks
    let formattedText = text.replace(/\n/g, '\n\n');
    
    // Add extra spaces between words
    formattedText = formattedText.split(' ').join('  ');
    
    return formattedText;
}

// Add new function to handle first click
function startTimerOnFirstClick() {
    if (!typingStarted) {
        typingStarted = true;
        startTime = new Date();
        saveToLocalStorage('startTime', startTime);
        startTimer();
        // Remove the click event listener after first use
        document.getElementById('typing-input').removeEventListener('click', startTimerOnFirstClick);
    }
}

function startTimer() {
    timeLeft = 0;  // Start from 0
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
    
    if (typedText === currentText.replace(/\n/g, '')) {
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
