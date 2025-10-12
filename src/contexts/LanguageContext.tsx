import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.menu': 'Carte',
    'nav.photos': 'Photos',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',
    'header.restaurant': 'Restaurant - Pizzeria',
    'header.open': 'Ouvert',
    'header.closed': 'Fermé',
    'header.opens_at_12': 'Ouvre à 12h00',
    'header.opens_at_19': 'Ouvre à 19h00',
    'header.opens_tomorrow': 'Ouvre à 12h00 demain',

    // Hero
    'hero.tagline': 'Restaurant du Cotentin - Pizzeria au cœur de Cherbourg cuisine face au port de Cherbourg - vue mer',
    'hero.description': 'Savourez notre cuisine authentique du terroir normand et nos pizzas artisanales dans une ambiance chaleureuse.',
    'hero.story': '« Le Papio était le nom du petit bateau de pêche de mon papa, qui a tellement marqué la famille »',
    'hero.address': 'Adresse',
    'hero.address_full': '24 quai de Caligny\n50100 Cherbourg-en-\nCotentin',
    'hero.reservations': 'Réservations',
    'hero.hours': 'Horaires',
    'hero.hours_full': 'Fermé le mardi\n12h-14h / 19h-22h',

    // About
    'about.title': 'L\'Esprit du Papio',
    'about.description': 'Situé sur les quais pittoresques de Cherbourg-en-Cotentin, Le Papio vous invite à découvrir une cuisine généreuse dans un cadre authentique. Que ce soit pour un déjeuner d\'affaires, un dîner en famille ou une soirée entre amis, nous vous accueillons dans une atmosphère chaleureuse et décontractée.',
    'about.feature1_title': 'Fait Maison',
    'about.feature1_desc': 'Tous nos plats sont préparés avec des produits frais et de qualité, dans le respect de la tradition culinaire.',
    'about.feature2_title': 'Cuisine Authentique',
    'about.feature2_desc': 'De la pizza artisanale aux spécialités de la mer, découvrez une carte variée qui ravira tous les palais.',
    'about.feature3_title': 'Ambiance Conviviale',
    'about.feature3_desc': 'Dans un cadre chaleureux face au port, partagez un moment unique en famille ou entre amis.',
    'about.feature4_title': 'Savoir-Faire',
    'about.feature4_desc': 'Notre équipe passionnée vous accueille et vous conseille pour une expérience gastronomique mémorable.',
    'about.cta_title': 'Réservez votre table',
    'about.cta_desc': 'Pour garantir votre place et profiter pleinement de votre expérience, nous vous recommandons de réserver à l\'avance.',
    'about.cta_button': 'Appeler le 02 33 92 18 45',

    // Menu
    'menu.title': 'Notre Carte',
    'menu.subtitle': 'Découvrez notre sélection de plats préparés avec des produits frais et de qualité',
    'menu.starters': 'Entrées',
    'menu.soups': 'Potages',
    'menu.mains': 'Plats',
    'menu.mussels': 'Moules-Frites',
    'menu.pizzas': 'Pizzas',
    'menu.formulas': 'Formules',
    'menu.kids': 'Menu Enfant',
    'menu.desserts': 'Pâtisseries',
    'menu.ice_cream': 'Glaces',
    'menu.all_homemade': 'Tous nos plats du jour et nos desserts sont faits maison',
    'menu.prices_vary': 'Les prix peuvent varier selon la saison et la disponibilité des produits',
    'menu.fresh_products': 'Produits frais',
    'menu.homemade': 'Fait maison',

    // Pizza takeaway banner
    'menu.pizza_takeaway': 'Nos pizzas sont à emporter également, n\'hésitez pas !',
    'menu.pizza_order_phone': 'Commandez par téléphone au 02 33 92 18 45',

    // Menu description section
    'menu.description_title': 'Carte du Restaurant Le Papio - Cuisine Traditionnelle Normande',
    'menu.description_intro': 'Au cœur du Cotentin, notre restaurant valorise le terroir normand à travers une carte élaborée à partir de produits frais et majoritairement locaux. Viandes, poissons, fromages, fruits de mer, légumes : nous privilégions les producteurs régionaux pour garantir qualité et authenticité à chaque assiette.',
    'menu.description_spirit': 'Retrouvez chez Le Papio l\'esprit chaleureux de la Normandie : plats traditionnels, pizzas artisanales, recettes de la mer et desserts maison, le tout préparé sur place avec passion et savoir-faire.',
    'menu.description_quality': 'Venez savourer la différence d\'une cuisine faite maison, responsable et ancrée dans le territoire.',
    'menu.description_location': 'À deux pas du port de Cherbourg, profitez d\'un moment convivial et authentique, sur place ou à emporter.',

    // Main courses section
    'menu.homemade_sauces': 'Sauces maison au choix :',
    'menu.sauce_list': 'Tartare, camembert, poivre, béarnaise',
    'menu.dishes_accompanied': 'Plats accompagnés de légumes du moment et frites fraîches maison ou salade',

    // Mussels section
    'menu.mussels_fries_homemade': 'Moules accompagnées de frites fraîches maison',
    'menu.mussels_generous_portion': 'Portion généreuse pour un repas complet',

    // Gallery
    'gallery.title': 'Galerie Photos',
    'gallery.subtitle': 'Découvrez l\'ambiance unique du Papio et nos spécialités culinaires',
    'gallery.click_to_enlarge': 'Cliquer pour agrandir',

    // News
    'news.title': 'Actualités',
    'news.subtitle': 'Restez informés de nos dernières nouveautés et événements',
    'news.stay_informed': 'Restez informés',
    'news.follow_desc': 'Suivez-nous sur nos réseaux sociaux pour ne rien manquer de nos actualités !',
    'news.follow_facebook': 'Suivre sur Facebook',
    'news.follow_instagram': 'Suivre sur Instagram',
    'news.article_date': '01/07/2025',
    'news.article_title': 'Accompagné d\'un chef bien connu, Christophe ouvre un nouveau restaurant sur les quais de Cherbourg',
    'news.article_content': 'Le Papio, nouveau restaurant-pizzeria, a ouvert ses portes sur le quai de Caligny à Cherbourg-en-Cotentin. Dans un cadre chaleureux face au port, découvrez une cuisine authentique et des pizzas artisanales préparées avec passion...',
    'news.read_full_article': 'Lire l\'article complet →',

    // Contact
    'contact.title': 'Contact & Réservations',
    'contact.subtitle': 'Nous serions ravis de vous accueillir au Papio. N\'hésitez pas à nous contacter !',
    'contact.info': 'Informations de contact',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Horaires d\'ouverture',
    'contact.hours_days': 'Lundi : Dimanche',
    'contact.hours_lunch': '12h00 - 14h00',
    'contact.hours_dinner': '19h00 - 22h00',
    'contact.hours_note': '* Fermé le mardi',
    'contact.find_us': 'Nous trouver',
    'contact.location_desc': 'Situé face au port de Cherbourg dans le quartier historique',
    'contact.reviews_title': 'Vos Avis Comptent',
    'contact.google_reviews': 'Avis Google',
    'contact.tripadvisor_reviews': 'Avis TripAdvisor',
    'contact.follow_us': 'Suivez-nous',

    // Footer
    'footer.legal_mentions': 'Mentions légales',

    // Menu items - Starters
    'menu.item.oeuf_mimosa': 'Œuf mimosa',
    'menu.desc.oeuf_mimosa': 'Un classique réconfortant : œufs farcis d\'une mousse légère et onctueuse, relevée d\'une pointe de moutarde.',
    'menu.item.terrine_poisson': 'Terrine de poisson',
    'menu.desc.terrine_poisson': 'Une entrée fraîche et fondante aux saveurs marines, idéale pour ouvrir l\'appétit.',
    'menu.item.salade_chevre': 'Salade de chèvre chaud',
    'menu.desc.salade_chevre': 'Chèvre fondant sur toasts dorés, accompagné de jeunes pousses croquantes et d\'une vinaigrette maison.',
    'menu.item.charcuterie': 'Assiette de charcuterie',
    'menu.desc.charcuterie': 'Une sélection généreuse de charcuteries artisanales, parfaite à partager ou savourer en solo.',
    'menu.item.hareng': 'Filet de hareng à l\'huile, pommes de terre tièdes',
    'menu.desc.hareng': 'Une alliance authentique et savoureuse aux accents du Nord, relevée d\'un filet d\'huile et d\'herbes fraîches.',

    // Menu items - Main courses
    'menu.item.andouille': 'Pavé d\'andouille de Vire grillé, sauce camembert',
    'menu.desc.andouille': 'Le goût corsé de l\'andouille sublimé par le fondant d\'une sauce au camembert bien normande.',
    'menu.item.boeuf': 'Pièce de bœuf grillée (180g)',
    'menu.desc.boeuf': 'Une viande tendre et savoureuse, grillée à la perfection selon votre cuisson préférée.',
    'menu.item.entrecote': 'Entrecôte grillée (250g)',
    'menu.desc.entrecote': 'Une pièce généreuse, juteuse et persillée, servie avec nos sauces maison au choix.',
    'menu.item.veau': 'Escalope de veau à la Normande',
    'menu.desc.veau': 'Une escalope tendre nappée d\'une sauce onctueuse aux champignons et au cidre.',
    'menu.item.fish_chips': 'Fish and chips (pêche du jour)',
    'menu.desc.fish_chips': 'Poisson frais du jour en beignet croustillant, servi avec des frites maison et une sauce tartare.',

    // Menu items - Mussels
    'menu.item.mariniere': 'Marinière',
    'menu.desc.mariniere': 'Des moules fraîches mijotées dans un bouillon de vin blanc, ail et persil pour une explosion de saveurs iodées.',
    'menu.item.creme': 'Crème',
    'menu.desc.creme': 'Une version onctueuse et généreuse aux arômes doux, relevée d\'une touche d\'ail et d\'échalote.',
    'menu.item.curry': 'Curry',
    'menu.desc.curry': 'Une recette exotique et parfumée, mêlant moules fraîches et sauce crémeuse au curry doux.',

    // Menu items - Pizzas
    'menu.item.margherita': 'Margherita',
    'menu.desc.margherita': 'Simplicité italienne : sauce tomate maison, mozzarella fondante et jambon blanc pour une pizza tout en douceur.',
    'menu.ingredients.margherita': 'Tomate, jambon blanc, mozzarella',
    'menu.item.reine': 'Reine',
    'menu.desc.reine': 'Une valeur sûre : la reine des pizzas avec son trio gourmand de champignons, jambon et mozzarella.',
    'menu.ingredients.reine': 'Tomate, mozzarella, champignon, jambon blanc',
    'menu.item.calzone': 'Calzone',
    'menu.desc.calzone': 'Une pizza fermée à la pâte dorée, garnie généreusement de jambon, œuf et mozzarella fondante.',
    'menu.ingredients.calzone': 'Tomate, mozzarella, jambon, œuf',
    'menu.item.savoyarde': 'Savoyarde',
    'menu.desc.savoyarde': 'Une explosion montagnarde : lardons, reblochon et pommes de terre pour une pizza ultra réconfortante.',
    'menu.ingredients.savoyarde': 'Tomate, lardons, oignons, pommes de terre, reblochon, crème',
    'menu.item.campagnarde': 'Campagnarde',
    'menu.desc.campagnarde': 'Chaleureuse et rustique, cette pizza mêle chèvre, camembert et lardons sur une base fondante.',
    'menu.ingredients.campagnarde': 'Tomate, lardons, oignons, chèvre, camembert',
    'menu.item.chevre': 'Chèvre',
    'menu.desc.chevre': 'Une touche sucrée-salée irrésistible avec le mariage du chèvre fondant et du miel délicat.',
    'menu.ingredients.chevre': 'Tomate, mozzarella, oignons, chèvre, miel',
    'menu.item.4fromages': '4 Fromages',
    'menu.desc.4fromages': 'L\'alliance puissante de quatre fromages pour les amateurs de goût intense et fondant.',
    'menu.ingredients.4fromages': 'Tomate, mozzarella, emmental, camembert, roquefort',
    'menu.item.fermiere': 'Fermière',
    'menu.desc.fermiere': 'Une pizza généreuse à base de poulet, champignons et crème : un vrai retour à la ferme.',
    'menu.ingredients.fermiere': 'Tomate, poulet, champignon, mozzarella, crème',
    'menu.item.indienne': 'Indienne',
    'menu.desc.indienne': 'Voyage en terres épicées avec cette pizza relevée au curry, poivrons et poulet tendre.',
    'menu.ingredients.indienne': 'Tomate, poulet, poivron, curry, mozzarella',
    'menu.item.chorizo': 'Chorizo',
    'menu.desc.chorizo': 'Le piquant du chorizo grillé rencontre le fondant de la mozzarella pour un mélange explosif.',
    'menu.ingredients.chorizo': 'Tomate, poivron, oignons, chorizo, mozzarella',
    'menu.item.vegetarienne': 'Végétarienne',
    'menu.desc.vegetarienne': 'Une pizza colorée et savoureuse garnie de légumes fondants et de mozzarella dorée.',
    'menu.ingredients.vegetarienne': 'Tomate, pommes de terre, champignons, poivrons, mozzarella',
    'menu.item.norvegienne': 'Norvégienne',
    'menu.desc.norvegienne': 'Une création raffinée aux saveurs nordiques : saumon fumé, cidre et caramel salé.',
    'menu.ingredients.norvegienne': 'Crème, saumon fumé, jambon citronné, cidre, caramel de cidre',
    'menu.item.viroise': 'Viroise',
    'menu.desc.viroise': 'Une spécialité locale pleine de caractère, avec l\'andouille de Vire et le camembert au lait cru, le tout relevé par une touche de crème.',
    'menu.ingredients.viroise': 'Tomate, andouille de Vire, camembert au lait cru, crème',
    'menu.item.papio': 'Papio',
    'menu.desc.papio': 'La signature maison : une pizza sucrée-salée audacieuse mêlant camembert, pomme, jambon du Cotentin et caramel de cidre.',
    'menu.ingredients.papio': 'Tomate, camembert au lait cru, jambon du Cotentin, pomme, caramel de cidre',

    // Menu items - Formulas
    'menu.item.plat_jour': 'Plat du jour',
    'menu.desc.plat_jour': 'Notre spécialité du moment, préparée avec des produits frais et de saison',
    'menu.item.duo': 'Duo (Entrée + Plat)',
    'menu.desc.duo': 'Entrée au choix : œuf mimosa, petite assiette de charcuterie, filet de hareng • Plat du jour',
    'menu.item.trio': 'Trio (Entrée + Plat + Dessert)',
    'menu.desc.trio': 'Entrée au choix : œuf mimosa, petite assiette de charcuterie, filet de hareng • Plat du jour • Dessert : île flottante, mousse au chocolat, ou 2 boules de glace',

    // Menu items - Kids
    'menu.item.menu_enfant': 'Menu Enfant (-12 ans)',
    'menu.desc.menu_enfant': 'Steak haché ou mini fish and chips • Frites ou légumes du jour • 1 boule de glace ou 1 push-up • Diabolo ou sirop à l\'eau',

    // Menu items - Desserts
    'menu.item.ile_flottante': 'Île flottante',
    'menu.desc.ile_flottante': 'Le dessert réconfortant par excellence, léger et savoureux',
    'menu.item.creme_brulee': 'Crème brûlée',
    'menu.desc.creme_brulee': 'Onctueuse crème vanillée surmontée de son caramel craquant',
    'menu.item.mousse_chocolat': 'Mousse au chocolat',
    'menu.desc.mousse_chocolat': 'Une mousse aérienne et intense pour les amateurs de chocolat',
    'menu.item.fondant_chocolat': 'Fondant au chocolat, crème anglaise',
    'menu.desc.fondant_chocolat': 'Cœur coulant et crème onctueuse pour un moment de pur plaisir',
    'menu.item.cafe_gourmand': 'Café ou thé gourmand',
    'menu.desc.cafe_gourmand': 'Accompagné de petites douceurs maison',
    'menu.item.irish_coffee': 'Irish coffee',
    'menu.desc.irish_coffee': 'La parfaite alliance entre café, whisky et chantilly',
    'menu.item.dessert_moment': 'Dessert du moment',
    'menu.desc.dessert_moment': 'Notre création saisonnière préparée avec passion',

    // Menu items - Ice cream
    'menu.item.coupe_1boule': 'Coupe 1 boule',
    'menu.desc.coupe_1boule': 'Une boule de votre parfum préféré',
    'menu.item.coupe_2boules': 'Coupe 2 boules',
    'menu.desc.coupe_2boules': 'Deux boules dans nos délicieux parfums maison',
    'menu.ingredients.coupe_2boules': 'Parfums : chocolat, vanille, pistache, rhum raisin, caramel fleur de sel, citron, pomme, cassis, coco, menthe, fraise',
    'menu.item.cafe_liegeois': 'Café liégeois',
    'menu.desc.cafe_liegeois': 'Glace vanille, café et chantilly pour un plaisir intense',
    'menu.item.caramel_liegeois': 'Caramel liégeois',
    'menu.desc.caramel_liegeois': 'Glace vanille nappée de caramel onctueux',
    'menu.item.chocolat_liegeois': 'Chocolat liégeois',
    'menu.desc.chocolat_liegeois': 'Pour les inconditionnels du chocolat',
    'menu.item.banana_split': 'Banana split',
    'menu.desc.banana_split': 'La star américaine : banane, glaces et chantilly',
    'menu.item.coupe_martiniquaise': 'Coupe Martiniquaise',
    'menu.desc.coupe_martiniquaise': 'Rhum raisin, banane, chocolat et chantilly pour un voyage aux Antilles',
    'menu.item.coupe_colonel': 'Coupe colonel',
    'menu.desc.coupe_colonel': 'Sorbet citron relevé d\'une pointe de vodka',
    'menu.item.coupe_normande': 'Coupe normande',
    'menu.desc.coupe_normande': 'Notre spécialité locale aux saveurs du terroir',
    'menu.item.supplement_chantilly': 'Supplément chantilly',
    'menu.desc.supplement_chantilly': 'Pour encore plus de gourmandise',

    // Pizza extras
    'menu.pizza_extra_ingredient': 'Ingrédient supplémentaire au choix — 1,50 €',
    'menu.pizza_extra_list': '(champignon, jambon blanc, poulet, pomme de terre, crème)',

    // Ice cream flavors
    'menu.ice_cream_flavors_title': 'Parfums disponibles :',
    'menu.ice_cream_flavors_list': 'Chocolat, vanille, pistache, rhum raisin, caramel fleur de sel, citron, pomme, cassis, coco, menthe, fraise'
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.photos': 'Photos',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'header.restaurant': 'Restaurant - Pizzeria',
    'header.open': 'Open',
    'header.closed': 'Closed',
    'header.opens_at_12': 'Opens at 12:00 PM',
    'header.opens_at_19': 'Opens at 7:00 PM',
    'header.opens_tomorrow': 'Opens at 12:00 PM tomorrow',

    // Hero
    'hero.tagline': 'Cotentin Restaurant - Pizzeria in the heart of Cherbourg with harbor view and sea cuisine',
    'hero.description': 'Savor our authentic Norman regional cuisine and artisanal pizzas in a warm atmosphere.',
    'hero.story': '"Le Papio was the name of my father\'s little fishing boat, which left such a mark on the family"',
    'hero.address': 'Address',
    'hero.address_full': '24 quai de Caligny\n50100 Cherbourg-en-\nCotentin',
    'hero.reservations': 'Reservations',
    'hero.hours': 'Hours',
    'hero.hours_full': 'Closed on Tuesdays\n12:00-2:00 PM / 7:00-10:00 PM',

    // About
    'about.title': 'The Spirit of Papio',
    'about.description': 'Located on the picturesque quays of Cherbourg-en-Cotentin, Le Papio invites you to discover generous cuisine in an authentic setting. Whether for a business lunch, family dinner, or evening with friends, we welcome you in a warm and relaxed atmosphere.',
    'about.feature1_title': 'Homemade',
    'about.feature1_desc': 'All our dishes are prepared with fresh, quality products, respecting culinary tradition.',
    'about.feature2_title': 'Authentic Cuisine',
    'about.feature2_desc': 'From artisanal pizza to seafood specialties, discover a varied menu that will delight all palates.',
    'about.feature3_title': 'Friendly Atmosphere',
    'about.feature3_desc': 'In a warm setting facing the harbor, share a unique moment with family or friends.',
    'about.feature4_title': 'Know-How',
    'about.feature4_desc': 'Our passionate team welcomes and advises you for a memorable gastronomic experience.',
    'about.cta_title': 'Reserve your table',
    'about.cta_desc': 'To guarantee your spot and fully enjoy your experience, we recommend booking in advance.',
    'about.cta_button': 'Call 02 33 92 18 45',

    // Menu
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Discover our selection of dishes prepared with fresh, quality products',
    'menu.starters': 'Starters',
    'menu.soups': 'Soups',
    'menu.mains': 'Main Courses',
    'menu.mussels': 'Mussels & Fries',
    'menu.pizzas': 'Pizzas',
    'menu.formulas': 'Set Menus',
    'menu.kids': 'Kids Menu',
    'menu.desserts': 'Desserts',
    'menu.ice_cream': 'Ice Cream',
    'menu.all_homemade': 'All our daily specials and desserts are homemade',
    'menu.prices_vary': 'Prices may vary according to season and product availability',
    'menu.fresh_products': 'Fresh products',
    'menu.homemade': 'Homemade',

    // Pizza takeaway banner
    'menu.pizza_takeaway': 'Our pizzas are also available for takeaway, don\'t hesitate!',
    'menu.pizza_order_phone': 'Order by phone at 02 33 92 18 45',

    // Menu description section
    'menu.description_title': 'Le Papio Restaurant Menu - Traditional Norman Cuisine',
    'menu.description_intro': 'In the heart of the Cotentin Peninsula, our restaurant celebrates Normandy\'s culinary heritage through a menu crafted from fresh, predominantly local produce. From meats and seafood to cheeses and vegetables, we partner with regional producers to ensure quality and authenticity in every dish.',
    'menu.description_spirit': 'Experience the warm spirit of Normandy at Le Papio: traditional dishes, artisanal pizzas, seafood specialties and homemade desserts, all prepared on-site with passion and expertise.',
    'menu.description_quality': 'Come taste the difference of authentic homemade cuisine, responsibly sourced and deeply rooted in our local territory.',
    'menu.description_location': 'Just steps from Cherbourg harbor, enjoy a convivial and genuine dining experience, whether dining in or taking away.',

    // Main courses section
    'menu.homemade_sauces': 'Homemade sauces of your choice:',
    'menu.sauce_list': 'Tartar, camembert, pepper, béarnaise',
    'menu.dishes_accompanied': 'Dishes served with seasonal vegetables and homemade fresh fries or salad',

    // Mussels section
    'menu.mussels_fries_homemade': 'Mussels served with homemade fresh fries',
    'menu.mussels_generous_portion': 'Generous portion for a complete meal',

    // Gallery
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Discover the unique atmosphere of Papio and our culinary specialties',
    'gallery.click_to_enlarge': 'Click to enlarge',

    // News
    'news.title': 'News',
    'news.subtitle': 'Stay informed about our latest news and events',
    'news.stay_informed': 'Stay informed',
    'news.follow_desc': 'Follow us on social media to not miss any of our news!',
    'news.follow_facebook': 'Follow on Facebook',
    'news.follow_instagram': 'Follow on Instagram',
    'news.article_date': '01/07/2025',
    'news.article_title': 'Accompanied by a well-known chef, Christophe opens a new restaurant on the quays of Cherbourg',
    'news.article_content': 'Le Papio, new restaurant-pizzeria, has opened its doors on quai de Caligny in Cherbourg-en-Cotentin. In a warm setting facing the harbor, discover authentic cuisine and artisanal pizzas prepared with passion...',
    'news.read_full_article': 'Read full article →',

    // Contact
    'contact.title': 'Contact & Reservations',
    'contact.subtitle': 'We would be delighted to welcome you to Papio. Don\'t hesitate to contact us!',
    'contact.info': 'Contact information',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Opening hours',
    'contact.hours_days': 'Monday - Sunday',
    'contact.hours_lunch': '12:00 PM - 2:00 PM',
    'contact.hours_dinner': '7:00 PM - 10:00 PM',
    'contact.hours_note': '* Closed on Tuesdays',
    'contact.find_us': 'Find us',
    'contact.location_desc': 'Located facing Cherbourg harbor in the historic district',
    'contact.reviews_title': 'Your Reviews Matter',
    'contact.google_reviews': 'Google Reviews',
    'contact.tripadvisor_reviews': 'TripAdvisor Reviews',
    'contact.follow_us': 'Follow us',

    // Footer
    'footer.legal_mentions': 'Legal Notice',

    // Menu items - Starters
    'menu.item.oeuf_mimosa': 'Devilled Eggs',
    'menu.desc.oeuf_mimosa': 'A comforting classic: eggs filled with a light and creamy mousse, enhanced with a touch of mustard.',
    'menu.item.terrine_poisson': 'Seafood Terrine',
    'menu.desc.terrine_poisson': 'A fresh and melting starter with marine flavors, perfect for whetting the appetite.',
    'menu.item.salade_chevre': 'Warm Goat Cheese Salad',
    'menu.desc.salade_chevre': 'Melting goat cheese on golden toasts, accompanied by crunchy young shoots and homemade vinaigrette.',
    'menu.item.charcuterie': 'Charcuterie Platter',
    'menu.desc.charcuterie': 'A generous selection of artisanal cold cuts, perfect for sharing or savoring alone.',
    'menu.item.hareng': 'Herring Fillet with Oil, Warm Potatoes',
    'menu.desc.hareng': 'An authentic and tasty alliance with Northern accents, enhanced with a drizzle of oil and fresh herbs.',

    // Menu items - Main courses
    'menu.item.andouille': 'Grilled Vire Andouille Steak, Camembert Sauce',
    'menu.desc.andouille': 'The robust taste of andouille enhanced by the melting camembert sauce, truly Norman.',
    'menu.item.boeuf': 'Grilled Beef Steak (180g)',
    'menu.desc.boeuf': 'Tender and flavorful meat, grilled to perfection according to your preferred cooking.',
    'menu.item.entrecote': 'Grilled Ribeye (250g)',
    'menu.desc.entrecote': 'A generous, juicy and marbled piece, served with our homemade sauces of choice.',
    'menu.item.veau': 'Veal Escalope à la Normande',
    'menu.desc.veau': 'A tender escalope topped with a creamy mushroom and cider sauce.',
    'menu.item.fish_chips': 'Fish and Chips (catch of the day)',
    'menu.desc.fish_chips': 'Fresh fish of the day in crispy batter, served with homemade fries and tartar sauce.',

    // Menu items - Mussels
    'menu.item.mariniere': 'Marinière',
    'menu.desc.mariniere': 'Fresh mussels simmered in white wine broth, garlic and parsley for an explosion of sea flavors.',
    'menu.item.creme': 'Cream',
    'menu.desc.creme': 'A creamy and generous version with sweet aromas, enhanced with a touch of garlic and shallot.',
    'menu.item.curry': 'Curry',
    'menu.desc.curry': 'An exotic and fragrant recipe, mixing fresh mussels and creamy mild curry sauce.',

    // Menu items - Pizzas
    'menu.item.margherita': 'Margherita',
    'menu.desc.margherita': 'Italian simplicity: homemade tomato sauce, melting mozzarella and white ham for a gentle pizza.',
    'menu.ingredients.margherita': 'Tomato, white ham, mozzarella',
    'menu.item.reine': 'Regina',
    'menu.desc.reine': 'A safe bet: the queen of pizzas with its gourmet trio of mushrooms, ham and mozzarella.',
    'menu.ingredients.reine': 'Tomato, mozzarella, mushroom, white ham',
    'menu.item.calzone': 'Calzone',
    'menu.desc.calzone': 'A closed pizza with golden dough, generously filled with ham, egg and melting mozzarella.',
    'menu.ingredients.calzone': 'Tomato, mozzarella, ham, egg',
    'menu.item.savoyarde': 'Savoyarde',
    'menu.desc.savoyarde': 'A mountain explosion: bacon, reblochon and potatoes for an ultra-comforting pizza.',
    'menu.ingredients.savoyarde': 'Tomato, bacon, onions, potatoes, reblochon, cream',
    'menu.item.campagnarde': 'Country Style',
    'menu.desc.campagnarde': 'Warm and rustic, this pizza combines goat cheese, camembert and bacon on a melting base.',
    'menu.ingredients.campagnarde': 'Tomato, bacon, onions, goat cheese, camembert',
    'menu.item.chevre': 'Goat Cheese',
    'menu.desc.chevre': 'An irresistible sweet-salty touch with the marriage of melting goat cheese and delicate honey.',
    'menu.ingredients.chevre': 'Tomato, mozzarella, onions, goat cheese, honey',
    'menu.item.4fromages': '4 Cheeses',
    'menu.desc.4fromages': 'The powerful alliance of four cheeses for lovers of intense and melting taste.',
    'menu.ingredients.4fromages': 'Tomato, mozzarella, emmental, camembert, roquefort',
    'menu.item.fermiere': 'Farmhouse',
    'menu.desc.fermiere': 'A generous pizza with chicken, mushrooms and cream: a real return to the farm.',
    'menu.ingredients.fermiere': 'Tomato, chicken, mushroom, mozzarella, cream',
    'menu.item.indienne': 'Indian',
    'menu.desc.indienne': 'Journey to spicy lands with this pizza enhanced with curry, peppers and tender chicken.',
    'menu.ingredients.indienne': 'Tomato, chicken, pepper, curry, mozzarella',
    'menu.item.chorizo': 'Chorizo',
    'menu.desc.chorizo': 'The spiciness of grilled chorizo meets the melting mozzarella for an explosive mix.',
    'menu.ingredients.chorizo': 'Tomato, pepper, onions, chorizo, mozzarella',
    'menu.item.vegetarienne': 'Vegetarian',
    'menu.desc.vegetarienne': 'A colorful and tasty pizza topped with melting vegetables and golden mozzarella.',
    'menu.ingredients.vegetarienne': 'Tomato, potatoes, mushrooms, peppers, mozzarella',
    'menu.item.norvegienne': 'Norwegian',
    'menu.desc.norvegienne': 'A refined creation with Nordic flavors: smoked salmon, cider and salted caramel.',
    'menu.ingredients.norvegienne': 'Cream, smoked salmon, lemon ham, cider, cider caramel',
    'menu.item.viroise': 'Viroise',
    'menu.desc.viroise': 'A local specialty full of character, with Vire andouille and raw milk camembert, enhanced by a touch of cream.',
    'menu.ingredients.viroise': 'Tomato, Vire andouille, raw milk camembert, cream',
    'menu.item.papio': 'Papio',
    'menu.desc.papio': 'Our house signature: a bold sweet-salty pizza combining camembert, apple, Cotentin ham and cider caramel.',
    'menu.ingredients.papio': 'Tomato, raw milk camembert, Cotentin ham, apple, cider caramel',

    // Menu items - Formulas
    'menu.item.plat_jour': 'Daily Special',
    'menu.desc.plat_jour': 'Our specialty of the moment, prepared with fresh seasonal products',
    'menu.item.duo': 'Duo (Starter + Main)',
    'menu.desc.duo': 'Choice of starter: egg mimosa, small charcuterie plate, herring fillet • Daily special',
    'menu.item.trio': 'Trio (Starter + Main + Dessert)',
    'menu.desc.trio': 'Choice of starter: egg mimosa, small charcuterie plate, herring fillet • Daily special • Dessert: floating island, chocolate mousse, or 2 scoops of ice cream',

    // Menu items - Kids
    'menu.item.menu_enfant': 'Kids Menu (under 12)',
    'menu.desc.menu_enfant': 'Ground beef or mini fish and chips • Fries or vegetables of the day • 1 scoop of ice cream or 1 push-up • Diabolo or water syrup',

    // Menu items - Desserts
    'menu.item.ile_flottante': 'Floating Island',
    'menu.desc.ile_flottante': 'The comforting dessert par excellence, light and tasty',
    'menu.item.creme_brulee': 'Crème Brûlée',
    'menu.desc.creme_brulee': 'Smooth vanilla cream topped with its crunchy caramel',
    'menu.item.mousse_chocolat': 'Chocolate Mousse',
    'menu.desc.mousse_chocolat': 'An airy and intense mousse for chocolate lovers',
    'menu.item.fondant_chocolat': 'Chocolate Fondant, Custard',
    'menu.desc.fondant_chocolat': 'Flowing heart and smooth cream for a moment of pure pleasure',
    'menu.item.cafe_gourmand': 'Coffee or Tea Gourmand',
    'menu.desc.cafe_gourmand': 'Accompanied by small homemade treats',
    'menu.item.irish_coffee': 'Irish Coffee',
    'menu.desc.irish_coffee': 'The perfect alliance between coffee, whiskey and whipped cream',
    'menu.item.dessert_moment': 'Dessert of the Moment',
    'menu.desc.dessert_moment': 'Our seasonal creation prepared with passion',

    // Menu items - Ice cream
    'menu.item.coupe_1boule': '1 Scoop Cup',
    'menu.desc.coupe_1boule': 'One scoop of your favorite flavor',
    'menu.item.coupe_2boules': '2 Scoops Cup',
    'menu.desc.coupe_2boules': 'Two scoops in our delicious homemade flavors',
    'menu.ingredients.coupe_2boules': 'Flavors: chocolate, vanilla, pistachio, rum raisin, salted caramel, lemon, apple, blackcurrant, coconut, mint, strawberry',
    'menu.item.cafe_liegeois': 'Coffee Liégeois',
    'menu.desc.cafe_liegeois': 'Vanilla ice cream, coffee and whipped cream for intense pleasure',
    'menu.item.caramel_liegeois': 'Caramel Liégeois',
    'menu.desc.caramel_liegeois': 'Vanilla ice cream topped with smooth caramel',
    'menu.item.chocolat_liegeois': 'Chocolate Liégeois',
    'menu.desc.chocolat_liegeois': 'For chocolate addicts',
    'menu.item.banana_split': 'Banana Split',
    'menu.desc.banana_split': 'The American star: banana, ice cream and whipped cream',
    'menu.item.coupe_martiniquaise': 'Martinique Cup',
    'menu.desc.coupe_martiniquaise': 'Rum raisin, banana, chocolate and whipped cream for a trip to the Caribbean',
    'menu.item.coupe_colonel': 'Colonel Cup',
    'menu.desc.coupe_colonel': 'Lemon sorbet enhanced with a touch of vodka',
    'menu.item.coupe_normande': 'Norman Cup',
    'menu.desc.coupe_normande': 'Our local specialty with regional flavors',
    'menu.item.supplement_chantilly': 'Whipped Cream Supplement',
    'menu.desc.supplement_chantilly': 'For even more indulgence',

    // Pizza extras
    'menu.pizza_extra_ingredient': 'Extra ingredient of your choice — €1.50',
    'menu.pizza_extra_list': '(mushroom, white ham, chicken, potato, cream)',

    // Ice cream flavors
    'menu.ice_cream_flavors_title': 'Available flavors:',
    'menu.ice_cream_flavors_list': 'Chocolate, vanilla, pistachio, rum raisin, salted caramel, lemon, apple, blackcurrant, coconut, mint, strawberry'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('fr'); // Français par défaut

  useEffect(() => {
    const savedLanguage = localStorage.getItem('papio-language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    } else {
      // Forcer le français par défaut si aucune langue sauvegardée
      setLanguageState('fr');
      localStorage.setItem('papio-language', 'fr');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('papio-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['fr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};