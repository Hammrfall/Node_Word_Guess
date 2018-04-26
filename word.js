const letter = require("./letter.js")

var word = function (theWord) {
    this.fullWord = theWord;
    this.currentWord = [];
    for (var i = 0; i < this.fullWord.length; i++) {
        this.currentWord[i] = new letter(this.fullWord.charAt(i));
    }

    this.getWord = function () {
        var returnWord = "";
        for (var j = 0; j < this.currentWord.length; j++) {
            returnWord += this.currentWord[j].isCurrently() + " ";
        }
        return returnWord;
    }

    this.guessLetter = function (guessLetter) {
        var answerBack = false;
        for (var k = 0; k < this.currentWord.length; k++) {
            if (this.currentWord[k].isIt(guessLetter)) {
                answerBack = true;
            }
        }
        return answerBack;
    }

    this.isComplete = function () {
        var returnValue = true;
        for (var l = 0; l < this.currentWord.length; l++) {
            if (this.currentWord[l].isGuessed == false) {
                returnValue = false;
            }
        }
        return returnValue;
    }
}

module.exports = word;