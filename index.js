var randomWords = require('random-words');
var inquirer = require('inquirer')
var word = require("./word")
var chalk = require("chalk");
var guessWord;
var MaxGuesses = 12;
var GuessesLeft = MaxGuesses;
var incorrectGuesses = [];

var letterInput = {
    type: 'input',
    name: 'letter',
    message: 'what letter do you want to guess?'
}
//Initial calls
getNewWord();
letterPrompt();

function getNewWord() {
    GuessesLeft = MaxGuesses;
    incorrectGuesses = [];
    var rawWordToGuess = JSON.stringify(randomWords({
        exactly: 1,
        minLength: 5
    }));
    var wordToGuess = String(rawWordToGuess.slice(2, rawWordToGuess.length - 2));
    guessWord = new word(wordToGuess);
    console.log(chalk.yellow('Your new word is ' + guessWord.fullWord.length + ' characters long.'))
    //console.log(guessWord.fullWord); //the word being guessed
}

function letterPrompt() {
    inquirer.prompt(letterInput)
        .then(function (answer, error) {
            //debugger;
            if (error) throw error;
            var letterGuessed = answer.letter

            if (letterGuessed.length === 1) {
                if (guessWord.guessLetter(letterGuessed)) {
                    console.log(letterGuessed)
                    console.log(chalk.green("That was correct!"))
                    if (guessWord.isComplete()) {
                        console.log(chalk.green("You won!\n" + guessWord.getWord()))
                        getNewWord();
                    }
                } else {
                    if (alreadyGuessed(letterGuessed) == false) {
                        incorrectGuesses.push(letterGuessed);
                        GuessesLeft--;
                        console.log(chalk.red("That was an incorrect guess..."))
                        if (GuessesLeft <= 0) {
                            console.log(chalk.red("You lost...\nThe word was " + guessWord.fullWord));
                            getNewWord();
                        }
                    }
                }
                console.log(chalk.yellow("You have " + GuessesLeft + " incorrect guesses left"))
                console.log(chalk.yellow("Incorrect letters guessed so far: ") + chalk.red(getIncorrectGuesses()))
                console.log(chalk.yellow(guessWord.getWord()))
                letterPrompt()
            } else {
                letterPrompt()
            }
        });
}

function getIncorrectGuesses() {
    var returnString = "";
    for (var i = 0; i < incorrectGuesses.length; i++) {
        returnString += incorrectGuesses[i] + " ";
    }
    return returnString;
}

function alreadyGuessed(letter){
    var returnAnswer = false;
    for (var i = 0; i <incorrectGuesses.length; i++ ){
        if (incorrectGuesses[i] == letter){
            returnAnswer = true;
        }
    }
    return returnAnswer;
}