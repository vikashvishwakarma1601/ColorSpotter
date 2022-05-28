const grid = document.querySelector(".grid-wrapper");
const startBtn = document.querySelector(".startBtn");
const score = document.querySelector(".score");
const gameOverText = document.querySelector(".gameOverText");
const fragment = document.createDocumentFragment();
const SCORE_TO_INCREMENT = 10;
let noOfBlocks = 3;
let isGameStart = false;
let spotterBlockIndex = null;
let totalScore = 0;

function createBlock(id) {
  const div = document.createElement("div");
  div.id = `block-${id}`;
  div.classList.add("grid-block");
  return div;
}

function showSpot(index) {
  spotterBlockIndex = index;
  const block = document.querySelector(`#block-${index}`);
  block.style.opacity = "0.9";
}

function generateSpotterIndex() {
  return (Math.random() * noOfBlocks ** 2) | 0;
}

function renderGridBlocks() {
  let n = noOfBlocks * noOfBlocks;
  for (let i = 0; i < n; i++) {
    fragment.appendChild(createBlock(i));
  }
  grid.innerHTML = "";
  grid.appendChild(fragment);
  grid.style.gridTemplateColumns = `repeat(${noOfBlocks},1fr)`;
}

function setScore() {
  totalScore += SCORE_TO_INCREMENT;
  score.textContent = totalScore;
}

function handleNextStage() {
  noOfBlocks++;
  setScore();
  renderGridBlocks();
  let index = generateSpotterIndex();
  showSpot(index);
}

function startGame() {
  startBtn.style.visibility = "hidden";
  gameOverText.style.visibility = "hidden";
  let index = generateSpotterIndex();
  showSpot(index);
  isGameStart = true;
}

function resetGame() {
  startBtn.style.visibility = "visible";
  startBtn.textContent = "Start Again";
  gameOverText.style.visibility = "visible";
  isGameStart = false;
  noOfBlocks = 3;
  totalScore = 0;
  renderGridBlocks();
}

startBtn.addEventListener("click", startGame);

grid.addEventListener("click", (event) => {
  let id = event.target.id.split("-")[1];
  if (isGameStart) {
    if (spotterBlockIndex == id) {
      handleNextStage();
    } else {
      resetGame();
    }
  }
});

