var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
  timeLeft--;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(); 
  }
}, 1000);

next();
}
 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>All done!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="Enter initials"> 
<button onclick="setScore()">Submit</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear highscore</button><button onclick="resetGame()">Restart</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
Coding Quiz Challenge
</h1>
<h3>
Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!
</h3>
<button onclick="start()">Start quiz</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
timeLeft -= 15; 
next();
}

function correct() {
score += 20;
next();
}

function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
  endGame();
  return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
  var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
  buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
  if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
  } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
  }
  quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}


//list of questions    
var questions = [{
  title: "Commonly used data types DO NOT include:",
  choices: ["strings", "boolenans", "alerts", "numbers"],
  answer: "alerts"
},
{
  title: "The condition in an if / else statement is enclosed within _________.",
  choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  answer: "curly brackets"
},
{
  title: "Arrays in Javascript can be used to store _________.",
  choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
  answer: "all of the above"
},
{
  title: "String values must be enclosed within _________ when being assigned to variables.",
  choices: ["commas", "curly brackets", "quotes", "parenthesis"],
  answer: "quotes"
},
{
  title: "A very useful tool used during development and debugging for printing content to the debugger is:",
  choices: ["Javascript", "terminal", " for loops", "console.log"],
  answer: "console.log"
}
]