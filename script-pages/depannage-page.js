// Navigation et interactions
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes de service
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Gestion des dropdowns
function toggleDropdown(id) {
    const content = document.getElementById(id + '-content');
    const button = event.target.closest('.dropdown-btn');
    
    if (content && button) {
        if (content.classList.contains('active')) {
            content.classList.remove('active');
            button.classList.remove('active');
        } else {
            // Fermer tous les autres dropdowns
            document.querySelectorAll('.dropdown-content').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ouvrir le dropdown sélectionné
            content.classList.add('active');
            button.classList.add('active');
        }
    }
}

// Gestion des onglets d'avantages
function showTab(tabName) {
    // Cacher tous les contenus d'onglets
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Désactiver tous les boutons d'onglets
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Afficher le contenu sélectionné
    const targetContent = document.getElementById(tabName + '-content');
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Activer le bouton sélectionné
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Gestion de la FAQ
function toggleFAQItem(question) {
    const answer = question.nextElementSibling;
    const isActive = question.classList.contains('active');
    
    // Fermer toutes les autres réponses
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
    });
    
    // Toggle la réponse actuelle
    if (!isActive) {
        question.classList.add('active');
        answer.classList.add('active');
    }
}

// Fonction pour scroll vers la FAQ
function scrollToFAQ() {
    const faqSection = document.getElementById('faq');
    if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
        
        // Ouvrir la première question par défaut après un délai
        setTimeout(() => {
            const firstQuestion = document.querySelector('.faq-question');
            if (firstQuestion && !firstQuestion.classList.contains('active')) {
                toggleFAQItem(firstQuestion);
            }
        }, 500);
    }
}

// Modal de réservation
function openReservationModal() {
    // Simuler l'ouverture d'un modal ou redirection
    const userChoice = confirm('Voulez-vous être redirigé vers notre formulaire de réservation ?');
    if (userChoice) {
        // Ici vous pouvez rediriger vers votre page de réservation
        window.location.href = '#reservation';
        // Ou ouvrir votre modal de réservation existant
        console.log('Ouverture du modal de réservation...');
    }
}

// Gestion du scroll header (effet de transparence)
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Animation des éléments au scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .faq-item, .advantage-tabs');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Gestion des formulaires de contact (si ajoutés plus tard)
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Traitement des données du formulaire
    console.log('Données du formulaire:', Object.fromEntries(formData));
    
    // Afficher un message de succès
    showToast('Merci pour votre message ! Nous vous recontacterons rapidement.', 'success');
    event.target.reset();
}

// Système de notifications toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Lazy loading pour les images (si nécessaire)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Gestion du mode sombre (optionnel)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    showToast('Mode sombre ' + (document.body.classList.contains('dark-mode') ? 'activé' : 'désactivé'), 'info');
}

// Charger les préférences sauvegardées
function loadUserPreferences() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Fonction d'initialisation principale
function initPage() {
    loadUserPreferences();
    initScrollAnimations();
    initLazyLoading();
    
    // Ajouter des gestionnaires d'événements supplémentaires
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showToast('Fonction de recherche à implémenter', 'info');
        });
    }
    
    const cartBtn = document.querySelector('.btn-cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showToast('Panier vide', 'info');
        });
    }
    
    console.log('Page de dépannage initialisée avec succès');
}

// Initialiser la page quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initPage);

// Gestion des erreurs JavaScript
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
});