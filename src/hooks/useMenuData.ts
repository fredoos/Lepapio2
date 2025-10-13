import { useState, useEffect } from 'react';
import type { MenuData } from '../types/menu';

export const useMenuData = (): MenuData => {
  const [menuData, setMenuData] = useState<MenuData>({
    entrees: [],
    potages: [],
    plats: [],
    pizzas: [],
    formules: [],
    enfant: [],
    desserts: [],
    glaces: []
  });

  useEffect(() => {
    fetch('/data/menu.json')
      .then(res => res.json())
      .then(data => setMenuData(data))
      .catch(error => console.error('Erreur chargement menu:', error));
  }, []);

  return menuData;
};