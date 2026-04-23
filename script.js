// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    }
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.querySelector('.btn-submit');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    formMessage.innerHTML = '';
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formMessage.innerHTML = '<span class="success">✓ Message sent successfully! We will get back to you soon.</span>';
            formMessage.className = 'success';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.innerHTML = '<span class="error">⚠ There was an error. Please email us directly at tahirtrangc@gmail.com</span>';
        formMessage.className = 'error';
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// ===== SMOOTH SCROLL FOR SAFARI =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and features
document.querySelectorAll('.service-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
