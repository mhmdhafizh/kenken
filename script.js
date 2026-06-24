// ================================
// VARIABLES & DOM ELEMENTS
// ================================

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const cursor = document.querySelector('.cursor');
const cursorBlur = document.querySelector('.cursor-blur');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const contactForm = document.getElementById('contactForm');
const buttons = document.querySelectorAll('.btn[data-target]');

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initScrollTop();
    initSmoothScroll();
    initTabSwitcher();
    initFormSubmit();
    initAnimationsOnScroll();
    initParallax();
    updateActiveNavLink();
});

// ================================
// CURSOR ANIMATION
// ================================

function initCursor() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let blurX = 0;
    let blurY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.classList.add('active');
        cursorBlur.classList.add('active');

        // Update cursor position
        cursorX = mouseX - 10;
        cursorY = mouseY - 10;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Update blur position with smooth easing
        blurX += (mouseX - blurX - 20) * 0.3;
        blurY += (mouseY - blurY - 20) * 0.3;
        cursorBlur.style.left = blurX + 'px';
        cursorBlur.style.top = blurY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorBlur.classList.remove('active');
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderWidth = '3px';
            cursorBlur.style.width = '60px';
            cursorBlur.style.height = '60px';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderWidth = '2px';
            cursorBlur.style.width = '40px';
            cursorBlur.style.height = '40px';
        });
    });
}

// ================================
// NAVIGATION
// ================================

function initNavigation() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// ================================
// SCROLL TO TOP
// ================================

function initScrollTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// SMOOTH SCROLL
// ================================

function initSmoothScroll() {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// TAB SWITCHER
// ================================

function initTabSwitcher() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const activeTab = document.getElementById(tabName);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });

    // Set first tab as active by default
    if (tabBtns.length > 0) {
        tabBtns[0].classList.add('active');
    }
    if (tabContents.length > 0) {
        tabContents[0].classList.add('active');
    }
}

// ================================
// FORM SUBMISSION
// ================================

function initFormSubmit() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Mohon isi semua field!', 'warning');
                return;
            }

            // Create WhatsApp message
            const whatsappNumber = '628785862751';
            const whatsappMessage = `Halo Scania! Saya ${name}. ${subject}: ${message}. Email saya: ${email}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Show success notification
            showNotification('Pesan akan dikirim ke WhatsApp Anda!', 'success');

            // Reset form
            setTimeout(() => {
                contactForm.reset();
                window.open(whatsappUrl, '_blank');
            }, 1500);
        });
    }
}

// ================================
// NOTIFICATIONS
// ================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#4ECDC4' : type === 'warning' ? '#FFE66D' : '#667eea'};
        color: ${type === 'warning' ? '#333' : 'white'};
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
        font-weight: 600;
        font-size: 14px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.4s ease-out reverse';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ================================
// ANIMATIONS ON SCROLL
// ================================

function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.hobby-card, .skill-card, .exp-card, .about-card, .timeline-item'
    );

    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ================================
// PARALLAX EFFECT
// ================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-parallax');
                const yPos = window.scrollY * speed;
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ================================
// DOWNLOAD CV
// ================================

function downloadCV() {
    // Create a link element
    const link = document.createElement('a');
    link.href = 'data:text/plain;base64,Q1YgU2NhbmlhIFJhaG1hZGhhbnkKClR1cnV0IEphd2FiOiArNjIgODc4IDU4NjIgNzUxMgpFbWFpbDogc2Nhbmlha2VrZW4zMUBnbWFpbC5jb20KSW5zdGFncmFtOiBAanNjNG5pYXJfCgpQRU5ESURJS0FOOgoyMDEyIC0gMjAxODogU0QgTmVnZXJpIFBpcGl0YW4KMIAYY1ggMjAxOCAtIDIwMjE6IE1hZHJhc2FoIFRzYW5hd2l5YWggUGlwaXRhbgoyMDIxIC0gMjAyMzogU01LIE5lZ2VyaSAzIEtvdGEgU2VyYW5nICBUZWtuaWsgS29tcHV0ZXIgZGFuIEphcmluZ2FuCgpQRU5HQUBBTUFOOKU6Ckkgbm9yIC0gU2VwdGVtYmVyIDIwMjU6IEhvbmRhIEFzdHJhIE1vdG9yClBvczogU2FsZXMgJiBDdXN0b21lciBTZXJ2aWNlIFJlcHJlc2VudGF0aXZlCi0gTWVuanVhbCBkYW4gbWVtcHJvbW9zaWthbiBiYXJhbmcga2VwYWRhIGtvbnN1bWVuCi0gTWVuY2FyaSBwZWxhbmdhbiBiYXJ1IGRhbiBmb2xsb3cKCk9rdG9iZXIgLSBEZXNlbWJlciAyMDI1OiBIb3N0IExpdmUKUG9zOiBMaXZlIFN0cmVhbSBIb3N0ICYgUHJvZHVjdCBQcmVzZW50ZXIKLSBNZW5qZWxhc2thbiBkZXRhaWwgcHJvZHVrIHNlY2FyYSBtZW5hcmlrCi0gQmVyaW50ZXJha3NpIGRlbmdhbiBhdWRpZW5z'
        + 'CgpKYW51YXJpIC0gU2VwdGVtYmVyIDIwMjU6IEFzaXN0ZW4gQ2FrZSBCYWtlcnkKUG9zOiBQcm9kdWN0aW9uICYgUXVhbGl0eSBDb250cm9sIEFzc2lzdGFudAotIE1lbmdlbG9sYSBiYWhhbiBkYW4gYWRvbmFuIGt1ZQotIE1lbmphZ2Ega3VhbGl0YXMgcmFzYSwgdGFtcGlsYW4KLSBNZW5nYXR1ciByYSBzdG9rCgpLRUFITElBTjoKLSBDb21wdXRlciBUcm91Ymxlc2hvb3RpbmcKLSBOZXR3b3JrIEluc3RhbGxhdGlvbgotIFBDIEFzc2VtYmx5Ci0gQ3VzdG9tZXIgU2VydmljZQotIFRlYW13b3JrCi0gQ29tbXVuaWNhdGlvbiBTa2lsbHM='; // Base64 encoded CV content
    link.download = 'CV_Scania_Rahmadhany.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('CV berhasil diunduh!', 'success');
}

// ================================
// INTERSECTION OBSERVER FOR LAZY LOADING
// ================================

function observeElements() {
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ================================
// RIPPLE EFFECT ON BUTTONS
// ================================

function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize ripple effect
document.addEventListener('DOMContentLoaded', initRippleEffect);

// ================================
// KEYBOARD NAVIGATION
// ================================

document.addEventListener('keydown', (e) => {
    // ESC key to close any open modals/notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(n => n.remove());
    }

    // Keyboard navigation for tabs
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentBtn = document.querySelector('.tab-btn.active');
        if (currentBtn) {
            const allBtns = Array.from(tabBtns);
            const currentIndex = allBtns.indexOf(currentBtn);
            let nextIndex = currentIndex;

            if (e.key === 'ArrowRight' && currentIndex < allBtns.length - 1) {
                nextIndex = currentIndex + 1;
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                nextIndex = currentIndex - 1;
            }

            allBtns[nextIndex].click();
        }
    }
});

// ================================
// PERFORMANCE: DEBOUNCE & THROTTLE
// ================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================
// DARK MODE TOGGLE (OPTIONAL)
// ================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ================================
// PROGRESS BAR FOR SKILLS
// ================================

function initSkillProgressBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.style.getPropertyValue('--progress');
                entry.target.style.animation = `expandWidth 1.5s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skill progress bars on load
document.addEventListener('DOMContentLoaded', initSkillProgressBars);

// ================================
// FLOAT CARDS ANIMATION
// ================================

function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.float-card');
    
    floatingCards.forEach((card, index) => {
        const randomDelay = Math.random() * 2;
        card.style.animationDelay = `${randomDelay}s`;
    });
}

document.addEventListener('DOMContentLoaded', initFloatingCards);

// ================================
// SCROLL REVEAL
// ================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.hero-content, .about-content, .experience-content, .skills-container'
    );

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// ================================
// SMOOTH PAGE TRANSITIONS
// ================================

window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ================================
// LOCAL STORAGE FOR PREFERENCES
// ================================

function saveUserPreferences() {
    const preferences = {
        lastVisited: new Date(),
        visitCount: (parseInt(localStorage.getItem('visitCount') || '0') + 1)
    };
    localStorage.setItem('visitCount', preferences.visitCount);
}

document.addEventListener('DOMContentLoaded', saveUserPreferences);

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%cSelamat datang di Portfolio Scania Rahmadhany!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cDivisi Teknik Komputer & Jaringan | IT Support | Content Creator', 'color: #764ba2; font-size: 14px;');
console.log('%cMarketplace: Dibuat dengan ❤️ dan dedikasi penuh', 'color: #FF6B6B; font-size: 12px;');