// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        const mobileMenuIcon = mobileMenuBtn.querySelector('i');
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            mobileMenu.classList.toggle('active');
            
            // Toggle icon between bars and times
            if (mobileMenu.classList.contains('active')) {
                if (mobileMenuIcon) mobileMenuIcon.className = 'fas fa-times';
            } else {
                if (mobileMenuIcon) mobileMenuIcon.className = 'fas fa-bars';
            }
        });
        
        // Mobile dropdown functionality
        const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
        mobileDropdownBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.mobile-dropdown');
                dropdown.classList.toggle('active');
            });
        });

        // Close mobile menu when clicking on regular links (not dropdown buttons)
        const mobileLinks = document.querySelectorAll('.mobile-link:not(.mobile-dropdown-btn), .mobile-submenu-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                if (mobileMenuIcon) mobileMenuIcon.className = 'fas fa-bars';
                
                // Close all dropdowns
                const dropdowns = document.querySelectorAll('.mobile-dropdown');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileMenuIcon) mobileMenuIcon.className = 'fas fa-bars';
                }
            }
        });
    }
});

// Smooth scrolling for anchor links
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

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .section-header');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animationDelay = '0s';
            element.style.animationPlayState = 'running';
        }
    });
}

// Throttled scroll event
let ticking = false;
function updateAnimations() {
    animateOnScroll();
    ticking = false;
}

function requestAnimationUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

window.addEventListener('scroll', requestAnimationUpdate);

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
    }
});

// Cart functionality
let cart = [];
const cartCountElement = document.querySelector('.cart-count');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Toggle cart sidebar
function toggleCart() {
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
    }
}

// Update cart count display
function updateCartCount() {
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCountElement.classList.add('show');
        } else {
            cartCountElement.classList.remove('show');
        }
    }
}

// Update cart total
function updateCartTotal() {
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2) + ' CFA';
    }
}

// Show success message
function showSuccessMessage(productName) {
    const successMsg = document.createElement('div');
    successMsg.className = 'cart-success';
    successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${productName} ajouté au panier!`;
    document.body.appendChild(successMsg);
    
    setTimeout(() => successMsg.classList.add('show'), 100);
    setTimeout(() => {
        successMsg.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(successMsg)) {
                document.body.removeChild(successMsg);
            }
        }, 300);
    }, 3000);
}

// Add item to cart
function addToCart(product, price, image) {
    const existingItem = cart.find(item => item.product === product);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product: product,
            price: parseFloat(price),
            image: image || 'https://via.placeholder.com/60x60',
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
    showSuccessMessage(product);
}

// Remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.product !== productName);
    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
}

// Update item quantity
function updateQuantity(productName, change) {
    const item = cart.find(item => item.product === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCartDisplay();
            updateCartCount();
            updateCartTotal();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }
    
    if (checkoutBtn) checkoutBtn.style.display = 'block';
    
    cartItems.innerHTML = cart.map(item => {
        const escapedProduct = item.product.replace(/'/g, "\\'");
        return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.product}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.product}</div>
                <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${escapedProduct}', -1)">-</button>
                    <span class="quantity-number">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${escapedProduct}', 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart('${escapedProduct}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Process checkout - redirect to WhatsApp
function processCheckout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }
    
    // Prepare order details for WhatsApp
    let orderMessage = "🛒 *Nouvelle Commande - Welia Online Support*\n\n";
    orderMessage += "📋 *Détails de la commande:*\n";
    
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.product}\n`;
        orderMessage += `   💰 Prix: ${item.price.toFixed(2)} €\n`;
        orderMessage += `   📦 Quantité: ${item.quantity}\n`;
        orderMessage += `   💵 Sous-total: ${(item.price * item.quantity).toFixed(2)} €\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderMessage += `💳 *TOTAL: ${total.toFixed(2)} €*\n\n`;
    orderMessage += "📞 Je souhaite finaliser cette commande.\n";
    orderMessage += "Merci de me contacter pour les détails de paiement et de livraison.";
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // WhatsApp business number
    const whatsappNumber = "221764581300";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Optionally clear cart after sending
    setTimeout(() => {
        cart = [];
        updateCartDisplay();
        updateCartCount();
        updateCartTotal();
        toggleCart();
    }, 1000);
}

// Event listeners for add to cart buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        
        const button = e.target;
        const product = button.getAttribute('data-product');
        const price = button.getAttribute('data-price');
        const image = button.getAttribute('data-image');
        
        // Add animation
        button.classList.add('adding');
        setTimeout(() => button.classList.remove('adding'), 300);
        
        addToCart(product, price, image);
    }
});

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    if (cartSidebar && !cartSidebar.contains(e.target) && !e.target.closest('.cart-btn')) {
        if (cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    }
});

// Keyboard navigation for cart
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartSidebar && cartSidebar.classList.contains('active')) {
        toggleCart();
    }
});

// Touch support for mobile devices
if ('ontouchstart' in window) {
    // Add touch class to body for touch-specific styles
    document.body.classList.add('touch-device');
    
    // Improve touch scrolling
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
}

// Responsive image loading
function handleResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
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
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize responsive images
document.addEventListener('DOMContentLoaded', handleResponsiveImages);

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(setViewportHeight, 100));

// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const mainChatBtn = document.getElementById('mainChatBtn');
    const contactOptions = document.getElementById('contactOptions');
    const chatOverlay = document.getElementById('chatOverlay');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const smsBtn = document.getElementById('smsBtn');
    const emailBtn = document.getElementById('emailBtn');

    if (mainChatBtn && contactOptions) {
        mainChatBtn.addEventListener('click', function() {
            contactOptions.classList.toggle('active');
            chatOverlay.classList.toggle('active');
        });

        chatOverlay.addEventListener('click', function() {
            contactOptions.classList.remove('active');
            chatOverlay.classList.remove('active');
        });

        // WhatsApp contact
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const whatsappNumber = "221764581300";
                const message = "Bonjour, je souhaite obtenir des informations sur vos services IT.";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }

        // SMS contact
        if (smsBtn) {
            smsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const phoneNumber = "221764581300";
                const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent("Bonjour, je souhaite des informations sur vos services IT.")}`;
                window.location.href = smsUrl;
            });
        }

        // Email contact
        if (emailBtn) {
            emailBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const email = "contact@welia-africa.com";
                const subject = "Demande d'information - Services IT";
                const body = "Bonjour,\n\nJe souhaite obtenir des informations sur vos services informatiques.\n\nCordialement";
                const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = emailUrl;
            });
        }
    }

    // Form submission
    const interventionForm = document.getElementById('interventionForm');
    if (interventionForm) {
        interventionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Create WhatsApp message
            let message = "🆘 *DEMANDE D'INTERVENTION*\n\n";
            message += `👤 **Client:** ${data.firstName} ${data.lastName}\n`;
            message += `📧 **Email:** ${data.email}\n`;
            message += `📱 **Téléphone:** ${data.phone}\n`;
            message += `🔧 **Service:** ${data.service}\n`;
            message += `⚡ **Urgence:** ${data.urgency}\n\n`;
            message += `📝 **Description:**\n${data.description}\n\n`;
            message += "Merci de me recontacter rapidement.";
            
            const whatsappNumber = "221764581300";
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            alert('Votre demande a été envoyée! Nous vous contacterons rapidement.');
            interventionForm.reset();
        });
    }

    // FAQ functionality
    initializeFAQ();

    // Initialize cart and animations
    updateCartCount();
    updateCartTotal();
    updateCartDisplay();
    
    // Set initial animation states
    const animatedElements = document.querySelectorAll('[class*="fadeIn"], [class*="scaleIn"]');
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
    });
    
    // Trigger initial scroll check
    setTimeout(animateOnScroll, 100);
});

// FAQ Search and Filter Functionality
function initializeFAQ() {
    const searchInput = document.getElementById('faqSearch');
    const clearSearch = document.getElementById('clearSearch');
    const searchResults = document.getElementById('searchResults');
    const resultsText = document.getElementById('resultsText');
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    const noResults = document.getElementById('noResults');
    const faqContainer = document.getElementById('faqContainer');

    if (!searchInput) return;

    let currentCategory = 'all';

    // FAQ Item Toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        if (searchTerm) {
            clearSearch.style.display = 'block';
        } else {
            clearSearch.style.display = 'none';
        }

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const category = item.getAttribute('data-category');
            
            const matchesSearch = !searchTerm || question.includes(searchTerm) || answer.includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            
            if (matchesSearch && matchesCategory) {
                item.classList.remove('hidden');
                visibleCount++;
                
                // Highlight search terms
                if (searchTerm) {
                    highlightSearchTerm(item, searchTerm);
                } else {
                    removeHighlight(item);
                }
            } else {
                item.classList.add('hidden');
                item.classList.remove('active');
            }
        });

        // Update results count
        if (searchTerm) {
            searchResults.style.display = 'block';
            resultsText.textContent = `${visibleCount} résultat${visibleCount !== 1 ? 's' : ''} trouvé${visibleCount !== 1 ? 's' : ''}`;
        } else {
            searchResults.style.display = 'none';
        }

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            faqContainer.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            faqContainer.style.display = 'block';
        }
    }

    function highlightSearchTerm(item, term) {
        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer');
        
        [question, answer].forEach(element => {
            const originalText = element.getAttribute('data-original') || element.innerHTML;
            if (!element.getAttribute('data-original')) {
                element.setAttribute('data-original', originalText);
            }
            
            const regex = new RegExp(`(${term})`, 'gi');
            const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
            element.innerHTML = highlightedText;
        });
    }

    function removeHighlight(item) {
        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer');
        
        [question, answer].forEach(element => {
            const originalText = element.getAttribute('data-original');
            if (originalText) {
                element.innerHTML = originalText;
            }
        });
    }

    // Search input event
    searchInput.addEventListener('input', debounce(performSearch, 300));

    // Clear search
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        clearSearch.style.display = 'none';
        faqItems.forEach(item => removeHighlight(item));
        performSearch();
    });

    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active category button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update current category
            currentCategory = btn.getAttribute('data-category');
            
            // Perform search with new category
            performSearch();
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to clear search
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.blur();
            if (searchInput.value) {
                searchInput.value = '';
                clearSearch.style.display = 'none';
                faqItems.forEach(item => removeHighlight(item));
                performSearch();
            }
        }
    });

    // Initial display
    performSearch();
}

// Toggle chat function for FAQ
function toggleChat() {
    const mainChatBtn = document.getElementById('mainChatBtn');
    const contactOptions = document.getElementById('contactOptions');
    const chatOverlay = document.getElementById('chatOverlay');
    
    if (mainChatBtn && contactOptions) {
        contactOptions.classList.add('active');
        chatOverlay.classList.add('active');
    }
}

// Initialize mobile menu for services page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // Mobile dropdown functionality
    const mobileDropdowns = document.querySelectorAll('.mobile-nav-dropdown');
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.mobile-nav-link');
        const submenu = dropdown.querySelector('.mobile-submenu');
        
        if (link && submenu) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.includes('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

// new code for corosoll

class Carousel {
            constructor(container) {
                this.container = container;
                this.slides = container.querySelector('.carousel-slides');
                this.slideItems = container.querySelectorAll('.carousel-slide');
                this.prevBtn = container.querySelector('.carousel-prev');
                this.nextBtn = container.querySelector('.carousel-next');
                this.indicatorsContainer = container.querySelector('.carousel-indicators');
                
                this.currentSlide = 0;
                this.totalSlides = this.slideItems.length;
                
                this.init();
            }
            
            init() {
                this.createIndicators();
                this.updateCarousel();
                this.attachEvents();
                this.startAutoPlay();
            }
            
            createIndicators() {
                this.indicatorsContainer.innerHTML = '';
                for (let i = 0; i < this.totalSlides; i++) {
                    const indicator = document.createElement('button');
                    indicator.className = 'carousel-indicator';
                    indicator.addEventListener('click', () => this.goToSlide(i));
                    this.indicatorsContainer.appendChild(indicator);
                }
            }
            
            updateCarousel() {
                const translateX = -this.currentSlide * 100;
                this.slides.style.transform = `translateX(${translateX}%)`;
                
                // Mettre à jour les indicateurs
                const indicators = this.indicatorsContainer.querySelectorAll('.carousel-indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarousel();
            }
            
            prevSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateCarousel();
            }
            
            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateCarousel();
            }
            
            attachEvents() {
                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetAutoPlay();
                });
                
                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetAutoPlay();
                });
                
                // Navigation au clavier
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.prevSlide();
                        this.resetAutoPlay();
                    } else if (e.key === 'ArrowRight') {
                        this.nextSlide();
                        this.resetAutoPlay();
                    }
                });
                
                // Pause au survol
                this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.container.addEventListener('mouseleave', () => this.startAutoPlay());
            }
            
            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, 4000);
            }
            
            stopAutoPlay() {
                clearInterval(this.autoPlayInterval);
            }
            
            resetAutoPlay() {
                this.stopAutoPlay();
                this.startAutoPlay();
            }
        }
        
        // Initialiser le carrousel - Version plus robuste
        function initCarousel() {
            const carouselContainer = document.querySelector('.carousel-container');
            if (carouselContainer) {
                new Carousel(carouselContainer);
                console.log('Carrousel initialisé avec succès');
            } else {
                console.error('Élément .carousel-container non trouvé');
            }
        }
        
        // Plusieurs méthodes pour s'assurer que le carrousel se lance
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCarousel);
        } else {
            initCarousel();
        }
        
        // Sécurité supplémentaire
        window.addEventListener('load', () => {
            setTimeout(initCarousel, 100);
        });
    
});
