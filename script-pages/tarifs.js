// Variables globales
let currentCart = [];

// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Initialiser les onglets de tarifs
    initializeTabs();
    
    // Initialiser les dropdowns
    initializeDropdowns();
    
    // Charger le panier depuis le localStorage
    loadCart();
    
    // Mettre à jour l'affichage du compteur de panier
    updateCartCounter();
}

// Gestion des onglets de tarifs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tarifsSections = document.querySelectorAll('.tarifs-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Retirer la classe active de tous les boutons et sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tarifsSections.forEach(section => section.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué et à la section correspondante
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Gestion des dropdowns
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fermer tous les autres dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle le dropdown actuel
            dropdown.classList.toggle('active');
        });
    });
    
    // Fermer les dropdowns en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}


// ... keep existing code (variables globales et initialisation) the same

// Fonction pour commander un service - MODIFIÉE pour rediriger vers WhatsApp
function commanderService(serviceName, price) {
    // Créer le message WhatsApp
    const message = `Bonjour ! Je souhaite commander le service : ${serviceName} au prix de ${price} FCFA/mois. Pouvez-vous me donner plus d'informations ?`;
    
    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Numéro WhatsApp (remplacez par votre vrai numéro)
    const phoneNumber = "221764581300"; // Votre numéro du footer
    
    // Créer l'URL WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    // Afficher une notification de confirmation
    showNotification(`Redirection vers WhatsApp pour ${serviceName}`, 'success');
}

// ... keep existing code (toutes les autres fonctions restent identiques)

// Gestion du panier
function toggleCart() {
    if (currentCart.length === 0) {
        showNotification('Votre panier est vide', 'info');
        return;
    }
    
    // Créer une fenêtre modale pour afficher le panier
    showCartModal();
}

function showCartModal() {
    // Créer la modale si elle n'existe pas
    let modal = document.getElementById('cartModal');
    if (!modal) {
        modal = createCartModal();
        document.body.appendChild(modal);
    }
    
    // Mettre à jour le contenu du panier
    updateCartModal();
    
    // Afficher la modale
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function createCartModal() {
    const modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCartModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>Votre Panier</h3>
                    <button class="close-btn" onclick="closeCartModal()">&times;</button>
                </div>
                <div class="modal-body" id="cartItems">
                    <!-- Le contenu sera généré dynamiquement -->
                </div>
                <div class="modal-footer">
                    <div class="total-price" id="totalPrice">Total: 0 FCFA</div>
                    <div class="modal-actions">
                        <button class="btn-secondary" onclick="clearCart()">Vider le panier</button>
                        <button class="btn-primary" onclick="proceedToCheckout()">Commander</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter les styles CSS pour la modale
    const style = document.createElement('style');
    style.textContent = `
        #cartModal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #4A90E2;
            color: white;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            color: white;
            cursor: pointer;
        }
        
        .modal-body {
            padding: 1.5rem;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #eee;
            background: #f8f9fa;
            margin-bottom: 0.5rem;
            border-radius: 8px;
        }
        
        .item-info h4 {
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .item-price {
            font-weight: bold;
            color: #4A90E2;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .qty-btn {
            background: #4A90E2;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .remove-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid #eee;
            background: #f8f9fa;
        }
        
        .total-price {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1rem;
            color: #4A90E2;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .btn-secondary, .btn-primary {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-primary {
            background: #4A90E2;
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    return modal;
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    if (currentCart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Votre panier est vide</p>';
        totalPrice.textContent = 'Total: 0 FCFA';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    currentCart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <div class="item-price">${item.price.toLocaleString()} FCFA x ${item.quantity}</div>
            </div>
            <div class="item-actions">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Supprimer</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = `Total: ${total.toLocaleString()} FCFA`;
}

function updateQuantity(index, change) {
    if (currentCart[index]) {
        currentCart[index].quantity += change;
        
        if (currentCart[index].quantity <= 0) {
            currentCart.splice(index, 1);
        }
        
        saveCart();
        updateCartCounter();
        updateCartModal();
    }
}

function removeFromCart(index) {
    if (currentCart[index]) {
        const serviceName = currentCart[index].name;
        currentCart.splice(index, 1);
        
        saveCart();
        updateCartCounter();
        updateCartModal();
        
        showNotification(`${serviceName} retiré du panier`, 'info');
    }
}

function clearCart() {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        currentCart = [];
        saveCart();
        updateCartCounter();
        updateCartModal();
        showNotification('Panier vidé', 'info');
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function proceedToCheckout() {
    if (currentCart.length === 0) {
        showNotification('Votre panier est vide', 'warning');
        return;
    }
    
    // Rediriger vers la page de réservation avec les données du panier
    const cartData = encodeURIComponent(JSON.stringify(currentCart));
    window.location.href = `reservation.html?cart=${cartData}`;
}

// Fonctions utilitaires pour le panier
function saveCart() {
    localStorage.setItem('weliaCart', JSON.stringify(currentCart));
}

function loadCart() {
    const savedCart = localStorage.getItem('weliaCart');
    if (savedCart) {
        currentCart = JSON.parse(savedCart);
    }
}

function updateCartCounter() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Ajouter les styles si pas encore fait
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 10001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .notification-success {
                background: #28a745;
            }
            
            .notification-error {
                background: #dc3545;
            }
            
            .notification-warning {
                background: #ffc107;
                color: #333;
            }
            
            .notification-info {
                background: #17a2b8;
            }
            
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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

// Animation des cartes au scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.pricing-card, .feature-item');
    
    const observer = new Inters

Observer((entries) => {
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
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateOnScroll, 500);
});