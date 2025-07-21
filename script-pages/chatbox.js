class FloatingChatManager {
    constructor() {
        this.isOpen = false;
        this.contactInfo = {
            phone: "+221764581300", // Numéro WhatsApp et SMS
            email: "contact@welia-africa.com"
        };
        this.init();
    }

    init() {
        // Sélecteurs des éléments
        this.mainBtn = document.getElementById('mainChatBtn');
        this.contactOptions = document.getElementById('contactOptions');
        this.overlay = document.getElementById('chatOverlay');
        this.whatsappBtn = document.getElementById('whatsappBtn');
        this.smsBtn = document.getElementById('smsBtn');
        this.emailBtn = document.getElementById('emailBtn');
        this.notificationBadge = document.getElementById('notificationBadge');

        this.bindEvents();
        this.showNotificationAfterDelay();
    }

    bindEvents() {
        // Bouton principal
        this.mainBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });

        // Overlay pour fermer sur mobile
        this.overlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // Boutons de contact
        this.whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openWhatsApp();
        });

        this.smsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openSMS();
        });

        this.emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openEmail();
        });

        // Fermer le menu en appuyant sur Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Fermer le menu si on clique ailleurs
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.floating-chat-container')) {
                this.closeMenu();
            }
        });

        // Adapter le comportement sur resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.overlay.classList.contains('active')) {
                this.overlay.classList.remove('active');
            }
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.mainBtn.classList.add('active');
        this.contactOptions.classList.add('active');
        
        // Ajouter l'overlay sur mobile
        if (window.innerWidth <= 768) {
            this.overlay.classList.add('active');
        }
        
        // Cacher la notification
        this.hideNotification();
        
        // Animation de rebond
        this.mainBtn.classList.add('bounce');
        setTimeout(() => {
            this.mainBtn.classList.remove('bounce');
        }, 600);
        
        console.log('Menu de contact ouvert');
    }

    closeMenu() {
        this.isOpen = false;
        this.mainBtn.classList.remove('active');
        this.contactOptions.classList.remove('active');
        this.overlay.classList.remove('active');
        
        console.log('Menu de contact fermé');
    }

    openWhatsApp() {
        const message = encodeURIComponent(
            "Bonjour WELIA,\n\nJe souhaite obtenir plus d'informations sur vos services informatiques.\n\nMerci !"
        );
        const whatsappUrl = `https://wa.me/${this.contactInfo.phone}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        this.closeMenu();
        
        console.log('Ouverture de WhatsApp');
    }

    openSMS() {
        const message = encodeURIComponent(
            "Bonjour WELIA, je souhaite obtenir plus d'informations sur vos services informatiques. Merci !"
        );
        const smsUrl = `sms:${this.contactInfo.phone}?body=${message}`;
        
        window.location.href = smsUrl;
        this.closeMenu();
        
        console.log('Ouverture de SMS');
    }

    openEmail() {
        const subject = encodeURIComponent("Demande d'informations - Services WELIA");
        const body = encodeURIComponent(
            "Bonjour,\n\nJe souhaite obtenir plus d'informations sur vos services informatiques.\n\nPouvez-vous me recontacter ?\n\nCordialement"
        );
        const emailUrl = `mailto:${this.contactInfo.email}?subject=${subject}&body=${body}`;
        
        window.location.href = emailUrl;
        this.closeMenu();
        
        console.log('Ouverture de Email');
    }

    showNotification() {
        if (this.notificationBadge) {
            this.notificationBadge.style.display = 'flex';
        }
    }

    hideNotification() {
        if (this.notificationBadge) {
            this.notificationBadge.style.display = 'none';
        }
    }

    showNotificationAfterDelay() {
        // Afficher la notification après 5 secondes pour attirer l'attention
        setTimeout(() => {
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 5000);
    }

    // Méthode pour personnaliser les informations de contact
    updateContactInfo(phone, email) {
        this.contactInfo.phone = phone;
        this.contactInfo.email = email;
        console.log('Informations de contact mises à jour:', this.contactInfo);
    }

    // Méthode pour afficher/cacher le bouton entier
    show() {
        const container = document.querySelector('.floating-chat-container');
        if (container) {
            container.style.display = 'flex';
        }
    }

    hide() {
        const container = document.querySelector('.floating-chat-container');
        if (container) {
            container.style.display = 'none';
        }
        this.closeMenu();
    }

    // Méthode pour simuler une nouvelle notification
    triggerNotification() {
        this.showNotification();
        
        // Animation de rebond du bouton principal
        this.mainBtn.classList.add('bounce');
        setTimeout(() => {
            this.mainBtn.classList.remove('bounce');
        }, 600);
    }
}

// CSS pour l'animation de rebond (ajouté dynamiquement)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .floating-chat-container {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Initialiser le gestionnaire de chat flottant
document.addEventListener('DOMContentLoaded', () => {
    window.floatingChat = new FloatingChatManager();
    
    // Exemple d'utilisation des méthodes publiques
    console.log('Chat flottant initialisé');
    
    // Pour déclencher une notification depuis l'extérieur :
    // window.floatingChat.triggerNotification();
    
    // Pour changer les informations de contact :
    // window.floatingChat.updateContactInfo("+225123456789", "nouveaucontact@example.com");
    
    // Pour cacher/afficher le bouton :
    // window.floatingChat.hide();
    // window.floatingChat.show();
});

// Export pour utilisation externe si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingChatManager;
}