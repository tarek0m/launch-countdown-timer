const MILLI_IN_DAY = 1000 * 60 * 60 * 24;
const MILLI_IN_HOUR = 1000 * 60 * 60;
const MILLI_IN_MIN = 1000 * 60;
const MILLI_IN_SEC = 1000;

const datePicker = document.querySelector('#launch-date-picker');
let launchingDate;

datePicker.addEventListener('change', (event) => {
  launchingDate = new Date(event.target.value);
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  countdownInterval = setInterval(updateCountdown, 1000);
  datePicker.style.display = 'none';
});

const cards = {
  days: document.querySelector('.days-card'),
  hours: document.querySelector('.hours-card'),
  minutes: document.querySelector('.minutes-card'),
  seconds: document.querySelector('.seconds-card'),
};

let countdownInterval;

function getTimeDifference() {
  return launchingDate - new Date();
}

function calculateRemainingTime() {
  const timeDifference = getTimeDifference();

  return {
    days: Math.floor(timeDifference / MILLI_IN_DAY),
    hours: Math.floor((timeDifference % MILLI_IN_DAY) / MILLI_IN_HOUR),
    minutes: Math.floor((timeDifference % MILLI_IN_HOUR) / MILLI_IN_MIN),
    seconds: Math.floor((timeDifference % MILLI_IN_MIN) / MILLI_IN_SEC),
  };
}

function updateCountdown() {
  const { days, hours, minutes, seconds } = calculateRemainingTime();

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    clearInterval(countdownInterval);
    document.querySelector('.announcement').style.display = 'none';
    document.querySelector('.timer').style.display = 'none';
    document.querySelector('.countdown-message').textContent =
      'Countdown is done!';
  } else {
    updateCards(days, hours, minutes, seconds);
  }
}

function updateCards(days, hours, minutes, seconds) {
  cards.days.textContent = days.toString().padStart(2, '0');
  cards.hours.textContent = hours.toString().padStart(2, '0');
  cards.minutes.textContent = minutes.toString().padStart(2, '0');
  cards.seconds.textContent = seconds.toString().padStart(2, '0');
}
