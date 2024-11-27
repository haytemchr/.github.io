// Fonction pour gérer les animations au défilement
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.info-card, .project-card, .skill-category, .experience-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Fonction pour ajouter des animations au chargement de la page
function addLoadAnimations() {
    const header = document.querySelector('.header-content');
    if (header) {
        header.style.opacity = '0';
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.animation = 'fadeInUp 1s ease forwards';
        }, 300);
    }
}

// Initialisation des animations
document.addEventListener('DOMContentLoaded', () => {
    addLoadAnimations();
    handleScrollAnimations();

    // Animation des sections au défilement
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation spéciale pour les cartes
                if (entry.target.classList.contains('experience-card') || 
                    entry.target.classList.contains('project-card')) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
                }
                
                // Si la section contient des cartes d'expérience, les animer
                if (entry.target.classList.contains('section')) {
                    const cards = entry.target.querySelectorAll('.experience-card, .skill-category');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 200); // Ajoute un délai pour chaque carte
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Observer les cartes individuellement
    document.querySelectorAll('.experience-card, .skill-category').forEach(card => {
        sectionObserver.observe(card);
    });

    // Smooth Scrolling pour la navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Sticky Navbar avec effet de fondu
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Animation des cartes d'expérience
    document.querySelectorAll('.experience-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        card.dataset.delay = `${index * 200}ms`;
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Animation des compétences
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'all 0.5s ease';
        category.dataset.delay = `${index * 200}ms`;
    });

    // Animation des items de compétences
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Animation du header
    const headerContent = document.querySelector('.header-content'); 
    if (headerContent) {
        setTimeout(() => {
            headerContent.style.opacity = '1';
            headerContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Animation de la photo de profil
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.05)';
        });
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1)';
        });
    }
});
