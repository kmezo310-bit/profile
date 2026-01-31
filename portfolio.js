// ===== CURSOR TRAIL =====
document.addEventListener('mousemove', (e) => {
    const circle = document.createElement('div');
    circle.classList.add('trail');
    circle.style.left = e.clientX + 'px';
    circle.style.top = e.clientY + 'px';
    document.body.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
});

/* TRAIL STYLE */
const style = document.createElement('style');
style.innerHTML = `
.trail {
    position: fixed;
    width: 15px;
    height: 15px;
    background: #0ff;
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: lighten;
    animation: fadeTrail 0.5s forwards;
}
@keyframes fadeTrail {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.5); }
}
`;
document.head.appendChild(style);

// ===== BACKGROUND PARTICLES =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for(let i=0;i<150;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*3 + 1,
        dx: (Math.random()-0.5)*1.5,
        dy: (Math.random()-0.5)*1.5
    });
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let p of particles){
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = '#0ff';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    }
    requestAnimationFrame(animate);
}
animate();

// ===== RESIZE CANVAS =====
window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
