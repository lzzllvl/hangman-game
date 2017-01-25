// global declarations
var MAX_TRIES = 15;



// game object
var Hangman = {
  wins: 0,
  loses: 0,
  secretWordArray: ["arrakis", "dune", "", "snow crash", "kindred" ],
  secretWord: "",
  guessTotal: 0,

  //methods
  getSecretWord: function(){ this.secretWord = this.secretWordArray.shift();},
  secretWordLength: function() { return this.secretWord.length;},
  //guess methods
  isCorrectGuess: function(char){
                    for(var i = 0, l = this.secretWordLength(); i < l; i++){
                        if (char === this.secretWord[i]) {
                          return [char, true];
                        } else if (i === (l - 1)) {
                          return [char, false];
                        }
                    }
                },

}


//calls
function play() {
  var Game = Hangman;
  Game.getSecretWord();
  var result = Game.isCorrectGuess("b");

  console.log(result);
};
