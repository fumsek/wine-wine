import React from 'react';
import { Product } from '../types';
import { Icons } from './Icon';
import { CATEGORIES } from '../constants';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  isFeatured?: boolean;
  isSelectionMode?: boolean;
  cartonQuantity?: number;
  onAddToCarton?: (quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isFavorite = false, onFavoriteToggle, isFeatured = false, isSelectionMode = false, cartonQuantity = 0, onAddToCarton }) => {
  const [showQuantitySelector, setShowQuantitySelector] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const hasStock = product.stock !== undefined && product.stock > 0;
  const isInCarton = cartonQuantity > 0;

  React.useEffect(() => {
    if (isInCarton && cartonQuantity > 0) {
      setQuantity(cartonQuantity);
    } else {
      setQuantity(1);
    }
  }, [cartonQuantity, isInCarton]);

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasStock && !isInCarton) {
      setShowQuantitySelector(true);
    } else if (isInCarton) {
      onAddToCarton?.(0);
    }
  };

  const handleQuantityConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCarton?.(quantity);
    setShowQuantitySelector(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (product.stock !== undefined) {
      setQuantity(Math.max(1, Math.min(newQuantity, product.stock)));
    }
  };
  return (
    <div 
      className={`group relative rounded-[1.75rem] shadow-sm hover:shadow-md transition-all cursor-pointer ${isFeatured ? '' : 'border border-gray-100 bg-white'}`}
      onClick={onClick}
    >
      <div className={`bg-white overflow-hidden h-full rounded-[1.75rem]`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Like Button */}
        {!isSelectionMode && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle?.();
            }}
            className="absolute top-3 right-3 z-10 transition-all heart-favorite-button"
          >
            <div className="relative inline-flex items-center justify-center p-1">
              <Icons.Heart 
                size={28}
                className={`md:w-5 md:h-5 relative z-10 ${isFavorite ? 'fill-wine-900' : 'fill-none'} stroke-white transition-all duration-300`}
                strokeWidth={1}
              />
            </div>
          </button>
        )}

        {/* Add to Carton Button (Selection Mode) */}
        {isSelectionMode && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {showQuantitySelector && hasStock ? (
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/50 shadow-lg" style={{ animation: 'quantitySelectorExpand 0.3s ease-out' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(quantity - 1);
                  }}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Icons.Minus size={12} strokeWidth={3} />
                </button>
                <span className="text-sm text-airbnb-bold text-gray-900 min-w-[2ch] text-center">{quantity}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(quantity + 1);
                  }}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                  disabled={product.stock !== undefined && quantity >= product.stock}
                >
                  <Icons.Plus size={12} strokeWidth={3} />
                </button>
                <button
                  onClick={handleQuantityConfirm}
                  className="ml-1 px-2 py-1 rounded-full bg-wine-900 text-white text-xs text-airbnb-medium hover:bg-wine-800 transition-colors"
                >
                  OK
                </button>
              </div>
            ) : (
              <button
                onClick={handlePlusClick}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isInCarton
                    ? 'bg-wine-900 text-white'
                    : 'bg-white/90 backdrop-blur-md text-wine-900 border border-white/50 hover:bg-wine-900 hover:text-white'
                }`}
              >
                {isInCarton ? (
                  <Icons.X 
                    size={18} 
                    strokeWidth={2.5}
                  />
                ) : (
                  <Icons.Plus 
                    size={18} 
                    strokeWidth={2.5}
                  />
                )}
              </button>
            )}
          </div>
        )}

        {/* Glassmorphism Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isRare && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] text-airbnb-bold tracking-wide bg-white/80 backdrop-blur-md text-gray-900 border border-white/50 shadow-sm">
              <Icons.Star size={10} className="mr-1 text-amber-500" fill="currentColor" />
              Rare
            </span>
          )}
          {product.isTradeable && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] text-airbnb-bold tracking-wide bg-white/80 backdrop-blur-md text-gray-900 border border-white/50 shadow-sm">
              <Icons.ArrowLeftRight size={10} className="mr-1 text-blue-500" />
              Échange
            </span>
          )}
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] text-airbnb-bold tracking-wide bg-wine-500/90 backdrop-blur-md text-white border border-wine-400/50 shadow-sm">
              à la une
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title - Mobile first, one line, adaptive size */}
        <h3 className="text-sm md:text-base text-airbnb-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis mb-2">{product.title}</h3>
        
        {/* Product Info (Type, Date, Location) - Mobile: before price and characteristics */}
        <div className="mb-2 md:mb-0 md:order-last">
          {/* Type/Category */}
          <div className="text-xs text-airbnb-medium text-gray-600 mb-1">
            {CATEGORIES.find(cat => cat.id === product.category)?.label || product.specs.distillery || ''}
          </div>
          {/* Date and Location */}
          <div className="flex items-center justify-between text-xs text-airbnb-light text-gray-500">
            <div className="flex items-center gap-1">
              <Icons.MapPin size={12} />
              <span className="truncate max-w-[100px]">{product.location}</span>
            </div>
            <span className="text-gray-400">{product.postedAt}</span>
          </div>
        </div>

        {/* Price - Mobile: after info, before characteristics */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-lg text-airbnb-bold text-wine-900">{product.price} {product.currency}</span>
          <span className="text-xs text-airbnb-light text-gray-500">{product.volume}</span>
        </div>

        {/* Characteristics (Stock, etc.) - Mobile: after price */}
        <div className="min-h-[1.25rem] mb-2">
          {product.stock !== undefined && product.stock > 0 && (
            <div className="text-xs text-airbnb-medium text-wine-900">
              Stock : {product.stock} {product.stock > 1 ? 'bouteilles' : 'bouteille'}
            </div>
          )}
        </div>

        {/* Seller Status */}
        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-1">
                {product.seller.isPro ? (
                    <span className="text-[10px] text-airbnb-bold text-wine-900 bg-wine-50 border border-wine-100 px-2 py-0.5 rounded-full">PRO</span>
                ) : (
                    <span className="text-[10px] text-airbnb text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">Particulier</span>
                )}
                {product.seller.isVerified && (
                    <Icons.ShieldCheck size={12} className="text-green-600" />
                )}
            </div>
            <div className="flex items-center gap-0.5 text-amber-500">
                <Icons.Star size={10} fill="currentColor" />
                <span className="text-xs text-airbnb-medium text-gray-700">{product.seller.rating}</span>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};