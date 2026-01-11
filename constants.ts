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
  location: 'Bordeaux, FR'
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
  location: 'Lille'
};

export const MOCK_PRODUCTS: Product[] = [
  // --- EXISTANT (p1 à p5) ---
  {
    id: 'p1',
    title: 'Macallan 18 ans Sherry Oak (2023)',
    price: 450,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80'],
    category: 'whisky',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris, 75003',
    postedAt: 'Aujourd\'hui, 10:30',
    seller: MOCK_USER_COLLECTOR,
    description: 'Bouteille en parfait état, étui inclus. Conservée en cave à température constante. Échange possible contre Japonais (Yamazaki 12 ou Hibiki 17 + soulte).',
    specs: { origin: 'Écosse', distillery: 'The Macallan', vintage: '2023', abv: '43%' }
  },
  {
    id: 'p2',
    title: 'Chartreuse VEP Verte (2018)',
    price: 180,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80'], // Green bottle
    category: 'liqueur',
    isTradeable: false,
    isRare: true,
    condition: 'Coffret',
    volume: '100cl',
    location: 'Lyon, 69002',
    postedAt: 'Hier, 18:45',
    seller: MOCK_USER_PRO,
    description: 'Vieillissement Exceptionnellement Prolongé. Bouteille numérotée, coffret bois d\'origine. Facture disponible.',
    specs: { origin: 'France', distillery: 'Pères Chartreux', vintage: '2018', abv: '54%' }
  },
  {
    id: 'p3',
    title: 'Caroni 1996 Trinidad Rum',
    price: 1200,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1614313511387-1436a4480ebb?w=800&q=80'], // Dark Rum
    category: 'rhum',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Bordeaux',
    postedAt: 'Il y a 2h',
    seller: MOCK_USER_COLLECTOR,
    description: 'Une légende. Niveau parfait. Pour collectionneur averti. Remise en main propre privilégiée vu la valeur.',
    specs: { origin: 'Trinidad', distillery: 'Caroni', vintage: '1996', abv: '55%' }
  },
  {
    id: 'p4',
    title: 'Lot découverte Vins Nature (6 bouteilles)',
    price: 95,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80'], // Wine bottles collection
    category: 'rouge',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '6x75cl',
    location: 'Nantes',
    postedAt: 'Il y a 5h',
    seller: MOCK_USER_PRO,
    description: 'Sélection du caviste : 2 Beaujolais (Lapierre), 2 Loire (Breton), 2 Jura (Tissot). Idéal pour découvrir.',
    specs: { origin: 'France', vintage: '2021-2022' }
  },
  {
    id: 'p5',
    title: 'Hibiki Japanese Harmony',
    price: 110,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80'], // Japanese Whisky vibe
    category: 'whisky',
    isTradeable: true,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Lille',
    postedAt: 'Il y a 1j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Doublon dans ma collection. Échange contre Gin haut de gamme ou vente.',
    specs: { origin: 'Japon', distillery: 'Suntory', abv: '43%' }
  },

  // --- VINS ROUGES ---
  {
    id: 'p6',
    title: 'Château Margaux 2015',
    price: 850,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80'],
    category: 'rouge',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Bordeaux',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_PRO,
    description: 'Premier Grand Cru Classé. Millésime exceptionnel. Conservé en cave professionnelle.',
    specs: { origin: 'Bordeaux, France', distillery: 'Château Margaux', vintage: '2015' }
  },
  {
    id: 'p7',
    title: 'Côte-Rôtie "La Mouline" Guigal 2012',
    price: 380,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80'],
    category: 'rouge',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Lyon',
    postedAt: 'Il y a 3h',
    seller: MOCK_USER_SOPHIE,
    description: 'Une des trois "La" de Guigal. Parfait état.',
    specs: { origin: 'Vallée du Rhône', vintage: '2012' }
  },

  // --- VINS BLANCS ---
  {
    id: 'p8',
    title: 'Puligny-Montrachet 1er Cru 2020',
    price: 125,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=800&q=80'], // White wine
    category: 'blanc',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Dijon',
    postedAt: 'Il y a 1j',
    seller: MOCK_USER_PRO,
    description: 'Domaine Leflaive. Vin d\'une grande finesse. Idéal garde ou dégustation.',
    specs: { origin: 'Bourgogne', vintage: '2020' }
  },
  {
    id: 'p9',
    title: 'Condrieu "La Doriane" Guigal 2021',
    price: 95,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=800&q=80'], // White wine glass/bottle
    category: 'blanc',
    isTradeable: true,
    isRare: false,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Paris',
    postedAt: 'Il y a 4h',
    seller: MOCK_USER_COLLECTOR,
    description: 'Le must du Viognier. Je vends car j\'en ai trop acheté.',
    specs: { origin: 'Vallée du Rhône', vintage: '2021' }
  },

  // --- VINS ROSÉS ---
  {
    id: 'p10',
    title: 'Miraval Rosé Côtes de Provence (Carton de 6)',
    price: 90,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c3d?w=800&q=80'], // Rosé
    category: 'rose',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '6x75cl',
    location: 'Aix-en-Provence',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_PRO,
    description: 'Millésime 2023. Le rosé star de l\'été.',
    specs: { origin: 'Provence', vintage: '2023' }
  },
  {
    id: 'p11',
    title: 'Domaine Ott "Château de Selle" Magnum',
    price: 75,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=800&q=80'], // Rosé magnum vibe
    category: 'rose',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '150cl',
    location: 'Nice',
    postedAt: 'Hier',
    seller: MOCK_USER_SOPHIE,
    description: 'Superbe magnum pour les fêtes. Rosé de gastronomie.',
    specs: { origin: 'Provence', vintage: '2022' }
  },

  // --- CHAMPAGNES ---
  {
    id: 'p12',
    title: 'Dom Pérignon Vintage 2012',
    price: 240,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1594488518600-d86016e792c3?w=800&q=80'],
    category: 'champagne',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '75cl',
    location: 'Reims',
    postedAt: 'Aujourd\'hui',
    seller: MOCK_USER_PRO,
    description: 'Coffret original. Conservation parfaite en cave crayère.',
    specs: { origin: 'Champagne', distillery: 'Moët & Chandon', vintage: '2012' }
  },
  {
    id: 'p13',
    title: 'Krug Grande Cuvée 170ème Édition',
    price: 290,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?w=800&q=80'], // Champagne bottle
    category: 'champagne',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Paris',
    postedAt: 'Il y a 5j',
    seller: MOCK_USER_COLLECTOR,
    description: 'L\'expression ultime du Champagne. Acheté chez un caviste agréé.',
    specs: { origin: 'Champagne', distillery: 'Krug' }
  },

  // --- BIÈRES ---
  {
    id: 'p14',
    title: 'Cantillon Gueuze 100% Lambic Bio',
    price: 25,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800&q=80'], // Beer bottle
    category: 'biere',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '75cl',
    location: 'Lille',
    postedAt: 'Il y a 3h',
    seller: MOCK_USER_DISTILLERY,
    description: 'Millésime 2021. Rare en France. Conservée debout.',
    specs: { origin: 'Belgique', distillery: 'Brasserie Cantillon', abv: '5.5%' }
  },
  {
    id: 'p15',
    title: 'Westvleteren 12 (Pack de 6)',
    price: 90,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80'], // Dark beer bottle
    category: 'biere',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '6x33cl',
    location: 'Bruxelles (Livraison FR)',
    postedAt: 'Hier',
    seller: MOCK_USER_COLLECTOR,
    description: 'La meilleure bière du monde selon RateBeer. Achetée à l\'abbaye.',
    specs: { origin: 'Belgique', distillery: 'Abbaye de Saint-Sixtus', abv: '10.2%' }
  },

  // --- WHISKY (Plus d'items) ---
  {
    id: 'p16',
    title: 'Lagavulin 16 ans',
    price: 85,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1514218953589-2d7d37efd2dc?w=800&q=80'], // Whisky bottle
    category: 'whisky',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Brest',
    postedAt: 'Il y a 6h',
    seller: MOCK_USER_SOPHIE,
    description: 'Le grand classique d\'Islay. Tourbé et fumé. Étui inclus.',
    specs: { origin: 'Écosse (Islay)', distillery: 'Lagavulin', abv: '43%' }
  },
  {
    id: 'p17',
    title: 'Springbank 15 ans',
    price: 130,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&q=80'], // Whisky bottle
    category: 'whisky',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Difficile à trouver. Sherry casks. Un Campbeltown d\'exception.',
    specs: { origin: 'Écosse', distillery: 'Springbank', abv: '46%' }
  },

  // --- RHUM (Plus d'items) ---
  {
    id: 'p18',
    title: 'Foursquare 2009 ECS',
    price: 110,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80'], // Dark liquor
    category: 'rhum',
    isTradeable: true,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Nantes',
    postedAt: 'Hier',
    seller: MOCK_USER_COLLECTOR,
    description: 'Exceptional Cask Selection. Rhum de Barbade, brut de fût.',
    specs: { origin: 'Barbade', distillery: 'Foursquare', vintage: '2009', abv: '60%' }
  },
  {
    id: 'p19',
    title: 'Havana Club Máximo Extra Añejo',
    price: 1500,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1616450689956-6a4a6b189736?w=800&q=80'], // Fancy bottle
    category: 'rhum',
    isTradeable: false,
    isRare: true,
    condition: 'Coffret',
    volume: '50cl',
    location: 'Paris 8e',
    postedAt: 'Il y a 1 sem',
    seller: MOCK_USER_PRO,
    description: 'Le summum du rhum cubain. Carafe en cristal soufflé main.',
    specs: { origin: 'Cuba', distillery: 'Havana Club', abv: '40%' }
  },

  // --- GIN ---
  {
    id: 'p20',
    title: 'Monkey 47 Distiller\'s Cut 2022',
    price: 140,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1613247343132-720613df938e?w=800&q=80'], // Gin bottle dark
    category: 'gin',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '50cl',
    location: 'Strasbourg',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Édition limitée annuelle avec l\'ingrédient secret "Gaillet Gratteron".',
    specs: { origin: 'Allemagne', distillery: 'Black Forest Distillers', vintage: '2022', abv: '47%' }
  },
  {
    id: 'p21',
    title: 'Ki No Bi Kyoto Dry Gin',
    price: 55,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1607622750671-6cd9a99eabd9?w=800&q=80'], // Gin bottle
    category: 'gin',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Lyon',
    postedAt: 'Il y a 5h',
    seller: MOCK_USER_PRO,
    description: 'Gin japonais artisanal avec yuzu, hinoki, thé vert gyokuro.',
    specs: { origin: 'Japon', distillery: 'Kyoto Distillery', abv: '45.7%' }
  },

  // --- VODKA ---
  {
    id: 'p22',
    title: 'Beluga Gold Line',
    price: 120,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1620608770281-9b63a948e89f?w=800&q=80'], // Vodka
    category: 'vodka',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Nice',
    postedAt: 'Hier',
    seller: MOCK_USER_PRO,
    description: 'Vodka premium russe. Livrée avec son petit marteau pour casser le sceau de cire.',
    specs: { origin: 'Russie', distillery: 'Mariinsk', abv: '40%' }
  },

  // --- TEQUILA / MEZCAL ---
  {
    id: 'p23',
    title: 'Clase Azul Reposado',
    price: 180,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1504279577054-123b5e488136?w=800&q=80'], // Tequila
    category: 'tequila',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Il y a 4h',
    seller: MOCK_USER_PRO,
    description: 'La fameuse bouteille en céramique peinte à la main. Tequila très douce et vanillée.',
    specs: { origin: 'Mexique', distillery: 'Clase Azul', abv: '40%' }
  },
  {
    id: 'p24',
    title: 'Don Julio 1942',
    price: 190,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1542845812-780c1df07f79?w=800&q=80'], // Tequila nice bottle
    category: 'tequila',
    isTradeable: true,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Cannes',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Añejo d\'exception, vieilli 2 ans et demi.',
    specs: { origin: 'Mexique', distillery: 'Don Julio', abv: '38%' }
  },
  {
    id: 'p25',
    title: 'Mezcal Del Maguey Tobala',
    price: 130,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1596700549442-5ba05df263c9?w=800&q=80'], // Mezcal
    category: 'tequila',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Bordeaux',
    postedAt: 'Hier',
    seller: MOCK_USER_SOPHIE,
    description: 'Mezcal sauvage rare. Agaves Tobala d\'altitude.',
    specs: { origin: 'Mexique (Oaxaca)', distillery: 'Del Maguey', abv: '46%' }
  },

  // --- COGNAC / ARMAGNAC / CALVADOS ---
  {
    id: 'p26',
    title: 'Hennessy Paradis',
    price: 950,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1582239332560-c32490799763?w=800&q=80'], // Cognac
    category: 'cognac',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Cognac',
    postedAt: 'Il y a 1 sem',
    seller: MOCK_USER_PRO,
    description: 'Assemblage de plus de 100 eaux-de-vie. Élégance absolue.',
    specs: { origin: 'France', distillery: 'Hennessy', abv: '40%' }
  },
  {
    id: 'p27',
    title: 'Bas-Armagnac Darroze 1982',
    price: 160,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1616450689956-6a4a6b189736?w=800&q=80'], // Brandy style
    category: 'armagnac',
    isTradeable: false,
    isRare: true,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Mont-de-Marsan',
    postedAt: 'Hier',
    seller: MOCK_USER_COLLECTOR,
    description: 'Domaine de Rieston. Année de ma naissance, reçu en double.',
    specs: { origin: 'France (Gascogne)', distillery: 'Francis Darroze', vintage: '1982', abv: '48%' }
  },
  {
    id: 'p28',
    title: 'Calvados Christian Drouin 1990',
    price: 140,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1569937756447-e17eb326d03d?w=800&q=80'], // Amber spirit
    category: 'calvados',
    isTradeable: true,
    isRare: true,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Caen',
    postedAt: 'Il y a 3j',
    seller: MOCK_USER_PRO,
    description: 'Pays d\'Auge. Superbe complexité (pomme cuite, épices).',
    specs: { origin: 'Normandie', distillery: 'Christian Drouin', vintage: '1990', abv: '42%' }
  },

  // --- SPIRITUEUX DIVERS ---
  {
    id: 'p29',
    title: 'Eau-de-vie Poire Williams Miclo',
    price: 45,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=800&q=80'], // Clear bottle
    category: 'eaudevie',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Strasbourg',
    postedAt: 'Hier',
    seller: MOCK_USER_DISTILLERY,
    description: 'Grande Réserve. Fruit intense.',
    specs: { origin: 'Alsace', distillery: 'G. Miclo', abv: '43%' }
  },
  {
    id: 'p30',
    title: 'Grand Marnier Cuvée du Centenaire',
    price: 90,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80'], // Liqueur
    category: 'liqueur',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Il y a 2j',
    seller: MOCK_USER_PRO,
    description: 'Assemblage de vieux cognacs et d\'orange amère. Créé en 1927.',
    specs: { origin: 'France', distillery: 'Grand Marnier', abv: '40%' }
  },
  {
    id: 'p31',
    title: 'Amaro Nonino Quintessentia',
    price: 35,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1589362928172-23c2a3827529?w=800&q=80'], // Dark herbal bottle
    category: 'digestif',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Nice',
    postedAt: 'Il y a 5h',
    seller: MOCK_USER_SOPHIE,
    description: 'Le meilleur Amaro pour le Paper Plane cocktail.',
    specs: { origin: 'Italie', distillery: 'Nonino', abv: '35%' }
  },

  // --- SANS ALCOOL ---
  {
    id: 'p32',
    title: 'Seedlip Garden 108',
    price: 28,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1616450689956-6a4a6b189736?w=800&q=80'], // Clear fancy bottle
    category: 'na',
    isTradeable: false,
    isRare: false,
    condition: 'Scellé',
    volume: '70cl',
    location: 'Paris',
    postedAt: 'Hier',
    seller: MOCK_USER_PRO,
    description: 'Spiritueux distillé sans alcool. Notes herbacées (pois, foin).',
    specs: { origin: 'UK', distillery: 'Seedlip', abv: '0%' }
  },

  // --- COFFRETS & ACCESSOIRES ---
  {
    id: 'p33',
    title: 'Coffret Dégustation Whisky Japonais (5x3cl)',
    price: 45,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80'], // Tasting set vibe
    category: 'coffret',
    isTradeable: true,
    isRare: false,
    condition: 'Scellé',
    volume: '15cl',
    location: 'Lyon',
    postedAt: 'Il y a 2h',
    seller: MOCK_USER_PRO,
    description: 'Nikka, Yamazaki, Hakushu, Hibiki, Miyagikyo.',
    specs: { origin: 'Japon' }
  },
  {
    id: 'p34',
    title: 'Verres Zalto Universel (Boîte de 2)',
    price: 80,
    currency: '€',
    images: ['https://images.unsplash.com/photo-1574577827827-024345173164?w=800&q=80'], // Wine glass
    category: 'accessoire',
    isTradeable: false,
    isRare: false,
    condition: 'Coffret',
    volume: 'N/A',
    location: 'Bordeaux',
    postedAt: 'Il y a 1j',
    seller: MOCK_USER_COLLECTOR,
    description: 'Verres soufflés bouche, ultra-fins. Le must pour la dégustation.',
    specs: { origin: 'Autriche', distillery: 'Zalto' }
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