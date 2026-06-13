let round = 0;
let humanScore = 0;
let computerScore = 0;

let getComputerChoice = () => {
    let choice = Math.random().toFixed(2);
    if (choice >= 0 && choice < 0.33) {
        return "rock";
    } else if (choice >= 0.33 && choice < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

let getHumanChoice = () => {
    let choice = prompt("Enter your choice: rock, paper, or scissors");
    return choice;
}

let updateScore = (result) => {
    round++;
    if (result.includes("win")) {
        humanScore++;
    } else if (result.includes("lose")) {
        computerScore++;
    }
}

let checkWinner = () => {
    if (humanScore === computerScore) {
        return "It's a tie! No one wins the game!";
    } else if (humanScore > computerScore) {
        return "You win the game! You are the winner!";
    } else {
        return "You lose the game! Computer is the winner!";
    }
}

let playRound = (humanChoice, computerChoice) => {
    humanChoice = humanChoice.toLowerCase();

    let result = humanChoice === computerChoice 
    ? "It's a tie!" : humanChoice === "rock" && computerChoice === "scissors"
    ? "You win! Rock beats Scissors" : humanChoice === "paper" && computerChoice === "rock"
    ? "You win! Paper beats Rock" : humanChoice === "scissors" && computerChoice === "paper"
    ? "You win! Scissors beats Paper" : "You lose! " + computerChoice + " beats " + humanChoice;

    updateScore(result);
    return result;
}

let humanSelection = getHumanChoice();
let computerSelection = getComputerChoice();


let playGame = () => {
    console.log(playRound(humanSelection, computerSelection));
    console.log("--------------------------------");
    console.log("Human: " + humanSelection);
    console.log("Computer: " + computerSelection);
    console.log("--------------------------------");
    console.log("Round: " + round);
    console.log("Human Score: " + humanScore);
    console.log("Computer Score: " + computerScore);

    if (round === 5) {
        alert(checkWinner());
        return;
    }
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();
    playGame();
}

playGame();