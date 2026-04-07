const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    gsap.to(cursorRing, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.15,
        overwrite: true
    });
});

document.querySelectorAll('a, button, .pool-card, .advantage-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = '#b000ff';
        cursorRing.style.boxShadow = '0 0 20px #b000ff';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(0, 242, 255, 0.5)';
        cursorRing.style.boxShadow = 'none';
    });
});

gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('section, .glass-card, .pool-card, .advantage-card, .timeline-node').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'back.out(0.6)'
    });
});

let simStep = 0;
const demoDisplay = document.getElementById('demoDisplay');
const steps = [
    '<div style="display:flex; align-items:center; justify-content:center; gap:1rem;"><div style="background:rgba(0,242,255,0.3); border:2px solid #00f2ff; padding:0.8rem 1.2rem; border-radius:16px;">📄 NEW</div><span>→ Page Fault Occurs</span></div>',
    '<div style="display:flex; align-items:center; justify-content:center; gap:1rem;"><div style="background:rgba(0,255,136,0.3); border:2px solid #00ff88; padding:0.6rem 1rem; border-radius:12px;">✅ Free Frame</div><span style="color:#00ff88;">✓ Free Pool Available</span></div>',
    '<div style="display:flex; align-items:center; justify-content:center; gap:1rem;"><div style="background:rgba(0,242,255,0.5); border:2px solid #00f2ff; padding:0.8rem 1.2rem; border-radius:16px; animation:pulse 1s infinite;">⚡ Page X</div><span>Instant Load - No Wait!</span></div>',
    '<div style="display:flex; align-items:center; justify-content:center; gap:1rem;"><div style="background:rgba(255,102,0,0.3); border:2px solid #ff6600; padding:0.6rem 1rem; border-radius:12px;">📀 Victim</div><span>→ Moved to Modified Pool (background write)</span></div>'
];
document.getElementById('simulateBtn').addEventListener('click', () => {
    simStep = (simStep + 1) % steps.length;
    demoDisplay.innerHTML = `<div style="text-align:center;">${steps[simStep]}<div style="margin-top:1rem; color:#b0b8d0;">Step ${simStep+1} of 4</div></div>`;
});
document.getElementById('resetSimBtn').addEventListener('click', () => {
    simStep = -1;
    demoDisplay.innerHTML = '<div style="color: var(--text-secondary);">Click "Simulate Page Fault" to see the algorithm in action</div>';
});

const rescueBoxes = [document.getElementById('rescue1'), document.getElementById('rescue2'), document.getElementById('rescue3')];
const rescueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            rescueBoxes.forEach((box, idx) => {
                setTimeout(() => {
                    box.classList.add('active');
                    const rect = box.getBoundingClientRect();
                    for (let i = 0; i < 10; i++) {
                        const particle = document.createElement('div');
                        particle.style.position = 'fixed';
                        particle.style.width = '4px';
                        particle.style.height = '4px';
                        particle.style.background = `hsl(${Math.random() * 60 + 180}, 100%, 60%)`;
                        particle.style.borderRadius = '50%';
                        particle.style.left = rect.left + rect.width/2 + 'px';
                        particle.style.top = rect.top + rect.height/2 + 'px';
                        particle.style.pointerEvents = 'none';
                        particle.style.zIndex = '9999';
                        document.body.appendChild(particle);
                        gsap.to(particle, {
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100 - 50,
                            opacity: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                            onComplete: () => particle.remove()
                        });
                    }
                    setTimeout(() => box.classList.remove('active'), 700);
                }, idx * 400);
            });
        }
    });
}, { threshold: 0.4 });
rescueObserver.observe(document.getElementById('rescue'));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.style.background = 'var(--bg-card)';
    else nav.style.background = 'var(--bg-nav)';
});

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
let isLightMode = localStorage.getItem('theme') === 'light';

function updateTheme() {
    if (isLightMode) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙 Night';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '☀️ Day';
    }
}

themeToggle.addEventListener('click', () => {
    isLightMode = !isLightMode;
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateTheme();
});

// Initialize theme
updateTheme();
