const slides = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');
const total = slides.children.length;
let index = 0;
let timer;

for (let i = 0; i < total; i++) {
  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.addEventListener('click', () => {
    goTo(i);
    restartAutoplay();
  });
  dotsContainer.appendChild(dot);
}

function update() {
  slides.style.transform = 'translateX(-' + (index * 100) + '%)';
  const dots = dotsContainer.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('active', i === index);
  }
}

function goTo(i) {
  index = (i + total) % total;
  update();
}

function move(step) {
  goTo(index + step);
  restartAutoplay();
}

function startAutoplay() {
  timer = setInterval(() => goTo(index + 1), 5000);
}

function restartAutoplay() {
  clearInterval(timer);
  startAutoplay();
}

const carousel = document.querySelector('.carousel');

carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', startAutoplay);

let touchStartX = 0;

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) {
    move(diff < 0 ? 1 : -1);
  }
}, { passive: true });

const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.menu');

if (nav && menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.links a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

update();
startAutoplay();