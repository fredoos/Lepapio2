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
    const loadMenu = async () => {
      try {
        const response = await fetch('/data/menu.json');
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Erreur lors du chargement du menu:', error);
      }
    };

    loadMenu();
  }, []);

  return menuData;
};