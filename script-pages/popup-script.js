// ===== POPUP NOUVEAUX PRODUITS - SCRIPT JAVASCRIPT =====

// Variables globales
let popupShown = false;

// Fonction pour afficher la popup
function showPopup() {
    const popup = document.getElementById('productPopup');
    if (popup) {
        popup.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Empêche le scroll
    }
}

// Fonction pour fermer la popup
function closePopup() {
    const popup = document.getElementById('productPopup');
    if (popup) {
        popup.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Réactive le scroll
        
        // Marquer comme vu pour cette session
        sessionStorage.setItem('popupShown', 'true');
    }
}

// Fonction pour aller vers les produits
function goToProducts() {
    // ⚠️ IMPORTANT: Remplacez cette URL par votre page produits
    window.location.href = 'produits.html'; // <- MODIFIEZ ICI
    closePopup();
}

// Fonction pour réinitialiser (utile pour les tests)
function resetPopup() {
    sessionStorage.removeItem('popupShown');
    localStorage.removeItem('popupShown');
    console.log('Popup réinitialisée! Rechargez la page pour la voir apparaître.');
}

// ===== CONFIGURATION D'AFFICHAGE =====
// Affichage automatique de la popup
window.addEventListener('load', function() {
    // Vérifier si la popup a déjà été montrée dans cette session
    const hasSeenPopup = sessionStorage.getItem('popupShown');
    
    if (!hasSeenPopup) {
        // ⚠️ DÉLAI D'AFFICHAGE: Modifiez le nombre de millisecondes (2000 = 2 secondes)
        setTimeout(function() {
            showPopup();
        }, 2000); // <- MODIFIEZ ICI pour changer le délai
    }
});

// ===== ÉVÉNEMENTS DE FERMETURE =====
// Fermer la popup en cliquant sur l'overlay (fond sombre)
document.addEventListener('click', function(e) {
    const popup = document.getElementById('productPopup');
    if (e.target === popup) {
        closePopup();
    }
});

// Fermer avec la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const popup = document.getElementById('productPopup');
        if (popup && !popup.classList.contains('hidden')) {
            closePopup();
        }
    }
});

// Empêcher la fermeture en cliquant à l'intérieur de la popup
document.addEventListener('DOMContentLoaded', function() {
    const popupContainer = document.querySelector('.popup-container');
    if (popupContainer) {
        popupContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// ===== FONCTIONS OPTIONNELLES =====
// Afficher la popup manuellement (pour bouton ou lien)
function showPopupManually() {
    showPopup();
}

// Vérifier si la popup peut être affichée
function canShowPopup() {
    return !sessionStorage.getItem('popupShown');
}

// Forcer l'affichage (ignore les restrictions)
function forceShowPopup() {
    showPopup();
}