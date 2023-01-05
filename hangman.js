const input = require('sync-input')
let print = console.log;

let won = 0;
let lost = 0;

function randomAnswer() {
  const answers = ['python', 'java', 'swift', 'javascript'];
  return answers[Math.floor(Math.random() * answers.length)]
}

let word = {
  tries: null,
  answer: null,
  history: null,
  hidden: null,
  letters: null,
  answerLetters: null,

  startGame() {
    this.tries = 8;
    this.history = [];
    this.letters = [];
    this.answer = randomAnswer();
    this.hidden = null;
    this.answerLetters = [];
    this.generate();
  },
  
  generate() {
    for (i in this.answer) {
      this.letters[i] = (this.answerLetters.includes(this.answer[i]) ? this.answer[i] : '-');
      this.hidden = this.letters.join('');
    }
  },
  
  checkLetter(letter) {
    if (this.history.includes(letter)) {
      print('You\'ve already guessed this letter.')
    } else if (this.answer.includes(letter)) {
      this.answerLetters.push(letter);
      this.generate()
    } else {
      console.log("That letter doesn't appear in the word.");
      this.tries--;
    }
    this.history.push(letter);
  }
}

console.log(`H A N G M A N`)

function displayResults() {
  print(`You won: ${won} times`);
  print(`You lost: ${lost} times`);
}

function startGame() {
  let win = false;
  word.startGame();
  while (word.tries) {
    console.log();
    console.log(word.hidden);
    let letter = input(`Input a letter: `);
    if (letter.length != 1) {
      print('Please, input a single letter.')
      continue;
    }
    if (!(/[a-z]/).test(letter)) {
      print('Please, enter a lowercase letter from the English alphabet.')
      continue;
    }
    word.checkLetter(letter);
    if (word.answer == word.letters.join('')) {
      win = true;
      break;
    }
  }
  win ? won++ : lost++;
  console.log(win ? `You guessed the word ${word.answer}!\nYou survived!`: '\nYou lost!');
}

while (true) {
  let choice = input('Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:')
  if (choice == 'play') {
    startGame();
  } else if (choice == 'results') {
    displayResults();
  } else {
    break;
  }
}