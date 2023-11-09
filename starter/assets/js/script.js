var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questionsEl = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choices = document.querySelector('#choices');
var questionCount = 0;
var feedback = document.querySelector("#feedback");

startButton.addEventListener("click", function() {
    startScreen.classList.add("hide")
    displayQuestion()
})

function displayQuestion() {
    questionTitle.innerHTML = ''
    choices.innerHTML = ''
    questionTitle.textContent = questions[questionCount].title
    questions[questionCount].choices.forEach(function(choice) {
        var button = document.createElement('button')
        button.textContent = choice
        button.value = choice
        button.addEventListener('click', checkAnswer);
        choices.append(button);
    })
    questionsEl.classList.remove('hide');
}

function checkAnswer(event) {
    if (event.target.value === questions[questionCount].answer) {
        feedback.textContent = 'correct';
    } else {
        feedback.textContent = 'incorrect';
    }
    if (questionCount + 1 < questions.length) {
        questionCount++
        displayQuestion()
    } else {
        // display score page here
    }
}