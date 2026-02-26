const bootLines = [
    "Phoenix - AwardBIOS v6.00PG, An Energy Star Ally",
    "Copyright (C) 1984-2001, Phoenix Technologies, LTD",
    "",
    "Main Processor : Intel(R) Pentium(R) 4 1.8GHz",
    "Memory Testing : 524288K OK",
    "",
    "Detecting IDE Primary Master ... [Press F4 to skip]",
    "Loading OS... Windows XP"
];
let bootIdx = 0; let bootChar = 0;
const bootTextEl = document.getElementById('boot-text');

function typeBoot() {
    if (bootIdx < bootLines.length) {
        if (bootChar === 0) bootTextEl.innerHTML += `<div></div>`;
        const lines = bootTextEl.querySelectorAll('div');
        const currentLine = lines[lines.length - 1];
        
        if (bootChar < bootLines[bootIdx].length) {
            currentLine.innerHTML += bootLines[bootIdx].charAt(bootChar);
            bootChar++;
            setTimeout(typeBoot, 5);
        } else {
            bootIdx++; bootChar = 0;
            setTimeout(typeBoot, 150);
        }
    } else {
        setTimeout(() => {
            document.getElementById('boot-screen').style.display = 'none';
            document.getElementById('main-desktop').style.display = 'grid';
            initCmd();
        }, 500);
    }
}
window.onload = typeBoot;

document.querySelectorAll('.win-btn-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const windowEl = e.target.closest('.window');
        windowEl.style.display = 'none';
    });
});

document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const targetId = icon.getAttribute('data-target');
        const windowEl = document.getElementById(targetId);
        windowEl.style.display = 'flex';
    });
});

const targetDate = new Date('2026-09-01T00:00:00').getTime();
const uptimeEl = document.getElementById('uptime');
const countdownEl = document.getElementById('countdown');
let totalSeconds = 0;

setInterval(() => {
    totalSeconds++;
    const uh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const um = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const us = String(totalSeconds % 60).padStart(2, '0');
    if(uptimeEl) uptimeEl.innerText = `${uh}:${um}:${us}`;

    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance > 0) {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const m = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        countdownEl.innerText = `${d} дн. ${h}:${m}`;
    } else {
        countdownEl.innerText = "СИСТЕМА ЗАПУЩЕНА";
    }
}, 1000);

fetch('https://api.open-meteo.com/v1/forecast?latitude=44.804&longitude=20.4651&current_weather=true')
    .then(res => res.json())
    .then(data => document.getElementById('weather').innerText = `Температура: ${data.current_weather.temperature}°C`)
    .catch(() => document.getElementById('weather').innerText = "Ошибка подключения");

const termOutput = document.getElementById('terminal-output');
const termInput = document.getElementById('terminal-input');
const termWindow = document.getElementById('terminal-window');

function initCmd() {
    termOutput.innerHTML = `<div>Microsoft Windows XP [Version 5.1.2600]</div>
                            <div>(C) Copyright 1985-2001 Microsoft Corp.</div><br>`;
    termInput.focus();
}

termWindow.addEventListener('click', () => termInput.focus());

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = termInput.value.trim().toUpperCase(); 
        termOutput.innerHTML += `<div>C:\\Documents and Settings\\Nikita> ${val}</div>`;
        
        if (val === 'HELP') {
            termOutput.innerHTML += `<div style="margin-bottom: 10px;">
                DIR    - Displays a list of files and subdirectories.<br>
                VER    - Displays the Windows version.<br>
                CLS    - Clears the screen.<br>
                WIKI   - Connects to preferred knowledge base (Wikipedia).<br>
                LOVE   - Executes special command.
            </div>`;
        } 
        else if (val === 'VER') {
            termOutput.innerHTML += `<div>Windows XP Version 5.1.2600.</div>`;
        } 
        else if (val === 'DIR') {
            termOutput.innerHTML += `<div>
                Directory of C:\\Documents and Settings\\Nikita<br><br>
                02/27/2026  &lt;DIR&gt; Cyberpunk_Promo<br>
                02/27/2026  &lt;DIR&gt; Createx_UI<br>
            </div>`;
        }
        else if (val === 'CLS') {
            termOutput.innerHTML = '';
        } 
        else if (val === 'WIKI' || val === 'WIKIPEDIA') {
            termOutput.innerHTML += `<div>Connecting to Wikipedia.org... Connection Established.</div>`;
        } 
        else if (val === 'LOVE') {
            termOutput.innerHTML += `<div>Lov 1</div>`;
        }
        else if (val !== '') {
            termOutput.innerHTML += `<div>'${val}' is not recognized as an internal or external command.</div>`;
        }
        
        termInput.value = '';
        termWindow.scrollTop = termWindow.scrollHeight;
    }
});