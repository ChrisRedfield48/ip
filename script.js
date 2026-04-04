function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  clockElement.textContent = now.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });
}

setInterval(updateClock, 1000);
updateClock();

const themeBtn = document.getElementById('theme-btn');
const body = document.body;

const savedTheme = localStorage.getItem('nip-theme');
if (savedTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  themeBtn.textContent = '🌙';
}

themeBtn.addEventListener('click', () => {
  if (body.getAttribute('data-theme') === 'light') {
    body.removeAttribute('data-theme');
    localStorage.setItem('nip-theme', 'dark');
    themeBtn.textContent = '☀️';
  } else {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('nip-theme', 'light');
    themeBtn.textContent = '🌙';
  }
});

const uploadInput = document.getElementById('coat-of-arms-upload');
const coatOfArmsDiv = document.getElementById('coat-of-arms-display');

uploadInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function() {
      coatOfArmsDiv.innerHTML = ''; 
      const img = document.createElement('img');
      img.src = reader.result;
      coatOfArmsDiv.appendChild(img);
    }
    reader.readAsDataURL(file);
  }
});