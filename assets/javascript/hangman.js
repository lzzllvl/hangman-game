// global declarations
var MAX_TRIES = 15;
var letterArray = ["A","a",
                  "B", "b",
                  "C","c",
                  "D", "B",
                  "E","a",
                  "F", "B",
                  "G","a",
                  "H", "B",
                  "I","a",
                  "", "B",
                  ]



// game object
var Hangman = {
  wins: 0,
  losses: 0,
  secretWordArray: ["arrakis", "dune", "", "snow crash", "kindred" ],
  secretWord: "",
  guessTotal: 0,

  //methods
  getSecretWord: function(){ this.secretWord = this.secretWordArray.shift();},
  secretWordLength: function() { return this.secretWord.length;},
  //guess methods
  isValidGuess: function(keyPress){
              if(keyPress.search(/A-Za-z/) != -1){
                return true;
              } else {
                return false;
              }
              },
  guessMade: function() {

              },
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

var game = Hangman;
function playGame(){
  var Game = game;
  Game.getSecretWord();
  var result = Game.isCorrectGuess("b");
  console.log(result);
  console.log(Game.isValidGuess("b"));
}

function updateHTML(game) {
  document.getElementById('wins').innerHTML = "Wins: " + game.wins;
  document.getElementById('losses').innerHTML = "Losses " + game.losses;

};
