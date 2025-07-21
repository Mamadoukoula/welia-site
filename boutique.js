// === 2. Configuration Supabase ===
const { createClient } = supabase;
const supabaseUrl = 'https://bfoeqgdartgbmhsagcqz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmb2VxZ2RhcnRnYm1oc2FnY3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTU0NDMsImV4cCI6MjA2NzAzMTQ0M30.R2mU0Ve2eMbVdtlt2Cwl_D7Zle80IvIXtq7yHgZhWaE';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Configuration pour les images
const IMAGE_PATH = 'produits/'; // Chemin vers votre dossier d'images

// Base de données des produits MODIFIÉE pour utiliser plusieurs images
const products = [
    {
        id: 1,
        name: "Lenovo Mini PC X360 Yoga 11E 8Go Ram 256Go SSD Écran Tactile 11,6\" Convertible",
        category: "ordinateurs",
        subcategory: "mini-pc",
        price: 100000,
        oldPrice: 115000,
        discount: 13,
        images: [
            "lenovo-x360-front.jpg",
            "lenovo-x360-back.jpg", 
            "lenovo-x360-side.jpg"
        ],
        fallbackIcon: "💻",
        specs: [
            "Processeur: Intel Core i5",
            "RAM: 8Go DDR4",
            "Stockage: 256Go SSD",
            "Écran: 11.6\" Tactile",
            "OS: Windows 11",
            "Garantie: 1 an"
        ],
        stock: 5
    },
    {
        id: 2,
        name: "DELL Latitude 5400 TACTILE Intel Core i5 8Go Ram 256Go SSD Écran 14\"",
        category: "ordinateurs",
        subcategory: "laptops",
        price: 89000,
        oldPrice: 105000,
        discount: 15,
        images: [
            "dell-latitude-5400-front.jpg",
            "dell-latitude-5400-open.jpg",
            "dell-latitude-5400-ports.jpg"
        ],
        fallbackIcon: "💻",
        specs: [
            "Processeur: Intel Core i5-8365U",
            "RAM: 8Go DDR4",
            "Stockage: 256Go SSD",
            "Écran: 14\" Full HD Tactile",
            "OS: Windows 10 Pro",
            "Garantie: 1 an"
        ],
        stock: 3
    },
    {
        id: 3,
        name: "HP EliteBook 845 G8 AMD Ryzen™7 Pro 5850U I 16Go I 256Go SSD I Radeon Graphics I14″FHD",
        category: "ordinateurs",
        subcategory: "laptops",
        price: 126900,
        oldPrice: 147800,
        discount: 14,
        images: [
            "hpelitebook-front.jpg",
            "hpelitebook-back.jpg",
            "hpelitebook-back2.jpg"
        ],
        fallbackIcon: "💻",
        specs: [
            "AMD Ryzen™ 7 Pro 5850U Up To 4.4GHz",
            "RAM: 16Go DDR4",
            "Stockage: 256Go SSD",
            "Écran: 14\" Full HD",
            "OS: Windows 11",
            "Garantie: 1 an"
        ],
        stock: 8
    },
    {
        id: 4,
        name: "GUETON LED 2.4G Rechargeable Souris Sans Fil Gaming RGB",
        category: "accessoires",
        subcategory: "souris",
        price: 1729,
        oldPrice: 2500,
        discount: 31,
        images: [
            "souris-gueton-gaming-top.jpg",
            "souris-gueton-gaming-side.jpg",
            "souris-gueton-gaming-bottom.jpg"
        ],
        fallbackIcon: "🖱️",
        specs: [
            "Connexion: 2.4G Sans fil",
            "Transmission distance: Up to 10m",
            "Batter Capacity: 500mAh(rechargeable lithium batter)",
            "Éclairage: RGB",
            "Item size: 11.3 * 5.8 * 2.6cm /4.45 * 2.28 * 1.02in(L * W * H)"
        ],
        stock: 25
    },
    {
        id: 5,
        name: "Switch Cisco Catalyst 2960-X 24 ports Gigabit",
        category: "reseau",
        price: 450000,
        oldPrice: 520000,
        discount: 13,
        images: [
            "cisco-switch-2960x-front.jpg",
            "cisco-switch-2960x-back.jpg"
        ],
        fallbackIcon: "🔗",
        specs: [
            "Ports: 24x Gigabit Ethernet",
            "Uplink: 4x SFP+",
            "Débit: 88 Gbps",
            "Table MAC: 8K entrées",
            "Gestion: Web, CLI, SNMP",
            "Garantie: 3 ans"
        ],
        stock: 2
    },
    {
        id: 6,
        name: "Serveur HP ProLiant DL380 Gen10 Intel Xeon Silver 4214",
        category: "serveurs",
        price: 850000,
        oldPrice: 950000,
        discount: 11,
        images: [
            "hp-proliant-dl380-front.jpg",
            "hp-proliant-dl380-inside.jpg",
            "hp-proliant-dl380-back.jpg"
        ],
        fallbackIcon: "🖥️",
        specs: [
            "Processeur: Intel Xeon Silver 4214",
            "RAM: 16Go DDR4 ECC",
            "Stockage: 2x 300Go SAS",
            "Réseau: 4x Gigabit",
            "Alimentation: Redondante 800W",
            "Garantie: 3 ans"
        ],
        stock: 1
    },
    {
        id: 7,
        name: "Licence Microsoft 365 Business Premium (1 an)",
        category: "logiciels",
        price: 125000,
        oldPrice: 145000,
        discount: 14,
        images: [
            "microsoft-365-license.jpg"
        ],
        fallbackIcon: "📄",
        specs: [
            "Durée: 1 an",
            "Utilisateurs: 1",
            "Applications: Word, Excel, PowerPoint, Outlook",
            "Stockage: 1To OneDrive",
            "Support: Inclus",
            "Activation: Immédiate"
        ],
        stock: 50
    },
    {
        id: 8,
        name: "Onduleur APC Smart-UPS 1500VA LCD",
        category: "electrique",
        price: 280000,
        oldPrice: 320000,
        discount: 13,
        images: [
            "apc-smart-ups-1500-front.jpg",
            "apc-smart-ups-1500-back.jpg"
        ],
        fallbackIcon: "🔋",
        specs: [
            "Puissance: 1500VA / 980W",
            "Autonomie: 10-15 min",
            "Prises: 8 sorties IEC",
            "Écran: LCD",
            "Communication: USB, Série",
            "Garantie: 2 ans"
        ],
        stock: 4
    },
    {
        id: 9,
        name: "Câble Réseau Cat6 UTP 50m Gris",
        category: "electrique",
        price: 25000,
        oldPrice: 30000,
        discount: 17,
        images: [
            "cable-cat6-50m-roll.jpg",
            "cable-cat6-50m-connector.jpg"
        ],
        fallbackIcon: "🔌",
        specs: [
            "Longueur: 50 mètres",
            "Catégorie: Cat6 UTP",
            "Débit: Gigabit Ethernet",
            "Connecteurs: RJ45",
            "Couleur: Gris",
            "Certification: TIA/EIA"
        ],
        stock: 15
    },
    {
        id: 10,
        name: "Routeur WiFi 6 TP-Link Archer AX73 AX5400",
        category: "reseau",
        price: 185000,
        oldPrice: 210000,
        discount: 12,
        images: [
            "tplink-archer-ax73-front.jpg",
            "tplink-archer-ax73-back.jpg",
            "tplink-archer-ax73-side.jpg"
        ],
        fallbackIcon: "📡",
        specs: [
            "Standard: WiFi 6 (802.11ax)",
            "Débit: AX5400 (4804 + 574 Mbps)",
            "Antennes: 6x externes",
            "Ports: 4x Gigabit LAN, 1x WAN",
            "Processeur: Quad-core 1.5GHz",
            "Garantie: 2 ans"
        ],
        stock: 7
    },

    {
        id: 11,
        name: "TP-Link AC1200 Wi-Fi Range Extender RE305 - extension de portée Wifi - Wi-Fi 5",
        category: "reseau",
        price: 185000,
        oldPrice: 210000,
        discount: 12,
        images: [
            "tplink-extender-front.jpg",
            "tplink-extender-back.jpg",
            "tplink-extender-side.jpg"
        ],
        fallbackIcon: "📡",
        specs: [
            "Extension de portée Wifi: 	2.4 GHz, 5 GHz (802.11ac)",
            "Débit: AX5400 (4804 + 574 Mbps)",
            " Wi-Fi Protected Setup (WPS), bouton de réinitialisation",
            "Ports: 1 x 100Base-TX - RJ-45",
            "Processeur: Quad-core 1.5GHz",
            "Garantie: 2 ans"
        ],
        stock: 8
    },

    {
        id: 12,
        name: "TP-Link Caméra Surveillance WiFi,Tapo C200 camera ip 1080P sans Fil avec Vision Nocturne",
        category: "reseau",
        price: 185000,
        oldPrice: 210000,
        discount: 12,
        images: [
            "camera-C200-front.jpg",
            "camera-C200-back.jpg",
            "camera-C200-notifs.jpg",
            "camera-C200-carton.jpg"
        ],
        fallbackIcon: "📡",
        specs: [
            "Caméra Surveillance WiFi FHD 1080P et Vision Nocturne Avancée Détectent Tous Les Mouvements",
            "Wifi 2.4GHz seulement et Carte Micro SD",
            " Supporte jusqu'à 128GB (24h*16 jours) qui peut bien protéger votre vie privée",
            "Poids (kg): 0.3, HD 1080p",
            "couverture: 320° horizontale et 114° Verticale",
            "Garantie: 1 ans"
        ],
        stock: 9
    },

      {
        id: 13,
        name: "Kaspersky Anti-Virus 2 Devices Licence 1 an",
        category: "logiciels",
        price: 185000,
        oldPrice: 210000,
        discount: 12,
        images: [
            "anti-virus.jpg"
        ],
        fallbackIcon: "📄",
        specs: [
            "Protège contre les virus, les ransomwares et bien plus",
            "Préserve les performances de votre PC",
            "Simplifie la sécurité grâce aux outils de contrôle en ligne",
            "Garantie: 1 ans"
        ],
        stock: 10
    },

       {
        id: 14,
         name: "LOGITECH SOURIS + CLAVIER SANS FIL ORDINATEUR MK220",
        category: "accessoires",
        subcategory: "souris",
        price: 1729,
        oldPrice: 25000,
        discount: 31,
        images: [
            "clavier-souris-logitech.jpg"
        ],
        fallbackIcon: "🖱️",
        specs: [
            "Logitech MK220 Combo: clavier et souris hautes performances ",
            "Confortable à utiliser, léger, élégant, ce combo clavier et souris sans fil offre une commodité en abondance",
            " Possède une technologie sans fil 2,4 GHz qui capture et envoie des signaux efficacement et garantit qu’il n’y a aucune perte de qualité",
            "La souris a une batterie de 5 mois tandis que le clavier a une batterie de 24 mois",
            "Securité: utilise une technologie de cryptage AES 128 bits pour protéger les données",
            "Garantie: 6 mois"
        ],
        stock: 11
    },

       {
        id: 15,
         name: "HP EliteDisplay E24 G4 (23.8 inch) Full HD Monitor with HP Eye Ease",
        category: "accessoires",
        subcategory: "souris",
        price: 1729,
        oldPrice: 2500,
        discount: 31,
         images: [
            "Ecran-HP EliteDisplay-front.jpg",
            "Ecran-HP EliteDisplay-back.jpg",
            "Ecran-HP EliteDisplay-side.jpg"
        ],
        fallbackIcon: "🖱️",
        specs: [
            "Display Input Type-1 VGA, USB Type-B,DisplayPort™ 1.4 (with HDCP support),HDMI 1.4 (with HDCP support),4 USB-A 3.2 Gen 1",
            "60.45 cm (23.8″)",
            "Panel technology – IPS",
            "Display resolution 1920 x 1080 pixels, Full HD / 1080p @60Hz",
            "Garantie: 1 ans"
        ],
        stock: 12
    }
];

// Cart management
let cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];

// Variables pour gérer l'état des images par produit
const productImageStates = {};

// Fonction pour créer l'élément image avec galerie et fallback
function createProductImageGallery(product, className = 'product-image-container') {
    const images = product.images || [];
    const hasMultipleImages = images.length > 1;
    
    // Initialiser l'état de l'image
    if (!productImageStates[product.id]) {
        productImageStates[product.id] = { currentIndex: 0 };
    }
    
    return `
        <div class="${className}" data-product-id="${product.id}">
            <div class="product-image-main">
                <img src="${IMAGE_PATH}${images[0] || 'placeholder.jpg'}" 
                     alt="${product.name}" 
                     class="main-product-image"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                <div class="fallback-icon" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 60px; color: #ccc; background: #f8f9fa; border-radius: 8px;">
                    ${product.fallbackIcon}
                </div>
                ${hasMultipleImages ? `
                    <div class="image-navigation">
                        <button class="nav-btn prev-btn" onclick="changeProductImage(${product.id}, -1); event.stopPropagation();">‹</button>
                        <button class="nav-btn next-btn" onclick="changeProductImage(${product.id}, 1); event.stopPropagation();">›</button>
                    </div>
                    <div class="image-indicators">
                        ${images.map((_, index) => `
                            <span class="indicator ${index === 0 ? 'active' : ''}" onclick="setProductImage(${product.id}, ${index}); event.stopPropagation();"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            ${hasMultipleImages ? `
                <div class="product-thumbnails">
                    ${images.map((image, index) => `
                        <img src="${IMAGE_PATH}${image}" 
                             alt="${product.name} - vue ${index + 1}"
                             class="thumbnail ${index === 0 ? 'active' : ''}"
                             onclick="setProductImage(${product.id}, ${index}); event.stopPropagation();"
                             onerror="this.style.display='none'">
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

// Fonction pour changer l'image d'un produit
function changeProductImage(productId, direction) {
    console.log('changeProductImage appelée:', productId, direction);
    
    const product = products.find(p => p.id === productId);
    if (!product || !product.images || product.images.length <= 1) {
        console.log('Produit non trouvé ou pas assez d\'images');
        return;
    }
    
    // Initialiser l'état si nécessaire
    if (!productImageStates[productId]) {
        productImageStates[productId] = { currentIndex: 0 };
    }
    
    const state = productImageStates[productId];
    const maxIndex = product.images.length - 1;
    
    state.currentIndex += direction;
    
    // Gérer la boucle
    if (state.currentIndex > maxIndex) {
        state.currentIndex = 0;
    } else if (state.currentIndex < 0) {
        state.currentIndex = maxIndex;
    }
    
    console.log('Nouvel index:', state.currentIndex);
    updateProductImageDisplay(productId);
}

// Fonction pour définir une image spécifique
function setProductImage(productId, index) {
    console.log('setProductImage appelée:', productId, index);
    
    const product = products.find(p => p.id === productId);
    if (!product || !product.images || index >= product.images.length) {
        console.log('Index invalide ou produit non trouvé');
        return;
    }
    
    if (!productImageStates[productId]) {
        productImageStates[productId] = { currentIndex: 0 };
    }
    
    productImageStates[productId].currentIndex = index;
    console.log('Index défini à:', index);
    updateProductImageDisplay(productId);
}

// Fonction pour mettre à jour l'affichage de l'image
function updateProductImageDisplay(productId) {
    console.log('updateProductImageDisplay appelée pour:', productId);
    
    const product = products.find(p => p.id === productId);
    const state = productImageStates[productId];
    if (!product || !state) {
        console.log('Produit ou état non trouvé');
        return;
    }
    
    const container = document.querySelector(`[data-product-id="${productId}"]`);
    if (!container) {
        console.log('Container non trouvé pour le produit:', productId);
        return;
    }
    
    const mainImage = container.querySelector('.main-product-image');
    const indicators = container.querySelectorAll('.indicator');
    const thumbnails = container.querySelectorAll('.thumbnail');
    
    if (mainImage && product.images[state.currentIndex]) {
        const newImageSrc = `${IMAGE_PATH}${product.images[state.currentIndex]}`;
        console.log('Changement d\'image vers:', newImageSrc);
        mainImage.src = newImageSrc;
    }
    
    // Mettre à jour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === state.currentIndex);
    });
    
    // Mettre à jour les thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === state.currentIndex);
    });
    
    console.log('Affichage mis à jour pour l\'image:', state.currentIndex);
}

// Fonction pour mettre à jour l'affichage de l'image
function updateProductImageDisplay(productId) {
    console.log('updateProductImageDisplay appelée pour:', productId);

    const product = products.find(p => p.id === productId);
    const state = productImageStates[productId];
    if (!product || !state) {
        console.log('Produit ou état non trouvé');
        return;
    }

    const allContainers = document.querySelectorAll(`[data-product-id="${productId}"]`);

    allContainers.forEach(container => {
        const mainImage = container.querySelector('.main-product-image');
        const indicators = container.querySelectorAll('.indicator');
        const thumbnails = container.querySelectorAll('.thumbnail');

        if (mainImage && product.images[state.currentIndex]) {
            const newImageSrc = `${IMAGE_PATH}${product.images[state.currentIndex]}`;
            console.log('→ Mise à jour image :', newImageSrc);
            mainImage.src = newImageSrc;
        }

        // Réinitialiser les classes actives
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === state.currentIndex);
        });

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === state.currentIndex);
        });
    });
}


// Display products MODIFIÉE pour utiliser le nouveau système d'images
function displayProducts(productsToShow = products) {
    const grid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');
    
    if (productCount) {
        productCount.textContent = `${productsToShow.length} produit${productsToShow.length > 1 ? 's' : ''} trouvé${productsToShow.length > 1 ? 's' : ''}`;
    }
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<div class="empty-products"><i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; color: #ddd;"></i><h3>Aucun produit trouvé</h3><p>Essayez de modifier vos critères de recherche</p></div>';
        return;
    }
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="showProductModal(${product.id})" style="position: relative;">
            ${product.discount ? `<div class="product-discount">-${product.discount}%</div>` : ''}
            ${createProductImageGallery(product, 'product-image')}
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    ${formatPrice(product.price)} FCFA
                    ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)} FCFA</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); showProductModal(${product.id})">
                        <i class="fas fa-eye"></i> Voir détails
                    </button>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Réinitialiser les états des images après le rendu
    productsToShow.forEach(product => {
        if (!productImageStates[product.id]) {
            productImageStates[product.id] = { currentIndex: 0 };
        }
    });
    
    console.log('Produits affichés, états initialisés:', productImageStates);
}

// Show product modal MODIFIÉE pour corriger la navigation des images dans la modal
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    // Réinitialiser l'état de l'image pour la modal
    productImageStates[productId] = { currentIndex: 0 };
    
    modalBody.innerHTML = `
        <div class="modal-product">
            ${createProductImageGallery(product, 'modal-image-container')}
            <div class="modal-details">
                <h2>${product.name}</h2>
                <div class="modal-price">
                    ${formatPrice(product.price)} FCFA
                    ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)} FCFA</span>` : ''}
                    ${product.discount ? `<span class="product-discount" style="position: static; margin-left: 10px;">-${product.discount}%</span>` : ''}
                </div>
                
                <div class="specs">
                    <h3>Caractéristiques:</h3>
                    <ul>
                        ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="quantity-selector">
                    <label>Quantité:</label>
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <input type="number" id="modalQuantity" class="quantity-input" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                    <span style="margin-left: 10px; color: #666;">(${product.stock} en stock)</span>
                </div>
                
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 16px;" onclick="addToCartFromModal(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.getElementById('overlay').classList.add('show');
    
    // IMPORTANT: Attendre que le DOM soit mis à jour et réinitialiser l'affichage
    setTimeout(() => {
        console.log('Initialisation de la modal pour le produit:', productId);
        console.log('Images disponibles:', product.images);
        
        // Forcer la mise à jour de l'affichage de l'image
        const container = document.querySelector(`[data-product-id="${productId}"]`);
        if (container) {
            console.log('Container trouvé dans la modal');
            updateProductImageDisplay(productId);
            
            // Vérifier que tous les éléments interactifs sont présents
            const navButtons = container.querySelectorAll('.nav-btn');
            const indicators = container.querySelectorAll('.indicator');
            const thumbnails = container.querySelectorAll('.thumbnail');
            
            console.log('Boutons de navigation:', navButtons.length);
            console.log('Indicateurs:', indicators.length);
            console.log('Miniatures:', thumbnails.length);
        } else {
            console.error('Container non trouvé pour le produit:', productId);
        }
    }, 150);
}

// Update cart UI MODIFIÉE pour les images
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 15px;"></i><h4>Votre panier est vide</h4><p>Ajoutez des produits pour commencer</p></div>';
    } else {
        cartItems.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            const firstImage = product && product.images && product.images[0] ? product.images[0] : null;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${firstImage ? `
                            <img src="${IMAGE_PATH}${firstImage}" 
                                 alt="${item.name}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                                 style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                            <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 20px; color: #ccc;">
                                ${product ? product.fallbackIcon : '📦'}
                            </div>
                        ` : `<div style="width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 20px; color: #ccc; display: flex;">
                            ${product ? product.fallbackIcon : '📦'}
                        </div>`}
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${formatPrice(item.price)} FCFA</div>
                        <div class="cart-item-quantity">
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${item.id}, this.value)">
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: #e74c3c; background: none; border: none; cursor: pointer;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Update category counts
function updateCategoryCounts() {
    const categories = ['ordinateurs', 'accessoires', 'reseau', 'serveurs', 'logiciels', 'electrique'];
    
    categories.forEach(category => {
        const count = products.filter(p => p.category === category).length;
        const countElement = document.getElementById(`count-${category}`);
        if (countElement) {
            countElement.textContent = `${count} produit${count > 1 ? 's' : ''}`;
        }
    });
}

// Sort products
function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    let currentProducts = [...products];
    
    switch(sortValue) {
        case 'price-asc':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            currentProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'discount':
            currentProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
            break;
        default:
            break;
    }
    
    displayProducts(currentProducts);
}

// Toggle view (grid/list)
let isGridView = true;
function toggleView() {
    const grid = document.getElementById('productsGrid');
    const toggleBtn = document.getElementById('viewToggle');
    
    isGridView = !isGridView;
    
    if (isGridView) {
        grid.classList.remove('list-view');
        toggleBtn.innerHTML = '<i class="fas fa-th-list"></i>';
    } else {
        grid.classList.add('list-view');
        toggleBtn.innerHTML = '<i class="fas fa-th"></i>';
    }
}

// Format price with spaces
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Change quantity in modal
function changeQuantity(delta) {
    const input = document.getElementById('modalQuantity');
    const newValue = parseInt(input.value) + delta;
    const max = parseInt(input.max);
    
    if (newValue >= 1 && newValue <= max) {
        input.value = newValue;
    }
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('overlay').classList.remove('show');
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Show success message
    showNotification(`${product.name} ajouté au panier!`, 'success');
}

// Add to cart from modal
function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    addToCart(productId, quantity);
    closeModal();
}

// Update cart item quantity
function updateCartItemQuantity(itemId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
    showNotification('Produit retiré du panier', 'info');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('techstore_cart', JSON.stringify(cart));
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// Filter products
function filterProducts(category) {
    // Update active nav
    document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    let filtered = products;
    
    if (category !== 'all') {
        // Check if it's a subcategory first
        if (['laptops', 'desktop', 'mini-pc', 'souris', 'claviers', 'ecrans'].includes(category)) {
            filtered = products.filter(p => p.subcategory === category);
        } else {
            filtered = products.filter(p => p.category === category);
        }
    }
    
    displayProducts(filtered);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-open');
}

// Search products
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
}

// Checkout via WhatsApp
// === 3. Extension de la fonction checkout ===
async function checkout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide!', 'error');
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = "🛒 *NOUVELLE COMMANDE TECHSTORE*\n\n";
    message += "📋 *Détails de la commande:*\n";

    const orderItems = [];

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   💰 Prix: ${formatPrice(item.price)} FCFA\n`;
        message += `   📦 Quantité: ${item.quantity}\n`;
        message += `   💵 Sous-total: ${formatPrice(item.price * item.quantity)} FCFA\n\n`;

        orderItems.push({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        });
    });

    message += `💰 *TOTAL: ${formatPrice(totalPrice)} FCFA*\n\n`;
    message += "📞 Merci de me contacter pour finaliser cette commande et organiser la livraison.\n\n";
    message += "🚚 Modes de livraison disponibles:\n";
    message += "• Livraison à domicile\n";
    message += "• Retrait en magasin\n\n";
    message += "💳 Modes de paiement:\n";
    message += "• Espèces à la livraison\n";
    message += "• Virement bancaire\n";
    message += "• Mobile Money";

    // Envoi vers Supabase
    const { data, error } = await supabaseClient
        .from('orders')
        .insert([{
            customer_name: "Visiteur Site Web", // à personnaliser si login
            customer_phone: "", // à ajouter dans formulaire client si nécessaire
            items: orderItems,
            total: totalPrice,
            notes: "Commande via bouton WhatsApp"
        }]);

    if (error) {
        console.error('Erreur Supabase:', error);
        showNotification('Erreur lors de l\'enregistrement de la commande', 'error');
        return;
    }

    // Lien WhatsApp
    const phoneNumber = "221764581300";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();

    showNotification('Commande envoyée via WhatsApp et enregistrée !', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Carousel functionality
let currentSlideIndex = 0;
const totalSlides = 3;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    
    if (track && dots.length > 0) {
        const translateX = -currentSlideIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateCarousel();
}

function currentSlide(slideNumber) {
    currentSlideIndex = slideNumber - 1;
    updateCarousel();
}

// Initialize the app MODIFIÉE pour corriger l'initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application initialisée');
    displayProducts();
    updateCartUI();
    updateCategoryCounts();
    
    // Carousel initialization
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index + 1));
    });
    
    updateCarousel();
    
    // Auto-play carousel
    setInterval(() => changeSlide(1), 5000);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    // Close cart when clicking overlay
    document.getElementById('overlay').addEventListener('click', function(e) {
        // Fermer le panier seulement si on clique sur l'overlay ET que le panier est ouvert
        if (document.getElementById('cartSidebar').classList.contains('open') && e.target === this) {
            toggleCart();
        }
        // Fermer la modal seulement si on clique sur l'overlay ET que la modal est ouverte
        if (document.getElementById('productModal').style.display === 'block' && e.target === this) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('productModal').style.display === 'block') {
                closeModal();
            }
        }
    });
    
    console.log('Tous les event listeners sont configurés');

// new code added 
window.addEventListener("load", function () {
  const popup = document.getElementById("popup-promo");
  const closeBtn = document.getElementById("close-btn");

  // Affiche le popup à chaque rechargement
  popup.classList.add("show");

  // Fermer le popup
  closeBtn.addEventListener("click", function () {
    popup.classList.remove("show");
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const flashText = document.getElementById("flash-text");
  const discountText = document.getElementById("discount-text");

  setTimeout(() => {
    flashText.style.display = "none";
    discountText.style.display = "inline";
  }, 4000); // 4 secondes au lieu de 2
});


});