function changeHeading(event) {
  console.dir(event);
  const heading = document.getElementById("heading");
  heading.innerText = "New heading!";
  heading.style.color = "red";
  const button = document.getElementById("headingbutton").parentNode;
  console.log(button);
  button.classList.remove("aqua");
}
const score = {
  O: 0,
  X: 0,
  tie: 0,
};
const scoreboard = document.getElementById("scoreboard");
scoreboard.innerText = `🟢 : ${score.O}\n ❌ : ${score.X} \n tie : ${score.tie}`;
let turn = "🟢";
let playedSquares = [];
const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let winner = false;

function reset() {
  const btn = document.createElement("button");
  btn.innerHTML = "Reset Grid";
  btn.addEventListener("click", () => {
    if (turn === "❌") turn = "🟢";
    else turn = "❌";
    playedSquares.length = 0;
    for (let square = 1; square < 10; square++) {
      document.getElementById(square).innerText = "";
    }
    document.body.removeChild(btn);
    winner = false;
    const turnText = document.getElementById("turn");
    turnText.innerText = `${turn} goes first!`;
  });
  document.body.appendChild(btn);
}

function playGame(square) {
  const turnText = document.getElementById("turn");
  if (!playedSquares.includes(square) && !winner) {
    console.log(turn);
    console.log(playedSquares);
    playedSquares.push(square);
    const chosenSquare = document.getElementById(square);
    chosenSquare.innerText = turn;
    winningCombos.forEach((combo) => {
      if (
        document.getElementById(combo[0]).innerText !== "" &&
        document.getElementById(combo[0]).innerText ===
          document.getElementById(combo[2]).innerText &&
        document.getElementById(combo[0]).innerText ===
          document.getElementById(combo[1]).innerText
      ) {
        turnText.innerText = `${turn} is the winner!`;
        winner = true;
        if (turn === "❌") {
          score.X++;
        } else {
          score.O++;
        }
        scoreboard.innerText = `🟢 : ${score.O}\n ❌ : ${score.X} \n tie : ${score.tie}`;

        reset();
      }
    });
    if (!winner && playedSquares.length === 9) {
      turnText.innerText = `Stalemate!`;
      score.tie++;
      scoreboard.innerText = `🟢 : ${score.O}\n ❌ : ${score.X} \n tie : ${score.tie}`;

      reset();
    }
    if (!winner && playedSquares.length < 9) {
      if (turn === "❌") turn = "🟢";
      else turn = "❌";
      turnText.innerText = `It is ${turn}'s turn`;
    }
  }
}
