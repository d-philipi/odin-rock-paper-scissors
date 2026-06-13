# Rock Paper Scissors

A console-based Rock Paper Scissors game built with vanilla JavaScript as part of [The Odin Project](https://www.theodinproject.com/) curriculum. The game runs in the browser using `prompt()` for player input and `console.log()` for round results. There is no graphical user interface yet—the focus is on game logic and function organization.

## How to Run

1. Clone or download this repository.
2. Open `index.html` in a web browser (Chrome, Firefox, Edge, etc.).
3. Open the browser's **Developer Tools** (F12 or right-click → Inspect) and go to the **Console** tab to see round results and scores.
4. When prompted, type your choice: `rock`, `paper`, or `scissors`.
5. Play 5 rounds. After the final round, an alert will announce the overall winner.

## Game Rules

| Choice   | Beats     |
|----------|-----------|
| Rock     | Scissors  |
| Paper    | Rock      |
| Scissors | Paper     |

- Each round compares your choice against the computer's random choice.
- A tie gives neither player a point.
- The game lasts **5 rounds**. Whoever has the higher score after round 5 wins.

## Project Structure

```
odin-rock-paper-scissors/
├── index.html   # Minimal HTML page that loads script.js
├── script.js    # All game logic
└── README.md    # This file
```

### `index.html`

A simple HTML shell. It sets the page title and loads `script.js` at the bottom of the `<body>`. No visible UI elements—the game is driven entirely by JavaScript prompts and console output.

---

## Code Overview

All logic lives in `script.js`. The file is organized around **state variables**, **helper functions**, and a **recursive game loop**.

### State Variables

These variables track the game across all rounds:

```javascript
let round = 0;           // Current round number (incremented after each round)
let humanScore = 0;      // Points earned by the human player
let computerScore = 0;   // Points earned by the computer
```

Two additional variables store the current round's choices and are updated before each new round:

```javascript
let humanSelection = getHumanChoice();
let computerSelection = getComputerChoice();
```

---

### Functions

#### `getComputerChoice()`

Generates the computer's move using `Math.random()`.

1. `Math.random()` returns a decimal between 0 and 1 (e.g. `0.47`).
2. `.toFixed(2)` rounds it to two decimal places as a string (e.g. `"0.47"`).
3. The value is compared against two thresholds:
   - `0.00 – 0.32` → `"rock"`
   - `0.33 – 0.65` → `"paper"`
   - `0.66 – 1.00` → `"scissors"`

This splits the random range into three roughly equal segments, giving each choice an equal chance.

---

#### `getHumanChoice()`

Uses the browser's `prompt()` dialog to ask the player for their choice.

```javascript
let choice = prompt("Enter your choice: rock, paper, or scissors");
return choice;
```

The returned string is passed to `playRound()`, where it is normalized with `.toLowerCase()` so input like `"Rock"` or `"PAPER"` still works.

---

#### `updateScore(result)`

Updates the round counter and scoreboard based on the outcome of a single round. This function was added beyond the basic Odin Project requirements.

| Condition              | Effect              |
|------------------------|---------------------|
| `result` contains `"win"`  | `humanScore++`      |
| `result` contains `"lose"` | `computerScore++`   |
| Tie (neither word)     | Scores unchanged    |

`round` is incremented on every call, regardless of outcome. Ties still count as a played round but do not award points.

---

#### `checkWinner()`

Determines the overall game winner after all 5 rounds. Also added as an extension beyond the base assignment.

| Condition                    | Message returned                              |
|------------------------------|-----------------------------------------------|
| `humanScore === computerScore` | `"It's a tie! No one wins the game!"`       |
| `humanScore > computerScore`   | `"You win the game! You are the winner!"`   |
| `computerScore > humanScore`   | `"You lose the game! Computer is the winner!"` |

This function is called once, when `round === 5`, and its return value is shown via `alert()`.

---

#### `playRound(humanChoice, computerChoice)`

The core logic for a single round.

1. **Normalize input** — `humanChoice.toLowerCase()` ensures case-insensitive comparison.
2. **Determine result** — A nested ternary chain compares the two choices:
   - Same choice → tie message
   - Rock vs Scissors, Paper vs Rock, or Scissors vs Paper → human wins
   - Any other combination → computer wins
3. **Update score** — Calls `updateScore(result)` to increment the round and adjust scores.
4. **Return result** — The outcome string is returned so `playGame()` can log it.

Example outcomes:

```
"It's a tie!"
"You win! Rock beats Scissors"
"You lose! paper beats rock"
```

---

#### `playGame()`

The main game loop. It runs recursively until 5 rounds are complete.

**Each iteration:**

1. Logs the round result via `playRound()`.
2. Logs a summary to the console:
   - Human and computer choices
   - Current round number
   - Running scores for both players
3. Checks if `round === 5`:
   - **Yes** → Shows the final winner with `alert(checkWinner())` and stops.
   - **No** → Prompts for a new human choice, generates a new computer choice, and calls `playGame()` again.

The game starts immediately when the script loads:

```javascript
playGame();
```

---

## Game Flow Diagram

```
Page loads
    │
    ▼
getHumanChoice()  ──► prompt for round 1
getComputerChoice() ──► random choice for round 1
    │
    ▼
playGame()
    │
    ├──► playRound() ──► compare choices ──► updateScore()
    ├──► console.log results & scores
    │
    ├── round < 5? ──► get new choices ──► playGame() again
    │
    └── round === 5? ──► alert(checkWinner()) ──► game over
```

---

## Example Console Output

After a few rounds, the console might look like this:

```
You win! Rock beats Scissors
--------------------------------
Human: rock
Computer: scissors
--------------------------------
Round: 1
Human Score: 1
Computer Score: 0
You lose! paper beats rock
--------------------------------
Human: rock
Computer: paper
--------------------------------
Round: 2
Human Score: 1
Computer Score: 1
```

After round 5, an alert appears with the final result, for example: **"You win the game! You are the winner!"**

---

## Concepts Used

- **Arrow functions** (`() => {}`) for concise function syntax
- **`Math.random()`** for pseudo-random number generation
- **`prompt()` and `alert()`** for browser-based user interaction
- **`console.log()`** for debugging and displaying game state
- **Ternary operators** for compact conditional logic
- **Recursion** — `playGame()` calls itself to advance through rounds
- **String methods** — `.toLowerCase()` and `.includes()` for input handling and score updates

---

## Possible Improvements

These are not implemented yet but are common next steps for this project:

- Add input validation in `getHumanChoice()` (reject invalid choices)
- Replace recursion with a `for` loop for clearer flow control
- Build a DOM-based UI with clickable buttons instead of prompts
- Display running scores on the page instead of only in the console

---

## License

See [LICENSE](LICENSE) for details.
