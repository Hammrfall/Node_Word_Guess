var letter = function (letter) {
    this.letter = letter
    this.isGuessed = false;
    this.isCurrently = function () {
        if (this.isGuessed) {
            return this.letter
        } else {
            return "_"
        };
    }
    this.isIt = function (letter) {
        var returnValue = false;
        if (letter == this.letter) {
            this.isGuessed = true;
            returnValue = true;
        }
        return returnValue;
    }
}
module.exports = letter;