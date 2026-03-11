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

// ===================================
// ABOUT CARDS — AUTO-CYCLE + POPUP
// ===================================
const aboutCards = document.querySelectorAll('.about-card');
let activeCard = 0;
let cardTimer = null;

function setActiveCard(i) {
    aboutCards.forEach(c => c.classList.remove('active'));
    if (aboutCards[i]) aboutCards[i].classList.add('active');
    activeCard = i;
}

function startCardCycle() {
    cardTimer = setInterval(() => {
        setActiveCard((activeCard + 1) % aboutCards.length);
    }, 2800);
}

if (aboutCards.length > 0) {
    setActiveCard(0);
    startCardCycle();

    aboutCards.forEach((card, i) => {
        card.addEventListener('mouseenter', () => {
            clearInterval(cardTimer);
            setActiveCard(i);
        });
        card.addEventListener('mouseleave', startCardCycle);
        card.addEventListener('click', () => openProjModal(i));
    });
}

// ===================================
// PROJECT MODAL
// ===================================
const projectData = [
    {
        label: 'Eleven Paris',
        title: 'Articles de blog',
        media: 'images/project15.jpg', type: 'image',
        desc: 'Rédaction d\'articles de blog pour la marque Elevenparis, mettant en avant les collections et l\'univers de la marque à travers un contenu éditorial engageant.'
    },
    {
        label: 'E-Commerce',
        title: 'Site web & contenus',
        media: 'images/project14.jpg', type: 'image',
        desc: 'Gestion du site web de la marque : création de bannières, mise en page des collections, rédaction des fiches produits, articles de blog et retouche photo pour une expérience en ligne cohérente et raffinée.'
    },
    {
        label: 'Digital',
        title: 'E-merchandising',
        media: 'images/merchandising.png', type: 'image',
        desc: 'Gestion complète du merchandising en ligne pour optimiser l\'expérience utilisateur et maximiser les ventes.'
    },
    {
        label: 'Création',
        title: 'Newsletters & IA',
        media: 'images/newsletter-video-ai1.mov', type: 'video',
        desc: 'Génération de visuels à l\'aide d\'IA destinés à l\'e-shop, aux newsletters et aux articles de blog. Rédaction de newsletters pour mettre en avant les collections et actualités de la marque.'
    },
    {
        label: 'Retail',
        title: 'Merchandising & Vitrines',
        media: 'images/merchandising-vitrine.png', type: 'image',
        desc: 'Conception de vitrines de A à Z, du choix des produits et éléments décoratifs à la disposition finale, en veillant à créer une mise en scène cohérente, attractive et adaptée aux temps forts commerciaux.'
    }
];

const projModal = document.getElementById('proj-modal');
let currentModalIdx = 0;

function openProjModal(i) {
    const p = projectData[i];
    currentModalIdx = i;
    projModal.querySelector('.proj-modal-label').textContent = p.label;
    projModal.querySelector('.proj-modal-title').textContent = p.title;
    projModal.querySelector('.proj-modal-desc').textContent = p.desc;

    const mediaEl = projModal.querySelector('.proj-modal-media');
    mediaEl.innerHTML = '';
    const el = p.type === 'video' ? document.createElement('video') : document.createElement('img');
    el.src = p.media;
    el.alt = p.title;
    if (p.type === 'video') { el.autoplay = true; el.muted = true; el.loop = true; el.playsInline = true; }
    mediaEl.appendChild(el);

    projModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjModal() {
    projModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { projModal.querySelector('.proj-modal-media').innerHTML = ''; }, 500);
}

function navigateProjModal(dir) {
    openProjModal((currentModalIdx + dir + projectData.length) % projectData.length);
}

if (projModal) {
    projModal.querySelector('.proj-modal-close').addEventListener('click', closeProjModal);
    projModal.querySelector('.proj-modal-backdrop').addEventListener('click', closeProjModal);
    projModal.querySelector('.proj-modal-prev').addEventListener('click', () => navigateProjModal(-1));
    projModal.querySelector('.proj-modal-next').addEventListener('click', () => navigateProjModal(1));
}

document.addEventListener('keydown', e => {
    if (!projModal || !projModal.classList.contains('open')) return;
    if (e.key === 'Escape') closeProjModal();
    if (e.key === 'ArrowLeft') navigateProjModal(-1);
    if (e.key === 'ArrowRight') navigateProjModal(1);
});
