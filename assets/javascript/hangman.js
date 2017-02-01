// declarations
const MAX_TRIES = 15;

// game object constructor
function Hangman() {
  this.wins = 0;
  this.losses = 0;
  this.secretWordArray = ["Endurance", "Duncan Idaho", "Fremen", "White Sky", "Amalthea", "The Baroque Cycle", "Cryptonomicon", "The War of The Worlds","Snow Crash", "Arrakis", "Dune", "Metaverse", "Yours Truly", "Jules Verne", "Ernest Cline" , "Neal Stephenson", "Frank Hebert", "Ready Player One", "Hiro Protagonist", "Paul Atreides", "Monsieur Arronax", "Captain Nemo", "Andy Weir", "Mark Watney", "Parzival", "Aech","The Martian", "Ned Land", "Anathem", "Twenty Thousand Leagues", "H G Wells", "The Time Machine", "Doctor Moreau", "Aldous Huxley", "Brave New World", "Lenina Crowne", "Bernard Marx", "George Orwell", "Airstrip One", "Newspeak", "Winston Smith", "Julia", "Ministry of Truth", "SevenEves", "Kath Two" ];
  this.secretWord = "";
  this.guessTotal = 0;
  this.guessedLetters = [" ",]; // the space is needed for isGameWonOrLost()

  //methods
  this.getSecretWord = function(){
                          this.secretWord = this.secretWordArray.splice(Math.floor(Math.random() * this.secretWordArray.length), 1 );
                          this.secretWord = this.secretWord.toString();
                        };

  this.secretWordLength =  function() { return this.secretWord.length;};

  //guess methods
  this.isValidGuess = function(keyPress){
    //returns true is guess is a lowercase letter and hasn't been guessed, false otherwise
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
    //takes a char and returns an array, i0 = char,
    // i1 = index of guess in secret word or false,
    // i+ = recurring indices
                          var indicesArray = [];
                          indicesArray.push(char);
                          for(var i = 0, l = this.secretWordLength(); i < l; i++){
                            if (char === this.secretWord[i].toLowerCase()) {
                               indicesArray.push(i);
                            } else if (i === (l - 1) && indicesArray.length === 1) {
                              //this requires the last run of the loop and that the array only contains the char.
                              indicesArray.push(false);
                            }
                          }
                          return indicesArray;
                        };

  this.isGameWonOrLost = function() {
    //returns an array w/ true @ index1
    // if max tries has been reached or all letters have been guessed
    // index0 is `w`, `l`, or `null` - corresponding to win, lose, or keep playing respectively

                            for(var i = 0, letterCheck = 0; i < this.secretWord.length; i++){
                              if(this.guessedLetters.indexOf(this.secretWord[i].toLowerCase()) !== -1){
                                letterCheck++;
                              };
                            }
                            if (letterCheck == this.secretWord.length){
                              return ["w" ,true];
                            } else if(this.guessTotal === MAX_TRIES){
                              return ["l", true];
                            } else {
                              return [null, false];//this is an array so the boolean index matches
                            }
                          };

}

/**
  * The following area consists of functions for updating
  * the page HTML according to the values in the current game/Hangman Object
  * also the imageCategories object, which tests the secret word
  * to find the appropriate hint image.
  * The parameters for the function declarations are g and/or key, representing
  * game object and key pressed respectively
  */

var imageCategories = {
    snow: ["Snow Crash", "Metaverse", "Yours Truly", "Hiro Protagonist"],
    neal: ["Neal Stephenson", "Anathem", "The Baroque Cycle", "Cryptonomicon"],
    seven:["SevenEves", "Kath Two", "White Sky", "Amalthea", "Endurance"],
    dune: ["Arrakis", "Dune", "Frank Hebert", "Paul Atreides", "Duncan Idaho", "Fremen"],
    twenty: ["Jules Verne", "Monsieur Arronax", "Captain Nemo", "Ned Land", "Twenty Thousand Leagues"],
    ready: ["Ready Player One",  "Parzival", "Ernest Cline", "Aech"],
    martian: ["Andy Weir", "Mark Watney",  "The Martian"],
    wells : ["H G Wells", "The Time Machine", "Doctor Moreau", "The War of The Worlds"],
    bravenewworld: ["Aldous Huxley", "Brave New World", "Lenina Crowne", "Bernard Marx"],
    george: ["George Orwell", "Airstrip One", "Newspeak", "Winston Smith", "Julia", "Ministry of Truth"],
    find : function(secretWord){
              for(key in this) {
                if(this[key].indexOf(secretWord) !== -1){
                  return key;
                }
              }
            }
};

function updateImage(g){
  var n = imageCategories.find(g.secretWord);
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
  } else if (key == 'seven'){
    document.getElementById("image").setAttribute('src', 'assets/images/seven.jpg');
  }
}

function createBlanks(g){
  var num = g.secretWordLength();
  var word = g.secretWord;
  //this creates the appropriate number of <li> blanks - "_" - and appends them
  //with unique ids, which comes in to play for updating the html
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

function updateGuessHTML(g, key){
  //update guess total
  g.guessMade();
  document.getElementById("left").innerHTML = "Guesses Left: <br>" + (MAX_TRIES - g.guessTotal);
  var c = g.isCorrectGuess(key);
  // update for correct guesses and incorrect guess
  //the return value assigned to c from isCorrectGuess() is why the following logic works
  //skip index0 and the rest are the indices at which the guessed letters occur in the secret word
  for(var i = 1; i < c.length; i++){
    if (c[i] !== false) {
      var blankId = "blank" + c[i];
      document.getElementById(blankId).innerHTML = g.secretWord[c[i]];
    } else {
      var n = document.createElement("LI");
      n.className = "incorrect";
      n.appendChild(document.createTextNode(c[0] + "\u00A0" ));
      document.getElementById("incorrect-guesses").appendChild(n);
    }
  }
}

function updateScoreHTML(g) {
  //updates the score html
  document.getElementById('wins').innerHTML = "Wins: <br> " + g.wins;
  document.getElementById('losses').innerHTML = "Losses: <br> " + g.losses;
  document.getElementById("left").innerHTML = "Guesses Left: <br>" + (MAX_TRIES - g.guessTotal);
}

function resetHTML(g){
  //reset html after a round has been played
  for(var i = 0; i < g.secretWordLength(); i++){
    var parent = document.getElementById('secret-word');
    var id = "blank" + i;
    var child = document.getElementById(id);
    parent.removeChild(child);
  }
  //moving the guessed nodes to the last word area, so it is displayed while next set is played
  var previous = g.secretWord;
  document.getElementById('prev').innerHTML = "Last Word: <br>" + previous;
  var jparent = document.getElementById('incorrect-guesses');
  var jchild = document.getElementsByClassName("incorrect");

  //jchild array gets shorter after removeChild, so if there is no index 0 it will be undefined
  while(jchild[0] != undefined) {
    jparent.removeChild(jchild[0]);
  }
}

function setUp(g){
  //need a word to kick things off
  g.getSecretWord();
  createBlanks(g);
  updateScoreHTML(g);
}

function playGame(g, key){
  //each time playGame is called, we need to know if the the word has been guessed already
  var gameOn = g.isGameWonOrLost();
  // isGameWonOrLost() returns true at index1 if game is over
  // and false if it is still being played so, !false - keep going
  if(!gameOn[1]){
    if(g.isValidGuess(key)){
      updateGuessHTML(g, key);
    };
  } else {
    if(gameOn[0]== "w"){
      g.wins++;
    } else {
      g.losses++;
    }
    resetHTML(g);
    g.guessTotal = 0;
    g.guessedLetters = [" ",]; //back to original value
    setUp(g);
    updateImage(g);
  }
};


//calls
document.onkeypress = function(){
                      //starting game
                        var game = new Hangman();
                        setUp(game);
                        document.getElementById("hint").innerHTML = "Hint: <br>";
                        document.getElementById("initial").innerHTML = "";
                        updateImage(game);
                        document.onkeypress = function(event){
                                                var pressed = String.fromCharCode(event.charCode);
                                                playGame(game, pressed);
                                               };
                                }
