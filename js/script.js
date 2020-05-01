// ######################
// # Prompt/Alert Style #
// ######################

// const game = {
// 	title: `Guess the Number!`,
// 	biggestNum: 1,
// 	smallestNum: 100,
// 	secretNum: null,
// 	prevGuesses: [],

// 	play: function() {
// 		while (this.smallestNum > this.biggestNum) {
// 			this.smallestNum = this.getLimit(`smallest`, 1);
// 			this.biggestNum = this.getLimit(`biggest`, 100);
// 			if (this.smallestNum > this.biggestNum) {
// 				alert(`Error: Invalid range`);
// 			}
// 		}
// 		this.secretNum = Math.floor(Math.random() * (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
// 		while (7) {
// 			let guess = this.getGuess();
// 			this.prevGuesses.push(guess);
// 			if (this.render(guess, this.prevGuesses, this.secretNum)) {
// 				return;
// 			}
// 		}
// 	},

// 	getGuess: function() {
// 		let guess = 0;
// 		while (isNaN(guess)) {
// 			guess = parseInt(prompt(`Enter a guess between ${this.smallestNum} and ${this.biggestNum}:`));
// 			if (guess < this.smallestNum || guess > this.biggestNum) {
// 				guess = NaN;
// 			}
// 		}
// 		return guess;
// 	},

// 	getLimit: function(limit, normal) {
// 		let x = 0;
// 		while (!x) {
// 			x = parseInt(prompt(`Enter the ${limit} number:`, normal));
// 		}
// 		return x;
// 	},

// 	render: function(guess, previous, secret) {
// 		if (guess === this.secretNum) {
// 			alert(`Congrats! You guessed the number in ${previous.length} ${previous.length > 1 ? `guesses!` : `guess! Are you cheating?`}`);
// 			return true;
// 		} else {
// 			alert(`Your guess is too ${guess > secret ? `high` : `low`}\nPrevious guesses: ${previous.join(`, `)}`);
// 			return false;
// 		}
// 	}
// };


// #######################
// # Web Interface Style #
// #######################

const game = {
	title: `Guess the Number!`,
	biggestNum: 100,
	smallestNum: 1,
	secretNum: null,
	prevGuesses: [],

	getLimits: function() {
		const min = MIN_IN.value;
		const max = MAX_IN.value;
		MIN_IN.value = ``;
		MAX_IN.value = ``;
		game.smallestNum = (min === `` ? 1 : parseInt(min));
		game.biggestNum = (max === `` ? 100 : parseInt(max));
		if (game.smallestNum > game.biggestNum) {
			alert(`Error: Invalid range`);
			return false;
		} else {
			INTRO.display = "none";
			MAIN.display = "block";
			MIN_OUT.forEach(e => e.textContent = game.smallestNum);
			MAX_OUT.forEach(e => e.textContent = game.biggestNum);
			game.play();
			return true;
		}
	},

	play: function() {
		game.secretNum = Math.floor(Math.random() * (game.biggestNum - game.smallestNum + 1)) + game.smallestNum;
	},

	getGuess: function() {
		const input = parseInt(GUESS_IN.value);
		GUESS_IN.value = ``;
		if (isNaN(input)) {
			return false;
		} else if (input < game.smallestNum || input > game.biggestNum) {
			alert(`Error: Out of bounds`);
			return false;
		} else {
			game.render(input);
			return true;
		}
	},

	render: function(input) {
		if (input < game.secretNum) {
			game.prevGuesses.push(`${input} (low)`);
			WRONG.textContent = `Your guess was too low!`;
		} else if (input > game.secretNum) {
			game.prevGuesses.push(`${input} (high)`);
			WRONG.textContent = `Your guess was too high!`;
		} else {
			game.prevGuesses.push(`${input} (correct)`);
		}
		LIST.textContent = game.prevGuesses.join(`, `);
		COUNT_OUT.forEach(e => e.textContent = game.prevGuesses.length);
		if (input === game.secretNum) {
			SECRET.textContent = game.secretNum;
			PLURAL.textContent = game.prevGuesses.length > 1 ? `guesses!` : `guess! Are you cheating?`;
			MAIN.display = "none";
			WIN.display = "block";
			return true;
		} else {
			return false;
		}
	},

	restart: function() {
		while (game.prevGuesses.length) {
			game.prevGuesses.pop();
		}
		COUNT_OUT.forEach(e => e.textContent = `0`);
		LIST.textContent = `(Previous guesses show here)`;
		WRONG.textContent = `What is your guess?`;
		INTRO.display = "block";
		WIN.display = "none";
	}
};


// #########
// # Cache #
// #########

// Display
const INTRO = document.querySelector(".start").style;
const MAIN = document.querySelector(".game").style;
const WIN = document.querySelector(".win").style;

//Buttons
const START = document.querySelector("#start-game");
const GUESS = document.querySelector("#enter-guess");
const REFRESH = document.querySelector("#restart");

// Inputs
const MIN_IN = document.querySelector("#min-input");
const MAX_IN = document.querySelector("#max-input");
const GUESS_IN = document.querySelector("#guess");

// Multiple outputs
const MIN_OUT = document.querySelectorAll(".min");
const MAX_OUT = document.querySelectorAll(".max");
const COUNT_OUT = document.querySelectorAll(".count");

// Single output
const WRONG = document.querySelector(".wrong");
const LIST = document.querySelector(".guess-list");
const SECRET = document.querySelector("#secret");
const PLURAL = document.querySelector(".plural");


// #############
// # Listeners #
// #############

START.addEventListener("click", game.getLimits);
GUESS.addEventListener("click", game.getGuess);
REFRESH.addEventListener("click", game.restart);
GUESS_IN.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		game.getGuess();
	}
});