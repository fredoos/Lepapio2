import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { MenuData } from '../types/menu';

export const useMenuData = (): MenuData => {
  const [menuData, setMenuData] = useState<MenuData>({
    entrees: [],
    potages: [],
    plats: [],
    moules: [],
    pizzas: [],
    formules: [],
    enfant: [],
    desserts: [],
    glaces: []
  });

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const { data: items, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('available', true)
          .order('order', { ascending: true });

        if (error) throw error;

        if (items) {
          const groupedData: MenuData = {
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

          items.forEach(item => {
            const menuItem = {
              name: item.name,
              nameEn: item.name_en,
              description: item.description || '',
              descriptionEn: item.description_en || '',
              ingredients: item.ingredients || '',
              ingredientsEn: item.ingredients_en || '',
              price: item.price,
              order: item.order,
              available: item.available
            };

            const category = item.category as keyof MenuData;
            if (groupedData[category]) {
              groupedData[category].push(menuItem);
            }
          });

          setMenuData(groupedData);
        }
      } catch (error) {
        console.error('Erreur chargement menu depuis Supabase:', error);
      }
    };

    fetchMenuData();
  }, []);

  return menuData;
};