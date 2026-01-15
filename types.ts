import React from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  isPro: boolean;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  location: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  isTradeable: boolean;
  isRare: boolean;
  condition: 'Scellé' | 'Ouvert' | 'Coffret';
  volume: string; // e.g., 70cl
  location: string;
  postedAt: string;
  seller: User;
  description: string;
  stock?: number; // Stock disponible (optionnel)
  specs: {
    origin: string;
    distillery?: string;
    vintage?: string; // Millésime
    abv?: string; // Alcohol by volume
  };
}

export interface Category {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface Auction {
  id: string;
  product: Product;
  endTime: Date; // Date de fin de l'enchère
  currentBid: number; // Dernier prix proposé
  bidCount: number; // Nombre d'enchères
  minBid: number; // Prix minimum pour la prochaine enchère
}

export interface Conversation {
  id: string;
  product: Product;
  otherUser: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image' | 'offer' | 'trade_proposal';
}

// Argus des Bouteilles - Types
export interface BottleCanonical {
  id: string;
  category: string;
  producer: string;
  name: string;
  vintage?: string | null;
  ageStatement?: string | null;
  region?: string | null;
  appellation?: string | null;
  country: string;
  volumeMl: number;
  abv?: number | null;
  packaging?: string | null;
  imageUrl?: string | null;
  createdAt: string;
}

export interface BottleAlias {
  id: string;
  bottleId: string;
  aliasText: string;
}

export interface BottleSale {
  id: string;
  bottleId: string;
  soldAtDate: string;
  priceAmount: number;
  currency: string;
  feesIncluded: boolean;
  conditionGrade?: string | null;
  volumeMl: number;
  lotSize: number;
  source: 'MARKETPLACE';
  sourceRef?: string | null; // listing_id or order_id
  createdAt: string;
}

export interface PricePoint {
  id: string;
  bottleId: string;
  bucketStartDate: string;
  bucket: 'day' | 'week' | 'month';
  medianPrice: number;
  meanPrice: number;
  p10: number;
  p90: number;
  tradesCount: number;
  confidenceScore: number; // 0-100
  currency: string;
  createdAt: string;
}

export interface BottleSearchResult {
  id: string;
  label: string;
  image?: string | null;
  matchConfidence: 'strict' | 'fuzzy';
  category: string;
  producer: string;
  vintage?: string | null;
}

export interface PriceSeriesPoint {
  date: string;
  median: number;
  p10: number;
  p90: number;
  confidence: number;
  tradesCount: number;
}

export interface BottleSummary {
  bottleId: string;
  currentEstimate: number;
  delta1m?: number | null;
  delta6m?: number | null;
  delta1y?: number | null;
  tradesCount: number;
  confidence: number;
  currency: string;
}

export interface TrendingBottle {
  bottleId: string;
  label: string;
  image?: string | null;
  category: string;
  trendScore: number; // Based on views, favorites, sales, searches
}