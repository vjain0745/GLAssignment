# Game of Dice

The "Game of Dice" is a multiplayer game where N players roll a 6-faced dice in a round-robin fashion. Each time a player rolls the dice, their points increase by the number (1 to 6) achieved by the roll.

## Rules of the Game

- The order in which the users roll the dice is decided randomly at the start of the game.
- If a player rolls the value "6," they immediately get another chance to roll again and move ahead in the game.
- If a player rolls the value "1" two consecutive times, they are forced to skip their next turn as a penalty.

## Implementation Details

- This implementation of the "Game of Dice" is written in Node.js.
- The program takes the number of players (N) and target points (M) as command line arguments.
- Players are named as Player-1 to Player-N and the order in which they roll the dice is randomly assigned.
- When it's a player's turn to roll the dice, a message is displayed to prompt the player to roll.
- The program simulates dice rolls, displays the points achieved, and updates the player's score.
- After each roll, the current rank table is printed, showing the points of all players and their ranks.
- If a player gets another chance due to rolling a '6' or is penalized due to rolling '1' twice consecutively, an appropriate message is displayed.
- The game ends when all players have accumulated at least M points.

## How to Run the Game

1. Make sure you have Node.js installed on your machine.
2. Clone this repository or download the code files.
3. Open a terminal and navigate to the project directory.
4. Run the game by executing the command: `node app.js <number_of_players> <target_points>`
   - Replace `<number_of_players>` with the desired number of players (N).
   - Replace `<target_points>` with the desired target points (M).
   - For example, to play the game with 4 players and a target of 20 points: `node app.js 4 20`

## Example Command
    - node app.js 4 20