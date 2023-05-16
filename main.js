const workTimeInput = document.getElementById('work-time');
const restTimeInput = document.getElementById('rest-time');
const startBtn = document.getElementById('start');
const timerDisplay = document.getElementById('timer');

let timer; 

startBtn.addEventListener('click', function() {
    const workTime = workTimeInput.value * 60; // convert minutes to seconds
    const restTime = restTimeInput.value * 60; // convert minutes to seconds
    startBtn.disabled = true; // disable the start button

    startTimer(workTime, restTime);
});

function startTimer(workTime, restTime) {
    let remainingTime = workTime;
    let state = 1;

    timer = setInterval(function() {

        // work time countdown
        if (remainingTime <= 0 && state === 1) {
            alert('Work time is over! Rest time begins.');
            remainingTime = restTime;
            state = 0;
        }
        
        // rest time countdown
        if (remainingTime <= 0 && state === 0) {
            clearInterval(timer);
            alert('Rest time is over!');
            startBtn.disabled = false;
        }

        if (remainingTime > 0) {
            remainingTime--;
        }
        
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.innerText = `Current state is: ${state > 0 ? "work" : "rest"}, remaining time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}