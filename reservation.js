// Gestion de la page de réservation
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const formTypeBtns = document.querySelectorAll('.form-type-btn');
    const formContainers = document.querySelectorAll('.form-container');
    const interventionForm = document.getElementById('intervention-form');
    const questionForm = document.getElementById('question-form');
    const faqItems = document.querySelectorAll('.faq-item');

    // Initialisation
    initFormTabs();
    initFAQ();
    initForms();

    // Gestion des onglets de formulaire
    function initFormTabs() {
        formTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const formType = this.getAttribute('data-form');

                // Retirer la classe active de tous les boutons
                formTypeBtns.forEach(b => b.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');

                // Masquer tous les formulaires
                formContainers.forEach(container => container.classList.remove('active'));

                // Afficher le bon formulaire
                if (formType === 'intervention') {
                    document.getElementById('intervention-form-container').classList.add('active');
                } else if (formType === 'question') {
                    document.getElementById('question-form-container').classList.add('active');
                }
            });
        });
    }

    // Gestion de la FAQ
    function initFAQ() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item actuel
                item.classList.toggle('active');
            });
        });
    }

    // Gestion des formulaires
    function initForms() {
        // Soumission formulaire d'intervention
        if (interventionForm) {
            interventionForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleInterventionSubmit(this);
            });
        }

        // Soumission formulaire de question
        if (questionForm) {
            questionForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleQuestionSubmit(this);
            });
        }

        // Validation en temps réel
        addRealTimeValidation();
    }

    // Traitement du formulaire d'intervention
    function handleInterventionSubmit(form) {
        if (!validateForm(form)) {
            showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const message = `Bonjour WELIA,

Je souhaite demander une intervention :

👤 Contact :
- Nom : ${data.nom} ${data.prenom}
- Email : ${data.email}
- Téléphone : ${data.telephone || 'Non renseigné'}

📍 Adresse :
- Adresse : ${data.adresse}
- Ville : ${data.ville}
- Code postal : ${data['code-postal']}

📝 Détails supplémentaires :
${data['autres-details'] || 'Aucun détail supplémentaire'}

Merci de me recontacter pour organiser l'intervention.

Cordialement,
${data.prenom} ${data.nom}`;

        // Envoyer vers WhatsApp
        sendToWhatsApp(message);
        
        // Afficher message de succès
        showMessage('Votre demande d\'intervention a été envoyée avec succès ! Nous vous recontacterons rapidement.', 'success');
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Redirection après 3 secondes
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }

    // Traitement du formulaire de question
    function handleQuestionSubmit(form) {
        if (!validateForm(form)) {
            showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const message = `Bonjour WELIA,

J'ai une question à vous poser :

👤 Contact :
- Nom : ${data.nom} ${data.prenom}
- Email : ${data.email}
- Téléphone : ${data.telephone || 'Non renseigné'}

❓ Ma question :
${data.question}

Merci de me répondre dès que possible.

Cordialement,
${data.prenom} ${data.nom}`;

        // Envoyer vers WhatsApp
        sendToWhatsApp(message);
        
        // Afficher message de succès
        showMessage('Votre question a été envoyée avec succès ! Nous vous répondrons rapidement.', 'success');
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Redirection après 3 secondes
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }

    // Envoyer vers WhatsApp
    function sendToWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/221764581300?text=${encodedMessage}`;
        
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappUrl, '_blank');
    }

    // Validation du formulaire
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = '#e5e7eb';
            }
        });

        // Validation email
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !isValidEmail(field.value)) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            }
        });

        return isValid;
    }

    // Validation email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validation en temps réel
    function addRealTimeValidation() {
        const allInputs = document.querySelectorAll('input, textarea');
        
        allInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#e5e7eb';
                }
            });

            input.addEventListener('focus', function() {
                this.style.borderColor = '#8b5cf6';
            });
        });
    }

    // Afficher un message
    function showMessage(text, type) {
        // Supprimer les anciens messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Créer le nouveau message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Ajouter le message au début du formulaire actif
        const activeForm = document.querySelector('.form-container.active');
        if (activeForm) {
            activeForm.insertBefore(message, activeForm.firstChild);
            
            // Afficher le message
            setTimeout(() => {
                message.classList.add('show');
            }, 100);

            // Scroll vers le message
            message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Animation des étapes pour le formulaire d'intervention
    function updateProgressSteps() {
        const interventionContainer = document.getElementById('intervention-form-container');
        if (!interventionContainer || !interventionContainer.classList.contains('active')) {
            return;
        }

        const form = interventionForm;
        const steps = document.querySelectorAll('.step');
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        let currentStep = 1;
        let completedFields = 0;

        inputs.forEach(input => {
            if (input.value.trim()) {
                completedFields++;
            }
        });

        // Déterminer l'étape actuelle
        if (completedFields >= 4) currentStep = 2;
        if (completedFields >= 6) currentStep = 3;

        // Mettre à jour l'affichage des étapes
        steps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Mettre à jour les étapes quand l'utilisateur tape
    if (interventionForm) {
        const inputs = interventionForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateProgressSteps);
        });
    }

    // Animation d'entrée pour les éléments
    function animateElements() {
        const elements = document.querySelectorAll('.form-container, .contact-difficulties-card, .faq-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Initialiser les animations
    animateElements();

    // Gestion du retour en arrière du navigateur
    window.addEventListener('beforeunload', function(e) {
        const forms = document.querySelectorAll('form');
        let hasUnsavedData = false;

        forms.forEach(form => {
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                if (value.trim()) {
                    hasUnsavedData = true;
                    break;
                }
            }
        });

        if (hasUnsavedData) {
            e.preventDefault();
            e.returnValue = 'Vous avez des données non sauvegardées. Êtes-vous sûr de vouloir quitter ?';
        }
    });

    console.log('Page de réservation initialisée avec succès');
});

// Fonction utilitaire pour formater le numéro de téléphone
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Format pour les numéros sénégalais
    if (value.startsWith('221')) {
        value = value.substring(3);
    }
    
    if (value.length >= 9) {
        value = '+221 ' + value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5, 7) + ' ' + value.substring(7, 9);
    }
    
    input.value = value;
}

// Appliquer le formatage du téléphone
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});