// ==================== AOS INIT ====================
AOS.init({
    once: true,
    duration: 700,
    easing: 'ease-out-cubic',
    offset: 60
});

// ==================== NAVBAR SCROLL ====================
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links-center a, .mobile-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.remove('open');
    });
});

// ==================== MOBILE MENU TOGGLE ====================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current).toLocaleString('id-ID') + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('id-ID') + '+';
            }
        };
        updateCounter();
    });
}

const statsBar = document.querySelector('.stats-bar');
let countersAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.3 });

if (statsBar) statsObserver.observe(statsBar);

// ==================== TESTIMONIAL CAROUSEL ====================
const testimonialSlider = document.getElementById('testimonialSlider');
const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
        slide.style.opacity = i === index ? '1' : '0';
    });
}

function handleTestimonialResponsive() {
    if (window.innerWidth >= 992) {
        slides.forEach(slide => { slide.style.display = 'block'; slide.style.opacity = '1'; });
    } else {
        showSlide(currentSlide);
    }
}

document.getElementById('nextTestimonial').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
});

document.getElementById('prevTestimonial').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
});

window.addEventListener('resize', handleTestimonialResponsive);
handleTestimonialResponsive();

setInterval(() => {
    if (window.innerWidth < 992) {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
}, 5000);

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message, duration = 4000) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, duration);
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const serviceType = document.getElementById('serviceType').value;
    const message = document.getElementById('message').value.trim();

    if (!fullName || !email || !whatsapp || !serviceType || !message) {
        showToast('Mohon lengkapi semua field yang diperlukan.');
        return;
    }

    const submitBtn = this.querySelector('.btn-submit');
    submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i> Mengirim...';
    submitBtn.disabled = true;

    const adminNumber = "6283186918751"; // ganti dengan nomor WA Anda

    const text =
`Halo Admin,

Nama: ${fullName}
Email: ${email}
WhatsApp: ${whatsapp}
Layanan: ${serviceType}

Pesan:
${message}`;

    setTimeout(() => {
        window.open(
            `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`,
            '_blank'
        );

        showToast('Pesan berhasil dikirim ke WhatsApp.');

        contactForm.reset();

        submitBtn.innerHTML =
            '<i class="fas fa-paper-plane me-2"></i> Kirim Pesan';

        submitBtn.disabled = false;
    }, 1000);
});
// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) { backToTop.classList.add('show'); }
    else { backToTop.classList.remove('show'); }
});
backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

// ==================== PAGE LOAD ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

document.querySelectorAll('.page-transition').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const url = this.href;

        document.body.style.opacity = '0.3'; // jangan 0
        document.body.style.transition = 'opacity .3s ease';

        setTimeout(() => {
            window.location.href = url;
        }, 300);
    });
});