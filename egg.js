const timerDisplay = document.getElementById("timer");

const modes = {
soft: 3 * 60,
medium: 5 * 60,
hard: 7 * 60
};

let countdown;
let isPaused = false;
let currentTime = 0;


function startTimer(duration) {
    clearInterval(countdown);
    currentTime = duration;
    isPaused = false;
    display(currentTime);
  
    countdown = setInterval(() => {
      if (!isPaused) {
        currentTime--;
        display(currentTime);
        if (currentTime <= 0) {
          clearInterval(countdown);
          beep();
          showToast("Egg is ready! 🥚✅");
        }
      }
    }, 1000);
  }
  

function display(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}` ;
}

function beep(times = 3, interval = 500) {
    let count = 0;
    const beepSound = new Audio('Ripple.mp3');
    const egg = document.getElementById("egg_graphic");


    const playBeep = () => {
        beepSound.currentTime = 0;
        beepSound.play();

        egg.classList.remove("shake");            // Remove if already there
        void egg.offsetWidth;                     // Force reflow
        egg.classList.add("shake");               // Re-add it to trigger animation


        count++;

        if (count < times) {
            setTimeout(playBeep, interval);
        }
    };

    playBeep(); // Start the sequence
}


function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.opacity = 1;
  
    setTimeout(() => {
      toast.style.opacity = 0;
    }, 3000);
  }
  

document.getElementById("soft").addEventListener("click", () => startTimer(modes.soft));
document.getElementById("medium").addEventListener("click", () => startTimer(modes.medium));
document.getElementById("hard").addEventListener("click", () => startTimer(modes.hard));

document.getElementById("pause").addEventListener("click", () => {
    isPaused = !isPaused;
    document.getElementById("pause").textContent = isPaused ? "Resume" : "Pause";
});
  
document.getElementById("reset").addEventListener("click", () => {
    clearInterval(countdown);
    currentTime = 0;
    display(currentTime);
    isPaused = false;
    document.getElementById("pause").textContent = "Pause";
});

const egg = document.getElementById("egg_graphic");
egg.classList.add("shake");

const clickSound = new Audio('knock.mp3');
function playClickSound() {
    clickSound.currentTime = 0; // Rewind to start
    clickSound.play();
}
// Attach to all buttons
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", playClickSound);
});

  
