// Gestion des Réseaux Sociaux - JavaScript Interactif
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation des fonctionnalités
    initScrollAnimations();
    initServiceCards();
    initContactForms();
    initSecurityTest();
    initProgressiveLoading();
    
    console.log('Gestion des Réseaux Sociaux - Page initialisée');
});

// Animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animation spéciale pour les cartes de service
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
                
                // Animation spéciale pour les éléments d'urgence
                if (entry.target.classList.contains('emergency-item')) {
                    animateEmergencyItem(entry.target);
                }
                
                // Animation spéciale pour les options de contact
                if (entry.target.classList.contains('contact-option')) {
                    animateContactOption(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observer tous les éléments animables
    const animatedElements = document.querySelectorAll(
        '.service-card, .emergency-item, .contact-option, .section-header, .hero-content'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animation des cartes de service
function animateServiceCard(card) {
    const icon = card.querySelector('.service-icon');
    const title = card.querySelector('h3');
    const content = card.querySelector('p');
    const features = card.querySelectorAll('.service-features li');
    
    // Animation de l'icône
    setTimeout(() => {
        if (icon) {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1) rotateY(0deg)';
        }
    }, 200);
    
    // Animation du titre
    setTimeout(() => {
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 400);
    
    // Animation du contenu
    setTimeout(() => {
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }
    }, 600);
    
    // Animation des fonctionnalités
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, 800 + (index * 100));
    });
}

// Animation des éléments d'urgence
function animateEmergencyItem(item) {
    const icon = item.querySelector('.emergency-icon');
    const title = item.querySelector('h5');
    const text = item.querySelector('p');
    
    setTimeout(() => {
        if (icon) {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }
    }, 200);
    
    setTimeout(() => {
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 400);
    
    setTimeout(() => {
        if (text) {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }
    }, 600);
}

// Animation des options de contact
function animateContactOption(option) {
    const icon = option.querySelector('.option-icon');
    const title = option.querySelector('h3');
    const text = option.querySelector('p');
    const button = option.querySelector('.btn');
    
    setTimeout(() => {
        if (icon) {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }
    }, 200);
    
    setTimeout(() => {
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 400);
    
    setTimeout(() => {
        if (text) {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }
    }, 600);
    
    setTimeout(() => {
        if (button) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }
    }, 800);
}

// Gestion des cartes de service
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Effet hover personnalisé
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotateZ(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateZ(0deg)';
            }
        });
    });
}

// Gestion des formulaires de contact
function initContactForms() {
    // Boutons de contact dans le hero
    const contactButtons = document.querySelectorAll('button[onclick*="contact"], button[onclick*="scrollToContact"]');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackContactClick(this.textContent.trim());
        });
    });
}

// Test de sécurité
function initSecurityTest() {
    const startTestBtn = document.getElementById('start-test');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', startSecurityTest);
    }
}

// Démarrage du test de sécurité
function startSecurityTest() {
    const testContainer = document.getElementById('test-container');
    const startBtn = document.getElementById('start-test');
    
    if (testContainer && startBtn) {
        startBtn.style.display = 'none';
        
        // Créer le conteneur des questions
        const questionsDiv = document.createElement('div');
        questionsDiv.id = 'test-questions';
        testContainer.appendChild(questionsDiv);
        
        displaySecurityQuestion(0);
    }
}

// Questions du test de sécurité
const securityQuestions = [
    {
        question: "Avez-vous activé l'authentification à deux facteurs sur vos comptes principaux ?",
        options: ["Oui, sur tous mes comptes", "Sur quelques comptes seulement", "Qu'est-ce que c'est ?", "Non, jamais"],
        scores: [3, 2, 0, 0],
        explanation: "L'authentification à deux facteurs est essentielle pour sécuriser vos comptes."
    },
    {
        question: "Vérifiez-vous régulièrement vos paramètres de confidentialité ?",
        options: ["Oui, régulièrement", "De temps en temps", "Rarement", "Jamais"],
        scores: [3, 2, 1, 0],
        explanation: "Il est important de vérifier régulièrement vos paramètres de confidentialité."
    },
    {
        question: "Partagez-vous des informations personnelles (adresse, numéro de téléphone) publiquement ?",
        options: ["Jamais", "Rarement", "Parfois", "Souvent"],
        scores: [3, 2, 1, 0],
        explanation: "Évitez de partager des informations personnelles sensibles publiquement."
    },
    {
        question: "Acceptez-vous toutes les demandes d'amis/followers ?",
        options: ["Non, je vérifie toujours", "Parfois", "Souvent", "Oui, toujours"],
        scores: [3, 2, 1, 0],
        explanation: "Il est important de vérifier l'identité des personnes avant de les accepter."
    },
    {
        question: "Utilisez-vous le même mot de passe pour plusieurs réseaux sociaux ?",
        options: ["Non, tous différents", "Quelques-uns identiques", "Souvent les mêmes", "Toujours le même"],
        scores: [3, 2, 1, 0],
        explanation: "Chaque compte doit avoir un mot de passe unique et fort."
    }
];

let currentSecurityQuestionIndex = 0;
let userSecurityAnswers = [];

// Affichage d'une question du test de sécurité
function displaySecurityQuestion(index) {
    const questionsContainer = document.getElementById('test-questions');
    const question = securityQuestions[index];
    
    if (!question) {
        showSecurityResults();
        return;
    }
    
    questionsContainer.innerHTML = `
        <div class="test-question">
            <h3>Question ${index + 1}/${securityQuestions.length}</h3>
            <p>${question.question}</p>
            <div class="test-options">
                ${question.options.map((option, i) => `
                    <div class="test-option" data-answer="${i}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <button id="next-security-question" class="btn btn-primary" style="display: none; margin-top: 20px;">
                Question suivante
            </button>
        </div>
    `;
    
    // Gestion des réponses
    const options = questionsContainer.querySelectorAll('.test-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la sélection précédente
            options.forEach(opt => opt.classList.remove('selected'));
            // Sélectionner la nouvelle option
            this.classList.add('selected');
            
            // Enregistrer la réponse
            const answerIndex = parseInt(this.getAttribute('data-answer'));
            userSecurityAnswers[index] = answerIndex;
            
            // Afficher le bouton suivant
            document.getElementById('next-security-question').style.display = 'block';
        });
    });
    
    // Bouton question suivante
    const nextBtn = document.getElementById('next-security-question');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSecurityQuestionIndex++;
            displaySecurityQuestion(currentSecurityQuestionIndex);
        });
    }
}

// Affichage des résultats du test de sécurité
function showSecurityResults() {
    const questionsContainer = document.getElementById('test-questions');
    let totalScore = 0;
    
    userSecurityAnswers.forEach((answer, index) => {
        totalScore += securityQuestions[index].scores[answer];
    });
    
    const maxScore = securityQuestions.length * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let resultMessage = '';
    let resultClass = '';
    let recommendations = '';
    
    if (percentage >= 80) {
        resultMessage = "Excellent ! Vous avez une très bonne sécurité sur les réseaux sociaux.";
        resultClass = "excellent";
        recommendations = "Continuez ainsi et restez vigilant aux nouvelles menaces.";
    } else if (percentage >= 60) {
        resultMessage = "Bien ! Votre sécurité est correcte mais peut être améliorée.";
        resultClass = "good";
        recommendations = "Nous pouvons vous aider à optimiser votre protection.";
    } else if (percentage >= 40) {
        resultMessage = "Attention ! Votre sécurité présente des failles importantes.";
        resultClass = "warning";
        recommendations = "Il est urgent d'améliorer votre protection. Contactez-nous.";
    } else {
        resultMessage = "Danger ! Votre sécurité est très insuffisante.";
        resultClass = "danger";
        recommendations = "Votre sécurité est en danger. Une intervention rapide est nécessaire.";
    }
    
    questionsContainer.innerHTML = `
        <div class="test-result ${resultClass}">
            <h4>🔒 Résultats de votre Test de Sécurité</h4>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-percentage">${percentage}%</span>
                </div>
            </div>
            <p><strong>Score : ${totalScore}/${maxScore} points (${percentage}%)</strong></p>
            <p class="result-message">${resultMessage}</p>
            <p class="recommendations">${recommendations}</p>
            <div class="result-actions">
                <button class="btn btn-primary" onclick="restartSecurityTest()">
                    <i class="fas fa-redo"></i>
                    Refaire le test
                </button>
                <button class="btn btn-warning" onclick="contactForSecurityHelp()">
                    <i class="fas fa-phone"></i>
                    Demander de l'aide
                </button>
            </div>
        </div>
    `;
}

// Redémarrer le test de sécurité
function restartSecurityTest() {
    currentSecurityQuestionIndex = 0;
    userSecurityAnswers = [];
    displaySecurityQuestion(0);
}

// Navigation fluide
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fonctions de contact spécialisées
function contactForKidsHelp() {
    const message = "Bonjour, j'ai besoin d'aide pour sécuriser les comptes de réseaux sociaux de mes enfants.";
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    trackContactClick('Aide enfants réseaux sociaux');
}

function contactForSecurityAudit() {
    const message = "Bonjour, j'aimerais faire un audit de sécurité de mes comptes de réseaux sociaux.";
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    trackContactClick('Audit de sécurité');
}

function contactForEvaluation() {
    const message = "Bonjour, je souhaite une évaluation de la sécurité de mes réseaux sociaux.";
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    trackContactClick('Évaluation sécurité');
}

function contactForSecurityHelp() {
    const message = "Bonjour, j'ai fait votre test de sécurité et j'ai besoin d'aide pour améliorer ma protection sur les réseaux sociaux.";
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    trackContactClick('Aide après test sécurité');
}

function downloadAnyDesk() {
    const message = "Bonjour, je souhaite utiliser AnyDesk pour une intervention à distance sur mes réseaux sociaux.";
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    trackContactClick('Demande AnyDesk');
}

// Suivi des interactions
function trackContactClick(source) {
    console.log('Contact clicked from:', source);
    
    // Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_click', {
            'event_category': 'Gestion Réseaux Sociaux',
            'event_label': source
        });
    }
    
    // Afficher un message de confirmation
    showContactConfirmation();
}

// Confirmation de contact
function showContactConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'contact-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <p>Redirection vers WhatsApp...</p>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.remove();
    }, 3000);
}

// Chargement progressif des images
function initProgressiveLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loading');
                
                const newImg = new Image();
                newImg.onload = function() {
                    img.src = this.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                newImg.onerror = function() {
                    img.classList.remove('loading');
                    img.classList.add('error');
                    // Image de fallback
                    img.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop';
                };
                
                if (img.dataset.src) {
                    newImg.src = img.dataset.src;
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Gestion du menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        header.insertBefore(mobileMenuToggle, nav);
        
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
}

// Initialisation du menu mobile au chargement et redimensionnement
window.addEventListener('load', initMobileMenu);
window.addEventListener('resize', initMobileMenu);

// Export des fonctions pour utilisation externe
window.GestionReseauxSociaux = {
    scrollToContact,
    startSecurityTest,
    restartSecurityTest,
    contactForKidsHelp,
    contactForSecurityAudit,
    contactForEvaluation,
    contactForSecurityHelp,
    downloadAnyDesk,
    trackContactClick
};

// CSS pour les nouvelles fonctionnalités (injecté dynamiquement)
const additionalCSS = `
.contact-confirmation {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success-color);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
}

.confirmation-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.confirmation-content i {
    font-size: 18px;
}

.score-display {
    margin: 20px 0;
}

.score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(var(--success-color) 0deg, var(--success-color) calc(var(--percentage) * 3.6deg), #e5e7eb calc(var(--percentage) * 3.6deg));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
}

.score-circle::before {
    content: '';
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    position: absolute;
}

.score-percentage {
    font-size: 20px;
    font-weight: 700;
    color: var(--dark-color);
    z-index: 1;
}

.result-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 25px;
    flex-wrap: wrap;
}

.test-result.excellent {
    border-color: var(--success-color);
    background: rgba(16, 185, 129, 0.1);
}

.test-result.good {
    border-color: var(--primary-color);
    background: rgba(59, 130, 246, 0.1);
}

.test-result.warning {
    border-color: var(--warning-color);
    background: rgba(245, 158, 11, 0.1);
}

.test-result.danger {
    border-color: var(--danger-color);
    background: rgba(239, 68, 68, 0.1);
}

.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    color: var(--primary-color);
    cursor: pointer;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
    }
    
    .nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        flex-direction: column;
        padding: 20px;
    }
    
    .nav.show {
        display: flex;
    }
    
    .result-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .result-actions .btn {
        width: 100%;
        max-width: 250px;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Injection du CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
