document.addEventListener("DOMContentLoaded", function() {
  // ---------------------------
  // Modal: Open and Close Logic
  // ---------------------------
  var openBtn = document.getElementById("open-slot-machine");
  var modal = document.getElementById("slot-machine-modal");
  var closeBtn = document.querySelector(".close-btn");

  openBtn.addEventListener("click", function() {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // ---------------------------
  // Slot Machine Logic
  // ---------------------------
  const symbols = ["7", "🍒", "🍋", "🍉", "⭐", "🍀", "💎"];

  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");
  const lever = document.getElementById("lever");
  const leverBar = document.getElementById("leverBar");
  const resultMsg = document.getElementById("resultMsg");

  let interval1, interval2, interval3;
  let spinning = false;

  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function startSpinning() {
    interval1 = setInterval(() => { reel1.textContent = getRandomSymbol(); }, 80);
    interval2 = setInterval(() => { reel2.textContent = getRandomSymbol(); }, 80);
    interval3 = setInterval(() => { reel3.textContent = getRandomSymbol(); }, 80);
  }

  function stopSpinning() {
    setTimeout(() => {
      clearInterval(interval1);
      reel1.textContent = getRandomSymbol();
    }, 1000);

    setTimeout(() => {
      clearInterval(interval2);
      reel2.textContent = getRandomSymbol();
    }, 1500);

    setTimeout(() => {
      clearInterval(interval3);
      reel3.textContent = getRandomSymbol();
      checkResult();
      spinning = false;
    }, 2000);
  }

  function checkResult() {
    const r1 = reel1.textContent;
    const r2 = reel2.textContent;
    const r3 = reel3.textContent;
    if (r1 === r2 && r2 === r3) {
      resultMsg.textContent = "Jackpot! You Win!";
    } else {
      resultMsg.textContent = "Try Again!";
    }
  }

  function pullLever() {
    if (spinning) return;
    spinning = true;
    resultMsg.textContent = "";
    leverBar.classList.remove("pull");
    void leverBar.offsetWidth;
    leverBar.classList.add("pull");
    startSpinning();
    stopSpinning();
  }

  lever.addEventListener("click", pullLever);
});