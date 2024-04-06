//DZ1 part1
const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-z\d._%+-]*[a-z\d]{3,}[a-z\d._%+-]*@gmail\.com$/

gmailButton.addEventListener('click', () => {
    if (regExp.test(gmailInput.value.trim())) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'NOT OK'
        gmailResult.style.color = 'red'
    }
})
//DZ2 part1
const childBlock = document.querySelector('.child_block');
let distanceX = 0;
let distanceY = 0;
let directionX = 1;
let directionY = 0;

function animate() {
    if (distanceX >= 465 && directionX === 1) {
        directionX = 0;
        directionY = 1;
    } else if (distanceY >= 465 && directionY === 1) {
        directionX = -1;
        directionY = 0;
    } else if (distanceX <= 0 && directionX === -1) {
        directionX = 0;
        directionY = -1;
    } else if (distanceY <= 0 && directionY === -1) {
        directionX = 1;
        directionY = 0;
    }

    distanceX += directionX * 8;
    distanceY += directionY * 8;

    childBlock.style.left = distanceX + 'px';
    childBlock.style.top = distanceY + 'px';

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

//DZ2 part2
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const secondsDisplay = document.getElementById('seconds');

let intervalId;
let seconds = 0;

function startTimer() {
    intervalId = setInterval(() => {
        seconds++;
        secondsDisplay.textContent = seconds;
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(intervalId);
    seconds = 0;
    secondsDisplay.textContent = seconds;
    startButton.disabled = false;
    stopButton.disabled = true;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
