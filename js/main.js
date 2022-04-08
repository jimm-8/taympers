// change navbar type on scroll

window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0)
})

// navbar for tablets (show/hide menu)
const menu = document.querySelector(".nav__menu");
const menuBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");


menuBtn.addEventListener('click', () => {
    menu.style.display = "flex";
    closeBtn.style.display = "inline-block";
    menuBtn.style.display = "none";
})

// close nav menu for tablets
function closeNav() {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    menuBtn.style.display = "inline-block";
}

closeBtn.addEventListener('click', closeNav)

let countdown = 0; // variable to set/clear intervals
let seconds = 1500; // seconds left on the clock
let workTime = 25;
let breakTime = 5;
let isBreak = true;
let isPaused = true;

const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* EVENT LISTENERS FOR START AND RESET BUTTONS */
startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = workTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
})

/* TIMER - HANDLES COUNTDOWN */
function timer() {
  seconds --;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    seconds = (isBreak ? breakTime : workTime) * 60;
    isBreak = !isBreak;
    countdown = setInterval(timer, 1000);
  }
}

 
/* UPDATE WORK AND BREAK TIMES */
let increment = 5;

let incrementFunctions =
    {"#work-plus": function () { workTime = Math.min(workTime + increment, 60)},
     "#work-minus": function () { workTime = Math.max(workTime - increment, 5)},
     "#break-plus": function () { breakTime = Math.min(breakTime + increment, 60)},
     "#break-minus": function () { breakTime = Math.max(breakTime - increment, 5)}};

for (var key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = incrementFunctions[key];
    }
}

/* UPDATE HTML CONTENT */
function countdownDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue"; 
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak ? status.textContent = "Keep Working" : status.textContent = "Take a Break!";
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;  
}

window.setInterval(updateHTML, 100);

document.onclick = updateHTML;

// REVIEW MATERIALS PAGE //

// window open and close //

const Study_Materials = document.querySelectorAll('.study_material');

Study_Materials.forEach(study_material => {
  study_material.addEventListener('click', () => {
    study_material.classList.toggle('open');

    const icon = study_material.querySelector('.material_icon i');
    if(icon.className === 'uil uil-plus') {
      icon.className = "uil uil-minus";
    } else {
        icon.className = "uil uil-plus";
    }
  })
})


// END OF REVIEW MATERIALS PAGE //
