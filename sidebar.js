document.addEventListener('DOMContentLoaded', function() {
    // Create the hamburger menu button (will be visible only on mobile)
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.classList.add('hamburger-menu');
    hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(hamburgerMenu);
    
    // Create the sidebar for mobile navigation
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    
    // Add close button to sidebar
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    sidebar.appendChild(closeBtn);
    
    // Clone navigation items from the existing navbar
    const navItems = document.querySelector('.navbar-nav').cloneNode(true);
    sidebar.appendChild(navItems);
    
    // Create overlay for closing the sidebar when clicking outside
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    
    // Add elements to the document
    document.body.appendChild(sidebar);
    document.body.appendChild(overlay);
    
    // Function to toggle sidebar visibility
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }
    
    // Add event listeners
    hamburgerMenu.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking a link
    const sidebarLinks = sidebar.querySelectorAll('.nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle smooth scrolling for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    toggleSidebar(); // Close the sidebar
                    
                    // Scroll to the element
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle window resize
    function handleResize() {
        // Show hamburger on small screens, hide on larger screens
        if (window.innerWidth <= 991) {
            hamburgerMenu.style.display = 'flex';
        } else {
            hamburgerMenu.style.display = 'none';
            
            // Reset sidebar state on larger screens
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        }
    }
    
    // Initial check and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#343a40';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = 1 - (scrolled / 600);
        }
    });

    // Counter animation for skills (if you add counters)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observe sections for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add smooth reveal animation to sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
