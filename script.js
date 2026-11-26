// Ganti nama, pesan, tanggal, dan foto di bagian ini.
const birthday = {
  name: "Sona Kalyana Purboprasetyani",
  date: "21 . 11 . 2026",
  backgroundVideos: [
    "855ZEgAeEQZ0Ts7l.mp4",
    "Yft68fwiJPiwtxRN.mp4",
    "-_vqoCHljSLJtEL5.mp4",
    "XIKDhNUVCu2iYo2q.mp4",
    "1q6J38fmpvlGqo8e.mp4",
  ],
  message:
    "Selamat ulang tahun! Semoga setiap langkahmu selalu dipenuhi kebahagiaan, cinta, dan mimpi yang menjadi kenyataan.",
  photos: [
    {
      src: "sona_kalyana.jpg",
      alt: "Sona Kalyana",
      caption: "Kabesha",
    },
    {
      src: "sona offair bandung.jpg",
      alt: "Sona offair Bandung",
      caption: "Offair Bandung",
    },
    {
      src: "HU2HwOYagAA55fL.jpg",
      alt: "Kenangan Sona 3",
      caption: "Offair Lapangan Banteng",
    },
    {
      src: "HQYy59JaYAArAH-.jpg",
      alt: "Kenangan Sona 4",
      caption: "Instagram Story",
    },
  ],
};

const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
let youtubePlayer = null;
let countdownYoutubePlayer = null;
let musicStarted = false;
const nowPlaying = document.getElementById("nowPlaying");
const nowPlayingTitle = document.getElementById("nowPlayingTitle");
let nowPlayingTimer = null;

function showNowPlaying(title) {
  nowPlayingTitle.textContent = title;
  nowPlaying.classList.add("visible");
  window.clearTimeout(nowPlayingTimer);
  nowPlayingTimer = window.setTimeout(() => {
    nowPlaying.classList.remove("visible");
  }, 4500);
}

window.onYouTubeIframeAPIReady = () => {
  youtubePlayer = new YT.Player("youtubePlayer", {
    height: "1",
    width: "1",
    videoId: "kcv2hXcLQMY",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: "kcv2hXcLQMY",
      rel: 0,
    },
  });

  countdownYoutubePlayer = new YT.Player("countdownYoutubePlayer", {
    height: "1",
    width: "1",
    videoId: "2bc5n_HNsQc",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: "2bc5n_HNsQc",
      rel: 0,
    },
    events: {
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          const title = countdownYoutubePlayer.getVideoData().title;
          showNowPlaying(title || "Countdown Music");
        }
      },
    },
  });

  youtubePlayer.addEventListener("onStateChange", (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      const title = youtubePlayer.getVideoData().title;
      showNowPlaying(title || "Birthday Song");
    }
  });
};

function toggleMusic() {
  if (!youtubePlayer || typeof youtubePlayer.playVideo !== "function") return;

  if (youtubePlayer.getPlayerState() === YT.PlayerState.PLAYING) {
    youtubePlayer.pauseVideo();
    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-label", "Putar musik");
    musicIcon.textContent = "\u266A";
  } else {
    youtubePlayer.playVideo();
    musicStarted = true;
    musicToggle.classList.add("playing");
    musicToggle.setAttribute("aria-label", "Jeda musik");
    showNowPlaying("Birthday Song");
  }
}

musicToggle.addEventListener("click", toggleMusic);

document.addEventListener(
  "pointerdown",
  () => {
    if (musicStarted) return;

    if (
      !countdownScreen.classList.contains("hidden") &&
      countdownYoutubePlayer &&
      typeof countdownYoutubePlayer.playVideo === "function"
    ) {
      countdownYoutubePlayer.playVideo();
      musicStarted = true;
      showNowPlaying("Countdown Music");
      return;
    }

    if (youtubePlayer && typeof youtubePlayer.playVideo === "function") {
      youtubePlayer.playVideo();
      musicStarted = true;
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-label", "Jeda musik");
      showNowPlaying("Birthday Song");
    }
  },
  { once: true },
);

const youtubeApi = document.createElement("script");
youtubeApi.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(youtubeApi);

const countdownScreen = document.getElementById("countdownScreen");
const countdownTarget = new Date("2026-12-01T00:00:00");
const landingPreview =
  new URLSearchParams(window.location.search).get("preview") === "landing";
const birthdayScene = document.querySelector(".scene");
const boothView = document.getElementById("boothView");
const birthdayViewButton = document.getElementById("birthdayViewButton");
const boothViewButton = document.getElementById("boothViewButton");
let activePage = "birthday";

function updateBoothButtonVisibility() {
  boothViewButton.hidden =
    activePage === "birthday" &&
    !landingPreview &&
    countdownTarget.getTime() > Date.now();
}

if (landingPreview) {
  countdownScreen.classList.add("hidden");
}
updateBoothButtonVisibility();
document.title = landingPreview ? "Happy Birthday Sona" : "Surprise";

function showPage(page) {
  const isBooth = page === "booth";
  activePage = page;
  updateBoothButtonVisibility();
  boothView.hidden = !isBooth;
  birthdayScene.hidden = isBooth;
  countdownScreen.classList.toggle(
    "hidden",
    isBooth || landingPreview || countdownTarget.getTime() <= Date.now(),
  );
  birthdayViewButton.classList.toggle("active", !isBooth);
  birthdayViewButton.setAttribute("aria-pressed", String(!isBooth));
  boothViewButton.classList.toggle("active", isBooth);
  boothViewButton.setAttribute("aria-pressed", String(isBooth));
  document.title = isBooth
    ? "Sona Booth"
    : countdownTarget.getTime() > Date.now() && !landingPreview
      ? "Surprise"
      : "Happy Birthday Sona";
}

birthdayViewButton.addEventListener("click", () => showPage("birthday"));
boothViewButton.addEventListener("click", () => showPage("booth"));

let countdownTimer = null;

function updateCountdown() {
  const remaining = countdownTarget.getTime() - Date.now();

  if (remaining <= 0) {
    document.getElementById("countdownDays").textContent = "00";
    document.getElementById("countdownHours").textContent = "00";
    document.getElementById("countdownMinutes").textContent = "00";
    document.getElementById("countdownSeconds").textContent = "00";
    countdownScreen.classList.add("hidden");
    updateBoothButtonVisibility();
    document.title = activePage === "booth" ? "Sona Booth" : "Happy Birthday Sona";
    if (
      countdownYoutubePlayer &&
      typeof countdownYoutubePlayer.pauseVideo === "function"
    ) {
      countdownYoutubePlayer.pauseVideo();
    }
    if (youtubePlayer && typeof youtubePlayer.playVideo === "function") {
      youtubePlayer.playVideo();
      musicStarted = true;
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-label", "Jeda musik");
    }
    if (countdownTimer) window.clearInterval(countdownTimer);
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("countdownDays").textContent = String(days).padStart(
    2,
    "0",
  );
  document.getElementById("countdownHours").textContent = String(
    hours,
  ).padStart(2, "0");
  document.getElementById("countdownMinutes").textContent = String(
    minutes,
  ).padStart(2, "0");
  document.getElementById("countdownSeconds").textContent = String(
    seconds,
  ).padStart(2, "0");
}

updateCountdown();
countdownTimer = window.setInterval(updateCountdown, 1000);

const mainPhoto = document.getElementById("mainPhoto");
const photoCaption = document.getElementById("photoCaption");
const photoNumber = document.getElementById("photoNumber");
const dotsContainer = document.getElementById("dots");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const backgroundVideo = document.getElementById("backgroundVideo");
const backgroundVideoNext = document.getElementById("backgroundVideoNext");
let backgroundVideoIndex = 0;
let activeBackgroundVideo = backgroundVideo;
let standbyBackgroundVideo = backgroundVideoNext;

backgroundVideo.src = birthday.backgroundVideos[0];
backgroundVideo.load();
backgroundVideo.play().catch(() => {});
backgroundVideo.classList.add("is-active");

backgroundVideoNext.src = birthday.backgroundVideos[1];
backgroundVideoNext.load();

function setBackgroundVideo(index) {
  backgroundVideoIndex =
    (index + birthday.backgroundVideos.length) %
    birthday.backgroundVideos.length;

  standbyBackgroundVideo.src = birthday.backgroundVideos[backgroundVideoIndex];
  standbyBackgroundVideo.load();

  const startNextVideo = () => {
    standbyBackgroundVideo.play().then(() => {
      standbyBackgroundVideo.classList.add("is-active");

      const previousVideo = activeBackgroundVideo;
      const newActiveVideo = standbyBackgroundVideo;

      window.setTimeout(() => {
        previousVideo.classList.remove("is-active");
        previousVideo.pause();
      }, 1200);

      [activeBackgroundVideo, standbyBackgroundVideo] = [
        newActiveVideo,
        previousVideo,
      ];
    }).catch(() => {
      activeBackgroundVideo.classList.add("is-active");
    });
  };

  if (standbyBackgroundVideo.readyState >= 3) {
    startNextVideo();
  } else {
    standbyBackgroundVideo.addEventListener("canplay", startNextVideo, { once: true });
  }
}

window.setInterval(() => {
  setBackgroundVideo(backgroundVideoIndex + 1);
}, 12000);

document.getElementById("birthdayName").textContent = birthday.name;
document.getElementById("birthdayMessage").textContent = birthday.message;
document.getElementById("dateLabel").textContent = birthday.date;

let currentIndex = 0;
let autoSlide;

birthday.photos.forEach((photo, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Tampilkan foto ${index + 1}`);
  dot.addEventListener("click", () => showPhoto(index));
  dotsContainer.appendChild(dot);
});

function showPhoto(index) {
  currentIndex = (index + birthday.photos.length) % birthday.photos.length;
  const photo = birthday.photos[currentIndex];

  mainPhoto.classList.add("switching");

  window.setTimeout(() => {
    mainPhoto.src = photo.src;
    mainPhoto.alt = photo.alt;
    photoCaption.textContent = photo.caption;
    photoNumber.textContent = String(currentIndex + 1).padStart(2, "0");
    mainPhoto.classList.remove("switching");
  }, 260);

  document.querySelectorAll(".dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentIndex);
  });
}

function startAutoSlide() {
  window.clearInterval(autoSlide);
  autoSlide = window.setInterval(() => showPhoto(currentIndex + 1), 5000);
}

prevButton.addEventListener("click", () => {
  showPhoto(currentIndex - 1);
  startAutoSlide();
});

nextButton.addEventListener("click", () => {
  showPhoto(currentIndex + 1);
  startAutoSlide();
});

showPhoto(0);
startAutoSlide();

// Animasi confetti, balon, dan kembang api.
const canvas = document.getElementById("confetti");
const context = canvas.getContext("2d");
const birthdayColors = [
  "#ff5c75",
  "#ffc75f",
  "#73c7ff",
  "#b78cff",
  "#65ddb5",
  "#ffffff",
];
let particles = [];
const balloons = [];
const fireworks = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  context.setTransform(
    window.devicePixelRatio,
    0,
    0,
    window.devicePixelRatio,
    0,
    0,
  );
}

function createParticles() {
  particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight,
    size: 3 + Math.random() * 5,
    speed: 0.45 + Math.random() * 1.1,
    drift: (Math.random() - 0.5) * 0.7,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.08,
    color: birthdayColors[Math.floor(Math.random() * birthdayColors.length)],
  }));
}

function createBalloon(index) {
  return {
    x: 30 + Math.random() * Math.max(window.innerWidth - 60, 100),
    y: window.innerHeight + 40 + index * 55 + Math.random() * 220,
    radius: 22 + Math.random() * 12,
    speed: 0.35 + Math.random() * 0.45,
    drift: (Math.random() - 0.5) * 0.35,
    phase: Math.random() * Math.PI * 2,
    color: birthdayColors[index % birthdayColors.length],
  };
}

function drawBalloon(balloon) {
  balloon.y -= balloon.speed;
  balloon.phase += 0.018;
  balloon.x += balloon.drift + Math.sin(balloon.phase) * 0.18;

  if (balloon.y < -120) {
    balloon.y = window.innerHeight + 80 + Math.random() * 180;
    balloon.x = 30 + Math.random() * Math.max(window.innerWidth - 60, 100);
  }

  context.save();
  context.translate(balloon.x, balloon.y);
  context.globalAlpha = 0.92;
  context.fillStyle = balloon.color;
  context.beginPath();
  context.ellipse(
    0,
    0,
    balloon.radius * 0.78,
    balloon.radius,
    0,
    0,
    Math.PI * 2,
  );
  context.fill();

  context.globalAlpha = 0.55;
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.ellipse(
    -balloon.radius * 0.26,
    -balloon.radius * 0.42,
    balloon.radius * 0.14,
    balloon.radius * 0.24,
    -0.5,
    0,
    Math.PI * 2,
  );
  context.fill();

  context.globalAlpha = 0.8;
  context.strokeStyle = balloon.color;
  context.lineWidth = 1.3;
  context.beginPath();
  context.moveTo(0, balloon.radius * 0.92);
  context.bezierCurveTo(
    8,
    balloon.radius * 1.55,
    -7,
    balloon.radius * 2.05,
    2,
    balloon.radius * 2.6,
  );
  context.stroke();

  context.fillStyle = balloon.color;
  context.beginPath();
  context.moveTo(-5, balloon.radius * 0.82);
  context.lineTo(5, balloon.radius * 0.82);
  context.lineTo(0, balloon.radius * 1.05);
  context.closePath();
  context.fill();
  context.restore();
}

function launchFirework() {
  const padding = 140;
  const x =
    padding + Math.random() * Math.max(window.innerWidth - padding * 2, 100);
  const y = 70 + Math.random() * Math.max(window.innerHeight * 0.45, 100);
  const color =
    birthdayColors[Math.floor(Math.random() * birthdayColors.length)];
  const sparks = [];

  for (let i = 0; i < 38; i += 1) {
    const angle = (Math.PI * 2 * i) / 38 + Math.random() * 0.12;
    const speed = 1.2 + Math.random() * 3.2;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.012 + Math.random() * 0.012,
      size: 1.2 + Math.random() * 2,
      color,
    });
  }

  fireworks.push(sparks);
}

function drawFireworks() {
  for (let index = fireworks.length - 1; index >= 0; index -= 1) {
    const sparks = fireworks[index];

    sparks.forEach((spark) => {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vx *= 0.985;
      spark.vy = spark.vy * 0.985 + 0.018;
      spark.life -= spark.decay;

      if (spark.life <= 0) return;

      context.save();
      context.globalAlpha = spark.life;
      context.shadowColor = spark.color;
      context.shadowBlur = 7;
      context.fillStyle = spark.color;
      context.beginPath();
      context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    });

    if (sparks.every((spark) => spark.life <= 0)) {
      fireworks.splice(index, 1);
    }
  }
}

function drawBirthdayScene() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle) => {
    particle.y += particle.speed;
    particle.x += particle.drift;
    particle.rotation += particle.spin;

    if (particle.y > window.innerHeight + 20) {
      particle.y = -20;
      particle.x = Math.random() * window.innerWidth;
    }

    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.fillStyle = particle.color;
    context.fillRect(
      -particle.size / 2,
      -particle.size / 2,
      particle.size,
      particle.size * 0.65,
    );
    context.restore();
  });

  balloons.forEach(drawBalloon);
  drawFireworks();
  window.requestAnimationFrame(drawBirthdayScene);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
createParticles();

for (let i = 0; i < 9; i += 1) {
  balloons.push(createBalloon(i));
}

launchFirework();
window.setInterval(launchFirework, 2200);
window.requestAnimationFrame(drawBirthdayScene);
