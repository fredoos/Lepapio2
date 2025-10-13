import { useState, useEffect } from 'react';

interface MenuVisibility {
  show_entrees: boolean;
  show_potages: boolean;
  show_plats: boolean;
  show_moules: boolean;
  show_pizzas: boolean;
  show_formules: boolean;
  show_enfant: boolean;
  show_desserts: boolean;
  show_glaces: boolean;
}

export const useMenuVisibility = (): MenuVisibility => {
  const [visibility, setVisibility] = useState<MenuVisibility>({
    show_entrees: true,
    show_potages: true,
    show_plats: true,
    show_moules: true,
    show_pizzas: true,
    show_formules: true,
    show_enfant: true,
    show_desserts: true,
    show_glaces: true
  });

  useEffect(() => {
    const loadVisibility = async () => {
      try {
        const module = await import('/src/content/settings/menu-visibility.yml?raw');
        const content = module.default;

        const lines = content.split('\n');
        const parsed: Partial<MenuVisibility> = {};

        lines.forEach((line: string) => {
          const match = line.match(/^(\w+):\s*(true|false)/);
          if (match) {
            const [, key, value] = match;
            parsed[key as keyof MenuVisibility] = value === 'true';
          }
        });

        setVisibility(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Erreur chargement visibilité menu:', error);
      }
    };

    loadVisibility();
  }, []);

  return visibility;
};
