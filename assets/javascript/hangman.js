// global declarations
var MAX_TRIES = 15;

// game object
var Hangman = {
  wins: 0,
  losses: 0,
  secretWordArray: ["arrakis", "dune", "metaverse", "snow crash", "" ],
  secretWord: "",
  guessTotal: 0,


  //methods
  getSecretWord: function(){ this.secretWord = this.secretWordArray.shift();},
  secretWordLength: function() { return this.secretWord.length;},
  //guess methods
  isValidGuess: function(keyPress){
    //returns true is guess is actually a letter, false otherwise
                  if(keyPress.search(/[A-Za-z]/) != -1){
                    return true;
                  } else {
                    return false;
                  }
                },
  guessMade: function() {
    //increment guess total
                this.guessTotal++;
              },
  isCorrectGuess: function(char){
    //takes a char and returns an array, i0 = char, i1 = index of guess or false, i+ = recurring indexes
                    var indicesArray = [];
                    indicesArray.push(char);
                    for(var i = 0, l = this.secretWordLength(); i < l; i++){
                      if (char === this.secretWord[i]) {
                         indicesArray.push(i);
                      } else if (i === (l - 1) && indicesArray.length === 1) {
                        indicesArray.push(false);
                      }
                    }
                    return indicesArray;
                  },
  /**isGameOver: function() {
  //returns true if max tries has been reached or all letters have been guessed
                     if(guessTotal === MAX_TRIES){
                       return true;
                     } else if {

                     }
                },*/


}


//calls

var game = Hangman;
//create initial html



function playGame(){
  var Game = game;
  Game.getSecretWord();
  var result = Game.isCorrectGuess("b");
  console.log(result);
  console.log(Game.isCorrectGuess("a"));
}

function updateGuessHTML(game){
  //update guess total
  document.getElementById("left").innerHTML = "Guesses Left: <br>" + (MAX_TRIES - game.guessTotal);

}

function updateScoreHTML(game) {
  document.getElementById('wins').innerHTML = "Wins: <br> " + game.wins;
  document.getElementById('losses').innerHTML = "Losses: <br> " + game.losses;
};
