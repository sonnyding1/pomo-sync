const workTimeInput = document.getElementById('work-time');
const restTimeInput = document.getElementById('rest-time');
const controlBtn = document.getElementById('start');
const timerDisplay = document.getElementById('timer');
const countdownNumber = document.getElementById('countdown-number');
const circle = document.querySelector('circle');

// let timer; 

// controlBtn.addEventListener('click', function() {
//     const workTime = workTimeInput.value * 60; // convert minutes to seconds
//     const restTime = restTimeInput.value * 60; // convert minutes to seconds
//     // controlBtn.disabled = true; // disable the start button
    
//     if (controlBtn.classList.contains('start')) {
//         controlBtn.innerText = 'Stop';
//         startTimer(workTime, restTime);
//     } else {
//         controlBtn.innerText = 'Start';
//         controlBtn.disabled = true;
//     }
//     controlBtn.classList.toggle('start');
    
// });

// function startTimer(workTime, restTime) {
//     let currentTime = 0;
//     let state = 1;
//     circle.style.strokeDashoffset = 301;

//     timer = setInterval(function() {

//         if (!controlBtn.classList.contains('start')) {
//             clearInterval(timer);
//             controlBtn.disabled = false;
//         }

//         currentTime = currentTime + 1;
        
//         const minutes = Math.floor(currentTime / 60);
//         const seconds = currentTime % 60;
//         circle.style.strokeDashoffset = 301 - (currentTime / (state === 1 ? workTime : restTime)) * 301;
//         countdownNumber.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//         timerDisplay.innerText = `Current state is: ${state > 0 ? "work" : "rest"}`;

//         // work time reached
//         if (currentTime >= workTime && state === 1) {
//             alert('Work time is over! Rest time begins.');
//             currentTime = 0;
//             state = 0;
//         }
        
//         // rest time reached
//         if (currentTime >= restTime && state === 0) {
//             clearInterval(timer);
//             alert('Rest time is over!');
//             controlBtn.disabled = false;
//         }
//     }, 1000);
// }


// Variables to keep track of timer state
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
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        controlBtn.innerText = 'Start';
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
    circle.style.strokeDashoffset = 301 - (elapsedTime / 1000 / (isStudy === true ? workTime : restTime)) * 301;
    console.log(isStudy);

}

controlBtn.addEventListener('click', function() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});