import React from 'react';
import { Icons } from '../components/Icon';
import { AuctionCard } from '../components/AuctionCard';
import { MOCK_AUCTIONS } from '../constants';
import { Product } from '../types';

interface OffersPageProps {
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onProductClick, onBack }) => {
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
          <h1 className="text-lg md:text-3xl text-airbnb-extra-bold text-gray-900 whitespace-nowrap flex-1 text-right">Offres en cours</h1>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_AUCTIONS.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onClick={() => onProductClick(auction.product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
