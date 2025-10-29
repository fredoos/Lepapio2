import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Plus, Edit2, Trash2, X, UtensilsCrossed, Pizza, Soup, Fish, IceCream, Cake, Baby, Coffee } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MenuItemDB {
  id: string;
  category: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  ingredients: string;
  ingredients_en: string;
  price: string;
  order: number;
  available: boolean;
}

const categories = [
  { value: 'entrees', label: 'Entrées', icon: UtensilsCrossed, color: 'from-green-400 to-emerald-500' },
  { value: 'potages', label: 'Potages', icon: Soup, color: 'from-orange-400 to-red-500' },
  { value: 'plats', label: 'Plats', icon: Fish, color: 'from-blue-400 to-cyan-500' },
  { value: 'moules', label: 'Moules-Frites', icon: UtensilsCrossed, color: 'from-yellow-400 to-amber-500' },
  { value: 'pizzas', label: 'Pizzas', icon: Pizza, color: 'from-red-400 to-pink-500' },
  { value: 'formules', label: 'Formules', icon: Coffee, color: 'from-purple-400 to-indigo-500' },
  { value: 'enfant', label: 'Menu Enfant', icon: Baby, color: 'from-pink-400 to-rose-500' },
  { value: 'desserts', label: 'Desserts', icon: Cake, color: 'from-amber-400 to-yellow-500' },
  { value: 'glaces', label: 'Glaces', icon: IceCream, color: 'from-cyan-400 to-blue-500' }
];

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItemDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('entrees');
  const [editingItem, setEditingItem] = useState<MenuItemDB | null>(null);
  const [showForm, setShowForm] = useState(false);

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price.toString().replace(',', '.'));
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numPrice);
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category')
        .order('order');

      if (error) throw error;
      setMenuItems(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement menu:', error);
      setMessage('Erreur lors du chargement');
      setLoading(false);
    }
  };

  const handleSave = async (item: Partial<MenuItemDB>) => {
    setSaving(true);
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(item)
          .eq('id', editingItem.id);

        if (error) throw error;
        setMessage('✅ Plat modifié avec succès!');
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([item]);

        if (error) throw error;
        setMessage('✅ Plat ajouté avec succès!');
      }

      await loadMenuItems();
      setShowForm(false);
      setEditingItem(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      setMessage('❌ Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce plat ?')) return;

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessage('✅ Plat supprimé avec succès!');
      await loadMenuItems();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur suppression:', error);
      setMessage('❌ Erreur lors de la suppression');
    }
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  const currentCategory = categories.find(cat => cat.value === selectedCategory);
  const CategoryIcon = currentCategory?.icon || UtensilsCrossed;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-papio-50 to-blue-50">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-papio-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement du menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-papio-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-papio-600 to-blue-600 bg-clip-text text-transparent mb-2">
                🍽️ Gestion du Menu
              </h1>
              <p className="text-gray-600">Gérez facilement tous vos plats et leurs prix</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/admin"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
              >
                ⚙️ Paramètres
              </a>
              <a
                href="/"
                className="px-4 py-2 bg-gradient-to-r from-papio-500 to-blue-500 hover:from-papio-600 hover:to-blue-600 text-white rounded-lg transition-all font-medium shadow-lg"
              >
                🏠 Retour au site
              </a>
            </div>
          </div>
        </div>

        {/* Category Selector - Grid avec icônes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            const count = menuItems.filter(item => item.category === cat.value).length;

            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-white shadow-xl scale-105 ring-2 ring-papio-400'
                    : 'bg-white/80 hover:bg-white hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className={`text-sm font-semibold text-center ${isSelected ? 'text-papio-600' : 'text-gray-700'}`}>
                  {cat.label}
                </p>
                <span className="absolute top-2 right-2 bg-papio-100 text-papio-700 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl font-medium shadow-lg ${
            message.includes('❌')
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        {/* Current Category Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentCategory?.color} flex items-center justify-center shadow-lg`}>
                <CategoryIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{currentCategory?.label}</h2>
                <p className="text-gray-600">{filteredItems.length} plat{filteredItems.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingItem(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="w-5 h-5" />
              Ajouter un plat
            </button>
          </div>
        </div>

        {/* Menu Items - Affichage amélioré */}
        <div className="grid gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-papio-400"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Contenu principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Ordre d'affichage */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-papio-400 to-blue-500 flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-lg">#{item.order}</span>
                      </div>

                      {/* Nom du plat */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-800 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">{item.name_en}</p>
                      </div>

                      {/* Prix */}
                      <div className="flex-shrink-0 text-right">
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg shadow-md">
                          <span className="text-2xl font-bold text-white">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Ingrédients */}
                    {item.ingredients && (
                      <p className="text-xs text-gray-500 italic line-clamp-1">
                        🧂 {item.ingredients}
                      </p>
                    )}

                    {/* Badge disponibilité */}
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.available ? '✅ Disponible' : '⏸️ Non disponible'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setShowForm(true);
                      }}
                      className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <CategoryIcon className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium mb-2">Aucun plat dans cette catégorie</p>
              <p className="text-gray-400 text-sm">Cliquez sur "Ajouter un plat" pour commencer</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal d'édition */}
      {showForm && (
        <MenuForm
          item={editingItem}
          category={selectedCategory}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          saving={saving}
        />
      )}
    </div>
  );
};

interface MenuFormProps {
  item: MenuItemDB | null;
  category: string;
  onSave: (item: Partial<MenuItemDB>) => void;
  onCancel: () => void;
  saving: boolean;
}

const MenuForm: React.FC<MenuFormProps> = ({ item, category, onSave, onCancel, saving }) => {
  const [formData, setFormData] = useState({
    category: item?.category || category,
    name: item?.name || '',
    name_en: item?.name_en || '',
    description: item?.description || '',
    description_en: item?.description_en || '',
    ingredients: item?.ingredients || '',
    ingredients_en: item?.ingredients_en || '',
    price: item?.price || '',
    order: item?.order || 1,
    available: item?.available ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-papio-500 to-blue-500 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {item ? '✏️ Modifier le plat' : '➕ Ajouter un plat'}
            </h2>
            <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Catégorie */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">📂 Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all"
                required
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Prix */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Prix (ex: 12,50)</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="12,50"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all font-bold text-lg"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Nom FR */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🇫🇷 Nom (Français)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Nom EN */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🇬🇧 Nom (Anglais)</label>
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Description FR */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Description (Français)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description EN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Description (Anglais)</label>
            <textarea
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Ingrédients */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🧂 Ingrédients (Français)</label>
              <input
                type="text"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🧂 Ingrédients (Anglais)</label>
              <input
                type="text"
                value={formData.ingredients_en}
                onChange={(e) => setFormData({ ...formData, ingredients_en: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Ordre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2"># Ordre d'affichage</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-papio-500 focus:border-transparent transition-all font-bold text-lg"
                required
              />
            </div>

            {/* Disponibilité */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Disponibilité</label>
              <label className="flex items-center space-x-3 px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-6 h-6 text-papio-600 rounded focus:ring-papio-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {formData.available ? '✅ Plat disponible' : '⏸️ Plat non disponible'}
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-papio-500 to-blue-500 hover:from-papio-600 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-medium disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Enregistrer</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminMenu;
