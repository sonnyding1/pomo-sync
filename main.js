const workTimeInput = document.getElementById('work-time');
const restTimeInput = document.getElementById('rest-time');
const startBtn = document.getElementById('start');
const timerDisplay = document.getElementById('timer');
const countdownNumber = document.getElementById('countdown-number');
const circle = document.querySelector('circle');

let timer; 

startBtn.addEventListener('click', function() {
    const workTime = workTimeInput.value * 60; // convert minutes to seconds
    const restTime = restTimeInput.value * 60; // convert minutes to seconds
    startBtn.disabled = true; // disable the start button
    
    startTimer(workTime, restTime);
});

function startTimer(workTime, restTime) {
    let currentTime = 0;
    let state = 1;
    circle.style.strokeDashoffset = 301;

    timer = setInterval(function() {

        currentTime = currentTime + 1;
        
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        circle.style.strokeDashoffset = 301 - (currentTime / (state === 1 ? workTime : restTime)) * 301;
        countdownNumber.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerDisplay.innerText = `Current state is: ${state > 0 ? "work" : "rest"}`;

        // work time reached
        if (currentTime >= workTime && state === 1) {
            alert('Work time is over! Rest time begins.');
            currentTime = 0;
            state = 0;
        }
        
        // rest time reached
        if (currentTime >= restTime && state === 0) {
            clearInterval(timer);
            alert('Rest time is over!');
            startBtn.disabled = false;
        }
    }, 1000);
}