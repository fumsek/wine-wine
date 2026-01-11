import React from 'react';
import { Icons } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface HomeProps {
  onProductClick: (product: Product) => void;
  onCategoryClick: (category: string) => void;
  favoriteIds?: Set<string>;
  onFavoriteToggle?: (productId: string) => void;
}

// Icon mapping for categories with specific colors and optional images
const CATEGORY_ICONS: Record<string, { icon?: React.ElementType, image?: string, color: string }> = {
  rouge: { 
    image: '/vins-rouge.png', 
    color: 'text-wine-900' 
  },
  blanc: { 
    image: '/vins-blancs.png', 
    color: 'text-yellow-500' 
  },
  rose: { 
    image: '/vins-roses.png', 
    color: 'text-rose-400' 
  },
  champagne: { 
    image: '/champagne.png', 
    color: 'text-amber-400' 
  },
  biere: { 
    image: '/biere.png', 
    color: 'text-amber-600' 
  },
  cidre: { 
    image: '/cidre.png', 
    color: 'text-green-600' 
  },
  whisky: { 
    image: '/whisky.png', 
    color: 'text-amber-700' 
  },
  rhum: { 
    image: '/rhum.png', 
    color: 'text-green-700' 
  },
  gin: { 
    image: '/gin.png', 
    color: 'text-cyan-500' 
  },
  vodka: { 
    image: '/vodka.png', 
    color: 'text-slate-400' 
  },
  tequila: { 
    image: '/tequila.png', 
    color: 'text-yellow-600' 
  },
  cognac: { 
    image: '/cognac.png', 
    color: 'text-orange-800' 
  },
  armagnac: { 
    image: '/armagnac.png', 
    color: 'text-orange-900' 
  },
  calvados: { 
    image: '/calvados.png', 
    color: 'text-orange-500' 
  },
  eaudevie: { 
    image: '/eaudevie.png', 
    color: 'text-purple-500' 
  },
  liqueur: { 
    image: '/liqueur.png', 
    color: 'text-emerald-500' 
  },
  aperitif: { 
    image: '/aperitif.png', 
    color: 'text-red-500' 
  },
  digestif: { 
    image: '/digestif.png', 
    color: 'text-indigo-900' 
  },
  na: { 
    image: '/sansalcool.png', 
    color: 'text-blue-300' 
  },
  coffret: { 
    image: '/coffret.png', 
    color: 'text-red-700' 
  },
  accessoire: { 
    image: '/accessoires.png', 
    color: 'text-slate-700' 
  },
  trade: { 
    image: '/echange.png', 
    color: 'text-blue-600' 
  },
  rare: { 
    image: '/collector.png', 
    color: 'text-fuchsia-600' 
  },
};

export const Home: React.FC<HomeProps> = ({ onProductClick, onCategoryClick, favoriteIds = new Set(), onFavoriteToggle }) => {
  // Mock subset for trends - more products for horizontal scroll on desktop
  const trendingProducts = MOCK_PRODUCTS.slice(0, 8);
  const rareProducts = MOCK_PRODUCTS.filter(p => p.isRare);

  return (
    <div className="pb-20 md:pb-8">
      {/* Mobile Search - Standalone (Replaces Hero) */}
      <div className="md:hidden px-4 pt-4 pb-2 bg-white">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Rechercher une bouteille..." 
              className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-100 border-none text-gray-900 focus:bg-white focus:ring-2 focus:ring-wine-900 transition-all shadow-sm"
            />
            <Icons.Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
      </div>

      {/* Sticky Category Floating Bubble */}
      {/* Position adjusted to sit nicely below header/mobile search */}
      <div className="sticky top-20 md:top-24 z-40 px-4 pointer-events-none mt-4 md:mt-6 mb-8">
        <div className="max-w-6xl mx-auto pointer-events-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-gray-200/50 rounded-full py-3 px-4 md:px-6 flex items-center overflow-hidden relative">
                
                {/* Subtle fade gradients on mobile */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white/80 to-transparent pointer-events-none z-10 md:hidden"></div>
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white/80 to-transparent pointer-events-none z-10 md:hidden"></div>
                
                {/* Scrollable list */}
                <div className="flex items-center gap-6 md:gap-6 overflow-x-auto no-scrollbar w-full snap-x relative z-0">
                    
                    {/* 'All' Option */}
                    <button 
                      onClick={() => onCategoryClick('all')}
                      className="flex flex-col items-center gap-1.5 min-w-[max-content] cursor-pointer group snap-start bounce-on-click"
                    >
                        <div className="w-10 h-10 flex items-center justify-center text-gray-500 group-hover:text-wine-900 transition-all overflow-visible">
                            <Icons.LayoutGrid strokeWidth={1.5} size={20} className="transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                        </div>
                        <span className="text-[11px] text-airbnb-medium text-gray-600 group-hover:text-gray-900">
                            Tout
                        </span>
                    </button>

                    <div className="w-px h-8 bg-gray-200 flex-shrink-0 mx-1"></div>

                    {CATEGORIES.map((cat) => {
                        const iconData = CATEGORY_ICONS[cat.id] || { icon: Icons.Wine, color: 'text-gray-400' };
                        const IconComp = iconData.icon;
                        
                        return (
                            <button 
                                key={cat.id} 
                                onClick={() => onCategoryClick(cat.id)}
                                className="flex flex-col items-center gap-1.5 min-w-[max-content] cursor-pointer group snap-start bounce-on-click"
                            >
                                <div className="w-10 h-10 flex items-center justify-center overflow-visible">
                                    {iconData.image ? (
                                        <img src={iconData.image} alt={cat.label} className={`w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:rotate-12 ${cat.id === 'armagnac' || cat.id === 'calvados' ? 'scale-110' : ''} ${cat.id === 'eaudevie' ? 'scale-105 translate-y-0.5' : ''}`} />
                                    ) : (
                                        IconComp && <IconComp strokeWidth={1.5} size={20} className="transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                                    )}
                                </div>
                                <span className="text-[11px] text-airbnb text-gray-600 group-hover:text-gray-900">
                                    {cat.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                 {/* Optional: Filter Button on the right */}
                 <div className="hidden md:flex pl-4 border-l border-gray-200 ml-2">
                     <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-xs text-airbnb-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
                         <Icons.Filter size={14} />
                         Filtres
                     </button>
                 </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Trending Section */}
        <section className="mb-8 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl text-airbnb-extra-bold text-gray-900 whitespace-nowrap">Tendances du moment</h2>
                <Icons.TrendingUp className="text-wine-900" size={20} />
            </div>
            <button className="text-sm text-airbnb-medium text-wine-900 hover:underline">Voir tout</button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {trendingProducts.map((product, index) => (
              <div key={product.id} className="w-[260px] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] flex-shrink-0">
                <ProductCard 
                  product={product} 
                  onClick={() => onProductClick(product)}
                  isFavorite={favoriteIds.has(product.id)}
                  onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
                  isFeatured={index < 2}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Rare & Collectors Section */}
        <section className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 p-6 -mx-4 md:mx-0 md:rounded-2xl border border-white/20">
          <div className="mb-4">
            <div>
                <h2 className="text-lg md:text-xl text-airbnb-extra-bold text-amber-900 flex items-center gap-2 whitespace-nowrap">
                    <Icons.Star className="fill-amber-500 text-amber-500" size={20} />
                    Bouteilles Rares & Collectors
                </h2>
                <p className="text-xs md:text-sm text-airbnb-light text-amber-700 mt-1 whitespace-nowrap">Sélection d'exception vérifiée par nos experts.</p>
                <button className="text-xs md:text-sm text-airbnb-medium text-amber-800 hover:underline mt-2">Voir la collection</button>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {rareProducts.map(product => (
              <div key={product.id} className="min-w-[260px] md:min-w-[280px]">
                <ProductCard 
                  product={product} 
                  onClick={() => onProductClick(product)}
                  isFavorite={favoriteIds.has(product.id)}
                  onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Feed */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl text-airbnb-extra-bold text-gray-900 mb-4 whitespace-nowrap">Dernières annonces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_PRODUCTS.map(product => (
              <ProductCard 
                key={`feed-${product.id}`} 
                product={product} 
                onClick={() => onProductClick(product)}
                isFavorite={favoriteIds.has(product.id)}
                onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};