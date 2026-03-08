// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Sticky navbar effect on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.formation-card, .skill-item, .offer-card, .timeline-item, .project-detail, .cert-item'
);

animateElements.forEach(el => {
    observer.observe(el);
});

// ===================================
// GALLERY LIGHTBOX
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');
let lightbox = null;

function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Image en plein écran">
            <div class="lightbox-nav">
                <button class="lightbox-prev">&#10094;</button>
                <button class="lightbox-next">&#10095;</button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add lightbox styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: var(--accent-color);
        }
        
        .lightbox-nav button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            font-size: 30px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lightbox-nav button:hover {
            background: var(--accent-color);
        }
        
        .lightbox-prev {
            left: -60px;
        }
        
        .lightbox-next {
            right: -60px;
        }
        
        @media (max-width: 768px) {
            .lightbox-prev {
                left: 10px;
            }
            .lightbox-next {
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);
    
    return lightbox;
}

let currentImageIndex = 0;
const imageItems = Array.from(galleryItems).filter(item => !item.classList.contains('video-item'));

galleryItems.forEach((item, index) => {
    if (!item.classList.contains('video-item')) {
        item.addEventListener('click', () => {
            if (!lightbox) {
                lightbox = createLightbox();
                setupLightboxEvents();
            }
            
            const img = item.querySelector('img');
            if (img) {
                currentImageIndex = imageItems.indexOf(item);
                showLightboxImage(img.src);
            }
        });
    }
});

function setupLightboxEvents() {
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
}

function showLightboxImage(src) {
    const img = lightbox.querySelector('img');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageItems.length) % imageItems.length;
    const img = imageItems[currentImageIndex].querySelector('img');
    showLightboxImage(img.src);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageItems.length;
    const img = imageItems[currentImageIndex].querySelector('img');
    showLightboxImage(img.src);
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.about-content, .project-detail');
    
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            if (index % 2 === 0) {
                element.classList.add('slide-in-left');
            } else {
                element.classList.add('slide-in-right');
            }
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// VIEW BUTTONS FOR CERTIFICATIONS
// ===================================
const viewButtons = document.querySelectorAll('.view-btn');

viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const certImage = btn.parentElement.querySelector('img');
        
        if (certImage) {
            if (!lightbox) {
                lightbox = createLightbox();
                setupLightboxEvents();
            }
            showLightboxImage(certImage.src);
        }
    });
});

// ===================================
// HERO SCROLL INDICATOR
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// PREVENT WINDOW JUMP ON LOAD
// ===================================
window.addEventListener('load', () => {
    // Remove any hash from URL on load to prevent jump
    if (window.location.hash) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1);
    }
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// CONSOLE LOG
// ===================================
console.log('%c Portfolio Mélanie Silva Pothupitiyage ', 'background: #d4af37; color: #1a1a1a; font-size: 16px; padding: 10px;');
console.log('%c Développé avec ❤️ ', 'color: #d4af37; font-size: 12px;');
