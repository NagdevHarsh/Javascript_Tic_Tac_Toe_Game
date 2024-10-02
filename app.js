let gameBoxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let isPlayerO = true; //playerX, playerO
let moveCount = 0; //To Track Draw

const winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGameBoard = () => {
  isPlayerO = true;
  moveCount = 0;
  enableGameBoxes();
  messageContainer.classList.add("hide");
};

gameBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (isPlayerO) {
      //playerO
      box.innerText = "O";
      isPlayerO = false;
    } else {
      //playerX
      box.innerText = "X";
      isPlayerO = true;
    }
    box.disabled = true;
    moveCount++;

    let winnerExists = checkForWinner();

    if (moveCount === 9 && !winnerExists) {
      announceDraw();
    }
  });
});

const announceDraw = () => {
  message.innerText = `Game is a Draw.`;
  messageContainer.classList.remove("hide");
  disableGameBoxes();
};

const disableGameBoxes = () => {
  for (let box of gameBoxes) {
    box.disabled = true;
  }
};

const enableGameBoxes = () => {
  for (let box of gameBoxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const declareWinner = (winner) => {
  message.innerText = `Congratulations, the winner is ${winner}!`;
  messageContainer.classList.remove("hide");
  disableGameBoxes();
};

const checkForWinner = () => {
  for (let combination of winningCombinations) {
    let firstBox = gameBoxes[combination[0]].innerText;
    let secondBox = gameBoxes[combination[1]].innerText;
    let thirdBox = gameBoxes[combination[2]].innerText;

    if (firstBox != "" && secondBox != "" && thirdBox != "") {
      if (firstBox === secondBox && secondBox === thirdBox) {
        declareWinner(firstBox);
        return true;
      }
    }
  }
};

newGameButton.addEventListener("click", resetGameBoard);
resetButton.addEventListener("click", resetGameBoard);
