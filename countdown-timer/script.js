
const dateToArrive = "23 Feb 2022";
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function countdown (){
    const dateToMars = new Date(dateToArrive);
    const currentDate = new Date();

    const totalSeconds = (dateToMars - currentDate) / 1000;
    
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;
    
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;

}

function formatTime(time) {
    return time < 10 ? (`${time}`) : time

}

setInterval(countdown, 1000);