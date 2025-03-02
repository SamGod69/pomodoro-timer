let running = false;
let rest = false;
let settingsMinute = Number(document.getElementById('timerDuration').value);
let minutes = settingsMinute;
let seconds = 0;
const display = document.getElementById('display');
const btn = document.getElementById('btn');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settingsBtn');
let timer;
let settingsBreakMinute = Number(document.getElementById('shortBreakDuration').value);
let shortBreakMinute = settingsBreakMinute;
let breakMode = false;
let settingsOpened = false;
let saveChanges = false;

function startTimer(){
    // Starts the timer
    if (!running && !settingsOpened){
        timer = setInterval(updateDisplay, 1000);
        btn.textContent = 'Stop';
        running = true;
    }
    else if(settingsOpened){
        closeSettings();
    }
    // If the timer is running, stop it
    else{
        stopTimer();
    }
}

function stopTimer(){
    // Stops the timer
    clearInterval(timer);
    btn.textContent = 'Start';
    running = false;
}

function resetTimer(){
    // Resets the timer
    running = false;
    breakMode = false;
    clearInterval(timer);
    minutes = settingsMinute;
    let m = minutes < 10 ? '0' + minutes : minutes;
    seconds = '00';
    display.textContent = `${m}:${seconds}`;
    btn.textContent = 'Start';
    display.style.backgroundColor = 'white';
}

function closeSettings(){
    // Closes settings
    if(running){
        btn.textContent = 'Stop';
    }
    else{
        btn.textContent = 'Start';
    }
    settingsOpened = false;
    settings.classList.toggle('hidden');
}

function updateDisplay(){
    // Reset seconds when needed
    if (seconds == 0){
        minutes--;
        seconds = 60;
    }
    // Deduct seconds every second
    seconds --;

    // Switch between breakMode and timerMode when the timer runs out
    if (minutes == 0 && seconds == 0){
        stopTimer();
        if(!breakMode){
            minutes = shortBreakMinute;
            breakMode = true;
            display.style.backgroundColor = '#cdecfe';
        }
        else{
            minutes = settingsMinute;
            breakMode = false;
            display.style.backgroundColor = 'white';
        }
    }

    // Format minutes and seconds to always have two digits
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    
    // Update display
    display.textContent = `${m}:${s}`;
}

function openSettings(){
    settings.classList.remove('hidden');
    settingsOpened = true;
    btn.textContent = 'Back';
}

// Apply settings while exiting from the settings
function updateSettings(){
    settingsMinute = Number(document.getElementById('timerDuration').value);
    settingsBreakMinute = Number(document.getElementById('shortBreakDuration').value);
    seconds = 0;

    // Prevent user from entering a number less than one
    if(settingsMinute < 1){
        settingsMinute = 1;
        document.getElementById('timerDuration').value = 1;
    }
    
    minutes = settingsMinute;
    shortBreakMinute = settingsBreakMinute;

    //if in breakMode return to normalMode
    breakMode = false;

    // Format minutes for display
    let m = minutes < 10 ? '0' + minutes : minutes;
    
    // Update display
    display.textContent = `${m}:00`;

    display.style.backgroundColor = 'white';
}

// Exit settings if the user presses Escape
document.addEventListener('keydown', (event) =>{
    if(event.key == 'Escape' && settingsOpened){
        closeSettings();
    }
});
