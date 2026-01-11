import React from 'react';
import { Icons } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { User, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface UserProfileProps {
  user: User;
  onBack: () => void;
  onProductClick: (product: Product) => void;
  favoriteIds?: Set<string>;
  onFavoriteToggle?: (productId: string) => void;
  cartonQuantities?: Map<string, number>;
  onAddToCarton?: (productId: string, quantity: number) => void;
  onNavigateToCarton?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onBack, 
  onProductClick,
  favoriteIds = new Set(),
  onFavoriteToggle,
  cartonQuantities = new Map(),
  onAddToCarton,
  onNavigateToCarton
}) => {
  const [isSelectionMode, setIsSelectionMode] = React.useState(false);
  const userProducts = MOCK_PRODUCTS.filter(p => p.seller.id === user.id);
  const userProductsInCarton = userProducts.filter(p => cartonQuantities.has(p.id));
  const userTypeLabel = user.isPro ? (user.name.toLowerCase().includes('cave') ? 'Cave' : user.name.toLowerCase().includes('distillerie') || user.name.toLowerCase().includes('maison') ? 'Distillerie' : 'Professionnel') : 'Particulier';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <Icons.ArrowLeft size={18} />
        <span className="text-airbnb-medium">Retour</span>
      </button>

      {/* User Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-100"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl text-airbnb-extra-bold text-gray-900">{user.name}</h1>
              {user.isVerified && (
                <Icons.ShieldCheck size={24} className="text-green-600" />
              )}
              {user.isPro && (
                <span className="px-3 py-1 rounded-full text-xs text-airbnb-bold text-wine-900 bg-wine-50 border border-wine-100">
                  {userTypeLabel}
                </span>
              )}
              {!user.isPro && (
                <span className="px-3 py-1 rounded-full text-xs text-airbnb text-gray-600 bg-gray-100 border border-gray-200">
                  Particulier
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Icons.Star size={18} fill="currentColor" />
                <span className="text-airbnb-medium text-gray-900">{user.rating}</span>
                <span className="text-airbnb-light text-gray-500">({user.reviewCount} avis)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Icons.MapPin size={16} />
                <span className="text-airbnb-light">{user.location}</span>
              </div>
            </div>
            <p className="text-airbnb-light text-gray-600">
              {user.isPro 
                ? `${userTypeLabel} spécialisé${userTypeLabel === 'Cave' || userTypeLabel === 'Distillerie' ? 'e' : ''} en spiritueux d'exception`
                : 'Collectionneur passionné de spiritueux'
              }
            </p>
          </div>
        </div>
      </div>

      {/* User Products */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <h2 className="text-xl md:text-2xl text-airbnb-extra-bold text-gray-900">
            Annonces ({userProducts.length})
          </h2>
          <button
            onClick={() => setIsSelectionMode(!isSelectionMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm text-airbnb-medium transition-colors ${
              isSelectionMode
                ? 'bg-wine-900 text-white hover:bg-wine-800'
                : 'bg-white text-wine-900 border border-wine-900 hover:bg-wine-50'
            }`}
          >
            <Icons.Package size={16} />
            {isSelectionMode ? 'Terminer la sélection' : 'Composer son carton'}
          </button>
        </div>
        {userProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => !isSelectionMode && onProductClick(product)}
                isFavorite={favoriteIds.has(product.id)}
                onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
                isSelectionMode={isSelectionMode}
                cartonQuantity={cartonQuantities.get(product.id) || 0}
                onAddToCarton={(quantity: number) => onAddToCarton?.(product.id, quantity)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Icons.Wine size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-airbnb-medium text-gray-500">Aucune annonce disponible pour le moment</p>
          </div>
        )}
      </div>

      {/* Floating Carton Button */}
      {userProductsInCarton.length > 0 && (
        <div className="fixed bottom-28 md:bottom-8 left-1/2 transform -translate-x-1/2 z-40">
          <button
            onClick={() => onNavigateToCarton?.()}
            className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-full bg-wine-900/90 backdrop-blur-md border border-wine-800/50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="relative">
              <Icons.Package size={20} className="md:w-6 md:h-6 text-white" />
              <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-white text-wine-900 rounded-full flex items-center justify-center text-xs md:text-sm text-airbnb-bold">
                {Array.from(cartonQuantities.values()).reduce((sum, qty) => sum + qty, 0)}
              </span>
            </div>
            <span className="text-xs md:text-base text-airbnb-medium text-white whitespace-nowrap">Voir mon carton</span>
          </button>
        </div>
      )}
    </div>
  );
};
