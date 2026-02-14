
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});



const scrollProgressBar = document.querySelector('.scroll-progress-bar');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);


const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



const typedText = document.querySelector('.typed-text');
const textArray = ['Web Developer', 'React Developer', 'Video Editor', 'Creative Designer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

typeEffect();


const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});




const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

function startCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

const statsSection = document.querySelector('.about-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            startCounters();
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);



const skillCards = document.querySelectorAll('.skill-card');
const progressBars = document.querySelectorAll('.progress-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => {
    skillObserver.observe(card);
});



const tabBtns = document.querySelectorAll('.tab-btn');
const projectCategories = document.querySelectorAll('.project-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        
        tabBtns.forEach(b => b.classList.remove('active'));
        
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        
        projectCategories.forEach(cat => {
            cat.classList.remove('active');
            if (category === 'all') {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
        
        if (category === 'all') {
            projectCategories.forEach(cat => cat.style.display = 'block');
        } else {
            const selectedCat = document.querySelector(`.project-category[data-category="${category}"]`);
            if (selectedCat) {
                selectedCat.style.display = 'block';
            }
        }
        
        AOS.refresh();
    });
});


projectCategories.forEach(cat => {
    cat.style.display = 'block';
});



const rotatingElements = document.querySelectorAll('.rotating-circle');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    rotatingElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const rotation = scrollY * 0.1;
            el.style.transform = `rotate(${rotation}deg)`;
        }
    });
});



const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
       
        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



const revealElements = document.querySelectorAll('.project-card, .skill-card, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
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


const heroContent = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    
    if (heroContent) {
        heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});



const scrollAnimatedElements = document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .contact-item');

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animated');
        }
    });
}, { 
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

scrollAnimatedElements.forEach(el => {
    el.classList.add('scroll-animate');
    scrollAnimationObserver.observe(el);
});


const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    if (heroSection) {
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
    
   
    if (heroContent) {
        const opacity = 1 - (scrolled / 700);
        heroContent.style.opacity = Math.max(opacity, 0);
    }
});


const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
}, { threshold: 0.5 });

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
           
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            stat.textContent = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsScrollObserver.observe(aboutStats);
}



document.addEventListener('DOMContentLoaded', () => {
 
    console.log('Portfolio website loaded successfully!');
});
