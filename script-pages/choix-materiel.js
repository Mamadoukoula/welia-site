// Navigation et interactions pour la page choix de matériel
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
    
    // Observer les cartes
    document.querySelectorAll('.process-card, .solution-card, .example-card, .faq-item').forEach(card => {
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

// Fonctions de navigation
function scrollToConseil() {
    const conseilSection = document.getElementById('conseil');
    if (conseilSection) {
        conseilSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToExemples() {
    const exemplesSection = document.getElementById('exemples');
    if (exemplesSection) {
        exemplesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal de réservation
function openReservationModal() {
    const userChoice = confirm('Voulez-vous être redirigé vers notre formulaire de réservation ?');
    if (userChoice) {
        // Simuler l'ouverture d'un modal ou redirection
        showToast('Redirection vers la page de réservation...', 'info');
        window.location.href = 'reservation.html';
    }
}

// Modal newsletter
function openNewsletterModal() {
    const email = prompt('Entrez votre adresse email pour recevoir notre config du moment :');
    if (email && validateEmail(email)) {
        showToast('Merci ! Vous recevrez bientôt notre dernière recommandation.', 'success');
        console.log('Email ajouté à la newsletter:', email);
    } else if (email) {
        showToast('Adresse email invalide. Veuillez réessayer.', 'error');
    }
}

// Validation email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Afficher les détails des exemples
function showExampleDetails(type) {
    const details = {
        'souris': {
            title: 'Souris Ergonomique',
            description: 'Une souris ergonomique adaptée pour un usage prolongé, réduisant les tensions au poignet et améliorant le confort de travail.',
            benefits: ['Réduction des douleurs', 'Meilleure précision', 'Design ergonomique', 'Longue durée de vie'],
            price: 'À partir de 25€'
        },
        'clavier': {
            title: 'Clavier Qualité/Prix',
            description: 'Un clavier offrant le meilleur rapport qualité-prix pour un usage professionnel ou personnel intensif.',
            benefits: ['Frappe silencieuse', 'Résistant à l\'usure', 'Touches programmables', 'Rétroéclairage LED'],
            price: 'À partir de 45€'
        },
        'wifi': {
            title: 'Répéteur WiFi',
            description: 'Un répéteur WiFi pour étendre la portée de votre réseau sans fil dans toute votre maison ou bureau.',
            benefits: ['Double bande AC1200', 'Installation facile', 'Compatible tous FAI', 'Portée jusqu\'à 90m²'],
            price: 'À partir de 35€'
        }
    };
    
    const detail = details[type];
    if (detail) {
        let benefitsList = detail.benefits.map(benefit => `<li><i class="fas fa-check"></i> ${benefit}</li>`).join('');
        
        const message = `
            <div style="text-align: left;">
                <h3>${detail.title}</h3>
                <p>${detail.description}</p>
                <h4>Avantages :</h4>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    ${benefitsList}
                </ul>
                <p><strong>Prix : ${detail.price}</strong></p>
            </div>
        `;
        
        // Simuler l'affichage des détails (remplacer par un vrai modal)
        const detailWindow = window.open('', '_blank', 'width=500,height=400');
        detailWindow.document.write(`
            <html>
                <head>
                    <title>${detail.title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                        h3 { color: #2563eb; margin-bottom: 15px; }
                        ul { list-style: none; padding: 0; }
                        li { margin: 8px 0; }
                        i { color: #10b981; margin-right: 8px; }
                    </style>
                </head>
                <body>${message}</body>
            </html>
        `);
    }
}

// Gestion du scroll header
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

// Système de notifications toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
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
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: 'Segoe UI', sans-serif;
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
    }, 4000);
}

// Gestion des formulaires de contact
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Traitement des données du formulaire
    console.log('Données du formulaire:', Object.fromEntries(formData));
    
    showToast('Merci pour votre message ! Nous vous recontacterons rapidement.', 'success');
    event.target.reset();
}

// Lazy loading pour les images
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

// Fonction d'initialisation
function initPage() {
    initLazyLoading();
    
    // Ajouter des gestionnaires d'événements
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
    
    console.log('Page choix de matériel initialisée avec succès');
}

// Initialiser la page
document.addEventListener('DOMContentLoaded', initPage);

// Gestion des erreurs JavaScript
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
});

// Animation des compteurs (si nécessaire)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Fonction pour la recherche (à développer)
function handleSearch(query) {
    console.log('Recherche:', query);
    showToast(`Recherche pour: ${query}`, 'info');
}

// Fonction pour ajouter au panier (à développer)
function addToCart(itemId) {
    console.log('Ajouter au panier:', itemId);
    showToast('Article ajouté au panier', 'success');
    
    // Mettre à jour le compteur du panier
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent) + 1;
        cartCount.textContent = count;
    }
}