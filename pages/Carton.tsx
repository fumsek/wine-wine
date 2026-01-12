import React from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Icons } from '../components/Icon';
import { MOCK_PRODUCTS } from '../constants';

interface CartonProps {
  cartonQuantities: Map<string, number>;
  onProductClick: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onBack: () => void;
}

export const Carton: React.FC<CartonProps> = ({ cartonQuantities, onProductClick, onUpdateQuantity, onBack }) => {
  const cartonProducts = MOCK_PRODUCTS.filter(p => cartonQuantities.has(p.id)).map(p => ({
    product: p,
    quantity: cartonQuantities.get(p.id) || 1
  }));

  // Group products by seller
  const productsBySeller = cartonProducts.reduce((acc, item) => {
    const sellerId = item.product.seller.id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: item.product.seller,
        items: []
      };
    }
    acc[sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { seller: typeof cartonProducts[0]['product']['seller']; items: typeof cartonProducts }>);

  const totalPrice = cartonProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-[7.5rem] md:pb-8">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <Icons.ArrowLeft size={18} />
        <span className="text-airbnb-medium">Retour</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Icons.Package size={32} className="text-wine-900" />
          <h1 className="text-2xl md:text-3xl text-airbnb-extra-bold text-gray-900">Mon carton</h1>
        </div>
        <p className="text-sm text-airbnb-light text-gray-500">
          {cartonProducts.length} {cartonProducts.length > 1 ? 'produits' : 'produit'} • {cartonProducts.reduce((sum, item) => sum + item.quantity, 0)} {cartonProducts.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 'bouteilles' : 'bouteille'}
        </p>
      </div>

      {cartonProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Icons.Package size={32} />
          </div>
          <h3 className="text-lg text-airbnb-medium text-gray-900 mb-2">Votre carton est vide</h3>
          <p className="text-sm text-airbnb-light text-gray-500 max-w-md">
            Ajoutez des produits depuis le profil d'un vendeur pour les regrouper dans un même carton.
          </p>
        </div>
      ) : (
        <>
          {/* Products grouped by seller */}
          <div className="space-y-8 mb-8">
            {Object.values(productsBySeller).map(({ seller, items }) => (
              <div key={seller.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <img 
                    src={seller.avatar} 
                    alt={seller.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg text-airbnb-bold text-gray-900">{seller.name}</h2>
                    <p className="text-sm text-airbnb-light text-gray-500">{seller.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="relative">
                      <ProductCard 
                        product={product}
                        onClick={() => onProductClick(product)}
                        isFavorite={false}
                      />
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                        <div className="bg-wine-900/90 backdrop-blur-md text-white px-2 py-1 rounded-full text-xs text-airbnb-bold">
                          {quantity}x
                        </div>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 0)}
                          className="w-8 h-8 rounded-full bg-wine-900 text-white flex items-center justify-center hover:bg-wine-800 transition-colors shadow-lg"
                        >
                          <Icons.X size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-airbnb-medium text-gray-600">
                    {items.length} {items.length > 1 ? 'produits' : 'produit'} • {items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 'bouteilles' : 'bouteille'} • Sous-total
                  </span>
                  <span className="text-lg text-airbnb-bold text-wine-900">
                    {items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)} {items[0]?.product.currency || '€'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-airbnb-bold text-gray-900">Total</span>
              <span className="text-2xl text-airbnb-extra-bold text-wine-900">
                {totalPrice} {cartonProducts[0]?.product.currency || '€'}
              </span>
            </div>
            <button className="w-full py-3 rounded-full bg-wine-900 text-white text-airbnb-medium hover:bg-wine-800 transition-colors">
              Passer la commande
            </button>
            <p className="text-xs text-airbnb-light text-gray-500 text-center mt-3">
              Vous pouvez retirer des produits individuellement en cliquant sur la croix
            </p>
          </div>
        </>
      )}
    </div>
  );
};
