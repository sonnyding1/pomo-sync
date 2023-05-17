const workTimeInput = document.getElementById('work-time');
const restTimeInput = document.getElementById('rest-time');
const startBtn = document.getElementById('start');
const timerDisplay = document.getElementById('timer');

let timer; 

startBtn.addEventListener('click', function() {
    const workTime = workTimeInput.value * 60; // convert minutes to seconds
    const restTime = restTimeInput.value * 60; // convert minutes to seconds

    startTimer(workTime, restTime);
});

function startTimer(workTime, restTime) {
    let currentTime = workTime;
    let state = 1;

    timer = setInterval(function() {

        // work time countdown
        if (currentTime <= 0 && state === 1) {
            timer = null;
            alert('Work time is over! Rest time begins.');
            currentTime = restTime;
            state = 0;
        }
        
        // rest time countdown
        if (currentTime <= 0 && state === 0) {
            clearInterval(timer);
            timer = null;
            alert('Rest time is over!');
            // Judge =-1;
        }

        currentTime--;
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        // const state = Judge > 0 ? 'work' : 'rest';
        timerDisplay.innerText = `Current state is: ${state > 0 ? "work" : "rest"}, remaining time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}