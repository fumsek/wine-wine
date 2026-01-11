import React, { useState, useEffect } from 'react';
import { Auction } from '../types';
import { Icons } from './Icon';

interface AuctionCardProps {
  auction: Auction;
  onClick: () => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onClick }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(auction.minBid);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { product } = auction;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(auction.endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [auction.endTime]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div
      className="group relative rounded-[1.75rem] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Timer Badge */}
        <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-md text-gray-900 px-3 py-1.5 rounded-full border border-white/50 shadow-sm">
          {timeLeft ? (
            <div className="flex items-center gap-1.5">
              <Icons.Clock size={14} className="text-gray-900" />
              <span className="text-xs text-airbnb-bold whitespace-nowrap">
                {timeLeft.days > 0 && `${timeLeft.days}j `}
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </span>
            </div>
          ) : (
            <span className="text-xs text-airbnb-bold">Terminé</span>
          )}
        </div>

        {/* Auction Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] text-airbnb-bold tracking-wide bg-wine-900/90 backdrop-blur-md text-white border border-wine-700/50 shadow-sm">
            Offres
          </span>
        </div>

        {/* Glassmorphism Badges */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {product.isRare && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] text-airbnb-bold tracking-wide bg-white/80 backdrop-blur-md text-gray-900 border border-white/50 shadow-sm">
              <Icons.Star size={10} className="mr-1 text-amber-500" fill="currentColor" />
              Rare
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-airbnb-medium text-gray-900 line-clamp-1 mb-2">{product.title}</h3>

        {/* Current Bid */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg text-airbnb-bold text-wine-900">{auction.currentBid} {product.currency}</span>
            <span className="text-xs text-airbnb-light text-gray-500">offre actuelle</span>
          </div>
          <div className="text-xs text-airbnb-light text-gray-500 mt-0.5">
            {auction.bidCount} offre{auction.bidCount > 1 ? 's' : ''} • Prix min: {auction.minBid} {product.currency}
          </div>
        </div>

        {/* Bid Input and Button */}
        <div className="flex gap-1.5 mb-2">
          <input
            type="number"
            min={auction.minBid}
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-full border border-gray-300 bg-gray-50/50 text-xs text-airbnb-medium text-gray-900 focus:outline-none focus:border-wine-500 focus:ring-1 focus:ring-wine-500"
            placeholder={`Min. ${auction.minBid}`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (bidAmount >= auction.minBid && !isSubmitting) {
                setIsSubmitting(true);
                // TODO: Submit bid
                setTimeout(() => {
                  setIsSubmitting(false);
                  alert(`Offre de ${bidAmount} ${product.currency} placée avec succès !`);
                }, 500);
              }
            }}
            disabled={bidAmount < auction.minBid || isSubmitting}
            className="px-3 py-1.5 rounded-full bg-wine-900 text-white text-xs text-airbnb-medium hover:bg-wine-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap flex-shrink-0"
          >
            {isSubmitting ? '...' : 'Faire une offre'}
          </button>
        </div>

        {/* Location & Date */}
        <div className="flex items-center justify-between text-xs text-airbnb-light text-gray-500 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Icons.MapPin size={12} />
            <span className="truncate max-w-[100px]">{product.location}</span>
          </div>
          <span className="text-gray-400">{product.postedAt}</span>
        </div>
      </div>
    </div>
  );
};
