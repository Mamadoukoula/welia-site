// Articles data
const articles = [
    {
        id: 1,
        title: "SSD invisible à l'installation de Windows: charger les pilotes Intel RST",
        excerpt: "Un disque dur SSD peut être invisible et inaccessible pendant l'installation de Windows pour plusieurs raisons, mais le plus souvent...",
        author: "Maxime Lenoir",
        date: "13/04/2025",
        comments: 0,
        category: "Tutoriels de dépannage",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
        featured: true
    },
    {
        id: 2,
        title: "Quelques logiciels efficaces pour dépanner un PC Windows",
        excerpt: "Dépanner un PC sous Windows peut impliquer divers types de problèmes logiciels et matériels. Heureusement, il existe des logiciels efficaces...",
        author: "Maxime Lenoir",
        date: "16/01/2025",
        comments: 1,
        category: "Tutoriels de dépannage",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
    },
    {
        id: 3,
        title: "USB device over current status detected: comment corriger l'erreur",
        excerpt: "L'alerte « USB device over current status detected » se produit lorsque la carte mère de l'ordinateur détecte une surintensité électrique au...",
        author: "Léo Dugué",
        date: "24/10/2024",
        comments: 1,
        category: "Hardware & Gaming",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
    },
    {
        id: 4,
        title: "Comment choisir sa RAM pour monter un PC fixe ? Le dossier technique complet",
        excerpt: "La RAM (Random Access Memory) pour PC fixe se présente sous forme de barrettes de mémoire (aussi appelés modules de...",
        author: "Léo Dugué",
        date: "28/04/2024",
        comments: 0,
        category: "Hardware & Gaming",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop"
    },
    {
        id: 5,
        title: "Mettre à jour le BIOS de sa carte mère en toute sécurité",
        excerpt: "Mettre à jour le firmware (BIOS ou UEFI) de sa carte mère, est une opération qui peut s'avérer délicate. À...",
        author: "Léo Dugué",
        date: "20/11/2023",
        comments: 2,
        category: "Guides & Dossiers",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop"
    },
    {
        id: 6,
        title: "Plus de son sur Windows 10/11: nos solutions au problème",
        excerpt: "Plus de son sur votre pc ? Plusieurs raisons peuvent causer des problèmes de perte de son sur Windows: mauvaise...",
        author: "Maxime Lenoir",
        date: "19/09/2024",
        comments: 5,
        category: "Tutoriels de dépannage",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"
    },
    {
        id: 7,
        title: "Sécuriser son réseau Wi-Fi domestique : guide complet",
        excerpt: "La sécurité de votre réseau Wi-Fi est cruciale pour protéger vos données personnelles. Découvrez comment configurer un réseau sécurisé...",
        author: "Sarah Martin",
        date: "05/03/2025",
        comments: 3,
        category: "Sécurité informatique",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop"
    },
    {
        id: 8,
        title: "L'impact écologique du numérique : comment réduire son empreinte",
        excerpt: "Le secteur numérique représente 4% des émissions mondiales de gaz à effet de serre. Voici comment agir pour un numérique plus responsable...",
        author: "Thomas Dubois",
        date: "22/02/2025",
        comments: 7,
        category: "Écologie",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop"
    }
];

const categories = [
    'Tous les articles',
    'Tutoriels de dépannage',
    'Hardware & Gaming',
    'Écologie',
    'Guides & Dossiers',
    'Tutoriels divers',
    'Sécurité informatique'
];

// State
let filteredArticles = [...articles];
let currentSearchTerm = '';
let currentCategory = 'Tous les articles';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const articlesGrid = document.getElementById('articlesGrid');
const categoriesList = document.getElementById('categoriesList');
const popularArticles = document.getElementById('popularArticles');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderArticles();
    renderCategories();
    renderPopularArticles();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleCategoryChange);
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// Search functionality
function handleSearch(e) {
    currentSearchTerm = e.target.value.toLowerCase();
    filterArticles();
}

// Category filter
function handleCategoryChange(e) {
    currentCategory = e.target.value;
    filterArticles();
    updateCategoriesDisplay();
}

// Filter articles based on search and category
function filterArticles() {
    filteredArticles = articles.filter(article => {
        const matchesSearch = !currentSearchTerm || 
            article.title.toLowerCase().includes(currentSearchTerm) ||
            article.excerpt.toLowerCase().includes(currentSearchTerm);
        
        const matchesCategory = currentCategory === 'Tous les articles' || 
            article.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    renderArticles();
}

// Render articles
function renderArticles() {
    articlesGrid.innerHTML = '';
    
    if (filteredArticles.length === 0) {
        articlesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>Aucun article trouvé</h3>
                <p>Essayez de modifier votre recherche ou vos filtres.</p>
            </div>
        `;
        return;
    }
    
    filteredArticles.forEach(article => {
        const articleElement = createArticleElement(article);
        articlesGrid.appendChild(articleElement);
    });
}

// Create article element
function createArticleElement(article) {
    const articleDiv = document.createElement('div');
    articleDiv.className = `article-card fade-in${article.featured ? ' featured' : ''}`;
    
    articleDiv.innerHTML = `
        <div class="article-image" style="background-image: url('${article.image}')">
            <span class="article-category">${article.category}</span>
            ${article.featured ? '<span class="featured-badge">À la Une</span>' : ''}
        </div>
        <div class="article-content">
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-meta">
                <div class="article-author-date">
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>${article.author}</span>
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>${article.date}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>${article.comments} commentaire${article.comments !== 1 ? 's' : ''}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to article
    articleDiv.addEventListener('click', () => {
        console.log(`Clicked on article: ${article.title}`);
        // Here you can add navigation to the full article page
    });
    
    return articleDiv;
}

// Render categories sidebar
function renderCategories() {
    categoriesList.innerHTML = '';
    
    categories.slice(1).forEach(category => {
        const count = articles.filter(article => article.category === category).length;
        const categoryDiv = document.createElement('div');
        categoryDiv.className = `category-item${currentCategory === category ? ' active' : ''}`;
        
        categoryDiv.innerHTML = `
            <span>${category}</span>
            <span class="category-count">${count}</span>
        `;
        
        categoryDiv.addEventListener('click', () => {
            currentCategory = category;
            categoryFilter.value = category;
            filterArticles();
            updateCategoriesDisplay();
        });
        
        categoriesList.appendChild(categoryDiv);
    });
}

// Update categories display
function updateCategoriesDisplay() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        const categoryName = item.querySelector('span').textContent;
        item.classList.toggle('active', categoryName === currentCategory);
    });
}

// Render popular articles
function renderPopularArticles() {
    popularArticles.innerHTML = '';
    
    articles.slice(0, 3).forEach(article => {
        const popularDiv = document.createElement('div');
        popularDiv.className = 'popular-article';
        
        popularDiv.innerHTML = `
            <div class="popular-article-image" style="background-image: url('${article.image}')"></div>
            <div class="popular-article-content">
                <h4 class="popular-article-title">${article.title}</h4>
                <p class="popular-article-date">${article.date}</p>
            </div>
        `;
        
        popularDiv.addEventListener('click', () => {
            console.log(`Clicked on popular article: ${article.title}`);
            // Here you can add navigation to the full article page
        });
        
        popularArticles.appendChild(popularDiv);
    });
}

// Newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        alert(`Merci ! Vous êtes maintenant abonné(e) avec l'email : ${email}`);
        e.target.reset();
    }
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Add loading animation
function showLoading() {
    articlesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 16px;">Chargement des articles...</p>
        </div>
    `;
}

// CSS for loading animation
const loadingCSS = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Add loading CSS to head
const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);