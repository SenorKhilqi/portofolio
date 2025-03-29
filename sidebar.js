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
});
