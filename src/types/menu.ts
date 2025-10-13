export interface MenuItem {
  name: string;
  price: string;
  description: string;
  ingredients?: string;
  image?: string;
  order: number;
  available: boolean;
  nameEn?: string;
  descriptionEn?: string;
  ingredientsEn?: string;
}

export interface MenuData {
  entrees: MenuItem[];
  potages: MenuItem[];
  plats: MenuItem[];
  moules: MenuItem[];
  pizzas: MenuItem[];
  formules: MenuItem[];
  enfant: MenuItem[];
  desserts: MenuItem[];
  glaces: MenuItem[];
}
