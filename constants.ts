import { Category, Product, Conversation, Message } from './types';

export const CATEGORIES: Category[] = [
  { id: 'rouge', label: 'Vins rouges' },
  { id: 'blanc', label: 'Vins blancs' },
  { id: 'rose', label: 'Vins rosés' },
  { id: 'champagne', label: 'Champagnes' },
  { id: 'biere', label: 'Bière & Craft' },
  { id: 'cidre', label: 'Cidre & Poiré' },
  { id: 'whisky', label: 'Whisky' },
  { id: 'rhum', label: 'Rhum' },
  { id: 'gin', label: 'Gin' },
  { id: 'vodka', label: 'Vodka' },
  { id: 'tequila', label: 'Tequila & Mezcal' },
  { id: 'cognac', label: 'Cognac' },
  { id: 'armagnac', label: 'Armagnac' },
  { id: 'calvados', label: 'Calvados' },
  { id: 'eaudevie', label: 'Eaux-de-vie' },
  { id: 'liqueur', label: 'Liqueurs' },
  { id: 'aperitif', label: 'Apéritifs' },
  { id: 'digestif', label: 'Digestifs' },
  { id: 'na', label: 'Sans alcool' },
  { id: 'coffret', label: 'Coffrets' },
  { id: 'accessoire', label: 'Accessoires' },
  { id: 'trade', label: 'Échange / Trade' },
  { id: 'rare', label: 'Collector' },
];

export const MOCK_USER_PRO: any = {
  id: 'u1',
  name: 'La Cave des Chartrons',
  avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 4.8,
  reviewCount: 124,
  location: 'Bordeaux, FR',
  email: 'contact@cave-chartrons.fr',
  firstName: 'Pierre',
  lastName: 'Martin',
  phone: '+33 5 56 12 34 56',
  memberSince: '2021',
  bio: 'Cave spécialisée dans les grands vins de Bordeaux et les spiritueux d\'exception. Plus de 30 ans d\'expérience dans la sélection et la conservation des bouteilles rares.',
  coverPhoto: '/paysage-pub-couverture.jpg'
};

export const MOCK_USER_COLLECTOR: any = {
  id: 'u2',
  name: 'Julien S.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  isPro: false,
  isVerified: true,
  rating: 5.0,
  reviewCount: 12,
  location: 'Paris 11e'
};

export const MOCK_USER_SOPHIE: any = {
  id: 'u3',
  name: 'Sophie V.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  isPro: false,
  isVerified: true,
  rating: 4.9,
  reviewCount: 28,
  location: 'Lyon'
};

export const MOCK_USER_DISTILLERY: any = {
  id: 'u4',
  name: 'Distillerie du Nord',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 4.7,
  reviewCount: 56,
  location: 'Lille',
  email: 'contact@distillerie-nord.fr',
  firstName: 'Jean',
  lastName: 'Dupont',
  phone: '+33 3 20 12 34 56',
  memberSince: '2019',
  bio: 'Distillerie artisanale spécialisée dans les eaux-de-vie du Nord de la France. Production traditionnelle et respectueuse des savoir-faire locaux.',
  coverPhoto: '/paysage-pub-couverture.jpg'
};

export const MOCK_USER_CAVE_BORDEAUX: any = {
  id: 'u5',
  name: 'La Cave de Bordeaux',
  avatar: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 4.9,
  reviewCount: 203,
  location: 'Bordeaux, FR',
  email: 'contact@cave-bordeaux.fr',
  firstName: 'Marie',
  lastName: 'Dubois',
  phone: '+33 5 56 78 90 12',
  memberSince: '2018',
  bio: 'Caviste passionné depuis 20 ans, spécialisé dans les grands crus de Bordeaux et les vins de la région. Sélection rigoureuse et conseils personnalisés.',
  coverPhoto: '/paysage-pub-couverture.jpg'
};

export const MOCK_USER_CAVE_PARIS: any = {
  id: 'u6',
  name: 'Cave des Princes',
  avatar: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 4.8,
  reviewCount: 156,
  location: 'Paris, 75016',
  email: 'contact@cave-princes.fr',
  firstName: 'Thomas',
  lastName: 'Moreau',
  phone: '+33 1 42 34 56 78',
  memberSince: '2020',
  bio: 'Cave parisienne de référence pour les spiritueux d\'exception. Import direct des meilleures maisons et sélection de bouteilles rares.',
  coverPhoto: '/paysage-pub-couverture.jpg'
};

export const MOCK_USER_DISTILLERIE_BOURGOGNE: any = {
  id: 'u7',
  name: 'Distillerie de Bourgogne',
  avatar: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 4.6,
  reviewCount: 89,
  location: 'Beaune, FR',
  email: 'contact@distillerie-bourgogne.fr',
  firstName: 'Claire',
  lastName: 'Bernard',
  phone: '+33 3 80 12 34 56',
  memberSince: '2021',
  bio: 'Distillerie familiale en Bourgogne, créateurs d\'eaux-de-vie et de liqueurs artisanales depuis 3 générations. Respect des traditions et innovation.',
  coverPhoto: '/paysage-pub-couverture.jpg'
};

export const MOCK_USER_PARTICULIER_MARC: any = {
  id: 'u8',
  name: 'Marc L.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  isPro: false,
  isVerified: true,
  rating: 5.0,
  reviewCount: 45,
  location: 'Lyon, 69001'
};

export const MOCK_USER_PARTICULIER_ANNE: any = {
  id: 'u9',
  name: 'Anne D.',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
  isPro: false,
  isVerified: true,
  rating: 4.9,
  reviewCount: 32,
  location: 'Marseille, FR'
};

export const MOCK_USER_PARTICULIER_PIERRE: any = {
  id: 'u10',
  name: 'Pierre M.',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  isPro: false,
  isVerified: false,
  rating: 4.7,
  reviewCount: 18,
  location: 'Toulouse, FR'
};

export const MOCK_USER_CAVE_ALSACE: any = {
  id: 'u11',
  name: 'Cave d\'Alsace',
  avatar: 'https://images.unsplash.com/photo-1564760290292-23341e4df6ec?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 4.8,
  reviewCount: 124,
  location: 'Strasbourg, FR'
};

export const MOCK_USER_DISTILLERIE_CHAMPAGNE: any = {
  id: 'u12',
  name: 'Maison de Champagne',
  avatar: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 5.0,
  reviewCount: 287,
  location: 'Reims, FR'
};

export const MOCK_USER_PARTICULIER_CLAIRE: any = {
  id: 'u13',
  name: 'Claire R.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  isPro: false,
  isVerified: true,
  rating: 4.8,
  reviewCount: 24,
  location: 'Nice, FR'
};

export const MOCK_USER_CAVE_LYON: any = {
  id: 'u14',
  name: 'Caviste de Lyon',
  avatar: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=200',
  isPro: true,
  isVerified: true,
  rating: 4.7,
  reviewCount: 167,
  location: 'Lyon, 69002'
};

export const MOCK_USER_PARTICULIER_LOUIS: any = {
  id: 'u15',
  name: 'Louis B.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  isPro: false,
  isVerified: false,
  rating: 4.5,
  reviewCount: 12,
  location: 'Nantes, FR'
};

export const MOCK_PRODUCTS: Product[] = [
  // --- EXISTANT (p1 à p5) ---
  {
    id: 'p1',
    title: 'Macallan 18 ans Sherry Oak (2023)',
    price: 450,
    currency: '€',
    images: ['/IMG_4572.JPG'],
    category: 'whisky',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris, 75003',
    postedAt: 'Aujourd\'hui, 10:30',
    seller: MOCK_USER_COLLECTOR,
    description: 'Bouteille en parfait état, étui inclus. Conservée en cave à température constante. Échange possible contre Japonais (Yamazaki 12 ou Hibiki 17 + soulte).',
    specs: { origin: 'Écosse', distillery: 'The Macallan', vintage: '2023', abv: '43%' },
    stock: 1,
    bottleDetails: {
      region: 'Speyside, Écosse',
      classification: 'Single Malt Scotch Whisky',
      tastingNotes: 'Robe ambrée profonde. Nez complexe aux notes de fruits secs, d\'épices douces et de vanille. Bouche riche et onctueuse avec des saveurs de chocolat, de caramel et de fruits confits. Finale longue et persistante aux notes de chêne et d\'épices.',
      drinkWindowStart: 'maintenant',
      drinkWindowEnd: 2040,
      servingTempMin: 18,
      servingTempMax: 20,
      decantingMinutesMin: 0,
      decantingMinutesMax: 0,
      pairings: ['chocolat noir', 'fromages affinés', 'cigares', 'desserts au caramel'],
      productionBottlesApprox: 12000,
      taxDisplay: 'TTC'
    }
  },
  {
    id: 'p2',
    title: 'Chartreuse VEP Verte (2018)',
    price: 180,
    currency: '€',
    images: ['/IMG_4568.JPG'], // Green bottle
    category: 'liqueur',
    isTradeable: false,
    isRare: true,
    condition: 'Coffret',
    volume: '100cl',
    location: 'Lyon, 69002',
    postedAt: 'Hier, 18:45',
    seller: MOCK_USER_PRO,
    description: 'Vieillissement Exceptionnellement Prolongé. Bouteille numérotée, coffret bois d\'origine. Facture disponible.',
    specs: { origin: 'France', distillery: 'Pères Chartreux', vintage: '2018', abv: '54%' },
    stock: 6,
    bottleDetails: {
      region: 'Chartreuse, Isère',
      classification: 'Liqueur VEP (Vieillissement Exceptionnellement Prolongé)',
      tastingNotes: 'Liqueur emblématique des Pères Chartreux. Robe vert émeraude. Nez complexe aux 130 plantes et épices avec des notes d\'anis, de menthe, de genièvre et d\'herbes alpines. Bouche puissante et équilibrée avec une longue finale épicée et mentholée.',
      drinkWindowStart: 'maintenant',
      drinkWindowEnd: 2045,
      servingTempMin: 4,
      servingTempMax: 6,
      decantingMinutesMin: 0,
      decantingMinutesMax: 0,
      pairings: ['chocolat noir', 'desserts au caramel', 'café', 'cigares'],
      productionBottlesApprox: 5000,
      taxDisplay: 'TTC'
    }
  },
  {
    id: 'p3',
    title: 'Caroni 1996 Trinidad Rum',
    price: 1200,
    currency: '€',
    images: ['/IMG_4567.JPG'], // Dark Rum
    category: 'rhum',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Bordeaux',
    postedAt: 'Il y a 2h',
    seller: MOCK_USER_COLLECTOR,
    description: 'Une légende. Niveau parfait. Pour collectionneur averti. Remise en main propre privilégiée vu la valeur.',
    specs: { origin: 'Trinidad', distillery: 'Caroni', vintage: '1996', abv: '55%' },
    stock: 1,
    bottleDetails: {
      region: 'Trinidad, Caraïbes',
      classification: 'Single Cask Rum',
      tastingNotes: 'Rhum de légende de la distillerie fermée Caroni. Robe ambrée foncée. Nez puissant aux notes de mélasse, de tabac, de caramel brûlé et d\'épices exotiques. Bouche intense et complexe avec des saveurs de fruits secs, de cacao et de réglisse. Finale interminable aux notes de fumée et d\'épices.',
      drinkWindowStart: 'maintenant',
      drinkWindowEnd: 2045,
      servingTempMin: 18,
      servingTempMax: 20,
      decantingMinutesMin: 0,
      decantingMinutesMax: 0,
      pairings: ['cigares', 'chocolat noir', 'desserts au caramel', 'fromages bleus'],
      productionBottlesApprox: 250,
      taxDisplay: 'TTC'
    }
  },
  {
    id: 'p4',
    title: 'Lot découverte Vins Nature (6 bouteilles)',
    price: 95,
    currency: '€',
    images: ['/IMG_4566.JPG'], // Wine bottles collection
    category: 'rouge',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '6x75cl',
    location: 'Nantes',
    postedAt: 'Il y a 5h',
    seller: MOCK_USER_PRO,
    description: 'Sélection du caviste : 2 Beaujolais (Lapierre), 2 Loire (Breton), 2 Jura (Tissot). Idéal pour découvrir.',
    specs: { origin: 'France', vintage: '2021-2022' },
    stock: 7
  },
  {
    id: 'p5',
    title: 'Hibiki Japanese Harmony',
    price: 110,
    currency: '€',
    images: ['/IMG_4577.JPG'], // Japanese Whisky vibe
    category: 'whisky',
    isTradeable: true,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Lille',
    postedAt: 'Il y a 1j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Doublon dans ma collection. Échange contre Gin haut de gamme ou vente.',
    specs: { origin: 'Japon', distillery: 'Suntory', abv: '43%' },
    stock: 2
  },

  // --- VINS ROUGES ---
  {
    id: 'p6',
    title: 'Château Margaux 2015',
    price: 850,
    currency: '€',
    images: ['/IMG_4573.JPG'],
    category: 'rouge',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Bordeaux',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_PRO,
    description: 'Premier Grand Cru Classé. Millésime exceptionnel. Conservé en cave professionnelle.',
    specs: { origin: 'Bordeaux, France', distillery: 'Château Margaux', vintage: '2015' },
    stock: 3,
    bottleDetails: {
      grapes: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot', 'Cabernet Franc'],
      region: 'Margaux, Médoc',
      classification: 'Premier Grand Cru Classé',
      tastingNotes: 'Millésime exceptionnel, l\'un des meilleurs de la décennie. Robe pourpre intense. Nez complexe aux arômes de fruits noirs, de cèdre et de tabac. Bouche puissante et élégante avec une structure tannique remarquable. Finale interminable. Vin de garde exceptionnel.',
      drinkWindowStart: 2025,
      drinkWindowEnd: 2050,
      servingTempMin: 16,
      servingTempMax: 18,
      decantingMinutesMin: 60,
      decantingMinutesMax: 120,
      pairings: ['agneau rôti', 'bœuf en croûte', 'fromages affinés', 'chocolat noir'],
      productionBottlesApprox: 150000,
      allergens: { sulfites: true },
      taxDisplay: 'TTC'
    }
  },
  {
    id: 'p7',
    title: 'Côte-Rôtie "La Mouline" Guigal 2012',
    price: 380,
    currency: '€',
    images: ['/IMG_4571.JPG'],
    category: 'rouge',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Lyon',
    postedAt: 'Il y a 3h',
    seller: MOCK_USER_SOPHIE,
    description: 'Une des trois "La" de Guigal. Parfait état.',
    specs: { origin: 'Vallée du Rhône', vintage: '2012' },
    stock: 1,
    bottleDetails: {
      grapes: ['Syrah (89%)', 'Viognier (11%)'],
      region: 'Côte-Rôtie, Vallée du Rhône',
      classification: 'AOP Côte-Rôtie',
      tastingNotes: 'La plus féminine des trois "La". Robe rubis profond. Nez floral et épicé aux notes de violette, de framboise et de poivre. Bouche élégante et soyeuse avec une finale persistante aux notes de fruits rouges et d\'épices douces.',
      drinkWindowStart: 'maintenant',
      drinkWindowEnd: 2035,
      servingTempMin: 16,
      servingTempMax: 17,
      decantingMinutesMin: 45,
      decantingMinutesMax: 90,
      pairings: ['gigot d\'agneau', 'volaille rôtie', 'fromages de chèvre', 'charcuterie'],
      productionBottlesApprox: 4000,
      allergens: { sulfites: true },
      taxDisplay: 'TTC'
    }
  },

  // --- VINS BLANCS ---
  {
    id: 'p8',
    title: 'Puligny-Montrachet 1er Cru 2020',
    price: 125,
    currency: '€',
    images: ['/IMG_4575.JPG'], // White wine
    category: 'blanc',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Dijon',
    postedAt: 'Il y a 1j',
    seller: MOCK_USER_PRO,
    description: 'Domaine Leflaive. Vin d\'une grande finesse. Idéal garde ou dégustation.',
    specs: { origin: 'Bourgogne', vintage: '2020' },
    stock: 4,
    bottleDetails: {
      grapes: 'Chardonnay (100%)',
      region: 'Puligny-Montrachet, Côte de Beaune',
      classification: 'AOP Puligny-Montrachet 1er Cru',
      tastingNotes: 'Robe jaune pâle aux reflets verts. Nez minéral et floral aux notes de citron, de pamplemousse et de fleur blanche. Bouche élégante et racée avec une belle acidité et une finale saline caractéristique des grands Chardonnay de Bourgogne.',
      drinkWindowStart: 'maintenant',
      drinkWindowEnd: 2035,
      servingTempMin: 12,
      servingTempMax: 14,
      decantingMinutesMin: 0,
      decantingMinutesMax: 0,
      pairings: ['poissons grillés', 'fruits de mer', 'fromages de chèvre', 'volaille à la crème'],
      allergens: { sulfites: true },
      taxDisplay: 'TTC'
    }
  },
  {
    id: 'p9',
    title: 'Condrieu "La Doriane" Guigal 2021',
    price: 95,
    currency: '€',
    images: ['/IMG_4574.JPG'], // White wine glass/bottle
    category: 'blanc',
    isTradeable: true,
    isRare: false,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Paris',
    postedAt: 'Il y a 4h',
    seller: MOCK_USER_COLLECTOR,
    description: 'Le must du Viognier. Je vends car j\'en ai trop acheté.',
    specs: { origin: 'Vallée du Rhône', vintage: '2021' },
    stock: 5,
    bottleDetails: {
      grapes: 'Viognier (100%)',
      region: 'Condrieu, Vallée du Rhône',
      classification: 'AOP Condrieu',
      tastingNotes: 'Robe dorée intense. Nez explosif aux notes de pêche, d\'abricot, de violette et de miel. Bouche opulente et généreuse avec une belle longueur en bouche. Le meilleur Condrieu de la maison Guigal.',
      drinkWindowStart: 'maintenant',
      drinkWindowEnd: 2030,
      servingTempMin: 12,
      servingTempMax: 14,
      decantingMinutesMin: 0,
      decantingMinutesMax: 0,
      pairings: ['foie gras', 'poissons en sauce', 'fromages de chèvre', 'fruits de mer'],
      allergens: { sulfites: true },
      taxDisplay: 'TTC'
    }
  },

  // --- VINS ROSÉS ---
  {
    id: 'p10',
    title: 'Miraval Rosé Côtes de Provence (Carton de 6)',
    price: 90,
    currency: '€',
    images: ['/IMG_4569.JPG'], // Rosé
    category: 'rose',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '6x75cl',
    location: 'Aix-en-Provence',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_PRO,
    description: 'Millésime 2023. Le rosé star de l\'été.',
    specs: { origin: 'Provence', vintage: '2023' },
    stock: 7
  },
  {
    id: 'p11',
    title: 'Domaine Ott "Château de Selle" Magnum',
    price: 75,
    currency: '€',
    images: ['/IMG_4565.JPG'], // Rosé magnum vibe
    category: 'rose',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '150cl',
    location: 'Nice',
    postedAt: 'Hier',
    seller: MOCK_USER_SOPHIE,
    description: 'Superbe magnum pour les fêtes. Rosé de gastronomie.',
    specs: { origin: 'Provence', vintage: '2022' },
    stock: 6
  },

  // --- CHAMPAGNES ---
  {
    id: 'p12',
    title: 'Dom Pérignon Vintage 2012',
    price: 240,
    currency: '€',
    images: ['/IMG_4564.JPG'],
    category: 'champagne',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '75cl',
    location: 'Reims',
    postedAt: 'Aujourd\'hui',
    seller: MOCK_USER_PRO,
    description: 'Coffret original. Conservation parfaite en cave crayère.',
    specs: { origin: 'Champagne', distillery: 'Moët & Chandon', vintage: '2012' },
    stock: 2,
    bottleDetails: {
      grapes: ['Chardonnay (50%)', 'Pinot Noir (50%)'],
      region: 'Champagne, Vallée de la Marne',
      classification: 'AOP Champagne',
      tastingNotes: 'Millésime 2012, année solaire exceptionnelle. Bulles fines et persistantes. Nez complexe aux notes de fruits blancs, de brioche et de fleurs blanches. Bouche équilibrée et élégante avec une belle minéralité. Finale longue et raffinée.',
      drinkWindowStart: 'maintenant',
      drinkWindowEnd: 2040,
      servingTempMin: 8,
      servingTempMax: 10,
      decantingMinutesMin: 0,
      decantingMinutesMax: 0,
      pairings: ['huîtres', 'caviar', 'foie gras', 'desserts aux fruits'],
      productionBottlesApprox: 5000000,
      allergens: { sulfites: true },
      taxDisplay: 'TTC'
    }
  },
  {
    id: 'p13',
    title: 'Krug Grande Cuvée 170ème Édition',
    price: 290,
    currency: '€',
    images: ['/IMG_4576.JPG'], // Champagne bottle
    category: 'champagne',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Paris',
    postedAt: 'Il y a 5j',
    seller: MOCK_USER_COLLECTOR,
    description: 'L\'expression ultime du Champagne. Acheté chez un caviste agréé.',
    specs: { origin: 'Champagne', distillery: 'Krug' },
    stock: 1
  },

  // --- BIÈRES ---
  {
    id: 'p14',
    title: 'Cantillon Gueuze 100% Lambic Bio',
    price: 25,
    currency: '€',
    images: ['/IMG_4570.JPG'], // Beer bottle
    category: 'biere',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Lille',
    postedAt: 'Il y a 3h',
    seller: MOCK_USER_DISTILLERY,
    description: 'Millésime 2021. Rare en France. Conservée debout.',
    specs: { origin: 'Belgique', distillery: 'Brasserie Cantillon', abv: '5.5%' },
    stock: 7
  },
  {
    id: 'p15',
    title: 'Westvleteren 12 (Pack de 6)',
    price: 90,
    currency: '€',
    images: ['/IMG_4572.JPG'], // Dark beer bottle
    category: 'biere',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '6x33cl',
    location: 'Bruxelles (Livraison FR)',
    postedAt: 'Hier',
    seller: MOCK_USER_COLLECTOR,
    description: 'La meilleure bière du monde selon RateBeer. Achetée à l\'abbaye.',
    specs: { origin: 'Belgique', distillery: 'Abbaye de Saint-Sixtus', abv: '10.2%' },
    stock: 3
  },

  // --- WHISKY (Plus d'items) ---
  {
    id: 'p16',
    title: 'Lagavulin 16 ans',
    price: 85,
    currency: '€',
    images: ['/IMG_4568.JPG'], // Whisky bottle
    category: 'whisky',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Brest',
    postedAt: 'Il y a 6h',
    seller: MOCK_USER_SOPHIE,
    description: 'Le grand classique d\'Islay. Tourbé et fumé. Étui inclus.',
    specs: { origin: 'Écosse (Islay)', distillery: 'Lagavulin', abv: '43%' },
    stock: 6
  },
  {
    id: 'p17',
    title: 'Springbank 15 ans',
    price: 130,
    currency: '€',
    images: ['/IMG_4567.JPG'], // Whisky bottle
    category: 'whisky',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Difficile à trouver. Sherry casks. Un Campbeltown d\'exception.',
    specs: { origin: 'Écosse', distillery: 'Springbank', abv: '46%' },
    stock: 1
  },

  // --- RHUM (Plus d'items) ---
  {
    id: 'p18',
    title: 'Foursquare 2009 ECS',
    price: 110,
    currency: '€',
    images: ['/IMG_4566.JPG'], // Dark liquor
    category: 'rhum',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Nantes',
    postedAt: 'Hier',
    seller: MOCK_USER_COLLECTOR,
    description: 'Exceptional Cask Selection. Rhum de Barbade, brut de fût.',
    specs: { origin: 'Barbade', distillery: 'Foursquare', vintage: '2009', abv: '60%' },
    stock: 2
  },
  {
    id: 'p19',
    title: 'Havana Club Máximo Extra Añejo',
    price: 1500,
    currency: '€',
    images: ['/IMG_4577.JPG'], // Fancy bottle
    category: 'rhum',
    isTradeable: false,
    isRare: true,
    condition: 'Coffret',
    volume: '50cl',
    location: 'Paris 8e',
    postedAt: 'Il y a 1 sem',
    seller: MOCK_USER_PRO,
    description: 'Le summum du rhum cubain. Carafe en cristal soufflé main.',
    specs: { origin: 'Cuba', distillery: 'Havana Club', abv: '40%' },
    stock: 7
  },

  // --- GIN ---
  {
    id: 'p20',
    title: 'Monkey 47 Distiller\'s Cut 2022',
    price: 140,
    currency: '€',
    images: ['/IMG_4573.JPG'], // Gin bottle dark
    category: 'gin',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '50cl',
    location: 'Strasbourg',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Édition limitée annuelle avec l\'ingrédient secret "Gaillet Gratteron".',
    specs: { origin: 'Allemagne', distillery: 'Black Forest Distillers', vintage: '2022', abv: '47%' },
    stock: 1
  },
  {
    id: 'p21',
    title: 'Ki No Bi Kyoto Dry Gin',
    price: 55,
    currency: '€',
    images: ['/IMG_4571.JPG'], // Gin bottle
    category: 'gin',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Lyon',
    postedAt: 'Il y a 5h',
    seller: MOCK_USER_PRO,
    description: 'Gin japonais artisanal avec yuzu, hinoki, thé vert gyokuro.',
    specs: { origin: 'Japon', distillery: 'Kyoto Distillery', abv: '45.7%' },
    stock: 6
  },

  // --- VODKA ---
  {
    id: 'p22',
    title: 'Beluga Gold Line',
    price: 120,
    currency: '€',
    images: ['/IMG_4575.JPG'], // Vodka
    category: 'vodka',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Nice',
    postedAt: 'Hier',
    seller: MOCK_USER_PRO,
    description: 'Vodka premium russe. Livrée avec son petit marteau pour casser le sceau de cire.',
    specs: { origin: 'Russie', distillery: 'Mariinsk', abv: '40%' },
    stock: 8
  },

  // --- TEQUILA / MEZCAL ---
  {
    id: 'p23',
    title: 'Clase Azul Reposado',
    price: 180,
    currency: '€',
    images: ['/IMG_4574.JPG'], // Tequila
    category: 'tequila',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Il y a 4h',
    seller: MOCK_USER_PRO,
    description: 'La fameuse bouteille en céramique peinte à la main. Tequila très douce et vanillée.',
    specs: { origin: 'Mexique', distillery: 'Clase Azul', abv: '40%' },
    stock: 4
  },
  {
    id: 'p24',
    title: 'Don Julio 1942',
    price: 190,
    currency: '€',
    images: ['/IMG_4569.JPG'], // Tequila nice bottle
    category: 'tequila',
    isTradeable: true,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Cannes',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Añejo d\'exception, vieilli 2 ans et demi.',
    specs: { origin: 'Mexique', distillery: 'Don Julio', abv: '38%' },
    stock: 7
  },
  {
    id: 'p25',
    title: 'Mezcal Del Maguey Tobala',
    price: 130,
    currency: '€',
    images: ['/IMG_4565.JPG'], // Mezcal
    category: 'tequila',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Bordeaux',
    postedAt: 'Hier',
    seller: MOCK_USER_SOPHIE,
    description: 'Mezcal sauvage rare. Agaves Tobala d\'altitude.',
    specs: { origin: 'Mexique (Oaxaca)', distillery: 'Del Maguey', abv: '46%' },
    stock: 1
  },

  // --- COGNAC / ARMAGNAC / CALVADOS ---
  {
    id: 'p26',
    title: 'Hennessy Paradis',
    price: 950,
    currency: '€',
    images: ['/IMG_4564.JPG'], // Cognac
    category: 'cognac',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Cognac',
    postedAt: 'Il y a 1 sem',
    seller: MOCK_USER_PRO,
    description: 'Assemblage de plus de 100 eaux-de-vie. Élégance absolue.',
    specs: { origin: 'France', distillery: 'Hennessy', abv: '40%' },
    stock: 2
  },
  {
    id: 'p27',
    title: 'Bas-Armagnac Darroze 1982',
    price: 160,
    currency: '€',
    images: ['/IMG_4576.JPG'], // Brandy style
    category: 'armagnac',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Mont-de-Marsan',
    postedAt: 'Hier',
    seller: MOCK_USER_COLLECTOR,
    description: 'Domaine de Rieston. Année de ma naissance, reçu en double.',
    specs: { origin: 'France (Gascogne)', distillery: 'Francis Darroze', vintage: '1982', abv: '48%' },
    stock: 6
  },
  {
    id: 'p28',
    title: 'Calvados Christian Drouin 1990',
    price: 140,
    currency: '€',
    images: ['/IMG_4570.JPG'], // Amber spirit
    category: 'calvados',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Caen',
    postedAt: 'Il y a 3j',
    seller: MOCK_USER_PRO,
    description: 'Pays d\'Auge. Superbe complexité (pomme cuite, épices).',
    specs: { origin: 'Normandie', distillery: 'Christian Drouin', vintage: '1990', abv: '42%' },
    stock: 3
  },

  // --- SPIRITUEUX DIVERS ---
  {
    id: 'p29',
    title: 'Eau-de-vie Poire Williams Miclo',
    price: 45,
    currency: '€',
    images: ['/IMG_4572.JPG'], // Clear bottle
    category: 'eaudevie',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Strasbourg',
    postedAt: 'Hier',
    seller: MOCK_USER_DISTILLERY,
    description: 'Grande Réserve. Fruit intense.',
    specs: { origin: 'Alsace', distillery: 'G. Miclo', abv: '43%' },
    stock: 9
  },
  {
    id: 'p30',
    title: 'Grand Marnier Cuvée du Centenaire',
    price: 90,
    currency: '€',
    images: ['/IMG_4568.JPG'], // Liqueur
    category: 'liqueur',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_PRO,
    description: 'Assemblage de vieux cognacs et d\'orange amère. Créé en 1927.',
    specs: { origin: 'France', distillery: 'Grand Marnier', abv: '40%' },
    stock: 10
  },
  {
    id: 'p31',
    title: 'Amaro Nonino Quintessentia',
    price: 35,
    currency: '€',
    images: ['/IMG_4567.JPG'], // Dark herbal bottle
    category: 'digestif',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Nice',
    postedAt: 'Il y a 5h',
    seller: MOCK_USER_SOPHIE,
    description: 'Le meilleur Amaro pour le Paper Plane cocktail.',
    specs: { origin: 'Italie', distillery: 'Nonino', abv: '35%' },
    stock: 5
  },

  // --- SANS ALCOOL ---
  {
    id: 'p32',
    title: 'Seedlip Garden 108',
    price: 28,
    currency: '€',
    images: ['/IMG_4566.JPG'], // Clear fancy bottle
    category: 'na',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Hier',
    seller: MOCK_USER_PRO,
    description: 'Spiritueux distillé sans alcool. Notes herbacées (pois, foin).',
    specs: { origin: 'UK', distillery: 'Seedlip', abv: '0%' },
    stock: 8
  },

  // --- COFFRETS & ACCESSOIRES ---
  {
    id: 'p33',
    title: 'Coffret Dégustation Whisky Japonais (5x3cl)',
    price: 45,
    currency: '€',
    images: ['/IMG_4577.JPG'], // Tasting set vibe
    category: 'coffret',
    isTradeable: true,
    isRare: false,
    condition: 'Scellé',
    volume: '15cl',
    location: 'Lyon',
    postedAt: 'Il y a 2h',
    seller: MOCK_USER_PRO,
    description: 'Nikka, Yamazaki, Hakushu, Hibiki, Miyagikyo.',
    specs: { origin: 'Japon' },
    stock: 6
  },
  {
    id: 'p34',
    title: 'Verres Zalto Universel (Boîte de 2)',
    price: 80,
    currency: '€',
    images: ['/IMG_4573.JPG'], // Wine glass
    category: 'accessoire',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: 'N/A',
    location: 'Bordeaux',
    postedAt: 'Il y a 1j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Verres soufflés bouche, ultra-fins. Le must pour la dégustation.',
    specs: { origin: 'Autriche', distillery: 'Zalto' },
    stock: 4
  }
];

// Mock Auctions
export const MOCK_AUCTIONS: any[] = [
  {
    id: 'auction1',
    product: MOCK_PRODUCTS[1], // Chartreuse VEP Verte
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // 2 jours et 5 heures
    currentBid: 195,
    bidCount: 12,
    minBid: 200
  },
  {
    id: 'auction2',
    product: MOCK_PRODUCTS[0], // Macallan 18
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 1 jour et 3 heures
    currentBid: 480,
    bidCount: 8,
    minBid: 500
  },
  {
    id: 'auction3',
    product: MOCK_PRODUCTS[5], // Château Margaux
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000), // 23 heures
    currentBid: 920,
    bidCount: 15,
    minBid: 950
  },
  {
    id: 'auction4',
    product: MOCK_PRODUCTS[11], // Dom Pérignon
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000), // 3 jours et 12 heures
    currentBid: 260,
    bidCount: 6,
    minBid: 280
  },
  {
    id: 'auction5',
    product: MOCK_PRODUCTS[17], // Springbank 15
    endTime: new Date(Date.now() + 18 * 60 * 60 * 1000 + 45 * 60 * 1000), // 18 heures et 45 minutes
    currentBid: 145,
    bidCount: 9,
    minBid: 150
  },
  {
    id: 'auction6',
    product: MOCK_PRODUCTS[25], // Hennessy Paradis
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 4 jours et 8 heures
    currentBid: 1020,
    bidCount: 11,
    minBid: 1050
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    product: MOCK_PRODUCTS[0],
    otherUser: MOCK_USER_COLLECTOR,
    lastMessage: 'Est-ce que le prix est négociable ?',
    timestamp: '10:45',
    unreadCount: 1,
    isOnline: true
  },
  {
    id: 'c2',
    product: MOCK_PRODUCTS[2],
    otherUser: MOCK_USER_PRO,
    lastMessage: 'Je peux vous proposer un échange.',
    timestamp: 'Hier',
    unreadCount: 0,
    isOnline: false
  }
];