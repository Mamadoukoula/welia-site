// Protection des Données - JavaScript Amélioré
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation des fonctionnalités
    initScrollAnimations();
    initServiceCards();
    initPrivacyCards();
    initConseilCards();
    initContactForm();
    initProgressiveLoading();
    initFAQ();
    initQuiz();
    
    console.log('Protection des Données - Page initialisée avec nouvelles fonctionnalités');
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
                
                // Animation spéciale pour les cartes de confidentialité
                if (entry.target.classList.contains('privacy-card')) {
                    animatePrivacyCard(entry.target);
                }
                
                // Animation spéciale pour les conseils
                if (entry.target.classList.contains('conseil-card')) {
                    animateConseilCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observer tous les éléments animables
    const animatedElements = document.querySelectorAll(
        '.service-card, .privacy-card, .conseil-card, .section-header, .hero-content'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animation des cartes de confidentialité
function animatePrivacyCard(card) {
    const icon = card.querySelector('.privacy-icon');
    const title = card.querySelector('h3');
    const content = card.querySelector('p');
    const features = card.querySelectorAll('.privacy-features li');
    
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

// Animation des cartes de service
function animateServiceCard(card) {
    const image = card.querySelector('.service-image img');
    const content = card.querySelector('.service-content');
    const features = card.querySelectorAll('.feature-item');
    
    // Animation de l'image
    setTimeout(() => {
        if (image) {
            image.style.opacity = '1';
            image.style.transform = 'scale(1)';
        }
    }, 200);
    
    // Animation du contenu
    setTimeout(() => {
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }
    }, 400);
    
    // Animation des fonctionnalités
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, 600 + (index * 100));
    });
}

// Animation des cartes conseil
function animateConseilCard(card) {
    const icon = card.querySelector('.conseil-icon');
    const title = card.querySelector('h3');
    const text = card.querySelector('p');
    
    setTimeout(() => {
        if (icon) {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1) rotateY(0deg)';
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

// Gestion des cartes de confidentialité
function initPrivacyCards() {
    const privacyCards = document.querySelectorAll('.privacy-card');
    
    privacyCards.forEach(card => {
        const button = card.querySelector('.privacy-btn');
        if (button) {
            button.addEventListener('click', function() {
                const privacyType = this.getAttribute('data-privacy');
                showPrivacyInfo(privacyType);
            });
        }
    });
}

// Affichage des informations de confidentialité
function showPrivacyInfo(privacyType) {
    const privacyDetails = getPrivacyDetails(privacyType);
    createPrivacyModal(privacyDetails);
}

// Détails de confidentialité
function getPrivacyDetails(privacyType) {
    const details = {
        'rgpd': {
            title: 'Vos Droits RGPD',
            content: `
                <h4>Exercer vos droits :</h4>
                <ul>
                    <li><strong>Droit d'accès :</strong> Demander quelles données sont collectées</li>
                    <li><strong>Droit de rectification :</strong> Corriger les informations inexactes</li>
                    <li><strong>Droit à l'effacement :</strong> Supprimer vos données</li>
                    <li><strong>Droit de portabilité :</strong> Récupérer vos données</li>
                    <li><strong>Droit d'opposition :</strong> Refuser certains traitements</li>
                </ul>
                <p><strong>Comment procéder :</strong> Contactez le délégué à la protection des données (DPO) de l'entreprise ou le service client en précisant votre demande.</p>
            `
        },
        'reseaux': {
            title: 'Paramétrer vos Réseaux Sociaux',
            content: `
                <h4>Facebook/Meta :</h4>
                <ul>
                    <li>Paramètres > Confidentialité > Qui peut voir vos publications</li>
                    <li>Désactiver la reconnaissance faciale</li>
                    <li>Limiter les données partagées avec les applications</li>
                </ul>
                <h4>Instagram :</h4>
                <ul>
                    <li>Passer en compte privé</li>
                    <li>Désactiver la géolocalisation</li>
                    <li>Contrôler les stories et highlights</li>
                </ul>
                <h4>LinkedIn :</h4>
                <ul>
                    <li>Paramètres > Visibilité du profil</li>
                    <li>Gérer les données publicitaires</li>
                    <li>Contrôler les notifications</li>
                </ul>
            `
        },
        'navigation': {
            title: 'Navigation Privée',
            content: `
                <h4>Navigateurs recommandés :</h4>
                <ul>
                    <li><strong>Firefox :</strong> Protection renforcée contre le pistage</li>
                    <li><strong>Brave :</strong> Bloque les pubs et trackers par défaut</li>
                    <li><strong>DuckDuckGo :</strong> Ne collecte aucune donnée</li>
                </ul>
                <h4>Extensions utiles :</h4>
                <ul>
                    <li>uBlock Origin - Bloqueur de publicités</li>
                    <li>Privacy Badger - Anti-tracking</li>
                    <li>HTTPS Everywhere - Connexions sécurisées</li>
                </ul>
                <h4>VPN recommandés :</h4>
                <ul>
                    <li>NordVPN, ExpressVPN, Surfshark</li>
                    <li>ProtonVPN (version gratuite disponible)</li>
                </ul>
            `
        },
        'cookies': {
            title: 'Gestion des Cookies',
            content: `
                <h4>Types de cookies :</h4>
                <ul>
                    <li><strong>Essentiels :</strong> Nécessaires au fonctionnement</li>
                    <li><strong>Fonctionnels :</strong> Améliorent l'expérience</li>
                    <li><strong>Analytiques :</strong> Mesurent l'audience</li>
                    <li><strong>Publicitaires :</strong> Ciblent les annonces</li>
                </ul>
                <h4>Comment les gérer :</h4>
                <ul>
                    <li>Refuser les cookies non-essentiels</li>
                    <li>Nettoyer régulièrement votre navigateur</li>
                    <li>Utiliser le mode navigation privée</li>
                    <li>Configurer votre navigateur pour bloquer les cookies tiers</li>
                </ul>
                <p><strong>Conseil :</strong> Acceptez uniquement les cookies essentiels et fonctionnels.</p>
            `
        }
    };
    
    return details[privacyType] || details['rgpd'];
}

// Création d'une modal de confidentialité
function createPrivacyModal(details) {
    const modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closePrivacyModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${details.title}</h2>
                <button class="modal-close" onclick="closePrivacyModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${details.content}
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closePrivacyModal()">
                    Compris !
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animation d'ouverture
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Fermeture de la modal de confidentialité
function closePrivacyModal() {
    const modal = document.querySelector('.privacy-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Initialisation de la FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Fermer toutes les autres FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer la FAQ actuelle
            item.classList.toggle('active');
        });
    });
}

// Initialisation du Quiz
function initQuiz() {
    const startQuizBtn = document.getElementById('start-quiz');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }
}

// Démarrage du quiz
function startQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const startBtn = document.getElementById('start-quiz');
    
    if (quizContainer && startBtn) {
        startBtn.style.display = 'none';
        quizContainer.style.display = 'block';
        
        displayQuizQuestion(0);
    }
}

// Questions du quiz
const quizQuestions = [
    {
        question: "Combien de copies de vos données importantes devriez-vous avoir selon la règle 3-2-1 ?",
        options: ["1 copie", "2 copies", "3 copies", "4 copies"],
        correct: 2,
        explanation: "La règle 3-2-1 recommande 3 copies de vos données importantes."
    },
    {
        question: "Quel est le meilleur type de mot de passe ?",
        options: ["Votre date de naissance", "Le même pour tous les comptes", "Unique et complexe pour chaque compte", "Un mot simple"],
        correct: 2,
        explanation: "Chaque compte doit avoir un mot de passe unique et complexe."
    },
    {
        question: "Que signifie RGPD ?",
        options: ["Règlement Général sur la Protection des Données", "Réseau Général de Protection Digitale", "Règles Générales de Protection Directe", "Rien de tout ça"],
        correct: 0,
        explanation: "RGPD = Règlement Général sur la Protection des Données."
    },
    {
        question: "Sur les réseaux sociaux, vous devriez :",
        options: ["Tout partager publiquement", "Paramétrer la confidentialité", "Ne jamais rien publier", "Utiliser votre vrai nom partout"],
        correct: 1,
        explanation: "Il est important de bien paramétrer la confidentialité sur les réseaux sociaux."
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

// Affichage d'une question du quiz
function displayQuizQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    const question = quizQuestions[index];
    
    if (!question) {
        showQuizResults();
        return;
    }
    
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h4>Question ${index + 1}/${quizQuestions.length}</h4>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, i) => `
                    <div class="quiz-option" data-answer="${i}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <button id="next-question" class="btn btn-primary" style="display: none; margin-top: 20px;">
                Question suivante
            </button>
        </div>
    `;
    
    // Gestion des réponses
    const options = quizContainer.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la sélection précédente
            options.forEach(opt => opt.classList.remove('selected'));
            // Sélectionner la nouvelle option
            this.classList.add('selected');
            
            // Enregistrer la réponse
            const answerIndex = parseInt(this.getAttribute('data-answer'));
            userAnswers[index] = answerIndex;
            
            // Afficher le bouton suivant
            document.getElementById('next-question').style.display = 'block';
        });
    });
    
    // Bouton question suivante
    const nextBtn = document.getElementById('next-question');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            displayQuizQuestion(currentQuestionIndex);
        });
    }
}

// Affichage des résultats du quiz
function showQuizResults() {
    const quizContainer = document.getElementById('quiz-container');
    let correctAnswers = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            correctAnswers++;
        }
    });
    
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
    let resultMessage = '';
    let resultClass = '';
    
    if (percentage >= 80) {
        resultMessage = "Excellent ! Vous maîtrisez bien la protection des données.";
        resultClass = "excellent";
    } else if (percentage >= 60) {
        resultMessage = "Bien ! Quelques améliorations sont possibles.";
        resultClass = "good";
    } else {
        resultMessage = "Il y a du travail ! Nous pouvons vous aider à améliorer votre protection.";
        resultClass = "needs-improvement";
    }
    
    quizContainer.innerHTML = `
        <div class="quiz-result ${resultClass}">
            <h4>🎯 Résultats de votre Quiz</h4>
            <p><strong>${correctAnswers}/${quizQuestions.length} bonnes réponses (${percentage}%)</strong></p>
            <p>${resultMessage}</p>
            <button class="btn btn-primary" onclick="restartQuiz()">
                Refaire le quiz
            </button>
            <button class="btn btn-outline" onclick="contactForAdvice()">
                Demander des conseils
            </button>
        </div>
    `;
}

// Redémarrer le quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    displayQuizQuestion(0);
}

// Contacter pour des conseils
function contactForAdvice() {
    const message = "Bonjour, j'ai fait votre quiz de protection des données et j'aimerais des conseils personnalisés.";
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Gestion des cartes de service (code existant)
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Effet hover personnalisé
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.service-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
            
            // Animation du badge
            const badge = this.querySelector('.service-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
                badge.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.service-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
            
            // Réinitialiser le badge
            const badge = this.querySelector('.service-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
                badge.style.boxShadow = 'none';
            }
        });
        
        // Click sur le bouton "Lire +"
        const readMoreBtn = card.querySelector('.service-btn');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                expandServiceDetails(card);
            });
        }
    });
}

// Expansion des détails de service (code existant)
function expandServiceDetails(card) {
    const serviceType = card.getAttribute('data-service');
    createServiceModal(serviceType);
}

// Création d'une modal de service (code existant raccourci)
function createServiceModal(serviceType) {
    const serviceDetails = getServiceDetails(serviceType);
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeServiceModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${serviceDetails.title}</h2>
                <button class="modal-close" onclick="closeServiceModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${serviceDetails.image}" alt="${serviceDetails.title}">
                </div>
                <div class="modal-text">
                    <p>${serviceDetails.description}</p>
                    <div class="modal-features">
                        <h4>Avantages :</h4>
                        <ul>
                            ${serviceDetails.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="contactForService('${serviceType}')">
                    <i class="fas fa-phone"></i>
                    Demander ce service
                </button>
                <button class="btn btn-outline" onclick="closeServiceModal()">
                    Fermer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animation d'ouverture
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Détails des services (code existant raccourci)
function getServiceDetails(serviceType) {
    const details = {
        'sauvegarde': {
            title: 'Sauvegarde de Données',
            image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600',
            description: 'Protection complète de vos données importantes avec des solutions adaptées à vos besoins.',
            benefits: [
                'Sauvegarde automatique programmée',
                'Stockage local et/ou cloud sécurisé',
                'Récupération rapide en cas de problème'
            ]
        }
        // Autres services...
    };
    
    return details[serviceType] || details['sauvegarde'];
}

// Fermeture de la modal de service
function closeServiceModal() {
    const modal = document.querySelector('.service-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Contact pour un service spécifique
function contactForService(serviceType) {
    const details = getServiceDetails(serviceType);
    const message = `Bonjour, je suis intéressé(e) par votre service "${details.title}". Pourriez-vous me contacter ?`;
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closeServiceModal();
}

// Gestion des cartes conseil (code existant)
function initConseilCards() {
    const conseilCards = document.querySelectorAll('.conseil-card');
    
    conseilCards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(30px)';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.querySelector('.conseil-icon').style.transform = 'scale(1.1) rotateZ(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.querySelector('.conseil-icon').style.transform = 'scale(1) rotateZ(0deg)';
        });
        
        card.addEventListener('click', function() {
            showConseilDetails(this);
        });
    });
}

// Affichage des détails d'un conseil (code existant)
function showConseilDetails(card) {
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    createConseilTooltip(card, title, description);
}

// Gestion du formulaire de contact (code existant)
function initContactForm() {
    const contactButtons = document.querySelectorAll('.btn[href*="tel"], .btn[href*="contact"]');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            trackContactClick(this.textContent.trim());
        });
    });
}

// Suivi des clics de contact (code existant)
function trackContactClick(buttonText) {
    console.log('Contact clicked:', buttonText);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_click', {
            'event_category': 'Protection des Données',
            'event_label': buttonText
        });
    }
}

// Chargement progressif des images (code existant)
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

// Export des fonctions pour utilisation externe
window.ProtectionDonnees = {
    closeServiceModal,
    closePrivacyModal,
    contactForService,
    trackContactClick,
    startQuiz,
    restartQuiz,
    contactForAdvice
};

// CSS pour les nouvelles modals et composants (injecté dynamiquement)
const additionalCSS = `
.service-modal,
.privacy-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.service-modal.show,
.privacy-modal.show {
    opacity: 1;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 20px;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--protection-dark);
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    color: var(--protection-gray);
    cursor: pointer;
    padding: 5px;
}

.modal-body {
    padding: 30px;
}

.modal-body h4 {
    color: var(--protection-primary);
    margin: 20px 0 10px 0;
    font-weight: 600;
}

.modal-body ul {
    margin: 15px 0;
    padding-left: 20px;
}

.modal-body li {
    margin: 8px 0;
    color: var(--protection-gray);
}

.modal-footer {
    display: flex;
    gap: 15px;
    padding: 30px;
    border-top: 1px solid #e5e7eb;
    justify-content: center;
}

.quiz-question h4 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.quiz-question p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.quiz-result.excellent {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.2);
}

.quiz-result.good {
    border-color: #f59e0b;
    background: rgba(245, 158, 11, 0.2);
}

.quiz-result.needs-improvement {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.2);
}

@media (max-width: 768px) {
    .modal-content {
        margin: 20px;
        max-width: calc(100% - 40px);
        max-height: calc(100vh - 40px);
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 20px;
    }
    
    .modal-footer {
        flex-direction: column;
    }
}
`;

// Injection du CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
