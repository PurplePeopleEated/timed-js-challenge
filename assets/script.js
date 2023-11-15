// Button variables
var buttonA = document.getElementById('btnA');
var buttonB = document.getElementById('btnB');
var buttonC = document.getElementById('btnC');
var buttonD = document.getElementById('btnD');
var startButton = document.getElementById('btn-start');
// var backButton = document.getElementById('btn-back');

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

  questionCounter = 0;
  scoreCounter = 0;
  
  loadQuestion();
  startTimer();
}

function endGame() {
  startButton.disabled = false;
  clearTimeout(timer);

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
  var currentQuestion = Math.floor(Math.random() * allQuestions.length);
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
}