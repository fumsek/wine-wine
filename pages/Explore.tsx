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
  const [exchangeOnly, setExchangeOnly] = useState(false);
  const [proSellerOnly, setProSellerOnly] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);

  // Filter logic mockup
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (p.price > priceRange) return false;
    if (exchangeOnly && !p.isTradeable) return false;
    if (proSellerOnly && !p.seller.isPro) return false;
    // Note: deliveryAvailable filter would require a delivery property on products
    return true;
  });

  const FilterSidebar = () => (
    <div className="space-y-3 pb-0.5">
      {/* Category Filter */}
      <div>
        <h3 className="text-airbnb-bold text-gray-900 mb-2 text-sm">Catégorie</h3>
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 thin-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input 
                type="radio" 
                name="category" 
                checked={selectedCategory === 'all'} 
                onChange={() => setSelectedCategory('all')}
                className="absolute opacity-0 w-0 h-0"
              />
              <div className={`w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                selectedCategory === 'all' 
                  ? 'bg-wine-900 border-white/30' 
                  : 'bg-white/90 backdrop-blur-md border-gray-400 hover:border-wine-400'
              }`}>
                {selectedCategory === 'all' && (
                  <Icons.Check size={11} className="text-white" strokeWidth={2.5} />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700">Tout voir</span>
          </label>
          {CATEGORIES.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory === cat.id}
                  onChange={() => setSelectedCategory(cat.id)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className={`w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                  selectedCategory === cat.id 
                    ? 'bg-wine-900 border-white/30' 
                    : 'bg-white/90 backdrop-blur-md border-gray-400 hover:border-wine-400'
                }`}>
                  {selectedCategory === cat.id && (
                    <Icons.Check size={11} className="text-white" strokeWidth={2.5} />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-airbnb-bold text-gray-900 mb-2 text-sm">Prix max: {priceRange}€</h3>
        <div className="relative w-full py-6 px-2">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute top-0 left-0 h-2 bg-wine-900 rounded-full transition-all duration-100"
              style={{ width: `${(priceRange / 5000) * 100}%` }}
            ></div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              onInput={(e) => setPriceRange(Number((e.target as HTMLInputElement).value))}
              className="absolute top-1/2 left-0 w-full h-6 -translate-y-1/2 opacity-0 cursor-pointer z-10"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                background: 'transparent',
                outline: 'none',
                margin: 0,
                padding: 0,
                touchAction: 'none',
              }}
            />
            <div
              className="absolute top-1/2 w-5 h-5 bg-wine-900 rounded-full border-2 border-white shadow-lg -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `calc(${(priceRange / 5000) * 100}% - 10px)` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-0.5">
          <span>0€</span>
          <span>5000€+</span>
        </div>
        <style>{`
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            cursor: pointer;
          }
          input[type="range"]::-webkit-slider-track {
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 9999px;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #721f2d;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            margin-top: -6px;
          }
          input[type="range"]::-moz-range-track {
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 9999px;
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #721f2d;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            -moz-appearance: none;
          }
          input[type="range"]:active::-webkit-slider-thumb {
            transform: scale(1.1);
          }
          input[type="range"]:active::-moz-range-thumb {
            transform: scale(1.1);
          }
        `}</style>
      </div>

      {/* Toggles */}
      <div className="space-y-2 pb-0">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">Échange possible</span>
          <button
            type="button"
            onClick={() => setExchangeOnly(!exchangeOnly)}
            className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
              exchangeOnly ? 'bg-wine-900' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                exchangeOnly ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">Vendeur Pro</span>
          <button
            type="button"
            onClick={() => setProSellerOnly(!proSellerOnly)}
            className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
              proSellerOnly ? 'bg-wine-900' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                proSellerOnly ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">Livraison disponible</span>
          <button
            type="button"
            onClick={() => setDeliveryAvailable(!deliveryAvailable)}
            className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
              deliveryAvailable ? 'bg-wine-900' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                deliveryAvailable ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-8 md:pb-8">
      
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
        <main className="flex-1 pb-24 md:pb-0">
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
              <div className="w-full bg-white h-full p-4 pb-28 flex flex-col animate-slide-in-right">
                  <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base text-airbnb-bold">Filtres</h2>
                      <button onClick={() => setShowFiltersMobile(false)}>
                          <Icons.X size={20} />
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto min-h-0">
                      <FilterSidebar />
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex-shrink-0">
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