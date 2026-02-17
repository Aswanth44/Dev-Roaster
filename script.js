document.addEventListener("DOMContentLoaded", function () {

  const chatArea = document.getElementById("chatArea");
  const input = document.getElementById("userInput");
  const overlay = document.getElementById("crashOverlay");

  let systemData = JSON.parse(localStorage.getItem("devRoasterData")) || {
    totalCrashes: 0,
    crashed: false
  };

  function saveData() {
    localStorage.setItem("devRoasterData", JSON.stringify(systemData));
  }

  function addLine(text, className = "line") {
    const p = document.createElement("p");
    p.className = className;
    p.textContent = text;
    chatArea.appendChild(p);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function boot() {
    addLine("DevRoaster OS booting...");
    addLine("Type 'help' to view commands.");
    addLine("Total crashes: " + systemData.totalCrashes);
  }

  boot();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {

      const command = input.value.trim().toLowerCase();
      addLine("> " + command);
      input.value = "";

      handleCommand(command);
    }
  });

  function handleCommand(cmd) {

    if (systemData.crashed && cmd !== "recover") {
      addLine("SYSTEM OFFLINE. Type 'recover'.", "warning");
      return;
    }

    switch (cmd) {

      case "help":
        addLine("Available commands:", "success");
        addLine("help    - Show commands");
        addLine("clear   - Clear terminal");
        addLine("stats   - Show crash stats");
        addLine("joke    - Random joke");
        addLine("crash   - Trigger failure");
        addLine("recover - Restore system");
        break;

      case "clear":
        chatArea.innerHTML = "";
        break;

      case "stats":
        addLine("Total crashes: " + systemData.totalCrashes);
        break;

      case "joke":
        const jokes = [
          "Why do programmers hate nature? Too many bugs.",
          "It works on my machine.",
          "404: Humor not found."
        ];
        addLine(jokes[Math.floor(Math.random() * jokes.length)]);
        break;

      case "crash":
        triggerCrash();
        break;

      case "recover":
        recoverSystem();
        break;

      default:
        addLine("Command not recognized.", "warning");
    }
  }

  function triggerCrash() {
    systemData.totalCrashes++;
    systemData.crashed = true;
    saveData();

    overlay.classList.remove("hidden");
    document.body.classList.add("crash-mode");

    addLine("⚠ SYSTEM FAILURE ACTIVATED ⚠", "warning");
  }

  function recoverSystem() {
    if (!systemData.crashed) return;

    systemData.crashed = false;
    saveData();

    overlay.classList.add("hidden");
    document.body.classList.remove("crash-mode");

    addLine("System reboot complete.", "success");
  }

});
