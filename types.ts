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