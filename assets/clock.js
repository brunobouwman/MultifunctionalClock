const mainHandHour = document.querySelector('[data-hour-hand]');
const mainHandMin = document.querySelector('[data-minute-hand]');
const mainHandSec = document.querySelector('[data-second-hand]');
const timerHandHour = document.getElementById('hand-hour-timer');
const timerHandMin = document.getElementById('hand-minute-timer');
const timerHandSec = document.getElementById('hand-second-timer');
const timerClockSection = document.querySelector('section');
const setTimerInputs = timerClockSection.lastElementChild;
const setTimerBtn = setTimerInputs.querySelector('button');
const lapHandHour = document.getElementById('hand-hour-lap');
const lapHandMin = document.getElementById('hand-minute-lap');
const lapHandSec = document.getElementById('hand-second-lap');
const lapButtons = document.getElementById('lap--buttons');
const lapStartBtn = lapButtons.querySelector('button');
const lapMarkBtn = document.getElementById('lap');
const lapResetBtn = document.getElementById('reset');
const timerHour = document.getElementById('hours');
const timerMin = document.getElementById('minutes');
const timerSec = document.getElementById('seconds');
const lapStopBtn = document.createElement('button');
const setTimerStopBtn = document.createElement('button');
let lapSeCounter = 1;
let lapStopInterval;

let secondRatio = 0;
let timerStartMin = 0;
let timerStartHour = 0;
let timerStartSec = 0;
const setClock = () => {
  const currentDate = new Date();
  const secondRatio = currentDate.getSeconds() / 60; //Salvar
  const minuteRatio = (secondRatio + currentDate.getMinutes()) / 60;
  const hourRatio = (minuteRatio + currentDate.getHours()) / 12;
  setRotation(mainHandHour, hourRatio);
  setRotation(mainHandMin, minuteRatio);
  setRotation(mainHandSec, secondRatio);
};

function setRotation(element, rotRatio) {
  element.style.setProperty('--rotation', rotRatio * 360);
}

const updateTimer = (totalSeconds, hours, minutes, seconds) => {
  while (totalSeconds >= 0) {
    seconds--;
    totalSeconds--;
    // let minuteRatio = (secondRatio + minutes)/60;
    // let hourRatio = (minuteRatio + hours) / 12;
    // setRotation(timerHandMin, minuteRatio);
    // setRotation(timerHandHour, hourRatio);
  }
};

const setTimerStopBtnHandler = () => {
  setTimerStopBtn.classList.toggle('visible');
  setTimerBtn.classList.toggle('visible');
};

const setTimer = () => {
  setTimerBtn.classList.toggle('visible');
  setTimerStopBtn.classList = 'btn set-timer-stop';
  setTimerStopBtn.textContent = 'Stop';
  setTimerInputs.append(setTimerStopBtn);
  setTimerStopBtn.addEventListener('click', setTimerStopBtnHandler);
  let totalSeconds = timerStartHour * 360 + timerStartMin * 60 + timerStartSec;
  updateTimer(totalSeconds, timerStartHour, timerStartMin, timerStartSec);
};

function stopLapHandler() {
  lapStopBtn.classList.toggle('visible');
  lapStartBtn.classList.toggle('visible');
  clearInterval(lapStopInterval);
  console.log(lapSeCounter);
}

const lapSecHandRot = () => {
  setRotation(lapHandSec, lapSeCounter / 60);
  lapSeCounter++;
  console.log(lapSeCounter);
};

function startLap() {
  lapStartBtn.classList.toggle('visible');
  lapStopBtn.classList = 'btn';
  lapStopBtn.style.backgroundColor = 'red';
  lapStopBtn.textContent = 'Stop';
  lapButtons.prepend(lapStopBtn);
  lapStopBtn.addEventListener('click', stopLapHandler);
  lapStopInterval = setInterval(lapSecHandRot, 1000);
}

timerHour.addEventListener('click', () => {
  let hours = parseInt(timerHour.value);
  timerHandHour.style.setProperty('--rotation', hours * 30);
  timerStartHour = hours;
});

timerMin.addEventListener('click', () => {
  let minutes = parseInt(timerMin.value);
  timerHandMin.style.setProperty('--rotation', (minutes / 5) * 30);
  timerStartMin = minutes;
});

timerSec.addEventListener('click', () => {
  let seconds = parseInt(timerSec.value);
  timerHandSec.style.setProperty('--rotation', (seconds / 5) * 30);
  timerStartSec = seconds;
});

setTimerBtn.addEventListener('click', setTimer);
lapStartBtn.addEventListener('click', startLap);

setClock();

setInterval(setClock, 1000); //Calls function setClock every 1000ms = 1s
