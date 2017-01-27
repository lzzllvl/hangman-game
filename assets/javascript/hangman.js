// global declarations
var MAX_TRIES = 15;


// game object constructor
function Hangman() {
  this.wins = 0;
  this.losses = 0;
  this.secretWordArray = ["Snow Crash", "Arrakis", "Dune", "Metaverse", "Yours Truly", "Jules Verne", "Neal Stephenson", "Frank Hebert", "Ready Player One", "Hiro Protagonist", "Paul Atreides", "Monsieur Arronax", "Captain Nemo", "Andy Weir", "Mark Watney", "Parzival", "The Martian", "Ned Land", "Anathem", "Fraa Erasmas", "Twenty Thousand Leagues Under The Sea", "H G Wells", "The Time Machine", "Doctor Moreau", "Aldous Huxley", "Brave New World", "Lenina Crowne", "Bernard Marx", "Mustapha Mond", "George Orwell", "Airstrip One", "Newspeak", "Winston Smith", "Julia", "Ministry of Truth" ];
  this.secretWord = "";
  this.guessTotal = 0;
  this.guessedLetters = [];

  //methods
  this.getSecretWord = function(){
                          this.secretWord = this.secretWordArray.splice(Math.floor(Math.random() * this.secretWordArray.length), 1 );
                          this.secretWord = this.secretWord.toString();
                          console.log(this.secretWord);
                        }
                        
  this.secretWordLength =  function() { return this.secretWord.length;};

  //guess methods
  this.isValidGuess = function(keyPress){
    //returns true is guess is actually a letter and hasn't been guessed, false otherwise
                  if((keyPress.search(/[a-z]/) != -1) && (!this.guessedLetters.includes(keyPress))){
                    this.guessedLetters.push(keyPress);
                    return true;
                  } else {
                    return false;
                  }
                };
  this.guessMade = function() {
    //increment guess total
                this.guessTotal++;
              };
  this.isCorrectGuess = function(char){
    //takes a char and returns an array, i0 = char, i1 = index of guess or false, i+ = recurring indexes
                    var indicesArray = [];
                    indicesArray.push(char);
                    for(var i = 0, l = this.secretWordLength(); i < l; i++){
                      if (char === this.secretWord[i].toLowerCase()) {
                         indicesArray.push(i);
                      } else if (i === (l - 1) && indicesArray.length === 1) {
                        indicesArray.push(false);
                      }
                    }
                    return indicesArray;
                  };

  /**isGameOver: function() {
  //returns true if max tries has been reached or all letters have been guessed
                     if(guessTotal === MAX_TRIES){
                       return true;
                     } else if {

                     }
                },*/


}


//calls

var game = new Hangman();
//create initial html

function createBlanks(game){
  var num = game.secretWordLength();
  var word = game.secretWord;
  for (var i = 0; i < num; i++){
    var guessNodeId = "blank" + i;
    var node = document.createElement("LI");
    node.id = guessNodeId;
    //check for spaces
    if(word[i] == " "){
      node.appendChild(document.createTextNode("\u00A0 \u00A0"));
      document.getElementById('secret-word').appendChild(node);
    } else {
      node.appendChild(document.createTextNode("_ "));
      document.getElementById('secret-word').appendChild(node);
    }
  }
}

function updateGuessHTML(game, keyPress){
  //update guess total
  game.guessMade();
  document.getElementById("left").innerHTML = "Guesses Left: <br>" + (MAX_TRIES - game.guessTotal);
  // update for correct guesses and incorrect guess
  var g = game.isCorrectGuess(keyPress);
  for(var i = 1; i < g.length; i++){
    if (g[i] !== false) {
      var blankId = "blank" + g[i];
      document.getElementById(blankId).innerHTML = game.secretWord[g[i]];
    } else {
      var incorrectNodeId = "incorrect" + i;
      var n = document.createElement("LI");
      n.id = incorrectNodeId;
      n.appendChild(document.createTextNode(g[0] + "\u00A0" ));
      document.getElementById("incorrect-guesses").appendChild(n);
    }
  }
}

function updateScoreHTML(game) {
  document.getElementById('wins').innerHTML = "Wins: <br> " + game.wins;
  document.getElementById('losses').innerHTML = "Losses: <br> " + game.losses;
}


var pressed = "";

function setUp(game){
  game.getSecretWord();
  createBlanks(game);
  updateScoreHTML(game);
}

function playGame(game){
  if(game.isValidGuess(pressed)){
  updateGuessHTML(game, pressed);
  }
};

setUp(game);
document.onkeypress = function(event){pressed = String.fromCharCode(event.charCode); playGame(game);};
