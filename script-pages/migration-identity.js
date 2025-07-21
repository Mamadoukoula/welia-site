// Migration Identity JavaScript Functions

// Modal Management
function openMigrationModal() {
    const modal = document.getElementById('migration-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeMigrationModal() {
    const modal = document.getElementById('migration-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('migration-modal');
    if (event.target === modal) {
        closeMigrationModal();
    }
});

// Migration Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const migrationForm = document.getElementById('migration-form');
    if (migrationForm) {
        migrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                companyName: document.getElementById('company-name').value,
                contactName: document.getElementById('contact-name').value,
                email: document.getElementById('email').value,
                infrastructure: document.getElementById('current-infrastructure').value,
                usersCount: document.getElementById('users-count').value,
                migrationNeeds: document.getElementById('migration-needs').value
            };
            
            console.log('Demande de migration soumise:', formData);
            
            // Simulate form submission
            const submitButton = e.target.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Votre demande d\'évaluation a été envoyée avec succès ! Nous vous recontacterons sous 24h.');
                migrationForm.reset();
                closeMigrationModal();
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Show Migration Service Details
function showMigrationDetails(serviceType) {
    const details = {
        'ad-hybrid': {
            title: 'Hybridation Active Directory',
            content: `
                <h4>Azure AD Connect</h4>
                <p>Synchronisation automatique entre votre Active Directory on-premise et Azure AD.</p>
                
                <h4>Single Sign-On (SSO)</h4>
                <p>Authentification unique pour tous vos services cloud et on-premise.</p>
                
                <h4>Gestion centralisée</h4>
                <p>Administration unifiée des identités depuis une console unique.</p>
                
                <strong>Durée estimée :</strong> 2-4 semaines<br>
                <strong>Coût :</strong> À partir de 2 500€
            `
        },
        'os-migration': {
            title: 'Migration OS Windows',
            content: `
                <h4>Analyse de compatibilité</h4>
                <p>Vérification complète de la compatibilité matérielle et logicielle.</p>
                
                <h4>Sauvegarde sécurisée</h4>
                <p>Protection complète de vos données avant la migration.</p>
                
                <h4>Migration assistée</h4>
                <p>Transfert automatisé vers Windows 11 avec conservation des paramètres.</p>
                
                <strong>Durée estimée :</strong> 1-2 semaines<br>
                <strong>Coût :</strong> À partir de 150€/poste
            `
        },
        'security': {
            title: 'Sécurité & Identité',
            content: `
                <h4>Multi-Factor Authentication</h4>
                <p>Protection renforcée avec authentification à plusieurs facteurs.</p>
                
                <h4>Conditional Access</h4>
                <p>Contrôle d'accès intelligent basé sur les risques.</p>
                
                <h4>Identity Protection</h4>
                <p>Détection proactive des menaces sur les identités.</p>
                
                <strong>Durée estimée :</strong> 3-6 semaines<br>
                <strong>Coût :</strong> À partir de 1 800€
            `
        }
    };
    
    const detail = details[serviceType];
    if (detail) {
        alert(`${detail.title}\n\n${detail.content.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n').trim()}`);
    }
}

// Windows 11 Compatibility Checker
function checkCompatibility() {
    const cpu = document.getElementById('cpu-model').value.toLowerCase();
    const ram = parseInt(document.getElementById('ram-amount').value);
    const storage = document.getElementById('storage-type').value;
    const tpm = document.getElementById('tpm-version').value;
    
    const resultDiv = document.getElementById('compatibility-result');
    
    let compatible = true;
    let issues = [];
    let recommendations = [];
    
    // Check RAM
    if (ram < 4) {
        compatible = false;
        issues.push('RAM insuffisante (minimum 4 GB requis)');
        recommendations.push('Mise à niveau vers au moins 4 GB de RAM');
    }
    
    // Check TPM
    if (tpm === 'none' || tpm === '1.2') {
        compatible = false;
        issues.push('TPM 2.0 requis pour Windows 11');
        recommendations.push('Activation ou mise à niveau du module TPM');
    }
    
    // Check CPU (simplified check)
    const unsupportedCpus = ['pentium', 'celeron', 'atom'];
    const isUnsupported = unsupportedCpus.some(unsupported => cpu.includes(unsupported));
    
    if (isUnsupported) {
        compatible = false;
        issues.push('Processeur non compatible avec Windows 11');
        recommendations.push('Mise à niveau du processeur requis');
    }
    
    // Storage recommendation
    if (storage === 'hdd') {
        recommendations.push('Mise à niveau vers SSD recommandée pour de meilleures performances');
    }
    
    // Display results
    resultDiv.style.display = 'block';
    
    if (compatible && issues.length === 0) {
        resultDiv.className = 'compatibility-result compatible';
        resultDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                <i class="fas fa-check-circle" style="font-size: 1.5rem; color: #16a34a;"></i>
                <strong>Système compatible avec Windows 11 !</strong>
            </div>
            <p>Votre système répond aux exigences minimales pour Windows 11.</p>
            ${recommendations.length > 0 ? `<p><strong>Recommandations :</strong><br>${recommendations.join('<br>')}</p>` : ''}
        `;
    } else if (recommendations.length > 0 && issues.length === 0) {
        resultDiv.className = 'compatibility-result partial';
        resultDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 1.5rem; color: #d97706;"></i>
                <strong>Compatible avec améliorations possibles</strong>
            </div>
            <p>Votre système est compatible mais pourrait bénéficier d'améliorations.</p>
            <p><strong>Recommandations :</strong><br>${recommendations.join('<br>')}</p>
        `;
    } else {
        resultDiv.className = 'compatibility-result incompatible';
        resultDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                <i class="fas fa-times-circle" style="font-size: 1.5rem; color: #dc2626;"></i>
                <strong>Système non compatible</strong>
            </div>
            <p>Votre système ne répond pas aux exigences pour Windows 11.</p>
            <p><strong>Problèmes détectés :</strong><br>${issues.join('<br>')}</p>
            <p><strong>Actions requises :</strong><br>${recommendations.join('<br>')}</p>
        `;
    }
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Timeline animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });
});

// Console log for debugging
console.log('Migration Identity page loaded successfully');