$(document).ready(function () {

	function initialScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}

	initialScreen();


	$("body").on("click", ".start-button", function (event) {
		event.preventDefault();
		clickSound.play();
		generateHTML();

		timerWrapper();

	});

	$("body").on("click", ".answer", function (event) {
		clickSound.play();
		selectedAnswer = $(this).text();
		if (selectedAnswer === correctAnswers[questionCounter]) {

			clearInterval(theClock);
			generateWin();
		}
		else {

			clearInterval(theClock);
			generateLoss();
		}
	});

	$("body").on("click", ".reset-button", function (event) {
		clickSound.play();
		resetGame();
	});

});

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p dbz'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center dbz'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<div class='d-flex justify-content-center'><img class='center-block img-wrong' src='img/x.png'></div>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p dbz'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center dbz'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<div class='d-flex justify-content-center'>" + imageArray[questionCounter] + "</div>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p dbz'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center dbz'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<div class='d-flex justify-content-center'><img class='img-wrong' src='img/x.png'></div>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p dbz'>Time Remaining: <span class='timer'>30</span></p><p class='dbz text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
		questionCounter++;
		generateHTML();
		counter = 30;
		timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p dbz'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center dbz'>All done, here's how you did!" + "</p>" + "<p class='summary-correct dbz'>Correct Answers: " + correctTally + "</p>" + "<p class='dbz'>Wrong Answers: " + incorrectTally + "</p>" + "<p class='dbz'>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Try Again!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is Bulma's last name?", "What is the name of the wise master who resides below the Lookout?", "What kind of bean does Korin grow?", "What was the Power Level of the farmer Raditz met when he landed on Earth?", "Where is the Capsule Corporation headquarters located?", "Just after Cell's defeat, up at the lookout, what is the final wish Krillin makes with the Dragon Balls?", "Where did Goku learn Instant Transmission?", "What year was the Dragon Ball manga originally published?"];
var answerArray = [["Briefs", "Ball", "Trunks", "Bloomers"], ["Pan", "Korin", "Oolong", "Pu'ar"], ["Dragon Beans", "Senzu Beans", "Chi Beans", "Saiten Beans"], ["10", "5", "1000", "Over 9,000!"], ["East City", "Capsule Town", "West City", "Tokyo"], ["A full head of hair", "Bringing all of Cell's victims back to life", "Transporting Goku to the lookout from the battlefield", "Removing the bombs from inside the Androids"], ["Planet Yardrat", "Other World", "Planet Namek", "The Village Hidden in the Leaves"], ["1997", "1984", "2001", "1988"]];
var imageArray = ["<img src='img/bulma.jpg'>", "<img src='img/korin.jpg'>", "<img src='img/bean.png'>", "<img src='img/farmer.png'>", "<img src='img/corp.png'>", "<img src='img/krillin.png'>", "<img src='img/goku.png'>", "<img src='img/dragon.png'>"];
var correctAnswers = ["A. Briefs", "B. Korin", "B. Senzu Beans", "B. 5", "C. West City", "D. Removing the bombs from inside the Androids", "A. Planet Yardrat", "B. 1984"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
