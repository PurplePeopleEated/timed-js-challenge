// Buttons
var buttonA = document.getElementById('btnA');
var buttonB = document.getElementById('btnB');
var buttonC = document.getElementById('btnC');
var buttonD = document.getElementById('btnD');
var startButton = document.getElementById('btn-start');
var backButton = document.getElementById('btn-back');

var gameHeader = document.querySelector('.game-header');
var questionCard = document.querySelector('.questionCard');
var scoreEl = document.getElementById('score');
var timerEl = document.getElementById('timer');
var leaderboard = document.querySelector('game-score-list');
var answersEl = document.getElementById('answers');

var question = '';
var answer = '';

var scoreCounter = 0;
var timer;
var timerCount;
var randomButtonNum;
var allQuestionsAnswered = false;
var questionCounter = 0;


// Array for leaderboard
var scoreList = [];

// Arrays for questions, answers, and fake answers
const allQuestions = [
    {'question': 'This is question number 1?', 
    'answer': 'Correct1'}, 

    {'question': 'This is question number 2?', 
    'answer': 'Correct2'}, 

    {'question': 'This is question number 3?', 
    'answer': 'Correct3'},

    {'question': 'This is question number 4?', 
    'answer': 'Correct4'}];

var fakeAnswers = ['whoo', 'yippie', 'gawrsh', 'cinnamon', 'crazy', 'haus', 'woah'];

// Starts when page loads
function init() {
    questionCard.textContent = 'Timed JavaScript Challenge';
    // Hide buttons
    answersEl.style.display = 'none';
    // loadLeaderboard();
}

function startGame() {
    startButton.disabled = true;
    startButton.style.display = 'none';
    answersEl.style.display = 'flex';

    questionCounter = 0;
    scoreCounter = 0;
    timerCount = 60;
    pickQuestion();
    startTimer();

}

function endGame() {
    answersEl.style.display = 'none';

    saveLeaderboard();

    startButton.disabled = false;
    startButton.style.display = 'flex';
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.innerHTML = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            endGame();
        }
        else if (timerCount >= 0) {
            if (allQuestions.length === questionCounter) {
                endGame();
            }
        }
    }, 1000);
}

function pickQuestion() {
    // Pick random question/answer pair from array
    var randomNum = Math.floor(Math.random() * allQuestions.length);
    question = allQuestions[randomNum].question;
    answer = allQuestions[randomNum].answer;

    // Pick random button for answer and display it
    var randomButtonNum = Math.floor(Math.random() * 4);
    var buttons = [buttonA, buttonB, buttonC, buttonD];

    buttons[randomButtonNum].innerHTML = answer;

    // Pick and place fake answers on random buttons
    for (var i = 0; i < 4; i++) {
        if (i === randomButtonNum) {
            // do nothing
        }
        else {
            var randomFakeAnsNum = Math.floor(Math.random() * fakeAnswers.length);
            buttons[i].innerHTML = fakeAnswers[randomFakeAnsNum];
        }
    }

    // Display question
    questionCard.innerHTML = question;
    
    // Check user answer
    // return judgement();
}

// function setScore() {
//     scoreEl.innerHTML = scoreCounter;
//     localStorage.setItem('score', scoreCounter);
// }

// function judgement() {
    answersEl.addEventListener('click', function(event) {
        questionCounter += 1;


        var chosenAnswer = event.target;
        for (var i = 0; i < allQuestions.length; i++) {
            if (chosenAnswer === randomButtonNum) {
                scoreCounter = scoreCounter + 10;
                // setScore();
                scoreEl.innerHTML = scoreCounter;
                pickQuestion();
            }
            else if (chosenAnswer !== randomButtonNum) {
                timerCount -= 10
                // setScore();
                scoreEl.innerHTML = scoreCounter;
                pickQuestion();
            }
            else {
                endGame();
            }
        }
    })
// }

function saveLeaderboard() {
    // Prompt user to enter initials
    questionCard.innerHTML = 'Enter Initials'

    // Create div for save window
    var saveBox = gameHeader.appendChild(document.createElement('div'));
    saveBox.classList.add('save-box');

    // Create save button
    var saveButton = saveBox.appendChild(document.createElement('button'));
    saveButton.classList.add('btns');
    saveButton.id = 'btn-save';

    // Add input field for user to type initials
    var initialEl = saveBox.appendChild(document.createElement('input'));
    var initials = initialsEl.value;

    // Save score to leaderboard
    saveButton.addEventListener('click', function() {
        // Checks that at least 3 characters are typed in and informs user
        if (initials.length < 3) {
            initialEl.appendChild(document.createElement('p')).innerHTML = 'Must be at least 3 characters';
        }
        else {
            scoreList.push({player: initials, score: scoreCounter})
            localStorage.setItem('player', JSON.stringify(player));
        }
    })
}

function loadLeaderboard() {

}

// Add event listener to start button
startButton.addEventListener('click', startGame);

init();