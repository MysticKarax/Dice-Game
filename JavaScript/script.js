// Elementos HTML
const hCurrentScorePlayer1 = document.querySelector("#current--0");
const hCurrentScorePlayer2 = document.querySelector("#current--1");
const hDice = document.querySelector(".dice");
const hPlayer1 = document.querySelector(".player--0");
const hPlayer2 = document.querySelector(".player--1");
const hFinalScorePlayer1 = document.querySelector("#score--0");
const hFinalScorePlayer2 = document.querySelector("#score--1");
const hRestartButton = document.querySelector(".btn--new");
const hHoldButton = document.querySelector(".btn--hold");
const hRollButton = document.querySelector(".btn--roll");

// TODO: Borrar funciones RestartFinalScoreText y RestartCurrentScore ✅
// FIXME: Cambiar nombres de variables ✅

// Declarando variables;
let nRandomNumber, aScore, nCurrentScore, nSwitchPlayers, bGameRunning;

// D.Y.R
function ActivePlayers() {
  hPlayer1.classList.toggle("player--active");
  hPlayer2.classList.toggle("player--active");
  nSwitchPlayers = nSwitchPlayers === 0 ? 1 : 0;
}

Initialize();

hRollButton.addEventListener("click", function () {
  // Si "jugador activo" es verdadero, entonces iniciar como jugador 1, si no, como jugador 2.
  if (bGameRunning) {
    hDice.classList.remove("hide");
    nRandomNumber = Math.trunc(Math.random() * 6) + 1;
    hDice.src = `./Images/dice-${nRandomNumber}.png`;
    // Claw Guards: Siempre revisar 1ro el resultado que no se quiere obtener
    if (nRandomNumber === 1) {
      nCurrentScore = 0;
      document.querySelector(`#current--${nSwitchPlayers}`).textContent = 0;
      // Cambiar de jugador
      ActivePlayers();
      return; // Termina la función, y el usuario vuelve a iniciarla al darle click al botón de nuevo.
    }
    nCurrentScore += nRandomNumber;
    document.querySelector(`#current--${nSwitchPlayers}`).textContent =
      nCurrentScore;
  }
});

hHoldButton.addEventListener("click", function () {
  if (bGameRunning) {
    aScore[nSwitchPlayers] += nCurrentScore;
    document.querySelector(`#score--${nSwitchPlayers}`).textContent =
      aScore[nSwitchPlayers];
    nCurrentScore = 0;
    document.querySelector(`#current--${nSwitchPlayers}`).textContent = 0;
    // Ganador
    if (aScore[nSwitchPlayers] >= 50) {
      document
        .querySelector(`.player--${nSwitchPlayers}`)
        .classList.add("player--winner");
      document
        .querySelector(`#score--${nSwitchPlayers}`)
        .classList.add("mainScoreText");
      document

        .querySelector(`.player--${nSwitchPlayers}`)
        .classList.remove("player--active");
      hDice.classList.add("hide");
      bGameRunning = 0;
    } else {
      ActivePlayers();
    }
  }
});

function Initialize() {
  aScore = [0, 0];
  nCurrentScore = 0;
  nSwitchPlayers = 0;
  bGameRunning = 1;
  hCurrentScorePlayer1.textContent = 0;
  hCurrentScorePlayer2.textContent = 0;
  hDice.classList.add("hide");
  hFinalScorePlayer1.textContent = 0;
  hFinalScorePlayer2.textContent = 0;
  hPlayer1.classList.add("player--active");
  hPlayer2.classList.remove("player--active");
  hPlayer1.classList.remove("player--winner");
  hPlayer2.classList.remove("player--winner");
  nSwitchPlayers = 0;
  bGameRunning = 1;
}
// Restart Game
hRestartButton.addEventListener("click", Initialize);