// Button variables
var buttonA = document.getElementById('btnA');
var buttonB = document.getElementById('btnB');
var buttonC = document.getElementById('btnC');
var buttonD = document.getElementById('btnD');
var startButton = document.getElementById('btn-start');
// var backButton = document.getElementById('#btn-back');

// Added variables
var questionCounter;
var scoreCounter;
var timer;
var question = '';
var answer = '';
var buttons = [buttonA, buttonB, buttonC, buttonD];
var answersEl = document.querySelector('.answerbtns');
var scoreEl = document.getElementById('score');
var correctButton;
var questionCardEl = document.querySelector('.questionCard');
var timerEl = document.getElementById('timer');
var currentQuestion;
// var gameEl = document.querySelector('.game-header');
// var scoreList = [];

// Arrays for questions, answers, and fake answers
let allQuestions = [
  {'question': 'This is question number 1?', 
  'answer': 'Correct1'}, 

  {'question': 'This is question number 2?', 
  'answer': 'Correct2'}, 

  {'question': 'This is question number 3?', 
  'answer': 'Correct3'},

  {'question': 'This is question number 4?', 
  'answer': 'Correct4'}];

const fakeAnswers = ['whoo', 'yippie', 'gawrsh', 'cinnamon', 'crazy', 'haus', 'woah'];

// Runs on page load
  questionCardEl.innerHTML = 'Timed JavaScript Challenge';

function startGame() {
  startButton.disabled = true;

  for (var i=0; i<4; i++) {
    buttons[i].disabled = false;
  }

  questionCounter = 0;
  scoreCounter = 0;

  loadQuestion();
  startTimer();
}

function endGame() {
  startButton.disabled = false;
  clearTimeout(timer);

  for (var i=0; i<4; i++) {
    buttons[i].disabled = true;
  }
  // saveLeaderboard();
}

function startTimer() {
  timerCount = 60;
  timer = setInterval(function() {
      timerCount--;
      timerEl.innerHTML = timerCount;
      if (timerCount === 0){
          clearTimeout(timer);
          endGame();
      }
  }, 1000);
}

function loadQuestion() {
  // Pick random question/answer pair
  currentQuestion = Math.floor(Math.random() * allQuestions.length);
  question = allQuestions[currentQuestion].question;
  answer = allQuestions[currentQuestion].answer;

  // Pick random button for answer and display
  correctButton = Math.floor(Math.random() * 4);

  // Display answers on buttons
  for (var i=0; i<4; i++) {
    if (i === correctButton) {
      buttons[correctButton].innerHTML = answer;
    }
    else {
      var randomFakeAns = Math.floor(Math.random() * fakeAnswers.length);
      buttons[i].innerHTML = fakeAnswers[randomFakeAns];
    }
  }

  // Display question
  questionCardEl.innerHTML = question;
}

answersEl.addEventListener('click', function(event) {
  var chosenAnswer = event.target.textContent;
  if (allQuestions.length > 1) {
  allQuestions = allQuestions.filter((_, index) => index !== currentQuestion);
  }

console.log(allQuestions);
  if(chosenAnswer === answer) {
    scoreCounter += 25;
    scoreEl.innerHTML = scoreCounter;
  } else if (chosenAnswer !== answer) {
    timerCount -= 10;
  }

  if (questionCounter < 3) {
    questionCounter += 1;
    loadQuestion();
  } else {
    endGame();
  }
});

// function saveLeaderboard() {
//   // Prompt user to enter initials
//   var initials = prompt('Enter Initials');
//   // newSave = {player: savePrompt.textContent, score: scoreCounter};
// console.log(initials.innerText);
//   if (initials != null) {
//     localStorage.setItem('save', JSON.stringify(newSave));
//   }
// }

startButton.addEventListener('click', startGame);