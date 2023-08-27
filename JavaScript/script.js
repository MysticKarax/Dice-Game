/* 
- Entender el problema
1.- El dado tiene que generar un número aleatorio entre el 1 al 6
2.- Guardar la puntuación del usuario
3.- Resetear el juego

- Dividir el problema
1.- Obtener un número aleatorio (Math.random) y guardar ese número en aleatorio una variable
    * Usar trunc para quitar las decimales en el Math Random
    * Multiplicar el resultado por 6 para que el número aleatorio sea entre 1 al 6
    * Sumar en 1 para que los números no den 0

    * Hacer visible el número aleatorio generado en pantalla
2.- Crear una variable en donde se guarde el score del usuario
    * 
- Investigar
1.- Cómo accedo a un elemento HTML para cambiar la imagen?


- Diagrama de flujo y codear
*/
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

// D.Y.R
function SwitchPlayers() {
  hPlayer1.classList.toggle("player--active");
  hPlayer2.classList.toggle("player--active");
  nPlayerActive = nPlayerActive === 0 ? 1 : 0;
}

function RestartFinalScoreText() {
  hFinalScorePlayer1.textContent = 0;
  hFinalScorePlayer2.textContent = 0;
}

function RestartCurrentScore() {
  hCurrentScorePlayer1.textContent = 0;
  hCurrentScorePlayer2.textContent = 0;
}

// Usando propiedades
hDice.classList.add("hide");
RestartFinalScoreText();

// Declarando variables
let nRandomNumber = Math.trunc(Math.random() * 6) + 1;
let aScore = [0, 0];
let nCurrentScore = 0;
let nPlayerActive = 0;
let bSwitchTurn = 1;
let = nChangeNumber = hDice.src = `./Images/dice-${nRandomNumber}.png`;

hRollButton.addEventListener("click", function () {
  // Si "jugador activo" es verdadero, entonces iniciar como jugador 1, si no, como jugador 2.
  if (bSwitchTurn) {
    hDice.classList.remove("hide");
    nRandomNumber = Math.trunc(Math.random() * 6) + 1;
    hDice.src = `./Images/dice-${nRandomNumber}.png`;
    // Claw Guards: Siempre revisar 1ro el resultado que no se quiere obtener
    if (nRandomNumber === 1) {
      nCurrentScore = 0;
      document.querySelector(`#current--${nPlayerActive}`).textContent = 0;
      // function RestartCurrentScore() {
      //   hCurrentScorePlayer1.textContent = 0;
      //   hCurrentScorePlayer2.textContent = 0;
      // }
      // Cambiar de jugador
      SwitchPlayers();
      return; // Termina la función, y el usuario vuelve a iniciarla al darle click al botón de nuevo.
    }
    nCurrentScore += nRandomNumber;
    document.querySelector(`#current--${nPlayerActive}`).textContent =
      nCurrentScore;
  }
});

hHoldButton.addEventListener("click", function () {
  if (bSwitchTurn) {
    aScore[nPlayerActive] += nCurrentScore;
    document.querySelector(`#score--${nPlayerActive}`).textContent =
      aScore[nPlayerActive];
    nCurrentScore = 0;
    document.querySelector(`#current--${nPlayerActive}`).textContent = 0;
    // Ganador

    if (aScore[nPlayerActive] >= 50) {
      document
        .querySelector(`.player--${nPlayerActive}`)
        .classList.add("player--winner");
      document
        .querySelector(`#score--${nPlayerActive}`)
        .classList.add("mainScoreText");
      document

        .querySelector(`.player--${nPlayerActive}`)
        .classList.remove("player--active");
      hDice.classList.add("hide");
      bSwitchTurn = 0;
    } else {
      SwitchPlayers();
    }
  }
});

hRestartButton.addEventListener("click", function () {
  RestartCurrentScore();
  hDice.classList.add("hide");
  RestartFinalScoreText();
  aScore[0] = 0;
  aScore[1] = 0;
  hPlayer1.classList.add("player--active");
  hPlayer2.classList.remove("player--active");
  hPlayer1.classList.remove("player--winner");
  hPlayer2.classList.remove("player--winner");
  nPlayerActive = 0;
  bSwitchTurn = 1;
});
