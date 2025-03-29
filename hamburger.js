document.addEventListener('DOMContentLoaded', function() {
    // Create the hamburger menu icon
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.classList.add('hamburger-menu');
    hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';
    
    // Create the sidebar
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    sidebar.innerHTML = '<div class="close-btn">&times;</div>';
    
    // Get the navigation elements
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelector('.navbar-nav').cloneNode(true);
    
    // Add the navigation items to the sidebar
    sidebar.appendChild(navItems);
    
    // Add elements to the document
    document.body.appendChild(hamburgerMenu);
    document.body.appendChild(sidebar);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);
    
    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }
    
    // Event listeners
    hamburgerMenu.addEventListener('click', toggleSidebar);
    
    document.querySelector('.sidebar .close-btn').addEventListener('click', toggleSidebar);
    
    overlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking a link (for mobile)
    const sidebarLinks = sidebar.querySelectorAll('.nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        }, 250);
    });
    
    // Show/hide hamburger based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 992) {
            hamburgerMenu.style.display = 'flex';
            navbar.classList.add('mobile-hidden');
        } else {
            hamburgerMenu.style.display = 'none';
            navbar.classList.remove('mobile-hidden');
            
            // Reset sidebar state
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        }
    }
    
    // Initial check
    checkScreenSize();
    
    // Check on resize
    window.addEventListener('resize', checkScreenSize);
});
