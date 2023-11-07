// Button variables
var buttonA = document.getElementById('btnA');
var buttonB = document.getElementById('btnB');
var buttonC = document.getElementById('btnC');
var buttonD = document.getElementById('btnD');
var startButton = document.getElementById('btn-start');
var backButton = document.getElementById('btn-back');

// Added variables
var questionCounter;

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

const fakeAnswers = ['whoo', 'yippie', 'gawrsh', 'cinnamon', 'crazy', 'haus', 'woah'];

// Runs on page load
function init() {
  questionCard.innerHTML = 'Timed JavaScript Challenge';
  answersEl.style.display = 'none';
}

function startGame() {
  startButton.disabled = true;
  startButton.style.display = 'none';

  questionCounter = 0;
}

function startTimer() {
  timerCount = 60;
  timer = setInterval(function() {
      timerCount--;
      timerElement.innerHTML = timerCount;
      if (timerCount === 0){
          clearTimeout(timer);
          endQuiz()
      }
  }, 1000);
}

function loadQuestion() {
  // Pick random question/answer pair
  var currentQuestion = Math.floor(Math.random() * allQuestions.length);
  question = allQuestions[currentQuestion].question;
  answer = allQuestions[currentQuestion].answer;


}