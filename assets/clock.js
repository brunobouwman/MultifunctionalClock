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
const lapStopBtn = document.createElement('button');
const timerHour = document.getElementById('hours');
const timerMin = document.getElementById('minutes');
const timerSec = document.getElementById('seconds');
const setTimerStopBtn = document.createElement('button');
const resetTimerBtn = document.getElementById('reset-timer');
const lapTimeDisplay = document.getElementById('lap-time-display');


let lapSeCounter = 1,
  lapMinCounter = 0,
  lapHourCounter = 0,
  LapFlag = 0,
  lapStopSec,
  lapStopMin,
  lapStopHour;

let totalSeconds = 0,
  timerStartSec = 0,
  timerStartMin = 0,
  timerStartHour = 0,
  timerStopSec,
  timerStopMin,
  timerStopHour;

let secondRatio = 0;
let minuteRatio = 0;
let hourRatio = 0;
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

const timerSecHandler = () => {
  if (totalSeconds >= 0) {
    setRotation(timerHandSec, timerStartSec / 60);
    timerStartSec--;
    totalSeconds--;
    console.log('timerSecHandler', totalSeconds);
    if (timerStartSec == 0) {
      timerStartSec = 60;
      if (timerStartMin !== 0) {
        timerStartMin--;
      }
    }
  } else {
    var alarm = new Audio('./assets/alarm.mp3');
    alarm.play();
    setTimerStopBtnHandler();
  }
};

const timerMinHandler = () => {
  if (totalSeconds >= 0) {
    if (timerMinHandler !== 0) {
      setRotation(timerHandMin, timerStartSec / 60 / 60);
      if (timerStartMin == 0) {
        timerStartMin = 60;
        if (timerStartHour !== 0) {
          timerStartHour--;
        }
      }
    }
  } else {
    var alarm = new Audio('./assets/alarm.mp3');
    alarm.play();
    setTimerStopBtnHandler();
  }
};

const timerHourHandler = () => {
  if (totalSeconds >= 0) {
    if (timerStartHour !== 0) {
      setRotation(timerHandHour, timerStartMin / 60 / 12);
      if (timerStartHour == 0) {
        timerStartHour = 12;
      }
    }
  } else {
    var alarm = new Audio('./assets/alarm.mp3');
    alarm.play();
    setTimerStopBtnHandler();
  }
};

const setTimerStopBtnHandler = () => {
  setTimerStopBtn.classList.toggle('visible');
  setTimerBtn.classList.toggle('visible');
  clearInterval(timerStopSec);
  clearInterval(timerStopMin);
  clearInterval(timerStopHour);
  totalSeconds = 0;
};

const startTimer = () => {
  timerStopSec = setInterval(timerSecHandler, 1000);
  timerStopMin = setInterval(timerMinHandler, 1000);
  timerStopHour = setInterval(timerHourHandler, 1000);
};

const resetTimerHandler = () => {
  setRotation(timerHandHour, 0);
  setRotation(timerHandMin, 0);
  setRotation(timerHandSec, 0);
  timerStartHour = 0;
  timerStartMin = 0;
  timerStartSec = 0;
  totalSeconds = 0;
  timerHour.value = 0;
  timerMin.value = 0;
  timerSec.value = 0;
};

const setTimerHandler = () => {
  totalSeconds = timerStartHour * 360 + timerStartMin * 60 + timerStartSec;
  console.log('set-timer-handler', totalSeconds)
  if (totalSeconds !== 0) {
    setTimerBtn.classList.toggle('visible');
    setTimerStopBtn.classList = 'btn set-timer-stop';
    setTimerStopBtn.textContent = 'Stop';
    setTimerInputs.prepend(setTimerStopBtn);
    setTimerStopBtn.addEventListener('click', setTimerStopBtnHandler);
    startTimer();
  }
};

function stopLapHandler() {
  lapStopBtn.classList.toggle('visible');
  lapStartBtn.classList.toggle('visible');
  clearInterval(lapStopSec);
  clearInterval(lapStopMin);
  clearInterval(lapStopHour);
  console.log(lapSeCounter);
}

const lapSecHandRot = () => {
  setRotation(lapHandSec, lapSeCounter / 60);
  lapSeCounter++;
  if (lapSeCounter > 60) {
    lapSeCounter = 0;
    lapMinCounter++;
  }
  if (lapMinCounter > 60) {
    lapMinCounter = 0;
    lapHourCounter++;
  }
  if (lapHourCounter > 12) {
    lapHourCounter = 0;
  }
};

const lapMinHandRot = () => {
  setRotation(lapHandMin, (lapSeCounter / 60 + lapMinCounter) / 60);
};

const lapHourHandRot = () => {
  setRotation(lapHandHour, (lapMinCounter / 60 + lapHourCounter) / 12);
};

const laptimeHandler = () => {
  let lapHourBuffer, lapMinBuffer, lapSecBuffer;
  lapHourBuffer = lapHourCounter;
  lapMinBuffer = lapMinCounter;
  lapSecBuffer = lapSeCounter;
  if (lapHourBuffer < 10) {
    lapHourBuffer = `0${lapHourBuffer}`;
  }
  if (lapMinBuffer < 10) {
    lapMinBuffer = `0${lapMinBuffer}`;
  }
  if (lapSeCounter < 10) {
    lapSecBuffer = `0${lapSecBuffer}`;
  }

  const lapTimeElement = document.createElement('li');
  lapTimeElement.className = 'lap-times';
  lapTimeElement.innerHTML = `
    <p>${lapHourBuffer}:${lapMinBuffer}:${lapSecBuffer}</p>
    `;
  lapTimeDisplay.append(lapTimeElement);
};

function startLapHandler() {
  lapStartBtn.classList.toggle('visible');
  lapStopBtn.classList = 'btn';
  lapStopBtn.style.backgroundColor = 'red';
  lapStopBtn.textContent = 'Stop';
  lapButtons.prepend(lapStopBtn);
  lapStopBtn.addEventListener('click', stopLapHandler);
  lapStopSec = setInterval(lapSecHandRot, 1000);
  lapStopMin = setInterval(lapMinHandRot, 1000);
  lapStopHour = setInterval(lapHourHandRot, 1000);
}

const resetLapHandler = () => {
  lapSeCounter = 0;
  lapMinCounter = 0;
  lapHourCounter = 0;
  lapTotalTimerCounter = 0;
  setRotation(lapHandSec, lapSeCounter);
  setRotation(lapHandMin, lapMinCounter);
  setRotation(lapHandHour, lapHourCounter);
  const timeDisplayLength = lapTimeDisplay.children.length;
  for (let i = 0; i < timeDisplayLength; i++) {
    lapTimeDisplay.children[i].remove();
  }
};

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

setTimerBtn.addEventListener('click', setTimerHandler);
resetTimerBtn.addEventListener('click', resetTimerHandler);
lapStartBtn.addEventListener('click', startLapHandler);
lapResetBtn.addEventListener('click', resetLapHandler);
lapMarkBtn.addEventListener('click', laptimeHandler);
setClock();

setInterval(setClock, 1000); //Calls function setClock every 1000ms = 1s
