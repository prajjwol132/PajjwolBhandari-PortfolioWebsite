/**
 * ============================================
 * PORTFOLIO WEBSITE - MAIN JAVASCRIPT FILE
 * ============================================
 * This file contains all the interactive functionality
 * for the portfolio website including animations,
 * scroll effects, form handling, and more.
 */

/* ===========================================
   AOS (Animate On Scroll) INITIALIZATION
   ===========================================
   Initializes the AOS library which provides scroll-based
   animations for elements as they come into view.
*/
AOS.init({
    duration: 1000,      // Animation duration in milliseconds
    once: true,          // Animation happens only once per element
    offset: 100,         // Offset from the bottom of viewport to trigger animation
    easing: 'ease-out-cubic'  // Easing function for smooth animation
});


/* ===========================================
   SCROLL PROGRESS BAR
   ===========================================
   Creates a visual progress bar at the top of the page
   that shows how far the user has scrolled down the page.
   The bar fills from left to right as the user scrolls.
*/

// Get the scroll progress bar element
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

/**
 * Updates the scroll progress bar width based on scroll position
 * Calculates the percentage of page scrolled and applies it to the progress bar
 */
function updateScrollProgress() {
    const scrollTop = window.scrollY;  // Current scroll position
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;  // Total scrollable height
    const scrollPercent = (scrollTop / docHeight) * 100;  // Calculate percentage
    scrollProgressBar.style.width = scrollPercent + '%';  // Update bar width
}

// Listen for scroll events to update the progress bar
window.addEventListener('scroll', updateScrollProgress);


/* ===========================================
   NAVBAR SCROLL EFFECT
   ===========================================
   Adds a 'scrolled' class to the navbar when the user
   scrolls down more than 50 pixels. This triggers visual
   changes like reduced padding and shadow effect.
*/

// Get the navbar element
const navbar = document.querySelector('.navbar');

// Add scroll event listener for navbar styling changes
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Add 'scrolled' class when page is scrolled down
        navbar.classList.add('scrolled');
    } else {
        // Remove 'scrolled' class when at the top
        navbar.classList.remove('scrolled');
    }
});


/* ===========================================
   TYPING EFFECT FOR HERO SECTION
   ===========================================
   Creates a typewriter effect that cycles through
   different job titles/roles in the hero section.
   Text is typed out character by character, then deleted
   before moving to the next text in the array.
*/

// Get the element where typed text will appear
const typedText = document.querySelector('.typed-text');

// Array of text strings to cycle through
const textArray = ['Web Developer', 'React Developer', 'Video Editor', 'Creative Designer'];

// Variables to track typing state
let textIndex = 0;      // Current text in the array
let charIndex = 0;      // Current character position
let isDeleting = false; // Whether text is being deleted
let typeSpeed = 100;    // Speed of typing in milliseconds

/**
 * Main typing effect function
 * Handles both typing and deleting characters
 * Uses recursion with setTimeout for continuous animation
 */
function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        // Deleting mode: remove characters one by one
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;  // Faster speed when deleting
    } else {
        // Typing mode: add characters one by one
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;  // Normal speed when typing
    }
    
    // Check if word is complete (fully typed)
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000;  // Pause at the end before deleting
    } else if (isDeleting && charIndex === 0) {
        // Word fully deleted, move to next word
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;  // Cycle through array
        typeSpeed = 500;  // Pause before typing next word
    }
    
    // Continue the animation loop
    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect
typeEffect();


/* ===========================================
   SCROLL TO TOP BUTTON
   ===========================================
   Shows/hides a button that allows users to quickly
   scroll back to the top of the page. The button appears
   after scrolling down 300 pixels.
*/

// Get the scroll to top button element
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        // Show button when scrolled down
        scrollToTopBtn.classList.add('visible');
    } else {
        // Hide button when near top
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Smooth scrolling animation
    });
});


/* ===========================================
   COUNTER ANIMATION FOR STATS
   ===========================================
   Animates number counters in the about section.
   Numbers count up from 0 to their target value
   when the stats section comes into view.
*/

// Get all counter elements
const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;  // Flag to prevent multiple animations

/**
 * Starts the counter animation for all stat numbers
 * Uses requestAnimationFrame for smooth animation
 */
function startCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));  // Get target number
        const duration = 2000;  // Animation duration in milliseconds
        const increment = target / (duration / 16);  // Calculate increment per frame (60fps)
        let current = 0;
        
        /**
         * Updates the counter value on each animation frame
         * Continues until target is reached
         */
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);  // Continue animation
            } else {
                counter.textContent = target + '+';  // Ensure final value is exact
            }
        };
        
        updateCounter();
    });
}

// Use Intersection Observer to trigger animation when section is visible
const statsSection = document.querySelector('.about-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;  // Mark as started
            startCounters();
        }
    });
}, { threshold: 0.5 });  // Trigger when 50% of section is visible

statsObserver.observe(statsSection);


/* ===========================================
   SKILL PROGRESS BAR ANIMATION
   ===========================================
   Animates the skill progress bars when they come
   into view. Each bar fills to its specified percentage.
*/

// Get all skill cards and progress bars
const skillCards = document.querySelectorAll('.skill-card');
const progressBars = document.querySelectorAll('.progress-bar');

// Create intersection observer for skill cards
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate the progress bar when card is visible
            const progressBar = entry.target.querySelector('.progress-bar');
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
        }
    });
}, { threshold: 0.5 });

// Observe each skill card
skillCards.forEach(card => {
    skillObserver.observe(card);
});


/* ===========================================
   PROJECT CATEGORY TABS
   ===========================================
   Handles the tab navigation for filtering projects
   by category (All, Video Editing, React, HTML/CSS).
   Shows/hides project categories based on selection.
*/

// Get all tab buttons and project categories
const tabBtns = document.querySelectorAll('.tab-btn');
const projectCategories = document.querySelectorAll('.project-category');

// Add click event to each tab button
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        
        // Remove 'active' class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Add 'active' class to clicked button
        btn.classList.add('active');
        
        // Get the category to show
        const category = btn.getAttribute('data-category');
        
        // Hide all categories first
        projectCategories.forEach(cat => {
            cat.classList.remove('active');
            if (category === 'all') {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
        
        // Show selected category or all categories
        if (category === 'all') {
            projectCategories.forEach(cat => cat.style.display = 'block');
        } else {
            const selectedCat = document.querySelector(`.project-category[data-category="${category}"]`);
            if (selectedCat) {
                selectedCat.style.display = 'block';
            }
        }
        
        // Refresh AOS animations for newly visible elements
        AOS.refresh();
    });
});

// Initialize by showing all project categories
projectCategories.forEach(cat => {
    cat.style.display = 'block';
});


/* ===========================================
   ROTATING CIRCLE ANIMATION ON SCROLL
   ===========================================
   Rotates the decorative circle element in the hero
   section based on scroll position. Creates a parallax
   rotation effect as the user scrolls.
*/

// Get all rotating circle elements
const rotatingElements = document.querySelectorAll('.rotating-circle');

// Add scroll-based rotation
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    rotatingElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only rotate when element is visible in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            const rotation = scrollY * 0.1;  // Rotation speed factor
            el.style.transform = `rotate(${rotation}deg)`;
        }
    });
});


/* ===========================================
   FLOATING SHAPES PARALLAX EFFECT
   ===========================================
   Creates a parallax scrolling effect for the floating
   background shapes. Each shape moves at a different
   speed for a layered depth effect.
*/

// Get all floating shape elements
const shapes = document.querySelectorAll('.shape');

// Apply parallax movement on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    shapes.forEach((shape, index) => {
        // Each shape has different speed based on its index
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});


/* ===========================================
   CONTACT FORM HANDLING
   ===========================================
   Handles form submission for the contact form.
   Validates input fields and shows a success message.
   Note: Currently uses alert for demo purposes.
*/

// Get the contact form element
const contactForm = document.getElementById('contactForm');

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission
    
    // Get form field values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate all fields are filled
    if (name && email && subject && message) {
        // Show success message (in production, this would send to a server)
        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
        contactForm.reset();  // Clear the form
    } else {
        // Show error if fields are missing
        alert('Please fill in all fields.');
    }
});


/* ===========================================
   SMOOTH SCROLLING FOR NAVIGATION LINKS
   ===========================================
   Enables smooth scrolling when clicking on
   anchor links (links starting with #).
   Provides a better user experience for navigation.
*/

// Get all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();  // Prevent default jump behavior
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',  // Smooth scroll animation
                block: 'start'       // Align to top of viewport
            });
        }
    });
});


/* ===========================================
   SCROLL REVEAL ANIMATION
   ===========================================
   Reveals elements with a fade-in animation when
   they come into the viewport during scrolling.
   Applied to project cards, skill cards, and contact items.
*/

// Get all elements to reveal
const revealElements = document.querySelectorAll('.project-card, .skill-card, .contact-item');

// Create intersection observer for reveal animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Make element visible with animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });  // Trigger when 10% of element is visible

// Set initial state and observe each element
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});


/* ===========================================
   ACTIVE NAVIGATION LINK HIGHLIGHTING
   ===========================================
   Highlights the current section in the navigation
   menu based on scroll position. Updates the active
   state of nav links as user scrolls through sections.
*/

// Get all sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Update active link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    // Find the current section in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if section is in view (with 200px offset)
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update navigation link active states
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


/* ===========================================
   MOUSE PARALLAX EFFECT FOR HERO SECTION
   ===========================================
   Creates a subtle parallax effect in the hero section
   that responds to mouse movement. The hero content
   moves slightly in the opposite direction of the mouse.
*/

// Get hero content element
const heroContent = document.querySelector('.hero-content');

// Apply parallax effect on mouse movement
document.addEventListener('mousemove', (e) => {
    // Calculate movement based on mouse position
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    
    // Apply transform if hero content exists
    if (heroContent) {
        heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});


/* ===========================================
   SCROLL ANIMATION FOR MULTIPLE ELEMENTS
   ===========================================
   Adds scroll-triggered animations to various elements
   including section headers, about content, skill cards,
   project cards, and contact items.
*/

// Get all elements to animate on scroll
const scrollAnimatedElements = document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .contact-item');

// Create intersection observer for scroll animations
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animated class when element is visible
            entry.target.classList.add('scroll-animated');
        }
    });
}, { 
    threshold: 0.15,           // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px'  // Adjust trigger point
});

// Add base animation class and observe each element
scrollAnimatedElements.forEach(el => {
    el.classList.add('scroll-animate');
    scrollAnimationObserver.observe(el);
});


/* ===========================================
   HERO SECTION PARALLAX & FADE ON SCROLL
   ===========================================
   Creates a parallax background effect for the hero
   section and fades out the hero content as the
   user scrolls down.
*/

// Get hero section element
const heroSection = document.querySelector('.hero');

// Apply parallax and fade effects on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Parallax effect for hero background
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
    
    // Fade out hero content as user scrolls
    if (heroContent) {
        const opacity = 1 - (scrolled / 700);  // Calculate opacity
        heroContent.style.opacity = Math.max(opacity, 0);  // Ensure opacity doesn't go negative
    }
});


/* ===========================================
   STATS COUNTER ANIMATION (ALTERNATIVE)
   ===========================================
   Alternative implementation for animating stat numbers
   with an easing function for smoother animation.
   Uses easeOutQuart for natural deceleration.
*/

// Get all stat number elements
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;  // Flag to prevent multiple animations

// Create intersection observer for stats section
const statsScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
}, { threshold: 0.5 });

/**
 * Animates stat numbers with easing effect
 * Uses easeOutQuart for smooth deceleration
 */
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;  // Animation duration in ms
        const startTime = performance.now();
        
        /**
         * Updates the stat number on each animation frame
         * Uses easing function for smooth animation
         */
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quart easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            stat.textContent = current + '+';
            
            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

// Observe the about stats section
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsScrollObserver.observe(aboutStats);
}


/* ===========================================
   DOM CONTENT LOADED EVENT
   ===========================================
   Ensures all code runs after the DOM is fully loaded.
   Logs a success message to confirm the website is ready.
*/
document.addEventListener('DOMContentLoaded', () => {
    // Log success message to console
    console.log('Portfolio website loaded successfully!');
});
