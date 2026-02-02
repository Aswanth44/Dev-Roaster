const terminal = document.getElementById("terminal");
const btn = document.getElementById("startBtn");

const messages = [
  "Initializing system...",
  "Loading developer confidence...",
  "Confidence level: suspicious.",
  "Welcome, human.",
  "Click the button. Or don’t. I can wait."
];

let index = 0;

// Typing effect
function typeLine(text, callback) {
  const p = document.createElement("p");
  p.classList.add("line", "cursor");
  terminal.insertBefore(p, btn);

  let i = 0;
  const interval = setInterval(() => {
    p.textContent = text.slice(0, i);
    i++;

    if (i > text.length) {
      clearInterval(interval);
      p.classList.remove("cursor");
      if (callback) callback();
    }
  }, 40);
}

// Sequential typing
function startTyping() {
  if (index < messages.length) {
    typeLine(messages[index], () => {
      index++;
      startTyping();
    });
  }
}

startTyping();

// Button reactions
let clickCount = 0;

btn.addEventListener("click", () => {
  clickCount++;

  const response = document.createElement("p");
  response.classList.add("line", "warning");

  if (clickCount === 1) {
    response.textContent = "Bold of you to click that.";
  } else if (clickCount === 2) {
    response.textContent = "You clicked again. Interesting.";
  } else if {
    response.textContent = "Okay. Now you’re just testing me.";
  } else {
    response.textContent="Lets Begin, But I didnt finish the work";
  }

  terminal.appendChild(response);
});
