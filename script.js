// ============================================================
// BIRTHDAY WEBSITE CUSTOMIZATION
// Edit the values below to personalize the website.
// ============================================================

const BIRTHDAY = {
  // IMPORTANT: JavaScript months are 0-11.
  // October = 9
  month: 9,
  day: 12,
  year: new Date().getFullYear(),
  birthYear: 1996
};

// If you want the countdown for a specific year, change:
// year: 2026

// Age he turns on this year's birthday (2026 - 1996 = 30)
const AGE = BIRTHDAY.year - BIRTHDAY.birthYear;

const gifts = {
  1: {
    icon: "🎂",
    title: "A Birthday Wish",
    text: "Happy Birthday, my love! ❤️\n" +
        "Today is all about celebrating you and the wonderful person you are.\n" +
        "I hope this new year of your life brings you happiness, good health, success, exciting opportunities, and countless beautiful moments.\n" +
        "May you always have reasons to smile, dreams to look forward to, and people around you who truly appreciate you.\n" +
        "I hope this birthday is the beginning of your most beautiful year yet. 🎂✨"
  },
  2: {
    icon: "✨",
    title: "Something I Appreciate",
    text: "I really appreciate how you’re always there for me, even when you’re busy. Your patience, kindness, and the way you always make things easier for me mean so much. Thank you for being my safe place and for making my days a little happier. ❤️"
  },
  3: {
    icon: "📸",
    title: "A Favorite Memory",
    text: "I still remember the first time I saw you with your family, your first smile, and our first conversation. ❤️\n" +
        "Little by little, through all our chats and small moments, we became closer. And I’ll never forget my birthday surprise - especially how you secretly planned everything and even pretended to be **Nuwani Prasanga** just to order flowers for me. 😂🌸 I still smile when I think about it. It was such a sweet little secret, and it made me feel so special. ❤️ Looking back, that first smile, our first conversation, and all those little moments were just the beginning of our story.\n"
  },
  4: {
    icon: "😂",
    title: "Birthday Joke",
    text: "💻 **BOYFRIEND SYSTEM STATUS**\n" +
        "\n" +
        "**Status:** 🟢 ONLINE\n" +
        "**Age:** +1 😂\n" +
        "**Experience:** 📈 Increasing\n" +
        "**Love Level:** ❤️ 100%\n" +
        "**Bugs:** 🐛 Bugs: still under investigation 😂\n" +
        "\n" +
        "**SYSTEM MESSAGE:**\n" +
        "“Another year successfully completed.\n" +
        "Keep being amazing. ❤️”\n"
  },
  5: {
    icon: "🌟",
    title: "A Wish For Your New Year",
    text: "I hope this new year of your life brings you closer to everything you dream about. ❤️ May you have more reasons to be proud of yourself, more moments that make you genuinely happy, and the courage to go after the things you want. Whatever this year brings, I hope we get to experience many beautiful moments together. 🌸✨"
  },
  6: {
    icon: "❤️",
    title: "The Final Gift",
    text: "Six little gifts, but one big reason behind all of them - **you.** ❤️\n" +
        "\n" +
        "I wanted to turn some of my feelings, memories, and wishes into something you could come back to whenever you want.\n" +
        "\n" +
        "And now, I have one last thing to say to you…\n" +
        "\n" +
        "<a href=\"#letter\" class=\"gift-link\" onclick=\"openLetterFromGift(event)\">Open your letter. 💌</a>\n"
  }
};

const VIDEO = {
  // Option 1: YouTube (recommended). Upload as "Unlisted" and paste the video ID.
  // Example: https://www.youtube.com/watch?v=abc123XYZ  ->  youtubeId: "abc123XYZ"
  youtubeId: "YOUR_YOUTUBE_VIDEO_ID_HERE",

  // Option 2: a video file in this folder (used when youtubeId is not set).
  file: "birthday-video.mp4"
};

// ---------- Countdown ----------

// The surprise unlocks at midnight (viewer's local time) on the birthday.
// Add ?preview to the URL to open everything early, e.g. index.html?preview
const BIRTHDAY_DATE = new Date(BIRTHDAY.year, BIRTHDAY.month, BIRTHDAY.day, 0, 0, 0);
const PREVIEW_MODE = new URLSearchParams(location.search).has("preview");

function isUnlocked() {
  return PREVIEW_MODE || new Date() >= BIRTHDAY_DATE;
}

function applyLockState() {
  const startButton = document.getElementById("start-btn");

  if (!isUnlocked()) {
    const dateText = BIRTHDAY_DATE.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
    document.body.classList.add("locked");
    startButton.disabled = true;
    startButton.textContent = `🔒 Unlocks on ${dateText}`;
    return;
  }

  // Unlocked: the countdown is replaced by a birthday message
  document.getElementById("countdown").classList.add("hidden");

  const isBirthday = new Date().toDateString() === BIRTHDAY_DATE.toDateString();
  if (isBirthday || PREVIEW_MODE) {
    document.getElementById("today-message").classList.remove("hidden");
  }

  if (PREVIEW_MODE) {
    const badge = document.createElement("div");
    badge.className = "preview-badge";
    badge.textContent = "PREVIEW MODE";
    document.body.appendChild(badge);
  }
}

function updateCountdown() {
  if (isUnlocked()) {
    // Page was left open past midnight: reload to unlock
    if (document.body.classList.contains("locked")) location.reload();
    return;
  }

  const difference = BIRTHDAY_DATE - new Date();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

applyLockState();
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Birthday celebration ----------

function startCelebration() {
  createConfetti(100);
  document.getElementById("cake").scrollIntoView({ behavior: "smooth" });
}

function celebrateAgain() {
  createConfetti(180);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createConfetti(amount = 100) {
  const container = document.getElementById("confetti-container");

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = ["🎉", "✨", "🎈", "❤️", "⭐"][Math.floor(Math.random() * 5)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.fontSize = `${10 + Math.random() * 18}px`;
    piece.style.animationDuration = `${2 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * .8}s`;
    container.appendChild(piece);

    setTimeout(() => piece.remove(), 6000);
  }
}

// ---------- Cake ----------

let candlesOut = 0;

function blowCandle(candle) {
  if (candle.classList.contains("off")) return;

  candle.classList.add("off");
  candlesOut++;

  if (candlesOut === 5) {
    const message = document.getElementById("cake-message");
    message.textContent = "🎉 Wish made! May this year be full of happiness. ❤️";
    message.classList.add("done");
    createConfetti(100);
    playBirthdayMusic();
  } else {
    document.getElementById("cake-message").textContent =
      `${5 - candlesOut} candle${5 - candlesOut === 1 ? "" : "s"} left ✨`;
  }
}

// ---------- Music ----------

// Plays birthday.mp3 if it exists, otherwise a built-in Happy Birthday tune.
function playBirthdayMusic() {
  const music = document.getElementById("birthday-music");
  music.currentTime = 0;
  music.play().catch(playHappyBirthdayTune);
}

function playHappyBirthdayTune() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const G4 = 392, A4 = 440, B4 = 494, C5 = 523, D5 = 587, E5 = 659, F5 = 698, G5 = 784;

  // [frequency, beats]
  const melody = [
    [G4, .75], [G4, .25], [A4, 1], [G4, 1], [C5, 1], [B4, 2],
    [G4, .75], [G4, .25], [A4, 1], [G4, 1], [D5, 1], [C5, 2],
    [G4, .75], [G4, .25], [G5, 1], [E5, 1], [C5, 1], [B4, 1], [A4, 2],
    [F5, .75], [F5, .25], [E5, 1], [C5, 1], [D5, 1], [C5, 3]
  ];

  const beat = 0.45;
  let time = ctx.currentTime + 0.1;

  melody.forEach(([freq, beats]) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const length = beats * beat;

    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.3, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + length * 0.95);

    osc.connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + length);
    time += length;
  });

  setTimeout(() => ctx.close(), (time - ctx.currentTime + 0.5) * 1000);
}

// ---------- Gifts ----------

function openGift(number) {
  const gift = gifts[number];

  document.getElementById("gift-icon").textContent = gift.icon;
  document.getElementById("gift-title").textContent = gift.title;
  document.getElementById("gift-text").innerHTML =
    gift.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  document.getElementById("gift-modal").classList.remove("hidden");

  if (number === 6) createConfetti(60);
}

function closeGift() {
  document.getElementById("gift-modal").classList.add("hidden");
}

// ---------- Letter ----------

// Used by the "Open your letter" link inside the final gift
function openLetterFromGift(event) {
  event.preventDefault();
  closeGift();
  openLetter();
}

function toggleLetter() {
  const letter = document.getElementById("letter-content");

  if (letter.classList.contains("hidden")) openLetter();
  else closeLetter();
}

function openLetter() {
  const letter = document.getElementById("letter-content");
  letter.classList.remove("hidden");
  document.getElementById("letter-btn").textContent = "✕ Close Letter";
  letter.scrollIntoView({ behavior: "smooth", block: "center" });
  createConfetti(60);
}

function closeLetter() {
  const button = document.getElementById("letter-btn");
  document.getElementById("letter-content").classList.add("hidden");
  button.textContent = "💌 Open Your Birthday Letter";
  button.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ---------- Video ----------

function openVideo() {
  const frame = document.getElementById("video-content");
  document.getElementById("birthday-music").pause();

  if (!frame.hasChildNodes()) {
    const useYoutube = VIDEO.youtubeId && VIDEO.youtubeId !== "YOUR_YOUTUBE_VIDEO_ID_HERE";

    if (useYoutube) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${VIDEO.youtubeId}?autoplay=1&rel=0`;
      iframe.title = "Birthday video";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      frame.appendChild(iframe);
    } else {
      const video = document.createElement("video");
      video.src = VIDEO.file;
      video.controls = true;
      video.playsInline = true;
      frame.appendChild(video);
      video.play().catch(() => {});
    }
  }

  frame.classList.remove("hidden");
  frame.scrollIntoView({ behavior: "smooth", block: "center" });
  createConfetti(60);
}

// ---------- Boot screen ("system update" intro) ----------

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function runBootScreen() {
  const screen = document.getElementById("boot-screen");
  const text = document.getElementById("boot-text");
  const fill = document.getElementById("boot-fill");
  const percent = document.getElementById("boot-percent");
  let finished = false;
  let timer;

  // Keep the intro for the big day; the locked page shows only the countdown
  if (!isUnlocked()) {
    screen.remove();
    return;
  }

  function finish() {
    if (finished) return;
    finished = true;
    clearInterval(timer);
    screen.classList.add("done");
    setTimeout(() => screen.remove(), 700);
  }

  screen.addEventListener("click", finish);

  if (reduceMotion) {
    finish();
    return;
  }

  text.textContent = `Installing Birthday v${AGE}.0...`;
  let value = 0;

  timer = setInterval(() => {
    // Speeds up in the middle, crawls near the end
    value = Math.min(99, value + (value < 70 ? 3 + Math.random() * 5 : 1));
    const shown = Math.floor(value);
    fill.style.width = `${shown}%`;
    percent.textContent = `${shown}%`;

    if (shown >= 99) {
      clearInterval(timer);
      setTimeout(() => {
        fill.style.width = "100%";
        percent.textContent = "100%";
        text.textContent += `\n✓ Birthday v${AGE}.0 installed successfully`;
        setTimeout(finish, 1100);
      }, 700);
    }
  }, 90);
}

runBootScreen();

// ---------- Animated terminal ----------

function setupTerminal() {
  if (!isUnlocked()) return;

  const pre = document.querySelector(".terminal pre");
  const code = pre.querySelector("code");
  const fullText = code.textContent.replace("YOUR_AGE_HERE", AGE);

  // Reserve the final height so the page doesn't jump while typing
  code.textContent = fullText;
  pre.style.minHeight = `${pre.offsetHeight}px`;

  if (reduceMotion) return;

  code.textContent = "";
  const chars = Array.from(fullText);
  let index = 0;

  function typeNext() {
    if (index >= chars.length) {
      pre.classList.remove("typing");
      return;
    }

    const char = chars[index++];
    code.textContent += char;

    let delay = 22 + Math.random() * 25;
    if (char === "\n") delay = chars[index] === "✓" ? 280 : 140;
    setTimeout(typeNext, delay);
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    pre.classList.add("typing");
    typeNext();
  }, { threshold: 0.4 });

  observer.observe(pre);
}

setupTerminal();

// ---------- Floating hearts (hero background) ----------

function setupFloatingHearts() {
  if (reduceMotion) return;

  const hero = document.querySelector(".hero");
  const symbols = ["❤️", "💗", "✨", "🤍"];

  for (let i = 0; i < 14; i++) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = symbols[i % symbols.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.animationDuration = `${8 + Math.random() * 8}s`;
    heart.style.animationDelay = `${-Math.random() * 12}s`;
    hero.appendChild(heart);
  }
}

setupFloatingHearts();

// ---------- Scroll reveal ----------

function setupScrollReveal() {
  if (reduceMotion || !isUnlocked()) return;

  const targets = document.querySelectorAll(
    ".section-heading, .cake-area, .gift-grid, .awards-grid, .terminal, .photo-grid"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

setupScrollReveal();

// Close modal with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeGift();
});

// Optional: clicking outside the modal closes it
document.getElementById("gift-modal").addEventListener("click", (event) => {
  if (event.target.id === "gift-modal") closeGift();
});
