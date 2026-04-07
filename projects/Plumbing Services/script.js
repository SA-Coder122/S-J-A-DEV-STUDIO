// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect (For Home Page Transparent to Solid)
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        // If we scroll down more than 50px, add the 'scrolled' class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggles the slide-in menu on mobile devices
            navLinks.classList.toggle('nav-active');
            
            // Swap icon between hamburger and 'X'
            const icon = menuToggle.querySelector('i');
            if(navLinks.classList.contains('nav-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. FAQ Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items first (for a clean single-open accordion feel)
            accordionItems.forEach(acc => acc.classList.remove('active'));
            
            // If it wasn't active, open it now
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});