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
		const min = minInEl.value;
		const max = maxInEl.value;
		minInEl.value = ``;
		maxInEl.value = ``;
		game.smallestNum = (min === `` ? 1 : parseInt(min));
		game.biggestNum = (max === `` ? 100 : parseInt(max));
		if (game.smallestNum > game.biggestNum) {
			alert(`Error: Invalid range`);
			return false;
		} else {
			introEl.display = "none";
			mainEl.display = "block";
			minOutEl.forEach(e => e.textContent = game.smallestNum);
			maxOutEl.forEach(e => e.textContent = game.biggestNum);
			game.play();
			return true;
		}
	},

	play: function() {
		game.secretNum = Math.floor(Math.random() * (game.biggestNum - game.smallestNum + 1)) + game.smallestNum;
	},

	getGuess: function() {
		const input = parseInt(guessInEl.value);
		guessInEl.value = ``;
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
			wrongEl.textContent = `Your guess was too low!`;
		} else if (input > game.secretNum) {
			game.prevGuesses.push(`${input} (high)`);
			wrongEl.textContent = `Your guess was too high!`;
		} else {
			game.prevGuesses.push(`${input} (correct)`);
		}
		listEl.textContent = game.prevGuesses.join(`, `);
		countOutEl.forEach(e => e.textContent = game.prevGuesses.length);
		if (input === game.secretNum) {
			secretEl.textContent = game.secretNum;
			pluralEl.textContent = game.prevGuesses.length > 1 ? `guesses!` : `guess! Are you cheating?`;
			mainEl.display = "none";
			winEl.display = "block";
			return true;
		} else {
			return false;
		}
	},

	restart: function() {
		while (game.prevGuesses.length) {
			game.prevGuesses.pop();
		}
		countOutEl.forEach(e => e.textContent = `0`);
		listEl.textContent = `(Previous guesses show here)`;
		wrongEl.textContent = `What is your guess?`;
		introEl.display = "block";
		winEl.display = "none";
	}
};


// #########
// # Cache #
// #########

// Display
const introEl = document.querySelector(".start").style;
const mainEl = document.querySelector(".game").style;
const winEl = document.querySelector(".win").style;

//Buttons
const startEl = document.querySelector("#start-game");
const guessEl = document.querySelector("#enter-guess");
const refreshEl = document.querySelector("#restart");

// Inputs
const minInEl = document.querySelector("#min-input");
const maxInEl = document.querySelector("#max-input");
const guessInEl = document.querySelector("#guess");

// Multiple outputs
const minOutEl = document.querySelectorAll(".min");
const maxOutEl = document.querySelectorAll(".max");
const countOutEl = document.querySelectorAll(".count");

// Single output
const wrongEl = document.querySelector(".wrong");
const listEl = document.querySelector(".guess-list");
const secretEl = document.querySelector("#secret");
const pluralEl = document.querySelector(".plural");


// #############
// # Listeners #
// #############

startEl.addEventListener("click", game.getLimits);
guessEl.addEventListener("click", game.getGuess);
refreshEl.addEventListener("click", game.restart);
guessInEl.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		game.getGuess();
	}
});