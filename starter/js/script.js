var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questionsEl = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choices = document.querySelector('#choices');
var questionCount = 0;
var feedback = document.querySelector("#feedback");
var initialsInput = document.querySelector("#initials");
var submitScoreButton = document.querySelector("#submit-score");
var scoreScreen = document.querySelector("#score-screen");
var finalScore = document.querySelector("#final-score");

var questionCount = 0;
var time = 60; // time limit
var timerInterval;

startButton.addEventListener("click", function() {
    startScreen.classList.add("hide")
    displayQuestion()
})

function startQuiz() {
    timerInterval = setInterval(function() {
        time--;
        timerEl.textContent = 'Time: ' + time + ' seconds';

        if (time <= 0 || questionCount >= questions.length) {
            endQuiz();
        }
    }, 1000);

    displayQuestion();
}

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