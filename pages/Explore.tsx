import React, { useState, useMemo } from 'react';
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
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(initialCategory ? [initialCategory] : ['all']));
  const [priceRange, setPriceRange] = useState(1000);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [exchangeOnly, setExchangeOnly] = useState(false);
  const [proSellerOnly, setProSellerOnly] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllCategoriesMobile, setShowAllCategoriesMobile] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'newest'>('relevance');

  // Filter logic mockup
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (!selectedCategories.has('all') && !selectedCategories.has(p.category)) return false;
    if (p.price > priceRange) return false;
    if (exchangeOnly && !p.isTradeable) return false;
    if (proSellerOnly && !p.seller.isPro) return false;
    // Note: deliveryAvailable filter would require a delivery property on products
    return true;
  });

  // Sort products based on selected sort option
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'newest':
        // Sort by postedAt (assuming newer posts come first in the array, or parse date)
        return products; // For now, keep original order for newest
      case 'relevance':
      default:
        return products; // Keep original order for relevance
    }
  }, [filteredProducts, sortBy]);

  const FilterSidebar = () => {
    // Sur mobile, limiter à 6 catégories. Sur desktop, limiter à 11 (avant Cognac) sauf si showAllCategories est true
    const categoriesToShowMobile = showAllCategoriesMobile ? CATEGORIES : CATEGORIES.slice(0, 6);
    const categoriesToShowDesktop = showAllCategories ? CATEGORIES : CATEGORIES.slice(0, 11);
    
    return (
    <div className="space-y-3 pb-0.5">
      {/* Category Filter */}
      <div>
        <h3 className="text-airbnb-bold text-gray-900 mb-2 text-sm">Catégorie</h3>
        {/* Mobile: une seule ligne verticale */}
        <div className="md:hidden space-y-1.5">
          {categoriesToShowMobile.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.has(cat.id)}
                  onChange={(e) => {
                    const newSet = new Set(selectedCategories);
                    if (e.target.checked) {
                      newSet.delete('all');
                      newSet.add(cat.id);
                    } else {
                      newSet.delete(cat.id);
                      if (newSet.size === 0) {
                        newSet.add('all');
                      }
                    }
                    setSelectedCategories(newSet);
                  }}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className={`w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                  selectedCategories.has(cat.id)
                    ? 'bg-wine-900 border-white/30' 
                    : 'bg-white/90 backdrop-blur-md border-gray-400 hover:border-wine-400'
                }`}>
                  {selectedCategories.has(cat.id) && (
                    <Icons.Check size={11} className="text-white" strokeWidth={2.5} />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">{cat.label}</span>
            </label>
          ))}
          {CATEGORIES.length > 6 && (
            <>
              {!showAllCategoriesMobile ? (
                <button
                  onClick={() => setShowAllCategoriesMobile(true)}
                  className="text-sm text-wine-900 text-airbnb-medium hover:text-wine-800 mt-2 text-left"
                >
                  Voir plus
                </button>
              ) : (
                <button
                  onClick={() => setShowAllCategoriesMobile(false)}
                  className="text-sm text-wine-900 text-airbnb-medium hover:text-wine-800 mt-2 text-left"
                >
                  Voir moins
                </button>
              )}
            </>
          )}
        </div>
        
        {/* Desktop: avec espacements verticaux */}
        <div className="hidden md:block space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={selectedCategories.has('all')} 
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories(new Set(['all']));
                  } else {
                    setSelectedCategories(new Set());
                  }
                }}
                className="absolute opacity-0 w-0 h-0"
              />
              <div className={`w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                selectedCategories.has('all')
                  ? 'bg-wine-900 border-white/30' 
                  : 'bg-white/90 backdrop-blur-md border-gray-400 hover:border-wine-400'
              }`}>
                {selectedCategories.has('all') && (
                  <Icons.Check size={11} className="text-white" strokeWidth={2.5} />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700">Tout voir</span>
          </label>
          {categoriesToShowDesktop.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.has(cat.id)}
                  onChange={(e) => {
                    const newSet = new Set(selectedCategories);
                    if (e.target.checked) {
                      newSet.delete('all');
                      newSet.add(cat.id);
                    } else {
                      newSet.delete(cat.id);
                      if (newSet.size === 0) {
                        newSet.add('all');
                      }
                    }
                    setSelectedCategories(newSet);
                  }}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className={`w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                  selectedCategories.has(cat.id)
                    ? 'bg-wine-900 border-white/30' 
                    : 'bg-white/90 backdrop-blur-md border-gray-400 hover:border-wine-400'
                }`}>
                  {selectedCategories.has(cat.id) && (
                    <Icons.Check size={11} className="text-white" strokeWidth={2.5} />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">{cat.label}</span>
            </label>
          ))}
          {CATEGORIES.length > 11 && (
            <>
              {!showAllCategories ? (
                <button
                  onClick={() => setShowAllCategories(true)}
                  className="text-sm text-wine-900 text-airbnb-medium hover:text-wine-800 mt-2 text-left"
                >
                  Voir plus
                </button>
              ) : (
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="text-sm text-wine-900 text-airbnb-medium hover:text-wine-800 mt-2 text-left"
                >
                  Voir moins
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-airbnb-bold text-gray-900 mb-3 text-sm">Prix maximum</h3>
        
        {/* Quick Price Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[100, 250, 500, 1000, 2000, 5000].map((price) => (
            <button
              key={price}
              onClick={() => setPriceRange(price)}
              className={`px-3 py-2 rounded-lg text-xs text-airbnb-medium transition-all ${
                priceRange === price
                  ? 'bg-wine-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {price === 5000 ? '5000€+' : `${price}€`}
            </button>
          ))}
        </div>

      </div>

      {/* Toggles */}
      <div className="space-y-2 pb-0 mt-4">
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
  };

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
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as 'relevance' | 'price-asc' | 'price-desc' | 'newest')}
                          className="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-wine-900"
                        >
                            <option value="relevance">Pertinence</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="newest">Nouveautés</option>
                        </select>
                        <Icons.ChevronDown className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={14} />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map(product => (
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
            {sortedProducts.length === 0 && (
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