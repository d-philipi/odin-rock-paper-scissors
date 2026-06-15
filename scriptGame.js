const btnButtons = document.querySelector('.buttons-container');

const resultImage = document.getElementById('result-image');
const questionImage = document.getElementById('question-image');
const resultText = document.getElementById('result-text');

const humanScore = document.querySelector('.player-score').querySelector('p');
const computerScore = document.querySelector('.computer-score').querySelector('p');
const humanChoice = document.querySelector('.player-choice').querySelector('p');
const computerChoice = document.querySelector('.computer-choice').querySelector('p');
const resultTitle = document.querySelector('.result-title');

btnButtons.addEventListener('click', (e) => {
    let humanChoice = e.target.id;
    playRound(humanChoice);
});

function getComputerChoice() {
    let choice = Math.random().toFixed(2);
    if (choice >= 0 && choice < 0.33) {
        return "rock";
    } else if (choice >= 0.33 && choice < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function updateScore(result, humanChoice, computerChoice) {
    if (result.includes("win")) {
        humanScore.textContent = parseInt(humanScore.textContent) + 1;
        resultImage.src = "./finger_point.png";
        resultImage.style.display = "block";
        resultImage.style.transform = "scaleX(-1)";
        questionImage.style.display = "none";
        resultText.textContent = result;
        humanChoice.textContent = humanChoice;
        computerChoice.textContent = computerChoice;
    } else if (result.includes("lose")) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
        resultImage.src = "./finger_point.png";
        resultImage.style.display = "block";
        resultImage.style.transform = "scaleX(1)";
        questionImage.style.display = "none";
        resultText.textContent = result;
        humanChoice.textContent = humanChoice;
        computerChoice.textContent = computerChoice;
    }

    if (humanScore.textContent === "5") {
        resultTitle.textContent = "You win the game! You are the winner!";
        btnButtons.style.display = "none";
    } else if (computerScore.textContent === "5") {
        resultTitle.textContent = "You lose the game! Computer is the winner!";
        btnButtons.style.display = "none";
    }
}

function playRound(humanChoice) {
    let computerChoice = getComputerChoice();
    let result = humanChoice === computerChoice 
    ? "It's a tie!" : humanChoice === "rock" && computerChoice === "scissors"
    ? "You win! Rock beats Scissors" : humanChoice === "paper" && computerChoice === "rock"
    ? "You win! Paper beats Rock" : humanChoice === "scissors" && computerChoice === "paper"
    ? "You win! Scissors beats Paper" : "You lose! " + computerChoice + " beats " + humanChoice;
    updateScore(result, humanChoice, computerChoice);
    return;
}
