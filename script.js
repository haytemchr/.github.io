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
    // Débogage détaillé de l'animation d'intro
    console.log('Document chargé');

    // Vérifier tous les éléments de l'animation
    const body = document.body;
    const introAnimation = document.querySelector('.intro-animation');
    const typewriterText = document.querySelector('.typewriter-text');

    console.log('Body:', body);
    console.log('Intro Animation Element:', introAnimation);
    console.log('Typewriter Text Element:', typewriterText);

    // Vérifier les styles initiaux
    if (introAnimation) {
        console.log('Styles initiaux de introAnimation:', {
            display: introAnimation.style.display,
            opacity: introAnimation.style.opacity,
            visibility: window.getComputedStyle(introAnimation).visibility
        });
    }

    if (typewriterText) {
        console.log('Styles initiaux de typewriterText:', {
            display: typewriterText.style.display,
            opacity: typewriterText.style.opacity,
            width: typewriterText.style.width,
            visibility: window.getComputedStyle(typewriterText).visibility
        });
    }

    // Forcer l'affichage et l'opacité
    if (introAnimation && typewriterText) {
        introAnimation.style.display = 'flex';
        introAnimation.style.opacity = '1';
        typewriterText.style.display = 'block';
        typewriterText.style.opacity = '1';
        typewriterText.style.width = '100%';

        console.log('Styles après modification:', {
            introAnimationDisplay: introAnimation.style.display,
            introAnimationOpacity: introAnimation.style.opacity,
            typewriterTextDisplay: typewriterText.style.display,
            typewriterTextOpacity: typewriterText.style.opacity,
            typewriterTextWidth: typewriterText.style.width
        });

        // Attendre que l'animation d'écriture soit terminée
        setTimeout(() => {
            console.log('Début de la transition de sortie');
            
            // Faire disparaître l'intro
            introAnimation.style.opacity = '0';
            
            // Afficher le contenu principal
            body.style.opacity = '1';
            
            // Nettoyer l'intro après la transition
            setTimeout(() => {
                introAnimation.style.display = 'none';
                console.log('Intro animation masquée');
            }, 800);
        }, 4500);
    } else {
        console.error('Éléments de l\'animation introuvables !');
        console.error('introAnimation:', introAnimation);
        console.error('typewriterText:', typewriterText);
    }

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
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
});
