document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.a a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = '#30AEC7';  
            link.style.fontWeight = 'bold';
        }
    });
});
const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.a'); 

toggle.addEventListener('click', () => {
    nav.classList.toggle('show'); 
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            
            
            if (navLinks.classList.contains('show')) {
                hamburger.textContent = '✕';
            } else {
                hamburger.textContent = '☰';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        
        if (img.width < 100 && img.height < 100) return;
        
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            showLightbox(img.src, img.alt || '');
        });
    });
});

function showLightbox(src, alt) {
    let lightbox = document.getElementById('image-lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.95); display: none; align-items: center;
            justify-content: center; z-index: 9999; cursor: zoom-out;
        `;
        
        lightbox.innerHTML = `
            <img id="lightbox-image" style="max-width: 92%; max-height: 92%; border-radius: 12px; box-shadow: 0 0 30px rgba(0,0,0,0.8);">
            <button id="lightbox-close" style="position: absolute; top: 25px; right: 35px; font-size: 40px; color: white; background: none; border: none; cursor: pointer;">×</button>
        `;
        
        document.body.appendChild(lightbox);
       
        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'image-lightbox' || e.target.id === 'lightbox-close') {
                lightbox.style.display = 'none';
            }
        });
    }
    
    document.getElementById('lightbox-image').src = src;
    lightbox.style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('anthem.mp3');
    audio.loop = true;
    audio.volume = 0.6; 

    
    const musicBtn = document.createElement('button');
    musicBtn.id = 'music-player';
    musicBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(145deg, #30AEC7, #1e7a8c);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    musicBtn.innerHTML = '🎵';
    document.body.appendChild(musicBtn);

    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '🎵';
            musicBtn.style.transform = 'scale(1)';
        } else {
            audio.play().catch(e => {
                console.log("Autoplay megállítva, kattints újra a gombra a lejátszáshoz.");
            });
            musicBtn.innerHTML = '⏸';
            musicBtn.style.transform = 'scale(1.1)';
        }
        isPlaying = !isPlaying;
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            audio.pause();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 110px;           
        right: 30px;
        width: 50px;
        height: 50px;
        background: #30AEC7;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
    `;
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseover', () => {
        backToTop.style.transform = 'scale(1.15)';
    });
    backToTop.addEventListener('mouseout', () => {
        backToTop.style.transform = 'scale(1)';
    });
});
// === LECLERC HERO ===
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('leclerc-hero')) return;
    const canvas = document.getElementById('morph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    
    const headImg = new Image(); headImg.src = 'leclecr.png';   
    const helmImg = new Image(); helmImg.src = 'helm.png';
    
    let mouseX = 0.5, mouseY = 0.5;

    function resize() {
        w = canvas.offsetWidth; 
        h = canvas.offsetHeight;
        canvas.width = w; 
        canvas.height = h;
    }
    window.addEventListener('resize', resize);
    resize();

    document.getElementById('leclerc-hero').addEventListener('mousemove', e => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX = (e.clientX - r.left) / r.width;
        mouseY = (e.clientY - r.top) / r.height;
    });
    let p = 0.5;

    function animate() {
    ctx.clearRect(0, 0, w, h);

    p = p * 0.85 + mouseX * 0.15;  

    const ease = p * p * (3 - 2 * p);  

    ctx.globalAlpha = Math.max(0.1, 1 - ease * 0.95);
    ctx.drawImage(
        headImg,
        (w * 0.5 - headImg.width * 0.41 / 2) + (p - 0.5) * 40,
        (h * 0.48 - headImg.height * 0.41 / 2) + (mouseY - 0.5) * 25,
        headImg.width * 0.41,
        headImg.height * 0.41
    );

    ctx.globalAlpha = Math.min(0.98, ease * 0.98);
    ctx.drawImage(
        helmImg,
        (w * 0.5 - helmImg.width * 0.43 / 2) + (p - 0.5) * 70,
        (h * 0.47 - helmImg.height * 0.45 / 2) + (mouseY - 0.5) * 20,
        helmImg.width * 0.39,
        helmImg.height * 0.39
    );

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}
let loaded = 0;
const start = () => { 
    if (++loaded === 2) animate(); 
};

headImg.onload = start;
helmImg.onload = start;

// Safety fallback
setTimeout(() => { 
    if (loaded < 2) animate(); 
}, 800);
});