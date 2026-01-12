import React from 'react';
import { Icons } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface TendancesPageProps {
  onProductClick: (product: Product) => void;
  onBack: () => void;
  favoriteIds?: Set<string>;
  onFavoriteToggle?: (productId: string) => void;
}

export const TendancesPage: React.FC<TendancesPageProps> = ({ 
  onProductClick, 
  onBack, 
  favoriteIds = new Set(), 
  onFavoriteToggle 
}) => {
  const trendingProducts = MOCK_PRODUCTS.slice(0, 8);

  return (
    <div className="pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button 
            onClick={onBack} 
            className="flex items-center text-gray-500 hover:text-wine-900 transition-colors flex-shrink-0"
          >
            <Icons.ArrowLeft className="mr-2" size={16} />
            Retour
          </button>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <h1 className="text-lg md:text-3xl text-airbnb-extra-bold text-gray-900 whitespace-nowrap">Tendances du moment</h1>
            <Icons.TrendingUp className="text-wine-900 hidden md:block" size={24} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
              isFavorite={favoriteIds.has(product.id)}
              onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
              isFeatured={index < 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
