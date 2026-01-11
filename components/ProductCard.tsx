import React from 'react';
import { Product } from '../types';
import { Icons } from './Icon';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  isFeatured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isFavorite = false, onFavoriteToggle, isFeatured = false }) => {
  return (
    <div 
      className={`group relative rounded-[1.75rem] shadow-sm hover:shadow-md transition-all cursor-pointer ${isFeatured ? 'p-[2px] bg-gradient-to-b from-wine-600 to-wine-900' : 'border border-gray-100 bg-white'}`}
      onClick={onClick}
    >
      <div className={`bg-white overflow-hidden h-full ${isFeatured ? 'rounded-[1.625rem]' : 'rounded-[1.75rem]'}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Like Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.();
          }}
          className="absolute top-3 right-3 z-10 transition-all heart-favorite-button"
        >
          <Icons.Heart 
            size={20} 
            strokeWidth={1}
            className={`${isFavorite ? 'fill-wine-900' : 'fill-none'} stroke-white transition-all duration-300`}
          />
        </button>

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
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-airbnb-medium text-gray-900 line-clamp-1">{product.title}</h3>
        </div>
        
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-lg text-airbnb-bold text-gray-900">{product.price} {product.currency}</span>
          <span className="text-xs text-airbnb-light text-gray-500">{product.volume}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-airbnb-light text-gray-500">
          <div className="flex items-center gap-1">
            <Icons.MapPin size={12} />
            <span className="truncate max-w-[100px]">{product.location}</span>
          </div>
          <span className="text-gray-400">{product.postedAt}</span>
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