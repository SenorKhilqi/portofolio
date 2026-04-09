// Custom cursor logic
document.addEventListener('mousemove', (e) => {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Typewriter Effect for Terminal
const typewriterElement = document.getElementById('typewriter');

const terminalText = [
    "Initializing connection...",
    "[OK] Connection established secure channel.",
    "Loading payload modules...",
    "> Module 1: Reconnaissance [Loaded]",
    "> Module 2: Exploitation  [Loaded]",
    "> Module 3: Privilege Esc [Loaded]",
    "\nExecuting target profiling...",
    "User: ZeroDay",
    "Role: Cyber Security Researcher",
    "Status: Ready for deployment."
];

let i = 0;
let lineIndex = 0;
let isTyping = false;
let currentLine = "";

function typeWriter() {
    if (lineIndex < terminalText.length) {
        if (!isTyping) {
            isTyping = true;
            currentLine = terminalText[lineIndex];
            i = 0;
        }

        if (i < currentLine.length) {
            // Append line breaks if it's the start of a new line (excluding first line)
            if (i === 0 && lineIndex > 0) {
                typewriterElement.innerHTML += "<br/>";
            }

            // Handle special formatting like brackets
            let char = currentLine.charAt(i);
            if (char === '\n') {
                typewriterElement.innerHTML += "<br/>";
            } else {
                typewriterElement.innerHTML += char;
            }
            i++;
            setTimeout(typeWriter, Math.random() * 30 + 20); // Random typing speed
        } else {
            isTyping = false;
            lineIndex++;
            setTimeout(typeWriter, 400); // Wait before next line
        }
    } else {
        // Add a blinking cursor at the end
        typewriterElement.innerHTML += '<span class="blink">_</span>';
    }
}

// Scroll Reveal & Progress Bar Animation
const revealElements = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // If it's the skills section, animate progress bars
            if (entry.target.classList.contains('skill-card')) {
                const bar = entry.target.querySelector('.progress');
                if (bar) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }
            }

            // Optional: unobserve if you want it to happen only once
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Initialize things on load
window.addEventListener('load', () => {
    // Start typing effect a bit after load
    setTimeout(typeWriter, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp Contact Form
const contactForm = document.getElementById('wa-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('wa-name').value;
        const email = document.getElementById('wa-email').value;
        const message = document.getElementById('wa-message').value;

        // Target WhatsApp number defined by user
        const phoneNumber = "6285861816521";

        // Format the message template
        const textMessage = `Halo Khilqi! 👋\n\nSaya *${name}* ingin menghubungi Anda.\n\n📧 *Email*   : ${email}\n\n💬 *Pesan*   :\n${message}\n\n_Terima kasih sudah meluangkan waktu untuk membaca pesan ini. Semoga kita bisa berkolaborasi!_ 🙏`;

        const encodedText = encodeURIComponent(textMessage);
        const waURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        // Open WhatsApp Web/App
        window.open(waURL, '_blank');
    });
}

// Project Filter Tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                // Re-trigger reveal animation
                card.classList.remove('active');
                setTimeout(() => card.classList.add('active'), 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

