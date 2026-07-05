// // Smooth Scroll & Interaction
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
//     });
// });

// // Cursor Glow Effect
// document.addEventListener('mousemove', (e) => {
//     const cursor = document.querySelector('.cursor-trail');
//     cursor.style.left = e.clientX + 'px';
//     cursor.style.top = e.clientY + 'px';
// });

// // Intersection Observer for Animations
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) entry.target.classList.add('show');
//     });
// });

/* Utilities */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* Loader */
window.addEventListener('load', () => {
  const loader = $('#loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(()=>loader.remove(),300);
  }, 500);
});

/* Year */
$('#year').textContent = new Date().getFullYear();

/* Smooth scroll active highlighting + progress */
const sections = $$('main section');
const links = $$('.nav-link');
const bar = $('#scrollbar');

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = (window.scrollY / max) * 100;
  bar.style.width = `${p}%`;

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = `#${sec.id}`;
  });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === current));
}
document.addEventListener('scroll', onScroll, { passive: true });

/* Mobile nav */
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  if(open){
    navToggle.firstElementChild.src = 'assets/icons/close.svg';
  } else {
    navToggle.firstElementChild.src = 'assets/icons/menu.svg';
  }
});
navMenu.addEventListener('click', e => {
  if (e.target.matches('a')) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.firstElementChild.src = 'assets/icons/menu.svg';
  }
});

/* Theme toggle with persistence */
const root = document.documentElement;
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light') root.classList.add('light');
themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  toast(`Switched to ${root.classList.contains('light') ? 'Light' : 'Dark'} mode`);
});

/* Typed effect */
const typedEl = $('.typed');
const roles = [
  'Senior Frontend Developer',
  'UI/UX Designer',
  'Creative Web Designer'
];
let rIdx = 0, chIdx = 0, back = false;
function typeLoop(){
  const current = roles[rIdx];
  if(!back){
    chIdx++;
    typedEl.textContent = current.slice(0, chIdx);
    if(chIdx === current.length){ back = true; setTimeout(typeLoop, 1200); return; }
  } else {
    chIdx--;
    typedEl.textContent = current.slice(0, chIdx);
    if(chIdx === 0){ back = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(typeLoop, back ? 30 : 60);
}
typeLoop();

/* AOS (minimal) */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('aos-animate');
      // Start progress circles when visible
      if(e.target.matches('.circles')){
        $$('.circle', e.target).forEach(initCircle);
      }
      // Start counters
      if(e.target.matches('.about-text')){
        $$('.count', e.target.parentElement).forEach(counterUp);
      }
    }
  });
},{ threshold: 0.15 });
$$('[data-aos]').forEach(el => observer.observe(el));

/* Skill bars animate width on view */
const barObserver = new IntersectionObserver((ents)=>{
  ents.forEach(e=>{
    if(e.isIntersecting){
      $$('i', e.target).forEach(i=>{
        const w = getComputedStyle(i).getPropertyValue('--w');
        i.style.width = w;
      });
      barObserver.unobserve(e.target);
    }
  });
},{threshold:.4});
$$('.skill-bars').forEach(el=>barObserver.observe(el));

/* Circular progress */
function initCircle(box){
  const c = $('circle.fg', box);
  const r = +c.getAttribute('r');
  const circ = 2*Math.PI*r;
  const p = +box.dataset.progress;
  const offset = circ*(1 - p/100);
  c.style.strokeDasharray = `${circ}`;
  c.style.strokeDashoffset = `${circ}`;
  requestAnimationFrame(()=>{
    c.style.strokeDashoffset = `${offset}`;
  });
}

/* Gallery filters */
const filters = $$('.filter');
const items = $$('.gallery .item');
filters.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(it=>{
      const show = f === 'all' || it.dataset.cat === f;
      it.style.display = show ? 'block' : 'none';
    });
  });
});

/* Modal */
const modal = $('#projectModal');
const modalTitle = $('#modalTitle');
const modalBody = $('#modalBody');
$$('.open-modal').forEach(b=>{
  b.addEventListener('click',()=>{
    modalTitle.textContent = b.dataset.project;
    modalBody.textContent = 'A brief overview of ' + b.dataset.project + ' with tech stack and outcomes.';
    modal.showModal();
  });
});
$$('.modal-close').forEach(b=>b.addEventListener('click',()=>modal.close()));

/* Carousel */
const track = $('.car-track');
const slides = $$('.slide');
let idx = 0;
function moveCar(n){
  idx = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${idx*100}%)`;
}
$('.car-btn.next').addEventListener('click',()=>moveCar(idx+1));
$('.car-btn.prev').addEventListener('click',()=>moveCar(idx-1));
setInterval(()=>moveCar(idx+1), 6000);

/* Contact form validation + toast */
const form = $('#contactForm');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();
  const note = $('.form-note', form);
  if(!/^\S+@\S+\.\S+$/.test(email)){
    note.textContent = 'Please enter a valid email.';
    note.style.color = '#ffd4d4';
    return;
  }
  if(msg.length < 10){
    note.textContent = 'Message should be at least 10 characters.';
    note.style.color = '#ffd4d4';
    return;
  }
  note.textContent = '';
  toast('Message sent! I will get back to you soon.');
  form.reset();
});

/* Back to top */
$('#backTop').addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

/* Simple counters */
function counterUp(el){
  const end = +el.dataset.count;
  let cur = 0;
  const step = Math.ceil(end/60);
  const t = setInterval(()=>{
    cur += step;
    if(cur >= end){ cur = end; clearInterval(t); }
    el.textContent = cur;
  }, 20);
}

/* Particles (disabled) */
// const canvas = $('#particles');
// const ctx = canvas.getContext('2d');
// let W, H, parts = [];
// function resize(){
//   W = canvas.width = innerWidth;
//   H = canvas.height = innerHeight;
// }
// addEventListener('resize', resize); resize();
// for(let i=0;i<80;i++){
//   parts.push({
//     x: Math.random()*W,
//     y: Math.random()*H,
//     r: Math.random()*2 + .5,
//     vx: (Math.random()-.5)*.3,
//     vy: (Math.random()-.5)*.3
//   });
// }
// function draw(){
//   ctx.clearRect(0,0,W,H);
//   ctx.fillStyle = 'rgba(120,200,255,.6)';
//   parts.forEach(p=>{
//     p.x += p.vx; p.y += p.vy;
//     if(p.x<0||p.x>W) p.vx*=-1;
//     if(p.y<0||p.y>H) p.vy*=-1;
//     ctx.beginPath();
//     ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
//     ctx.fill();
//   });
//   requestAnimationFrame(draw);
// }
// draw();


/* Cursor glow follow */
const cursor = $('#cursor');
document.addEventListener('pointermove', (e)=>{
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

/* Toast notifications */
const toastEl = $('#toast');
let toastTimer = null;
function toast(msg){
  toastEl.textContent = msg;
  toastEl.style.display = 'block';
  toastEl.className = 'toast-show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{
    toastEl.className = 'toast-hide';
    setTimeout(()=>toastEl.style.display='none',280);
  }, 2200);
}

/* Keyboard accessibility for modal escape */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && modal.open) modal.close();
});
