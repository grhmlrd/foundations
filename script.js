const circle = document.getElementById("circle");
const x = document.getElementById("x");
const boxes = document.querySelectorAll(".box");
const popup = document.querySelector(".popup-section");
const play_again = document.getElementById("play-again");
const turnSection = document.getElementById("turn-section");
const result = document.getElementById("result");
const winner = document.getElementById("winner");

const textResult = document.createElement("span");
let circleTurn = false;
let gameOver = false;
let count = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

toggleTurn();
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.querySelector("svg")) return;

    const character = circleTurn ? circle.cloneNode(true) : x.cloneNode(true);
    box.append(character);
    const value = circleTurn ? "circle" : "x";
    box.dataset.value = value;

    count++;
    console.log("count: ", count);
    if (checkForWin(value)) {
      gameOver = true;
      textResult.innerText = "Winner: ";
      const winner = circleTurn ? circle.cloneNode(true) : x.cloneNode(true);
      result.append(textResult);
      result.append(winner);
    } else if (count == boxes.length) {
      gameOver = true;
      textResult.innerText = "Draw!";
      result.append(textResult);
    }

    if (gameOver) {
      popup.classList.remove("hidden");
      return;
    }

    toggleTurn();
  });
});

function checkForWin(value) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    let win = true;
    for (let j = 0; j < combination.length; j++) {
      const index = combination[j];
      if (boxes[index].dataset.value !== value) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

play_again.addEventListener("click", reset);

function toggleTurn() {
  turnSection.innerHTML = "";
  circleTurn = !circleTurn;
  const character = circleTurn ? circle.cloneNode(true) : x.cloneNode(true);
  const textTurn = document.createElement("span");
  textTurn.innerText = "turn!";
  turnSection.append(character);
  turnSection.append(textTurn);
}

function reset() {
  popup.classList.add("hidden");
  count = 0;
  gameOver = false;
  boxes.forEach((box) => {
    box.dataset.value = null;
    const svg = box.querySelector("svg");
    if (svg) {
      box.removeChild(svg);
    }
  });

  result.innerHTML = "";
  toggleTurn();
}
