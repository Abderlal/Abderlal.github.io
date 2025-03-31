// Mise à jour du fichier HTML pour refléter les modifications du CV
// Notamment le changement de "veille technologique dans le domaine de l'efficacité énergétique"
// par "veille technologique dans le domaine de l'automatisation informatique et robotique"

document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour le texte dans la section des centres d'intérêt
    const interetsElements = document.querySelectorAll('.section-contact li');
    if (interetsElements && interetsElements.length > 0) {
        for (let i = 0; i < interetsElements.length; i++) {
            const text = interetsElements[i].textContent;
            if (text.includes("efficacité énergétique")) {
                interetsElements[i].textContent = text.replace(
                    "efficacité énergétique", 
                    "automatisation informatique et robotique"
                );
                break;
            }
        }
    }
    
    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Observer pour déclencher l'animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('style').split(':')[1].trim();
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Navigation active au scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Afficher un message de confirmation
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Votre message a été envoyé avec succès!';
                
                contactForm.appendChild(formMessage);
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Supprimer le message après quelques secondes
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Animation d'apparition au scroll
    const fadeElements = document.querySelectorAll('.timeline-item, .formation-item, .competences-group');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });
    
    // Effet de parallaxe pour les éléments de fond
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Effet de parallaxe pour les cercles de fond
        const techCircles = document.querySelectorAll('.tech-circle');
        techCircles.forEach((circle, index) => {
            const speed = index === 0 ? 0.05 : 0.03;
            circle.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
});

// Ajouter des styles CSS dynamiques
const style = document.createElement('style');
style.textContent = `
    .fade-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    nav a.active {
        color: var(--color-secondary);
    }
    
    nav a.active::after {
        width: 100%;
    }
    
    .form-message {
        padding: 10px;
        margin-top: 15px;
        border-radius: 4px;
        text-align: center;
    }
    
    .form-message.success {
        background-color: rgba(0, 179, 230, 0.1);
        color: var(--color-secondary);
    }
`;

document.head.appendChild(style);
