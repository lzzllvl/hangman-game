// global declarations

var MAX_TRIES = 15;

// game object constructor
function Hangman() {
  this.wins = 0;
  this.losses = 0;
  this.secretWordArray = ["Snow Crash", "Arrakis", "Dune", "Metaverse", "Yours Truly", "Jules Verne", "Earnest Cline" , "Neal Stephenson", "Frank Hebert", "Ready Player One", "Hiro Protagonist", "Paul Atreides", "Monsieur Arronax", "Captain Nemo", "Andy Weir", "Mark Watney", "Parzival", "The Martian", "Ned Land", "Anathem", "Fraa Erasmas", "Twenty Thousand Leagues Under The Sea", "H G Wells", "The Time Machine", "Doctor Moreau", "Aldous Huxley", "Brave New World", "Lenina Crowne", "Bernard Marx", "Mustapha Mond", "George Orwell", "Airstrip One", "Newspeak", "Winston Smith", "Julia", "Ministry of Truth", "SevenEves", "Kath Two", "Dinah MacQuarie" ];
  this.secretWord = "";
  this.guessTotal = 0;
  this.guessedLetters = [" ",]; // the space is needed for isGameWonOrLost()

  //methods
  this.getSecretWord = function(){
                          this.secretWord = this.secretWordArray.splice(Math.floor(Math.random() * this.secretWordArray.length), 1 );
                          this.secretWord = this.secretWord.toString();
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
  this.guessMade = function() { this.guessTotal++;};
    //increment guess total

  this.isCorrectGuess = function(char){
    //takes a char and returns an array, i0 = char, i1 = index of guess or false, i+ = recurring indices
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

  this.isGameWonOrLost = function() {
//returns an array w/ true @ index1 if max tries has been reached or all letters have been guessed
                            for(var i = 0, letterCheck = 0; i < this.secretWord.length; i++){
                              if(this.guessedLetters.indexOf(this.secretWord[i].toLowerCase()) !== -1){
                                letterCheck++;
                              };
                            }
                            if(this.guessTotal === MAX_TRIES){
                             return ["l" ,true];
                            } else if (letterCheck == this.secretWord.length) {
                             return ["w", true];
                            } else {
                             return [null, false];//this is an array so the boolean index matches
                            }
                           };
}

/**
  * The following area consists of functions for updating
  * the page HTML according to the values in the current game/Hangman Object
  * also the imageCategories object, which tests the secret word
  * to find the appropriate hint image
  */

var imageCategories = {
    snow: ["Snow Crash", "Metaverse", "Yours Truly", "Hiro Protagonist"],
    neal: ["Neal Stephenson", "Anathem", "Fraa Erasmas", "SevenEves", "Kath Two", "Dinah MacQuarie"],
    dune: ["Arrakis", "Dune", "Frank Hebert", "Paul Atreides"],
    twenty: ["Jules Verne", "Monsieur Arronax", "Captain Nemo", "Ned Land", "Twenty Thousand Leagues Under The Sea"],
    ready: ["Ready Player One",  "Parzival", "Earnest Cline"],
    martian: ["Andy Weir", "Mark Watney",  "The Martian"],
    wells : ["H G Wells", "The Time Machine", "Doctor Moreau"],
    bravenewworld: ["Aldous Huxley", "Brave New World", "Lenina Crowne", "Bernard Marx", "Mustapha Mond"],
    george: ["George Orwell", "Airstrip One", "Newspeak", "Winston Smith", "Julia", "Ministry of Truth"],
    find : function(secretWord){
              for(key in this) {
                if(this[key].indexOf(secretWord) !== -1){
                  return key;
                }
              }
          }
};

function updateImage(game){
  var n = imageCategories.find(game.secretWord);
  if (key == 'snow'){
    document.getElementById("image").setAttribute('src', 'assets/images/snow.jpg');
  } else if (key == 'neal'){
    document.getElementById("image").setAttribute('src', 'assets/images/neal.jpg');
  } else if (key == 'dune'){
    document.getElementById("image").setAttribute('src', 'assets/images/dune.jpg');
  } else if (key == 'twenty'){
    document.getElementById("image").setAttribute('src', 'assets/images/twenty.jpg');
  } else if (key == 'ready'){
    document.getElementById("image").setAttribute('src', 'assets/images/ready.jpg');
  } else if (key == 'martian'){
    document.getElementById("image").setAttribute('src', 'assets/images/martian.jpg');
  } else if (key == 'wells'){
    document.getElementById("image").setAttribute('src', 'assets/images/wells.png');
  } else if (key == 'bravenewworld'){
    document.getElementById("image").setAttribute('src', 'assets/images/bravenewworld.jpg');
  } else if (key == 'george'){
    document.getElementById("image").setAttribute('src', 'assets/images/1984.jpg');
  }
}

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
  //the return value of g from isCorrectGuess() is why this logic works
  for(var i = 1; i < g.length; i++){
    if (g[i] !== false) {
      var blankId = "blank" + g[i];
      document.getElementById(blankId).innerHTML = game.secretWord[g[i]];
    } else {
      var n = document.createElement("LI");
      n.className = "incorrect";
      n.appendChild(document.createTextNode(g[0] + "\u00A0" ));
      document.getElementById("incorrect-guesses").appendChild(n);
    }
  }
}

function updateScoreHTML(game) {
  //updates the score html
  document.getElementById('wins').innerHTML = "Wins: <br> " + game.wins;
  document.getElementById('losses').innerHTML = "Losses: <br> " + game.losses;
  document.getElementById("left").innerHTML = "Guesses Left: <br>" + (MAX_TRIES - game.guessTotal);
}

function resetHTML(game){

  for(var i = 0; i < game.secretWordLength(); i++){
    var parent = document.getElementById('secret-word');
    var id = "blank" + i;
    var child = document.getElementById(id);
    parent.removeChild(child);
  }
  //moving the guessed nodes to the top, so it is displayed while next set is played
  var previous = game.secretWord;
  document.getElementById('prev').innerHTML = "Last Word: <br>" + previous;
  var jparent = document.getElementById('incorrect-guesses');
  var jClassName = "incorrect"
  var jchild = document.getElementsByClassName("incorrect");

  //jchild gets shorter after removeChild, so if there is no index 0 it will be undefined
  while(jchild[0] != undefined) {
    jparent.removeChild(jchild[0]);
  }
}

function setUp(game){
  game.getSecretWord();
  createBlanks(game);
  updateScoreHTML(game);
}

function playGame(game, gameOn){
  if(!gameOn[1]){
    if(game.isValidGuess(pressed)){
      updateGuessHTML(game, pressed);
    };
  } else {

    if(gameOn[0]== "w"){
      game.wins++;
    } else {
      game.losses++;
    }
    resetHTML(game);
    game.guessTotal = 0;
    game.guessedLetters = [" ",]; //back to original value
    setUp(game);
    updateImage(game);
  }
};


//calls
var game = new Hangman();
setUp(game);
var pressed = "";
var gameOn = game.isGameWonOrLost();
document.onkeypress = function(){
                        document.getElementById("hint").innerHTML = "Hint: <br>";
                        document.getElementById("initial").innerHTML = "";
                        updateImage(game);
                        document.onkeypress = function(event){
                                                pressed = String.fromCharCode(event.charCode);
                                                gameOn = game.isGameWonOrLost();
                                                playGame(game, gameOn);
                                               };
                     }
