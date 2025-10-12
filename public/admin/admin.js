// Store pour les données
let menuData = {
    entrees: [],
    potages: [],
    plats: [],
    moules: [],
    pizzas: [],
    formules: [],
    enfant: [],
    desserts: [],
    glaces: []
};

let newsData = [];

// Fonction pour charger les données depuis localStorage
function loadData() {
    const savedMenu = localStorage.getItem('papio-menu-data');
    const savedNews = localStorage.getItem('papio-news-data');

    if (savedMenu) {
        menuData = JSON.parse(savedMenu);
    } else {
        // Données initiales de démonstration
        initializeDefaultData();
    }

    if (savedNews) {
        newsData = JSON.parse(savedNews);
    } else {
        initializeDefaultNews();
    }

    renderAllCategories();
    renderNews();
}

// Initialiser les données par défaut
function initializeDefaultData() {
    menuData = {
        entrees: [
            {
                id: 'entree-1',
                name: 'Œuf mimosa',
                nameEn: 'Devilled Eggs',
                price: '6,50',
                description: 'Un classique réconfortant : œufs farcis d\'une mousse légère et onctueuse, relevée d\'une pointe de moutarde.',
                descriptionEn: 'A comforting classic: eggs filled with a light and creamy mousse, enhanced with a touch of mustard.',
                ingredients: '',
                ingredientsEn: ''
            }
        ],
        potages: [
            {
                id: 'potage-1',
                name: 'Soupe de poisson maison',
                nameEn: 'Homemade Fish Soup',
                price: '8,50',
                description: 'Soupe onctueuse préparée selon la tradition, servie avec croûtons et rouille',
                descriptionEn: 'Creamy soup prepared according to tradition, served with croutons and rouille',
                ingredients: 'Poissons frais du jour, légumes, aromates',
                ingredientsEn: 'Fresh fish of the day, vegetables, herbs'
            }
        ],
        plats: [],
        moules: [],
        pizzas: [],
        formules: [],
        enfant: [],
        desserts: [],
        glaces: []
    };
    saveData();
}

function initializeDefaultNews() {
    newsData = [
        {
            id: 'news-1',
            title: 'Bienvenue au Papio',
            date: new Date().toISOString().split('T')[0],
            content: 'Découvrez notre nouveau restaurant sur le port de Cherbourg. Cuisine authentique et pizzas artisanales vous attendent dans une ambiance chaleureuse.'
        }
    ];
    saveNewsData();
}

// Sauvegarder les données
function saveData() {
    localStorage.setItem('papio-menu-data', JSON.stringify(menuData));
    // Aussi sauvegarder dans le format de fichiers markdown
    exportToMarkdown();
}

function saveNewsData() {
    localStorage.setItem('papio-news-data', JSON.stringify(newsData));
}

// Exporter vers format Markdown (simulation)
function exportToMarkdown() {
    console.log('📝 Export Markdown simulation');
    // Dans une vraie application, cela générerait les fichiers .md
    Object.keys(menuData).forEach(category => {
        menuData[category].forEach(item => {
            const markdown = generateMarkdown(item);
            console.log(`Fichier: src/content/menu/${category}/${slugify(item.name)}.md`);
            console.log(markdown);
        });
    });
}

function generateMarkdown(item) {
    return `---
name: "${item.name}"
nameEn: "${item.nameEn}"
price: "${item.price}"
description: "${item.description || ''}"
descriptionEn: "${item.descriptionEn || ''}"
ingredients: "${item.ingredients || ''}"
ingredientsEn: "${item.ingredientsEn || ''}"
order: 1
available: true
---`;
}

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Rendu des catégories
function renderAllCategories() {
    Object.keys(menuData).forEach(category => {
        renderCategory(category);
    });
}

function renderCategory(category) {
    const container = document.getElementById(`${category}-list`);
    if (!container) return;

    const items = menuData[category];

    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>Aucun élément dans cette catégorie</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                ${item.nameEn ? `<div class="item-name" style="font-size: 14px; color: #888;">${item.nameEn}</div>` : ''}
                ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
                ${item.ingredients ? `<div class="item-description" style="font-style: italic; color: #999;">${item.ingredients}</div>` : ''}
                <div class="item-price">${item.price} €</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="editItem('${category}', '${item.id}')">✏️ Modifier</button>
                <button class="btn btn-delete" onclick="deleteItem('${category}', '${item.id}')">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

// Rendu des actualités
function renderNews() {
    const container = document.getElementById('news-list');
    if (!container) return;

    if (newsData.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📰</div>
                <p>Aucune actualité</p>
            </div>
        `;
        return;
    }

    container.innerHTML = newsData.map(news => `
        <div class="item-card">
            <div class="item-info">
                <div class="category-badge">${formatDate(news.date)}</div>
                <div class="item-name">${news.title}</div>
                <div class="item-description">${truncate(news.content, 150)}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="editNews('${news.id}')">✏️ Modifier</button>
                <button class="btn btn-delete" onclick="deleteNews('${news.id}')">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

// Gestion des onglets
function switchTab(tabName) {
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activer l'onglet sélectionné
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Modal pour les items du menu
function openAddModal(category) {
    document.getElementById('modalTitle').textContent = `Ajouter - ${getCategoryLabel(category)}`;
    document.getElementById('itemCategory').value = category;
    document.getElementById('itemId').value = '';
    document.getElementById('itemForm').reset();
    document.getElementById('itemModal').classList.add('active');
}

function editItem(category, itemId) {
    const item = menuData[category].find(i => i.id === itemId);
    if (!item) return;

    document.getElementById('modalTitle').textContent = `Modifier - ${item.name}`;
    document.getElementById('itemCategory').value = category;
    document.getElementById('itemId').value = itemId;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemNameEn').value = item.nameEn || '';
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemDescription').value = item.description || '';
    document.getElementById('itemDescriptionEn').value = item.descriptionEn || '';
    document.getElementById('itemIngredients').value = item.ingredients || '';
    document.getElementById('itemIngredientsEn').value = item.ingredientsEn || '';
    document.getElementById('itemModal').classList.add('active');
}

function closeModal() {
    document.getElementById('itemModal').classList.remove('active');
}

// Soumettre le formulaire d'item
document.getElementById('itemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const category = document.getElementById('itemCategory').value;
    const itemId = document.getElementById('itemId').value;

    const item = {
        id: itemId || `${category}-${Date.now()}`,
        name: document.getElementById('itemName').value,
        nameEn: document.getElementById('itemNameEn').value,
        price: document.getElementById('itemPrice').value,
        description: document.getElementById('itemDescription').value,
        descriptionEn: document.getElementById('itemDescriptionEn').value,
        ingredients: document.getElementById('itemIngredients').value,
        ingredientsEn: document.getElementById('itemIngredientsEn').value
    };

    if (itemId) {
        // Modifier
        const index = menuData[category].findIndex(i => i.id === itemId);
        menuData[category][index] = item;
    } else {
        // Ajouter
        menuData[category].push(item);
    }

    saveData();
    renderCategory(category);
    closeModal();
    showNotification(itemId ? 'Élément modifié avec succès!' : 'Élément ajouté avec succès!');
});

// Supprimer un item
function deleteItem(category, itemId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

    menuData[category] = menuData[category].filter(i => i.id !== itemId);
    saveData();
    renderCategory(category);
    showNotification('Élément supprimé avec succès!');
}

// Modal pour les actualités
function openAddNewsModal() {
    document.getElementById('newsModalTitle').textContent = 'Ajouter une actualité';
    document.getElementById('newsId').value = '';
    document.getElementById('newsForm').reset();
    document.getElementById('newsDate').valueAsDate = new Date();
    document.getElementById('newsModal').classList.add('active');
}

function editNews(newsId) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;

    document.getElementById('newsModalTitle').textContent = 'Modifier l\'actualité';
    document.getElementById('newsId').value = newsId;
    document.getElementById('newsTitle').value = news.title;
    document.getElementById('newsDate').value = news.date;
    document.getElementById('newsContent').value = news.content;
    document.getElementById('newsModal').classList.add('active');
}

function closeNewsModal() {
    document.getElementById('newsModal').classList.remove('active');
}

// Soumettre le formulaire d'actualité
document.getElementById('newsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newsId = document.getElementById('newsId').value;

    const news = {
        id: newsId || `news-${Date.now()}`,
        title: document.getElementById('newsTitle').value,
        date: document.getElementById('newsDate').value,
        content: document.getElementById('newsContent').value
    };

    if (newsId) {
        // Modifier
        const index = newsData.findIndex(n => n.id === newsId);
        newsData[index] = news;
    } else {
        // Ajouter
        newsData.unshift(news);
    }

    saveNewsData();
    renderNews();
    closeNewsModal();
    showNotification(newsId ? 'Actualité modifiée avec succès!' : 'Actualité ajoutée avec succès!');
});

// Supprimer une actualité
function deleteNews(newsId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return;

    newsData = newsData.filter(n => n.id !== newsId);
    saveNewsData();
    renderNews();
    showNotification('Actualité supprimée avec succès!');
}

// Utilitaires
function getCategoryLabel(category) {
    const labels = {
        entrees: 'Entrées',
        potages: 'Potages',
        plats: 'Plats',
        moules: 'Moules-Frites',
        pizzas: 'Pizzas',
        formules: 'Formules',
        enfant: 'Menu Enfant',
        desserts: 'Desserts',
        glaces: 'Glaces'
    };
    return labels[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function truncate(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Fermer les modals en cliquant en dehors
document.getElementById('itemModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

document.getElementById('newsModal').addEventListener('click', function(e) {
    if (e.target === this) closeNewsModal();
});

// Charger les données au démarrage
loadData();
