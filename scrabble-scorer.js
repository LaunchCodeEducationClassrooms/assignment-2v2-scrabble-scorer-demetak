// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  word = input.question("Let's play some scrabble! Enter a word: ");
  const regex = new RegExp(/^[a-z\s]+$/i);

  while (!regex.test(word)) {
   word = input.question("Let's play some scrabble! Enter a word: ");
  }
};

let simpleScore = function(word){return word.length;};

let vowelBonusScore = function(word){
  word = word.toUpperCase();
  let score = 0;
  for (let i=0;i<word.length;i++){
    if (word[i]=="A"||word[i]=="E"|word[i]=="I"|word[i]=="O"|word[i]=="U"){
      score +=3;
    } else {
      score +=1;
    }
  }
  return score};;

let scrabbleScore = function(word){
  word = word.toUpperCase();
  score = 0;
  for (let i=0;i<word.length;i++){
    score +=newPointStructure[word[i]];
  }
  return score;
};

const scoringAlgorithms = [{name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScore},{name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: vowelBonusScore},{name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: scrabbleScore}];

function scorerPrompt() {
  let question= "Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ";
  let selectedAlgorithm = 3;

  const regex = new RegExp(/^[012]$/);

  while (!regex.test(selectedAlgorithm)) {
   selectedAlgorithm = input.question(question);
  }
  return scoringAlgorithms[selectedAlgorithm];
}

function transform(oldPointStruct) {
  let newPointStruct={};
  for (const pointValue in oldPointStruct) {
    for (let i=0; i<oldPointStruct[pointValue].length;i++){
      newPointStruct[oldPointStruct[pointValue][i]]= parseInt(pointValue);
    }
  }
  return newPointStruct;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   newPointStructure[" "]=0;
   initialPrompt();
   let algorithm = scorerPrompt();
   let score = algorithm.scoreFunction(word);
   console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

