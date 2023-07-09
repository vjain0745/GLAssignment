const readline = require("readline");

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to check if a player has rolled '1' twice consecutively
function checkPenalty(rolls) {
  const len = rolls.length;
  if (len < 2) {
    return false;
  }
  return rolls[len - 1] === 1 && rolls[len - 2] === 1;
}

// Function to simulate the game of dice
function playGame(numPlayers, targetPoints) {
  const players = [];
  const rolls = [];
  let currentPlayer = 0;
  let ranks = [];
  let currentRank = 1;

  // Initialize players and ranks
  for (let i = 1; i <= numPlayers; i++) {
    players.push({
      name: `Player-${i}`,
      points: 0,
      rank: 0,
      skipTurn: false,
      extraChance: false,
    });
    ranks.push(i);
  }

  // Randomly shuffle the players' order
  const shuffledPlayers = shuffleArray(players);

  // Create a readline interface for input/output
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Function to handle a player's turn
  function takeTurn() {
    const player = shuffledPlayers[currentPlayer];

    // Check if the player has completed the game
    if (player.points >= targetPoints) {
      if(!player?.rank){
        player.rank = currentRank;
        currentRank++;
        console.log(
          `${player.name} has completed the game. Rank: ${player.rank}`
        );
      }

      // Check if all players have completed the game
      const allPlayersFinished = shuffledPlayers.every((p) => p.rank > 0);
      if (allPlayersFinished) {
        rl.close();
        printRankTable();
        return;
      }

      currentPlayer = (currentPlayer + 1) % numPlayers;
      takeTurn();
      return;
    }

    console.log(`${player.name}, it's your turn. (Press 'r' to roll the dice)`);
  }

  // Function to print the current rank table
  function printRankTable() {
    console.log("Current Rank Table:");
    shuffledPlayers.forEach((player) => {
      console.log(
        `${player.name}\tPoints: ${player.points}\tRank: ${player.rank} \n`
      );
    });
  }

  // Function to handle user input
  function handleInput(input) {
    if (input.toLowerCase() === "r") {
      const player = shuffledPlayers[currentPlayer];

      // Skip turn if penalized
      if (player.skipTurn) {
        console.log(
          `${player.name}, you are penalized and cannot roll the dice. Skipping your turn.`
        );
        player.skipTurn = false;
        currentPlayer = (currentPlayer + 1) % numPlayers;
        takeTurn();
        return;
      }

      const roll = getRandomNumber(1, 6);
      rolls.push(roll);

      console.log(`${player.name} rolled a ${roll}`);

      // Check for consecutive 1s penalty
      if (checkPenalty(rolls)) {
        console.log(
          `${player.name}, you rolled 1 twice consecutively. You are penalized and will skip your next turn.`
        );
        player.skipTurn = true;
      } else {
        // Update player's points
        player.points += roll;

        // Check for extra chance on rolling a 6
        if (roll === 6) {
          player.extraChance = true;
        } else {
          player.extraChance = false;
          currentPlayer = (currentPlayer + 1) % numPlayers;
        }
      }

      printRankTable();

      // Check for extra chance or move to the next player's turn
      if (player.extraChance) {
        console.log(
          `${player.name}, you rolled a 6 and get an extra chance to roll again.`
        );
      } else {
        takeTurn();
      }
    }
  }

  // Start the game
  takeTurn();

  // Listen for user input
  rl.on("line", (input) => {
    handleInput(input.trim());
  });
}

// Parse command line arguments
const numPlayers = parseInt(process.argv[2]);
const targetPoints = parseInt(process.argv[3]);

// Check if command line arguments are valid
if (
  isNaN(numPlayers) ||
  isNaN(targetPoints) ||
  numPlayers < 2 ||
  targetPoints < 1
) {
  console.log(
    "Invalid command line arguments. Please provide the number of players (N) and target points (M)."
  );
} else {
  playGame(numPlayers, targetPoints);
}