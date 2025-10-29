import { useState, useEffect } from 'react';
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
    fetch('/data/menu.json')
      .then(res => res.json())
      .then(data => {
        const sortedData: MenuData = {
          entrees: [...data.entrees].sort((a, b) => (a.order || 999) - (b.order || 999)),
          potages: [...data.potages].sort((a, b) => (a.order || 999) - (b.order || 999)),
          plats: [...data.plats].sort((a, b) => (a.order || 999) - (b.order || 999)),
          moules: [...data.moules].sort((a, b) => (a.order || 999) - (b.order || 999)),
          pizzas: [...data.pizzas].sort((a, b) => (a.order || 999) - (b.order || 999)),
          formules: [...data.formules].sort((a, b) => (a.order || 999) - (b.order || 999)),
          enfant: [...data.enfant].sort((a, b) => (a.order || 999) - (b.order || 999)),
          desserts: [...data.desserts].sort((a, b) => (a.order || 999) - (b.order || 999)),
          glaces: [...data.glaces].sort((a, b) => (a.order || 999) - (b.order || 999))
        };
        setMenuData(sortedData);
      })
      .catch(error => console.error('Erreur chargement menu:', error));
  }, []);

  return menuData;
};