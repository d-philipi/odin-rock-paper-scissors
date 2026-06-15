# Rock Paper Scissors

A Rock Paper Scissors game built with vanilla JavaScript as part of [The Odin Project](https://www.theodinproject.com/) curriculum. The project started as a console-based game driven by `prompt()` and `console.log()`, and has since been extended with a **browser UI** and **DOM manipulation** via `scriptGame.js`.

## Current Status

The active version runs in the browser with clickable buttons, live scoreboard, choice display, and visual feedback. Open `index.html` to play — no Developer Tools or prompts required.

| Feature | Status |
|---------|--------|
| Console game (`script.js`) | Preserved as the original implementation |
| UI with buttons | Implemented |
| DOM score & choice updates | Implemented |
| Result text & images | Implemented |
| First to 5 points wins | Implemented |
| Tie round UI feedback | Partial — ties do not yet update the choice/result display |

The page currently loads `scriptGame.js`. The original `script.js` remains in the repo for reference but is not linked from `index.html`.

## How to Run

1. Clone or download this repository.
2. Open `index.html` in a web browser (Chrome, Firefox, Edge, etc.).
3. Click **Rock**, **Paper**, or **Scissors** to play a round.
4. Scores update on the page after each win or loss. The first player to reach **5 points** wins the game.

## Game Rules

| Choice   | Beats     |
|----------|-----------|
| Rock     | Scissors  |
| Paper    | Rock      |
| Scissors | Paper     |

- Each round compares your choice against the computer's random choice.
- A tie gives neither player a point.
- The game ends when either the player or the computer reaches **5 points**.

## Project Structure

```
odin-rock-paper-scissors/
├── index.html       # Game page — layout, UI elements, loads scriptGame.js
├── scriptGame.js    # UI version — DOM manipulation + game logic
├── script.js        # Original console version (prompt + console.log)
├── style.css        # Layout and visual styling
├── finger_point.png # Result image (shown on win/loss)
├── question.png     # Placeholder image (shown before first result)
└── README.md        # This file
```

---

## UI Overview (`index.html`)

The page is divided into four main areas:

```
┌─────────────────────────────────────────┐
│           Rock Paper Scissors           │
├──────────────────┬──────────────────────┤
│     Player       │      Computer        │
│   Score: 0       │    Score: 0          │
│   Choice: None   │    Choice: None      │
├──────────────────┴──────────────────────┤
│              Result                     │
│         [question / finger image]       │
│         "What will you choose?"         │
├─────────────────────────────────────────┤
│    [Rock]    [Paper]    [Scissors]      │
└─────────────────────────────────────────┘
```

### Key HTML elements

| Element | Selector | Purpose |
|---------|----------|---------|
| Player score | `.player-score p` | Displays the human score |
| Computer score | `.computer-score p` | Displays the computer score |
| Player choice | `.player-choice p` | Shows the player's last pick |
| Computer choice | `.computer-choice p` | Shows the computer's last pick |
| Result title | `.result-title` | Shows round/game outcome heading |
| Result text | `#result-text` | Describes the round result |
| Result image | `#result-image` | Finger-point image on win/loss |
| Question image | `#question-image` | Shown before a result is decided |
| Buttons | `#rock`, `#paper`, `#scissors` | Player input |

---

## Styling (`style.css`)

The UI uses **Flexbox** for layout and **CSS nesting** for scoped selectors.

- The page is centered vertically and horizontally with a card-style `.container`.
- `.game-container` splits the screen into left (Player) and right (Computer) columns.
- `.result-container` stacks the title, images, and result text.
- Buttons have hover effects (`transform`, `box-shadow`, color transition).
- `#result-image` starts hidden and is shown by JavaScript after a win or loss.
- The finger image is flipped horizontally (`scaleX(-1)`) when the player wins and shown normally when the computer wins.

---

## Code Overview — UI Version (`scriptGame.js`)

All interactive logic lives in `scriptGame.js`. The file is organized around **DOM references**, **event listeners**, and **game functions**.

### DOM References

Elements are captured when the script loads:

```javascript
const btnButtons = document.querySelector('.buttons-container');

const humanScore = document.querySelector('.player-score').querySelector('p');
const computerScore = document.querySelector('.computer-score').querySelector('p');
const humanChoice = document.querySelector('.player-choice').querySelector('p');
const computerChoice = document.querySelector('.computer-choice').querySelector('p');

const resultText = document.getElementById('result-text');
const resultImage = document.getElementById('result-image');
const questionImage = document.getElementById('question-image');
const resultTitle = document.querySelector('.result-title');
```

**Parent → child access:** For score and choice containers, the parent `div` is selected first with `querySelector('.player-score')`, then the inner `<p>` is reached with `.querySelector('p')`. This is necessary because those containers use **classes**, not **ids**.

### Event Listener (Event Delegation)

Instead of attaching a listener to each button individually, a single listener is placed on the button container:

```javascript
btnButtons.addEventListener('click', (e) => {
    let humanChoice = e.target.id;
    playRound(humanChoice);
});
```

When a button is clicked, `e.target.id` returns `"rock"`, `"paper"`, or `"scissors"`, which is passed directly to `playRound()`.

### Functions

#### `getComputerChoice()`

Generates the computer's move using `Math.random()`.

1. `Math.random()` returns a decimal between 0 and 1 (e.g. `0.47`).
2. `.toFixed(2)` rounds it to two decimal places as a string (e.g. `"0.47"`).
3. The value is compared against two thresholds:
   - `0.00 – 0.32` → `"rock"`
   - `0.33 – 0.65` → `"paper"`
   - `0.66 – 1.00` → `"scissors"`

#### `playRound(humanChoice)`

The core logic for a single round.

1. Calls `getComputerChoice()` to get the computer's pick.
2. Compares both choices with a nested ternary chain (same logic as the console version).
3. Passes the result and both choices to `updateScore()`.

Example outcomes:

```
"It's a tie!"
"You win! Rock beats Scissors"
"You lose! paper beats rock"
```

#### `updateScore(result, humanChoice, computerChoice)`

Updates the page based on the round outcome.

| Condition | DOM updates |
|-----------|-------------|
| Player wins | Increment `.player-score`, show `#result-image` flipped, hide `#question-image`, update `#result-text` |
| Computer wins | Increment `.computer-score`, show `#result-image` normal, hide `#question-image`, update `#result-text` |
| Either score reaches 5 | Update `.result-title` with game-over message, hide `.buttons-container` |

Score values are read and written via `textContent`:

```javascript
humanScore.textContent = parseInt(humanScore.textContent) + 1;
```

Image visibility is toggled via the `style` property:

```javascript
resultImage.style.display = "block";
questionImage.style.display = "none";
resultImage.style.transform = "scaleX(-1)"; // player win
```

---

## Code Overview — Console Version (`script.js`)

The original implementation is kept for reference. It uses:

- **State variables** (`round`, `humanScore`, `computerScore`) instead of DOM elements
- **`prompt()`** for player input via `getHumanChoice()`
- **`console.log()`** for round results and running scores
- **Recursion** in `playGame()` to loop through 5 rounds
- **`alert()`** via `checkWinner()` to announce the final result

To run the console version, change the `<script>` tag in `index.html` from `scriptGame.js` to `script.js` and open the browser console.

---

## Game Flow Diagram (UI Version)

```
Page loads
    │
    ▼
DOM elements captured (querySelector / getElementById)
    │
    ▼
User clicks Rock / Paper / Scissors
    │
    ▼
playRound(humanChoice)
    │
    ├──► getComputerChoice() ──► random pick
    ├──► compare choices ──► result string
    │
    ▼
updateScore(result)
    │
    ├── win  ──► humanScore++, update images & text
    ├── lose ──► computerScore++, update images & text
    └── score === 5? ──► game over, hide buttons
```

---

## Concepts Used

### Original (console)

- **Arrow functions** for concise function syntax
- **`Math.random()`** for pseudo-random number generation
- **`prompt()` and `alert()`** for browser-based user interaction
- **`console.log()`** for debugging and displaying game state
- **Ternary operators** for compact conditional logic
- **Recursion** — `playGame()` calls itself to advance through rounds
- **String methods** — `.toLowerCase()` and `.includes()` for input handling

### UI version (current)

- **`document.querySelector()` / `getElementById()`** — selecting DOM elements
- **Parent → child navigation** — `.querySelector('p')` on a captured parent
- **`textContent`** — reading and writing text inside elements
- **`style` property** — toggling visibility and CSS transforms from JavaScript
- **Event delegation** — one listener on `.buttons-container` handles all button clicks
- **`addEventListener('click', ...)`** — responding to user input
- **`e.target.id`** — identifying which button was clicked
- **Flexbox & CSS nesting** — page layout and component styling

---

## Possible Improvements

- Handle tie rounds in the UI (update choice display and result text)
- Resolve variable name shadowing in `updateScore()` (parameter names overlap with DOM references)
- Add a "Play again" button after game over
- Add input validation (ignore clicks on the container itself, not just buttons)
- Show round counter on the page
- Add animations or icons for rock, paper, and scissors choices
- Responsive layout for smaller screens

---

## Image Credits

**finger_point.png:** Imagem de [DreamDigitalArtist](https://pixabay.com/pt/users/dreamdigitalartist-2065653/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7148493) por [Pixabay](https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7148493)

**question.png:** Imagem de [A Lemay](https://pixabay.com/pt/users/misskalem-39644033/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=10246930) por [Pixabay](https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=10246930)

---

## License

See [LICENSE](LICENSE) for details.
