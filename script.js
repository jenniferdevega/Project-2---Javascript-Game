
//--===================== Start of Cards =====================--
const cards = document.querySelectorAll('.matching-card');

let userScore = 0;
let userMove = 0;

let isCardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!isCardFlipped) {
    isCardFlipped = true;
    firstCard = this;

    return;
  }
  secondCard = this;

  checkForMatch();
  validateWinner();
}

function checkForMatch() {
  var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(isMatch) {
    disableCards();
    userScore++;
  }else{
    unflipCards();
  }

  userMove++;
  updateScore(userScore);
  updateMoves(userMove);
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [isCardFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => 
  card.addEventListener('click', flipCard)
  );

  function validateWinner(){
    var inputPlayerName = document.querySelector("#playerName").value.toUpperCase();
    if(document.querySelector("#userScore").innerHTML == "6"){
  
      stopBarbie();
      playWinner();
  
      Swal.fire({
        title: `Congratulations ${inputPlayerName}! 🥰`,
        icon: 'success',
        html: '<span style="color:#e0218a "><strong>Want to play again with me?</strong></span>',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonText: 'Yes, Play again!',
        cancelButtonText: 'No',
        backdrop: `
        rgba(0,0,0,0.4)
        url("/images/flyingbarbie.gif")
        right top
        no-repeat
      `
      }).then((result) => {
        if(result.isConfirmed){
          // resetTimerAndGameStatus();
          location.reload();
        }else{
          location.reload();
        }
      })
      stopTimer();
      }
    }

//--===================== End of Cards =====================--

//--===================== Start of Header Status =====================--
function updateScore(scoreCount){
  document.querySelector('#userScore').innerHTML = scoreCount;
}

function updateMoves(moveCount){
  document.querySelector('#userMoves').innerHTML = moveCount;
}
//--===================== Start of Header Status =====================--

//--===================== Start of Audio =====================--
function playIncorrectInput(){
  var incorrect = document.querySelector("#incorrect");
  incorrect.play();
}

function playWelcome(){
  var welcome = document.querySelector("#welcome");
  welcome.play();
}

function playBarbie(){
  var barbie = document.querySelector("#barbie");
  barbie.play();
}

function stopBarbie(){
  var barbie = document.querySelector("#barbie");
  barbie.pause();
}

function playWinner(){
  var winner = document.querySelector("#winner");
  winner.play();
}
//--===================== End of Audio =====================--

//--===================== Start of Welcome =====================--
const modalWelcome = new bootstrap.Modal(document.querySelector("#welcomeModal"));
const btnSubmit = document.querySelector("#btnSubmit");

//Default
modalWelcome.show();

btnSubmit.addEventListener("click", () => {
  var inputPlayerName = document.querySelector("#playerName").value.toUpperCase();
  if (inputPlayerName == "" || !inputPlayerName.match(/\w/)) {
      
      Swal.fire({
        title: 'Sorry ☹️',
        icon: 'info',
        html: '<span style="color:#0461B1"><strong>May I know your name again.</strong></span>',
        allowOutsideClick: false,
      })
      playIncorrectInput();
    }else {
      Swal.fire({
          title: `Hi ${inputPlayerName}! 🥰`,
          icon: 'success',
          html: '<span style="color:#0461B1"><strong>Welcome to B&B World Matching game!</strong></span>',
          allowOutsideClick: false,
          confirmButtonText: "Have Fun!",
          backdrop: `
          rgba(0,0,0,0.4)
          url("/images/cat-nyan-cat.gif")
          left top
          no-repeat
        `
      }).then((result) => {
          if (result.isConfirmed) {
              document.querySelector("#inputPlayerName").innerHTML = `Hi ${inputPlayerName}!🥰`;
            }
      });
      playWelcome();
      modalWelcome.hide();
    }
});
//--===================== End of Welcome =====================--

//--===================== Start of Timer Header =====================--
let interval,
    minutes = 3,
    timer = 60 * minutes,
    displayTimer = document.querySelector("#timer");

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;

  interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10); 

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (timer-- <= 0) {
        Swal.fire({
          title: 'Times Up!',
          icon: 'error',
          html: '<span style="color:#e0218a "><strong>Better luck next time 🍀 <br> Play Again?</strong></span>',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonText: 'Yes, Play again!',
          cancelButtonText: 'No'
        }).then((result) => {
          if(result.isConfirmed){
            // resetTimerAndGameStatus();
            location.reload();
          }else{
            location.reload();
          }
        })
        stopBarbie();
        stopTimer();
        playIncorrectInput();
      }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function resetTimerAndGameStatus(){
  document.querySelector("#timer").innerHTML = "00:00";
  startTimer(timer, displayTimer);

  updateMoves("0");
  updateScore("0");
}
//--===================== End of Timer Header =====================--

//--===================== Start of Game =====================--
let btnLetsPlay = document.querySelector("#btnLetsPlay");

const divGameRules = document.querySelector('.gameRules'),
      divGame = document.querySelector('.matching-game');

window.addEventListener("load", () => {
   sectionGame.style.visibility = "hidden";
});

function letsPlay(){
btnLetsPlay.addEventListener("click", () =>{
  playBarbie();
  startTimer(timer, displayTimer);

  divGameRules.removeChild(divGameRules.firstElementChild);
  sectionGame.style.visibility = "visible";
});
}
//--===================== End of Game =====================--

//--===================== Start of Function Execution =====================--
letsPlay();
//--===================== End of Function Execution =====================--



