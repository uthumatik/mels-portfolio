// ===================================
// NAVBAR
// ===================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    updateActiveLink();
});

function updateActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const top = section.offsetTop - 160;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.toggle('active', scrollY >= top && scrollY < bottom);
            }
        });
    });
}

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// ===================================
// REVEAL ON SCROLL
// ===================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .about-grid').forEach(el => revealObserver.observe(el));

// ===================================
// GALLERY LIGHTBOX
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');
let lightbox = null;
let currentIndex = 0;
const images = Array.from(galleryItems);

function openLightbox(index) {
    currentIndex = index;
    if (!lightbox) createLightbox();
    const img = images[currentIndex].querySelector('img');
    lightbox.querySelector('img').src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    const img = images[currentIndex].querySelector('img');
    lightbox.querySelector('img').src = img.src;
}

function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <button class="lb-close">&times;</button>
        <button class="lb-prev">&#8249;</button>
        <img src="" alt="">
        <button class="lb-next">&#8250;</button>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .lightbox-overlay {
            display:none; position:fixed; inset:0; z-index:10000;
            background:rgba(0,0,0,0.95); align-items:center; justify-content:center;
        }
        .lightbox-overlay.active { display:flex; }
        .lightbox-overlay img { max-width:85vw; max-height:85vh; object-fit:contain; }
        .lb-close {
            position:absolute; top:1.5rem; right:2rem;
            font-size:2rem; color:#fff; background:none; border:none; cursor:pointer;
            opacity:0.6; transition:opacity 0.3s;
        }
        .lb-close:hover { opacity:1; }
        .lb-prev, .lb-next {
            position:absolute; top:50%; transform:translateY(-50%);
            font-size:3rem; color:#fff; background:none; border:none; cursor:pointer;
            opacity:0.4; transition:opacity 0.3s; padding:1rem;
        }
        .lb-prev { left:1rem; }
        .lb-next { right:1rem; }
        .lb-prev:hover, .lb-next:hover { opacity:0.9; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(lightbox);

    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-prev').addEventListener('click', () => navigate(-1));
    lightbox.querySelector('.lb-next').addEventListener('click', () => navigate(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
}

galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
