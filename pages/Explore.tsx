import React, { useState } from 'react';
import { Icons } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { Button } from '../components/Button';

interface ExploreProps {
  onProductClick: (product: Product) => void;
  initialCategory?: string;
  favoriteIds?: Set<string>;
  onFavoriteToggle?: (productId: string) => void;
}

export const Explore: React.FC<ExploreProps> = ({ onProductClick, initialCategory, favoriteIds = new Set(), onFavoriteToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [priceRange, setPriceRange] = useState(1000);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter logic mockup
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-airbnb-bold text-gray-900 mb-3">Catégorie</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="category" 
              checked={selectedCategory === 'all'} 
              onChange={() => setSelectedCategory('all')}
              className="text-wine-900 focus:ring-wine-900"
            />
            <span className="text-sm text-gray-700">Tout voir</span>
          </label>
          {CATEGORIES.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                checked={selectedCategory === cat.id}
                onChange={() => setSelectedCategory(cat.id)}
                className="text-wine-900 focus:ring-wine-900"
              />
              <span className="text-sm text-gray-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-airbnb-bold text-gray-900 mb-3">Prix max: {priceRange}€</h3>
        <input 
          type="range" 
          min="0" 
          max="5000" 
          step="50" 
          value={priceRange} 
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-wine-900"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0€</span>
          <span>5000€+</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">Échange possible</span>
          <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 left-1 top-1 peer-checked:translate-x-full peer-checked:border-wine-900"/>
            <div className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-wine-900"></div>
          </div>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">Vendeur Pro</span>
           <input type="checkbox" className="rounded text-wine-900 focus:ring-wine-900 border-gray-300" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">Livraison disponible</span>
           <input type="checkbox" className="rounded text-wine-900 focus:ring-wine-900 border-gray-300" />
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-8">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <h1 className="text-xl text-airbnb-extra-bold">Explorer</h1>
        <Button variant="outline" size="sm" onClick={() => setShowFiltersMobile(true)} className="gap-2">
            <Icons.Filter size={16} /> Filtres
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
            {/* Sort & Count */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">
                    <strong>{filteredProducts.length}</strong> annonces trouvées
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden sm:inline">Trier par:</span>
                    <div className="relative">
                        <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-wine-900">
                            <option>Pertinence</option>
                            <option>Prix croissant</option>
                            <option>Prix décroissant</option>
                            <option>Nouveautés</option>
                        </select>
                        <Icons.ChevronDown className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={14} />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => onProductClick(product)}
                      isFavorite={favoriteIds.has(product.id)}
                      onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Icons.Search size={32} />
                    </div>
                    <h3 className="text-lg text-airbnb-medium text-gray-900">Aucun résultat</h3>
                    <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
                </div>
            )}
        </main>
      </div>

      {/* Mobile Drawer (Simplified) */}
      {showFiltersMobile && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden flex justify-end">
              <div className="w-[85%] bg-white h-full p-6 overflow-y-auto animate-slide-in-right">
                  <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg text-airbnb-bold">Filtres</h2>
                      <button onClick={() => setShowFiltersMobile(false)}>
                          <Icons.X size={24} />
                      </button>
                  </div>
                  <FilterSidebar />
                  <div className="mt-8 pt-4 border-t border-gray-100">
                      <Button fullWidth onClick={() => setShowFiltersMobile(false)}>
                          Voir les résultats
                      </Button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};