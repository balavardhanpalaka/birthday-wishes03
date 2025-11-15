// script.js - small UX + confetti trigger, name parsing and customization handling

// Utility: parse URL query ?name=...
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// Set initial texts
const friendNameEl = document.getElementById('friend-name');
const subtitleEl = document.getElementById('subtitle');

function setGreeting(name, msg) {
  if (name) friendNameEl.textContent = `Dear ${name}`;
  else friendNameEl.textContent = 'Dear Friend';

  if (msg) subtitleEl.textContent = msg;
}

// Read name from URL on load
const initialName = getQueryParam('name') || getQueryParam('to') || '';
const initialMsg = getQueryParam('msg') || '';
setGreeting(initialName, initialMsg);

// Confetti implementation (simple falling rectangles)
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiPieces = [];
let confettiAnimationId;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function random(min, max){ return Math.random() * (max - min) + min }

function createConfetti(count = 90){
  confettiPieces = [];
  const colors = ['#F5C04A','#F25D6C','#2D1B6A','#FFC4A3','#A7C7E7'];
  for(let i=0;i<count;i++){
    confettiPieces.push({
      x: random(0, canvas.width),
      y: random(-canvas.height, 0),
      w: random(6, 12),
      h: random(8, 18),
      vy: random(1.5, 4),
      vx: random(-1.5, 1.5),
      rot: random(0, Math.PI * 2),
      vrot: random(-0.1, 0.1),
      color: colors[Math.floor(random(0, colors.length))]
    });
  }
}

function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiPieces.forEach(p=>{
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
    ctx.restore();

    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vrot;

    if(p.y > canvas.height + 30){
      p.y = random(-200, -50);
      p.x = random(0, canvas.width);
    }
  });
  confettiAnimationId = requestAnimationFrame(drawConfetti);
}

function startConfetti(){
  cancelConfetti();
  createConfetti(110);
  drawConfetti();
  // auto stop after 9s to reduce CPU use
  setTimeout(cancelConfetti, 9000);
}

function cancelConfetti(){
  if(confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  confettiAnimationId = null;
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Button wiring
document.getElementById('confetti-btn').addEventListener('click', ()=>{
  startConfetti();
  pulseTitle();
});

const customizeBtn = document.getElementById('customize-btn');
const customForm = document.getElementById('custom-form');
const inputName = document.getElementById('input-name');
const inputMsg = document.getElementById('input-msg');
const applyBtn = document.getElementById('apply-btn');
const closeBtn = document.getElementById('close-btn');

customizeBtn.addEventListener('click', ()=> {
  customForm.setAttribute('aria-hidden', 'false');
  inputName.focus();
});

closeBtn.addEventListener('click', ()=> {
  customForm.setAttribute('aria-hidden', 'true');
});

applyBtn.addEventListener('click', ()=> {
  const name = inputName.value.trim();
  const msg = inputMsg.value.trim();
  setGreeting(name || null, msg || null);
  customForm.setAttribute('aria-hidden', 'true');
  // update URL (without reload) so you can share the customized page
  const url = new URL(window.location);
  if(name) url.searchParams.set('name', name);
  else url.searchParams.delete('name');
  if(msg) url.searchParams.set('msg', msg);
  else url.searchParams.delete('msg');
  window.history.replaceState({}, '', url);
});

// small title pulse animation when celebrating
function pulseTitle(){
  const title = document.getElementById('title');
  title.animate([
    { transform: 'scale(1)', color: 'var(--deep)' },
    { transform: 'scale(1.06)', color: '#F25D6C' },
    { transform: 'scale(1)', color: 'var(--deep)' }
  ], { duration: 900, iterations: 1, easing: 'ease-out' });
}

// Accessibility: allow Enter key in form to apply
customForm.addEventListener('submit', (e)=> e.preventDefault());
inputName.addEventListener('keydown', (e)=> { if(e.key === 'Enter') applyBtn.click() });
inputMsg.addEventListener('keydown', (e)=> { if(e.key === 'Enter') applyBtn.click() });

// Optional: auto celebrate if ?celebrate=1 in URL
if (getQueryParam('celebrate') === '1') {
  setTimeout(()=> startConfetti(), 700);
}