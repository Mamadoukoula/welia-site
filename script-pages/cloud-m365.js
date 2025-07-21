// Cloud M365 JavaScript Functionality

// License Calculator
function calculateLicenses() {
    const usersCount = parseInt(document.getElementById('users-count').value) || 0;
    const licenseType = document.getElementById('license-type').value;
    
    const prices = {
        basic: 6,
        standard: 12,
        premium: 22
    };
    
    const pricePerUser = prices[licenseType];
    const monthlyCost = usersCount * pricePerUser;
    const yearlyCost = monthlyCost * 12;
    
    document.getElementById('monthly-cost').textContent = `${monthlyCost}€`;
    document.getElementById('yearly-cost').textContent = `${yearlyCost}€`;
    
    // Animation du résultat
    animateValue('monthly-cost', 0, monthlyCost, 500);
    animateValue('yearly-cost', 0, yearlyCost, 500);
}

// Animation des valeurs
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;

    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        element.textContent = `${value}€`;
        
        if (value === end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

// Modal de consultation
function openConsultationModal() {
    document.getElementById('consultation-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animation d'entrée
    setTimeout(() => {
        document.querySelector('.modal-content').style.animation = 'modalSlideIn 0.3s ease-out';
    }, 10);
}

function closeConsultationModal() {
    const modal = document.getElementById('consultation-modal');
    document.querySelector('.modal-content').style.animation = 'modalSlideOut 0.3s ease-in';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Fermer le modal en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('consultation-modal');
    if (event.target === modal) {
        closeConsultationModal();
    }
}

// Animation des icônes M365
function animateM365Icons() {
    const icons = document.querySelectorAll('.icon-float');
    
    icons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-10px) scale(1.1)';
            icon.style.background = 'rgba(255, 255, 255, 0.25)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
            icon.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Animation au clic
        icon.addEventListener('click', () => {
            const appName = icon.dataset.app;
            showAppInfo(appName);
        });
    });
}

// Afficher les informations sur les applications
function showAppInfo(appName) {
    const appInfo = {
        outlook: 'Outlook - Gestion complète des emails, calendriers et contacts avec synchronisation multi-appareils.',
        teams: 'Microsoft Teams - Collaboration en temps réel, visioconférences et espaces de travail partagés.',
        sharepoint: 'SharePoint - Partage de documents, intranets d\'entreprise et gestion collaborative.',
        word: 'Microsoft Word - Traitement de texte avancé avec collaboration en temps réel.',
        excel: 'Microsoft Excel - Tableurs puissants avec analyse de données et tableaux croisés dynamiques.',
        powerpoint: 'PowerPoint - Créations de présentations professionnelles avec templates et animations.'
    };
    
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'app-info-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <p>${appInfo[appName]}</p>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0078d4, #00bcf2);
        color: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 300px;
        z-index: 1001;
        box-shadow: 0 10px 30px rgba(0, 120, 212, 0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 4 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Détails des services
function showServiceDetails(serviceType) {
    const serviceDetails = {
        deployment: {
            title: 'Déploiement Sécurisé Microsoft 365',
            content: `
                <h4>Notre processus de déploiement comprend :</h4>
                <ul>
                    <li><strong>Audit initial :</strong> Analyse de votre infrastructure actuelle</li>
                    <li><strong>Planification :</strong> Stratégie de migration personnalisée</li>
                    <li><strong>Migration des données :</strong> Transfert sécurisé de vos emails et documents</li>
                    <li><strong>Configuration :</strong> Paramétrage selon vos besoins métier</li>
                    <li><strong>Tests :</strong> Validation complète avant mise en production</li>
                    <li><strong>Formation :</strong> Accompagnement de vos équipes</li>
                </ul>
                <p><strong>Durée :</strong> 2-4 semaines selon la taille de l'organisation</p>
                <p><strong>Support :</strong> 30 jours de support post-déploiement inclus</p>
            `
        },
        licenses: {
            title: 'Gestion Optimisée des Licences',
            content: `
                <h4>Services de gestion des licences :</h4>
                <ul>
                    <li><strong>Audit complet :</strong> Analyse de votre utilisation actuelle</li>
                    <li><strong>Optimisation :</strong> Recommandations pour réduire les coûts</li>
                    <li><strong>Gestion centralisée :</strong> Administration via portail unifié</li>
                    <li><strong>Monitoring :</strong> Suivi en temps réel de l'utilisation</li>
                    <li><strong>Reporting :</strong> Tableaux de bord détaillés</li>
                    <li><strong>Renouvellement :</strong> Gestion automatisée des échéances</li>
                </ul>
                <p><strong>Économies moyennes :</strong> 20-30% sur les coûts de licences</p>
                <p><strong>ROI :</strong> Retour sur investissement en moins de 6 mois</p>
            `
        },
        training: {
            title: 'Formation et Support Technique',
            content: `
                <h4>Programme de formation complet :</h4>
                <ul>
                    <li><strong>Formation initiale :</strong> Prise en main des outils essentiels</li>
                    <li><strong>Sessions spécialisées :</strong> Teams, SharePoint, OneDrive</li>
                    <li><strong>Formation administrateurs :</strong> Gestion avancée du tenant</li>
                    <li><strong>Ressources :</strong> Documentation et guides personnalisés</li>
                    <li><strong>Support 24/7 :</strong> Assistance technique continue</li>
                    <li><strong>Webinaires :</strong> Sessions régulières sur les nouveautés</li>
                </ul>
                <p><strong>Formats :</strong> Présentiel, distanciel ou mixte</p>
                <p><strong>Certification :</strong> Préparation aux certifications Microsoft</p>
            `
        }
    };
    
    const service = serviceDetails[serviceType];
    
    // Créer le modal de détails
    const modal = document.createElement('div');
    modal.className = 'service-detail-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3>${service.title}</h3>
            <div class="service-detail-content">
                ${service.content}
            </div>
            <div class="service-modal-actions">
                <button class="btn btn-primary" onclick="openConsultationModal(); this.parentElement.parentElement.parentElement.remove();">
                    <i class="fas fa-calendar"></i>
                    Demander un devis
                </button>
                <button class="btn btn-outline" onclick="this.parentElement.parentElement.parentElement.remove();">
                    Fermer
                </button>
            </div>
        </div>
    `;
    
    // Styles pour le modal de service
    modal.style.cssText = `
        display: block;
        position: fixed;
        z-index: 1002;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = modal.querySelector('.service-modal-content');
    modalContent.style.cssText = `
        background-color: white;
        margin: 5% auto;
        padding: 40px;
        border-radius: 20px;
        width: 90%;
        max-width: 700px;
        position: relative;
        animation: modalSlideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Fermer en cliquant à l'extérieur
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    }
}

// Formulaire de consultation
function handleConsultationForm() {
    const form = document.getElementById('consultation-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Succès simulé
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Demande envoyée !';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                closeConsultationModal();
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                
                // Notification de succès
                showSuccessNotification('Votre demande de consultation a été envoyée. Nous vous recontacterons sous 24h.');
            }, 2000);
        }, 2000);
    });
}

// Notification de succès
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 350px;
        z-index: 1003;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll smooth pour les ancres
function initSmoothScroll() {
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
}

// Ajout des animations CSS manquantes
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
        
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-50px);
            }
        }
        
        .service-detail-content ul {
            margin: 20px 0;
            padding-left: 0;
        }
        
        .service-detail-content li {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #f1f5f9;
        }
        
        .service-detail-content strong {
            color: #0078d4;
        }
        
        .service-modal-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        .notification-content p {
            margin: 0;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Calculateur initial
    calculateLicenses();
    
    // Animations des icônes
    animateM365Icons();
    
    // Gestion du formulaire
    handleConsultationForm();
    
    // Scroll smooth
    initSmoothScroll();
    
    // Styles supplémentaires
    addCustomStyles();
    
    // Animation d'apparition des éléments au scroll
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
    document.querySelectorAll('.service-card-m365').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    console.log('Cloud M365 page initialized successfully');
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    // Recalcul des positions si nécessaire
    const modal = document.getElementById('consultation-modal');
    if (modal && modal.style.display === 'block') {
        // Réajuster le modal si ouvert
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.margin = window.innerWidth < 768 ? '10% auto' : '5% auto';
    }
});
