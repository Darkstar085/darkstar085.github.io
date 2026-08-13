const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const typingWords = ["an Anime Lover", "a Custom ROM Developer", "a Noob"];

const typer = document.querySelector("#typer");
const canvas = document.querySelector("#particles-canvas");
const ctx = canvas.getContext("2d", { alpha: false });

let animationFrame = 0;
let particles = [];
let width = 0;
let height = 0;
let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createParticles();
}

function createParticles() {
  const count = prefersReducedMotion.matches
    ? 45
    : Math.min(120, Math.max(55, Math.round((width * height) / 16000)));

  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 1.5,
    speedY: (Math.random() - 0.5) * 1.5,
    opacity: Math.random() * 0.75 + 0.25,
  }));
}

function renderParticles() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  for (const particle of particles) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
    ctx.fill();

    if (!prefersReducedMotion.matches) {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;
    }
  }

  if (!prefersReducedMotion.matches) {
    animationFrame = requestAnimationFrame(renderParticles);
  }
}

function startParticles() {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  renderParticles();
}

async function typeWords() {
  if (!typer) return;

  if (prefersReducedMotion.matches) {
    typer.textContent = typingWords[0];
    return;
  }

  let wordIndex = 0;

  while (true) {
    const word = typingWords[wordIndex];

    for (let i = 1; i <= [...word].length; i += 1) {
      typer.textContent = [...word].slice(0, i).join("");
      await wait(160);
    }

    await wait(1000);

    for (let i = [...word].length; i >= 0; i -= 1) {
      typer.textContent = [...word].slice(0, i).join("");
      await wait(100);
    }

    wordIndex = (wordIndex + 1) % typingWords.length;
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

window.addEventListener("resize", resizeCanvas, { passive: true });

prefersReducedMotion.addEventListener?.("change", startParticles);

startParticles();
typeWords();
