document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.querySelector("#start");
    var startScreen = document.querySelector("#start-screen");
    var questionsEl = document.querySelector('#questions');
    var questionTitle = document.querySelector('#question-title');
    var choices = document.querySelector('#choices');
    var timerEl = document.querySelector('#time');
    var feedback = document.querySelector("#feedback");
    var initialsInput = document.querySelector("#initials");
    var submitScoreButton = document.querySelector("#submit");
    var endScreen = document.querySelector("#end-screen");
    var finalScore = document.querySelector("#final-score");

    var questionCount = 0;
    var time = 50; // time limit
    var timerInterval;
    var score = 0;
    var initialTime = 50;

    startButton.addEventListener("click", function() {
        startScreen.classList.add("hide");
        startQuiz();
    });

    function startQuiz() {
        timerInterval = setInterval(function() {
            time--;
            timerEl.textContent = 'Time: ' + time + ' seconds';

            time = initialTime;
            if (time <= 0 || questionCount >= questions.length) {
                endQuiz();
            }
        }, 1000);

        displayQuestion();
    }

    function displayQuestion() {
        questionTitle.innerHTML = '';
        choices.innerHTML = '';
        feedback.textContent = '';

        if (questions && questions[questionCount] && questions[questionCount].choices) {
            questionTitle.textContent = questions[questionCount].title;

            questions[questionCount].choices.forEach(function(choice) {
                var button = document.createElement('button');
                button.textContent = choice;
                button.value = choice;
                button.addEventListener('click', checkAnswer);
                choices.append(button);
            });

            questionsEl.classList.remove('hide');
        } else {
            console.error("Invalid question structure or questionCount out of bounds");
            endQuiz();
        }
    }

    function checkAnswer(event) {
        if (event.target.value === questions[questionCount].answer) {
            feedback.textContent = 'Correct!';
            score += 10;
        } else {
            feedback.textContent = 'Incorrect!';
            time -= 10;
        }

        questionCount++;

        if (questionCount < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timerInterval);
        questionsEl.classList.add('hide');
        endScreen.classList.remove('hide');
        finalScore.textContent = score;
    }

    submitScoreButton.addEventListener('click', function() {
        var initials = initialsInput.value.trim();

        if (initials !== '') {
            var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            var newScore = { initials: initials, score: score };
            highScores.push(newScore);

            highScores.sort(function(a, b) {
                return b.score - a.score;
            });

            localStorage.setItem('highScores', JSON.stringify(highScores));

            window.location.href = 'highscores.html';
        }
    });
});