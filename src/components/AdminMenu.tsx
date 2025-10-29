import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MenuItem {
  id?: string;
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
  { key: 'entrees', label: 'Entrées' },
  { key: 'potages', label: 'Potages' },
  { key: 'plats', label: 'Plats' },
  { key: 'moules', label: 'Moules-Frites' },
  { key: 'pizzas', label: 'Pizzas' },
  { key: 'formules', label: 'Formules' },
  { key: 'enfant', label: 'Menu Enfant' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'glaces', label: 'Glaces' }
];

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('entrees');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('order', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setMessage('Erreur lors du chargement du menu');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item: MenuItem) => {
    setSaving(true);
    setMessage('');

    try {
      if (item.id) {
        const { error } = await supabase
          .from('menu_items')
          .update({
            name: item.name,
            name_en: item.name_en,
            description: item.description,
            description_en: item.description_en,
            ingredients: item.ingredients,
            ingredients_en: item.ingredients_en,
            price: item.price,
            order: item.order,
            available: item.available
          })
          .eq('id', item.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([{
            category: item.category,
            name: item.name,
            name_en: item.name_en,
            description: item.description || '',
            description_en: item.description_en || '',
            ingredients: item.ingredients || '',
            ingredients_en: item.ingredients_en || '',
            price: item.price,
            order: item.order,
            available: item.available
          }]);

        if (error) throw error;
      }

      setMessage('✅ Enregistré avec succès!');
      setEditingItem(null);
      await fetchMenuItems();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving menu item:', error);
      setMessage('❌ Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet élément ?')) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessage('✅ Supprimé avec succès!');
      await fetchMenuItems();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setMessage('❌ Erreur lors de la suppression');
    } finally {
      setSaving(false);
    }
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-papio-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestion du Menu</h1>

        {message && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="mb-6 flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-papio-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {categories.find(c => c.key === selectedCategory)?.label}
            </h2>
            <button
              onClick={() => setEditingItem({
                category: selectedCategory,
                name: '',
                name_en: '',
                description: '',
                description_en: '',
                ingredients: '',
                ingredients_en: '',
                price: '',
                order: filteredItems.length + 1,
                available: true
              })}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {filteredItems.map(item => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.name_en}</p>
                    {item.description && (
                      <p className="text-gray-700 mt-2">{item.description}</p>
                    )}
                    {item.ingredients && (
                      <p className="text-gray-600 text-sm mt-1">{item.ingredients}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-papio-600">{item.price} €</p>
                    <p className="text-sm text-gray-500">Ordre: {item.order}</p>
                    <p className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                      {item.available ? 'Disponible' : 'Indisponible'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => item.id && handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Aucun élément dans cette catégorie
              </p>
            )}
          </div>
        </div>

        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">
                {editingItem.id ? 'Modifier' : 'Ajouter'} un élément
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom (Français) *
                    </label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom (Anglais) *
                    </label>
                    <input
                      type="text"
                      value={editingItem.name_en}
                      onChange={(e) => setEditingItem({ ...editingItem, name_en: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Français)
                    </label>
                    <textarea
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Anglais)
                    </label>
                    <textarea
                      value={editingItem.description_en}
                      onChange={(e) => setEditingItem({ ...editingItem, description_en: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ingrédients (Français)
                    </label>
                    <input
                      type="text"
                      value={editingItem.ingredients}
                      onChange={(e) => setEditingItem({ ...editingItem, ingredients: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ingrédients (Anglais)
                    </label>
                    <input
                      type="text"
                      value={editingItem.ingredients_en}
                      onChange={(e) => setEditingItem({ ...editingItem, ingredients_en: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix (ex: 12,50) *
                    </label>
                    <input
                      type="text"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="12,50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ordre
                    </label>
                    <input
                      type="number"
                      value={editingItem.order}
                      onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Disponible
                    </label>
                    <input
                      type="checkbox"
                      checked={editingItem.available}
                      onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                      className="w-6 h-6 mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleSave(editingItem)}
                  disabled={saving || !editingItem.name || !editingItem.name_en || !editingItem.price}
                  className="flex items-center gap-2 px-4 py-2 bg-papio-600 text-white rounded-lg hover:bg-papio-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
