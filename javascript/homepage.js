
document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    var fadeElems = document.querySelectorAll('.fade-in-up');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(function(elem) {
        observer.observe(elem);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Handle nested dropdowns
    document.querySelectorAll('.dropdown-submenu > a').forEach(function(element) {
        element.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                e.stopPropagation();
                if (this.nextElementSibling.style.display === 'block') {
                    this.nextElementSibling.style.display = 'none';
                } else {
                    this.nextElementSibling.style.display = 'block';
                }
            }
        });
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        var navbar = document.querySelector('.navbar');
        var navbarCollapse = document.querySelector('.navbar-collapse');
        var dropdowns = document.querySelectorAll('.dropdown, .dropdown-submenu');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
            } else {
                navbar.style.padding = '20px 0';
            }
        });

        // Handle mobile menu toggles
        if (window.innerWidth <= 991) {
            dropdowns.forEach(function(dropdown) {
                dropdown.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.parentNode.classList.toggle('show');
                    var submenu = this.nextElementSibling;
                    if (submenu) {
                        submenu.classList.toggle('show');
                    }
                });
            });
        }

        // Handle side menu for mobile
        document.querySelector('.navbar-toggler').addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Close side menu when clicking outside
        document.addEventListener('click', function(event) {
            var isClickInside = navbar.contains(event.target);
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                // Close all open dropdowns and submenus
                document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown.show, .dropdown-submenu.show').forEach(function(dropdown) {
                    dropdown.classList.remove('show');
                });
            }
        });
    });