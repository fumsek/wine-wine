import React from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Icons } from '../components/Icon';

interface FavoritesProps {
  favoriteProducts: Product[];
  onProductClick: (product: Product) => void;
  onFavoriteToggle: (productId: string) => void;
  onBack?: () => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ favoriteProducts, onProductClick, onFavoriteToggle, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-28 md:pb-4">
      {onBack && (
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <Icons.ArrowLeft size={18} />
          <span className="text-airbnb-medium">Retour</span>
        </button>
      )}
      <div className="mb-8">
        <h1 className="text-2xl text-airbnb-extra-bold text-gray-900 mb-2">Mes favoris</h1>
        <p className="text-sm text-airbnb-light text-gray-500">{favoriteProducts.length} {favoriteProducts.length > 1 ? 'produits' : 'produit'} sauvegardé{favoriteProducts.length > 1 ? 's' : ''}</p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Icons.Heart size={32} className="fill-none" />
          </div>
          <h3 className="text-lg text-airbnb-medium text-gray-900 mb-2">Aucun favori pour le moment</h3>
          <p className="text-sm text-airbnb-light text-gray-500 max-w-md">
            Cliquez sur le cœur des produits qui vous intéressent pour les sauvegarder ici.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
              isFavorite={true}
              onFavoriteToggle={() => onFavoriteToggle(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
