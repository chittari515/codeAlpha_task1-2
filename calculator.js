const display = document.getElementById('display');

function append(value) {
  animateDisplay();
  display.value += value;
}

function clearDisplay() {
  display.value = '';
  animateDisplay();
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  animateDisplay();
}

function calculate() {
  try {
    display.value = eval(display.value);
    animateDisplay();
  } catch (e) {
    display.value = 'Error';
    animateDisplay();
  }
}

// Flash animation on display update
function animateDisplay() {
  display.classList.remove('flash');
  void display.offsetWidth; // trigger reflow
  display.classList.add('flash');
}

// Keyboard support
document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    append(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

// Extra display animation class
const style = document.createElement('style');
style.textContent = `
  .flash {
    animation: flashFade 0.2s ease-in-out;
  }

  @keyframes flashFade {
    from { background-color: #001100; }
    to { background-color: #000000; }
  }
`;
document.head.appendChild(style);
