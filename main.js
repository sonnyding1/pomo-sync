const workTimeInput = document.getElementById('work-time');
const restTimeInput = document.getElementById('rest-time');
const controlBtn = document.getElementById('start');
const countdownNumber = document.getElementById('countdown-number');
const state = document.getElementById('state');
const circle = document.querySelector('circle');


// Variables
let isRunning = false;
let isStudy = false;
let timerInterval;
let startTime;
let elapsedTime = 0;
let workTime;
let restTime;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        isStudy = !isStudy;
        document.body.classList.toggle('bg-red-400');
        document.body.classList.toggle('bg-orange-300');
        document.querySelector('.bi-filter-left').classList.toggle('bg-red-400');
        document.querySelector('.bi-filter-left').classList.toggle('bg-orange-300');
        document.querySelector('.bi-filter-left').classList.toggle('hover:bg-red-500');
        document.querySelector('.bi-filter-left').classList.toggle('hover:bg-orange-400');
        controlBtn.classList.toggle('bg-red-500');
        controlBtn.classList.toggle('bg-orange-400');
        controlBtn.classList.toggle('hover:bg-red-800');
        controlBtn.classList.toggle('hover:bg-orange-700');
        controlBtn.classList.toggle('focus:ring-red-300');
        controlBtn.classList.toggle('focus:ring-orange-200');
        workTime = workTimeInput.value * 60; // convert minutes to seconds
        restTime = restTimeInput.value * 60; // convert minutes to seconds
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        controlBtn.innerText = 'Stop';
        state.textContent = `${isStudy ? 'studying...' : 'resting...'}`  // update state
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        controlBtn.innerText = 'Start';
        state.textContent = ''  // clear state
    }
}

function updateTimer() {
    // compute time elapsed since start
    elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    // update display
    countdownNumber.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    // update progress bar
    circle.style.strokeDashoffset = 301 - (elapsedTime / 1000 / (isStudy ? workTime : restTime)) * 301;
    

}

controlBtn.addEventListener('click', function() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});