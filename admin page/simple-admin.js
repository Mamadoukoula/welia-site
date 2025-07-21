// ========================================
// CONFIGURATION SUPABASE
// ========================================
// REMPLACEZ CES VALEURS PAR VOS VRAIES CLÉS SUPABASE :

const SUPABASE_URL = 'https://bfoeqgdartgbmhsagcqz.supabase.co';  // Ex: 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmb2VxZ2RhcnRnYm1oc2FnY3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTU0NDMsImV4cCI6MjA2NzAzMTQ0M30.R2mU0Ve2eMbVdtlt2Cwl_D7Zle80IvIXtq7yHgZhWaE';  // Ex: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// ========================================
// VÉRIFICATION DES CLÉS

// Initialisation du client Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ========================================
// CONFIGURATION DE L'APPLICATION
// ========================================
const STATUS_DISPLAY = {
    'pending': 'En attente',
    'delivered': 'Livrée',
    'cancelled': 'Annulée'
};

const STATUS_COLORS = {
    'pending': 'status-pending',
    'delivered': 'status-delivered',
    'cancelled': 'status-cancelled'
};

const ROW_COLORS = {
    'pending': 'order-row-pending',
    'delivered': 'order-row-delivered',
    'cancelled': 'order-row-cancelled'
};

// ========================================
// FONCTIONS UTILITAIRES
// ========================================
const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price) + ' FCFA';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// ========================================
// GESTION DE L'AUTHENTIFICATION
// ========================================
const checkAuth = async () => {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
};

const showLogin = () => {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('adminPage').classList.add('hidden');
};

const showAdmin = () => {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminPage').classList.remove('hidden');
};

const showError = (message) => {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = errorDiv.querySelector('p');
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
};

// ========================================
// GESTION DES COMMANDES
// ========================================
const loadOrders = async () => {
    const loadingDiv = document.getElementById('loadingOrders');
    const tableDiv = document.getElementById('ordersTable');
    const noOrdersDiv = document.getElementById('noOrders');
    const tableBody = document.getElementById('ordersTableBody');

    try {
        // Afficher le loading
        loadingDiv.classList.remove('hidden');
        tableDiv.classList.add('hidden');
        noOrdersDiv.classList.add('hidden');

        // Récupérer les commandes
        const { data: orders, error } = await supabaseClient
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur lors du chargement des commandes:', error);
            throw error;
        }

        loadingDiv.classList.add('hidden');

        if (!orders || orders.length === 0) {
            noOrdersDiv.classList.remove('hidden');
            updateStats([], 0, 0);
            return;
        }

        // Stocker les commandes globalement pour la recherche et l'export
        window.allOrders = orders;

        // Afficher les commandes
        displayOrders(orders);
        tableDiv.classList.remove('hidden');

        // Calculer les statistiques
        const stats = calculateStats(orders);
        updateStats(orders, stats.dailyRevenue, stats.uniqueClients);

    } catch (error) {
        console.error('Erreur:', error);
        loadingDiv.classList.add('hidden');
        alert('Erreur lors du chargement des commandes. Vérifiez vos clés Supabase.');
    }
};

const displayOrders = (orders) => {
    const tableBody = document.getElementById('ordersTableBody');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        const row = createOrderRow(order);
        tableBody.appendChild(row);
    });
};

const createOrderRow = (order) => {
    const row = document.createElement('tr');
    row.className = ROW_COLORS[order.status] || '';

    // Traitement des articles (items en JSON)
    let itemsDisplay = '';
    let itemsCount = 0;
    try {
        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        if (Array.isArray(items)) {
            itemsCount = items.length;
            itemsDisplay = items.map(item => `${item.name || item.title || 'Article'} (x${item.quantity || 1})`).join(', ');
        } else {
            itemsDisplay = order.items || 'N/A';
        }
    } catch (e) {
        itemsDisplay = order.items || 'N/A';
    }

    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">ORD-${String(order.id).padStart(3, '0')}</div>
            <div class="text-sm text-gray-500">${itemsCount} article(s)</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">${order.customer_name || 'N/A'}</div>
            <div class="text-sm text-gray-500">${order.customer_email || ''}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.customer_phone || 'N/A'}</td>
        <td class="px-6 py-4 text-sm text-gray-900" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;" title="${itemsDisplay}">
            ${itemsDisplay.length > 50 ? itemsDisplay.substring(0, 50) + '...' : itemsDisplay}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${formatPrice(order.total || 0)}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <select class="status-select ${STATUS_COLORS[order.status] || ''}" data-order-id="${order.id}" data-current-status="${order.status}">
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>En attente</option>
                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Livrée</option>
                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Annulée</option>
            </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDate(order.created_at)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button onclick="viewOrder(${order.id})" class="text-blue-600 hover:text-blue-900 mr-3" title="Voir les détails">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
            </button>
            <button onclick="editOrder(${order.id})" class="text-green-600 hover:text-green-900" title="Modifier">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            </button>
        </td>
    `;

    // Ajouter l'événement de changement de statut
    const statusSelect = row.querySelector('.status-select');
    statusSelect.addEventListener('change', (e) => {
        updateOrderStatus(order.id, e.target.value, e.target, row);
    });

    return row;
};

const updateOrderStatus = async (orderId, newStatus, selectElement, row) => {
    const originalStatus = selectElement.dataset.currentStatus;
    
    try {
        selectElement.disabled = true;
        
        console.log(`Tentative de mise à jour du statut de la commande ${orderId} vers: ${newStatus}`);
        
        const { data, error } = await supabaseClient
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId)
            .select();

        if (error) {
            console.error('Erreur lors de la mise à jour:', error);
            alert(`Erreur lors de la mise à jour du statut: ${error.message}`);
            selectElement.value = originalStatus;
            return;
        }

        if (data && data.length > 0) {
            // Mettre à jour l'interface
            selectElement.dataset.currentStatus = newStatus;
            selectElement.className = `status-select ${STATUS_COLORS[newStatus] || 'bg-gray-100 text-gray-800'}`;
            row.className = ROW_COLORS[newStatus] || '';

            console.log(`Statut de la commande #${orderId} mis à jour avec succès: ${newStatus}`);
            
            // Recharger les données pour mettre à jour les statistiques
            setTimeout(() => {
                loadOrders();
            }, 1000);
        } else {
            console.error('Aucune donnée retournée après la mise à jour');
            alert('Erreur: Aucune donnée retournée après la mise à jour.');
            selectElement.value = originalStatus;
        }

    } catch (error) {
        console.error('Erreur inattendue:', error);
        alert(`Erreur inattendue lors de la mise à jour du statut: ${error.message}`);
        selectElement.value = originalStatus;
    } finally {
        selectElement.disabled = false;
    }
};

const calculateStats = (orders) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const dailyOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        return orderDate === todayStr;
    });

    const dailyRevenue = dailyOrders.reduce((sum, order) => {
        return sum + (order.total || 0);
    }, 0);

    const uniqueClients = [...new Set(orders.map(order => order.customer_phone))].length;

    return {
        dailyRevenue,
        uniqueClients,
        totalOrders: orders.length
    };
};

const updateStats = (orders, dailyRevenue, uniqueClients) => {
    document.getElementById('dailyRevenue').textContent = formatPrice(dailyRevenue);
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalClients').textContent = uniqueClients;
};

// ========================================
// FONCTIONS SUPPLÉMENTAIRES
// ========================================
const exportToExcel = () => {
    if (!window.allOrders || window.allOrders.length === 0) {
        alert('Aucune commande à exporter');
        return;
    }

    const exportData = window.allOrders.map(order => {
        let itemsDisplay = '';
        try {
            const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
            if (Array.isArray(items)) {
                itemsDisplay = items.map(item => `${item.name || item.title || 'Article'} (x${item.quantity || 1})`).join(', ');
            } else {
                itemsDisplay = order.items || 'N/A';
            }
        } catch (e) {
            itemsDisplay = order.items || 'N/A';
        }

        return {
            'Numéro de commande': `ORD-${String(order.id).padStart(3, '0')}`,
            'Client': order.customer_name || 'N/A',
            'Téléphone': order.customer_phone || 'N/A',
            'Email': order.customer_email || '',
            'Articles': itemsDisplay,
            'Montant': `${order.total || 0} FCFA`,
            'Statut': STATUS_DISPLAY[order.status] || order.status,
            'Date de commande': formatDate(order.created_at),
            'Notes': order.notes || ''
        };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Commandes');
    
    const today = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `commandes_${today}.xlsx`);
};

const viewOrder = (orderId) => {
    const order = window.allOrders.find(o => o.id === orderId);
    if (!order) return;

    let itemsDisplay = '';
    try {
        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        if (Array.isArray(items)) {
            itemsDisplay = items.map(item => `• ${item.name || item.title || 'Article'} - Quantité: ${item.quantity || 1} - Prix: ${formatPrice(item.price || 0)}`).join('\n');
        } else {
            itemsDisplay = order.items || 'N/A';
        }
    } catch (e) {
        itemsDisplay = order.items || 'N/A';
    }

    const details = `
🛒 Commande: ORD-${String(order.id).padStart(3, '0')}
👤 Client: ${order.customer_name || 'N/A'}
📱 Téléphone: ${order.customer_phone || 'N/A'}
📧 Email: ${order.customer_email || 'N/A'}
💰 Montant: ${formatPrice(order.total || 0)}
📅 Date: ${formatDate(order.created_at)}
📋 Statut: ${STATUS_DISPLAY[order.status] || order.status}

📦 Articles:
${itemsDisplay}

📝 Notes: ${order.notes || 'Aucune note'}
    `;

    alert(details);
};

const editOrder = (orderId) => {
    const order = window.allOrders.find(o => o.id === orderId);
    if (!order) return;

    // Créer une popup de modification
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-lg font-semibold mb-4">Modifier la commande ORD-${String(orderId).padStart(3, '0')}</h3>
            <form id="editOrderForm">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nom du client</label>
                    <input type="text" id="editCustomerName" value="${order.customer_name || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input type="tel" id="editCustomerPhone" value="${order.customer_phone || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="editCustomerEmail" value="${order.customer_email || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea id="editNotes" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3">${order.notes || ''}</textarea>
                </div>
                <div class="flex justify-end gap-3">
                    <button type="button" id="cancelEdit" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sauvegarder</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Gestion des événements
    modal.querySelector('#cancelEdit').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.querySelector('#editOrderForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const updatedData = {
            customer_name: document.getElementById('editCustomerName').value.trim(),
            customer_phone: document.getElementById('editCustomerPhone').value.trim(),
            customer_email: document.getElementById('editCustomerEmail').value.trim(),
            notes: document.getElementById('editNotes').value.trim()
        };

        try {
            const { error } = await supabaseClient
                .from('orders')
                .update(updatedData)
                .eq('id', orderId);

            if (error) {
                console.error('Erreur lors de la mise à jour:', error);
                alert('Erreur lors de la mise à jour de la commande.');
                return;
            }

            alert('Commande mise à jour avec succès !');
            document.body.removeChild(modal);
            loadOrders(); // Recharger les commandes
        } catch (error) {
            console.error('Erreur inattendue:', error);
            alert('Erreur inattendue lors de la mise à jour.');
        }
    });

    // Fermer en cliquant en dehors
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
};

const searchOrders = (searchTerm, statusFilter) => {
    if (!window.allOrders) return [];
    
    let filtered = window.allOrders;
    
    if (searchTerm) {
        filtered = filtered.filter(order => {
            const searchLower = searchTerm.toLowerCase();
            return (
                order.customer_name?.toLowerCase().includes(searchLower) ||
                order.customer_phone?.includes(searchTerm) ||
                order.id.toString().includes(searchTerm) ||
                (`ORD-${String(order.id).padStart(3, '0')}`).toLowerCase().includes(searchLower)
            );
        });
    }
    
    if (statusFilter) {
        filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    return filtered;
};

// ========================================
// INITIALISATION DE L'APPLICATION
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    // Vérifier l'authentification au démarrage
    const user = await checkAuth();
    if (user) {
        showAdmin();
        loadOrders();
    } else {
        showLogin();
    }

    // ========================================
    // GESTION DU FORMULAIRE DE CONNEXION
    // ========================================
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');
        const loginText = document.getElementById('loginText');

        if (!email || !password) {
            showError('Veuillez remplir tous les champs.');
            return;
        }

        // État de chargement
        loginBtn.disabled = true;
        loginText.textContent = 'Connexion...';

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error('Erreur de connexion:', error);
                if (error.message.includes('Invalid login credentials')) {
                    showError('Email ou mot de passe incorrect.');
                } else {
                    showError('Erreur de connexion. Vérifiez vos clés Supabase.');
                }
                return;
            }

            if (data.user) {
                console.log('Connexion réussie:', data.user);
                showAdmin();
                loadOrders();
            }

        } catch (error) {
            console.error('Erreur inattendue:', error);
            showError('Erreur inattendue. Vérifiez vos clés Supabase.');
        } finally {
            loginBtn.disabled = false;
            loginText.textContent = 'Se connecter';
        }
    });

    // ========================================
    // GESTION DE LA DÉCONNEXION
    // ========================================
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) {
                console.error('Erreur lors de la déconnexion:', error);
            } else {
                console.log('Déconnexion réussie');
                showLogin();
                // Réinitialiser le formulaire
                document.getElementById('loginForm').reset();
            }
        } catch (error) {
            console.error('Erreur inattendue:', error);
        }
    });

    // ========================================
    // BOUTONS ET ÉVÉNEMENTS
    // ========================================
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', loadOrders);

    // Bouton d'export Excel
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', exportToExcel);

    // Recherche en temps réel
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    
    const performSearch = () => {
        const searchTerm = searchInput.value.trim();
        const statusValue = statusFilter.value;
        const filteredOrders = searchOrders(searchTerm, statusValue);
        displayOrders(filteredOrders);
    };

    searchInput.addEventListener('input', performSearch);
    statusFilter.addEventListener('change', performSearch);

    // ========================================
    // ÉCOUTE DES CHANGEMENTS EN TEMPS RÉEL
    // ========================================
    const subscription = supabaseClient
        .channel('orders-changes')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'orders' }, 
            (payload) => {
                console.log('Changement détecté:', payload);
                loadOrders();
            }
        )
        .subscribe();

    // Nettoyer à la fermeture
    window.addEventListener('beforeunload', () => {
        subscription.unsubscribe();
    });
});