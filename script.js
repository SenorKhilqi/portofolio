document.addEventListener('DOMContentLoaded', function() {
    // Since Bootstrap's data-toggle automatically handles the toggle functionality,
    // we'll focus on adding smooth scrolling and enhancing the mobile experience
    
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section id from the href
            const targetId = this.getAttribute('href');
            
            // Only proceed if it's an anchor link
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                // Get the target element
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Scroll to the element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close the mobile menu after clicking (Bootstrap 4 specific)
                    const navbarCollapse = document.querySelector('#navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        // Use Bootstrap's jQuery method to close the menu
                        // This ensures proper behavior with Bootstrap's implementation
                        $(navbarCollapse).collapse('hide');
                    }
                }
            }
        });
    });
    
    // Highlight active section in the menu as user scrolls
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section, header[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
