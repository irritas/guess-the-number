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
		const min = minIn.value;
		const max = maxIn.value;
		minIn.value = ``;
		maxIn.value = ``;
		game.smallestNum = (min === `` ? 1 : parseInt(min));
		game.biggestNum = (max === `` ? 100 : parseInt(max));
		if (game.smallestNum > game.biggestNum) {
			alert(`Error: Invalid range`);
			return false;
		} else {
			intro.display = "none";
			main.display = "block";
			minOut.forEach(e => e.textContent = game.smallestNum);
			maxOut.forEach(e => e.textContent = game.biggestNum);
			game.play();
			return true;
		}
	},

	play: function() {
		game.secretNum = Math.floor(Math.random() * (game.biggestNum - game.smallestNum + 1)) + game.smallestNum;
	},

	getGuess: function() {
		const input = parseInt(guessIn.value);
		guessIn.value = ``;
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
			wrong.textContent = `Your guess was too low!`;
		} else if (input > game.secretNum) {
			game.prevGuesses.push(`${input} (high)`);
			wrong.textContent = `Your guess was too high!`;
		} else {
			game.prevGuesses.push(`${input} (correct)`);
		}
		list.textContent = game.prevGuesses.join(`, `);
		countOut.forEach(e => e.textContent = game.prevGuesses.length);
		if (input === game.secretNum) {
			secret.textContent = game.secretNum;
			plural.textContent = game.prevGuesses.length > 1 ? `guesses!` : `guess! Are you cheating?`;
			main.display = "none";
			win.display = "block";
			return true;
		} else {
			return false;
		}
	},

	restart: function() {
		while (game.prevGuesses.length) {
			game.prevGuesses.pop();
		}
		countOut.forEach(e => e.textContent = `0`);
		list.textContent = `(Previous guesses show here)`;
		wrong.textContent = `What is your guess?`;
		intro.display = "block";
		win.display = "none";
	}
};


// #########
// # Cache #
// #########

// Display
const intro = document.querySelector(".start").style;
const main = document.querySelector(".game").style;
const win = document.querySelector(".win").style;

//Buttons
const start = document.querySelector("#start-game");
const guess = document.querySelector("#enter-guess");
const refresh = document.querySelector("#restart");

// Inputs
const minIn = document.querySelector("#min-input");
const maxIn = document.querySelector("#max-input");
const guessIn = document.querySelector("#guess");

// Multiple outputs
const minOut = document.querySelectorAll(".min");
const maxOut = document.querySelectorAll(".max");
const countOut = document.querySelectorAll(".count");

// Single output
const wrong = document.querySelector(".wrong");
const list = document.querySelector(".guess-list");
const secret = document.querySelector("#secret");
const plural = document.querySelector(".plural");


// #############
// # Listeners #
// #############

start.addEventListener("click", game.getLimits);
guess.addEventListener("click", game.getGuess);
refresh.addEventListener("click", game.restart);
guessIn.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		game.getGuess();
	}
});