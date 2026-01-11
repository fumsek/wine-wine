import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Icons } from './Icon';
import { Button } from './Button';
import { Product, User } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface HeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onProductClick?: (product: Product) => void;
    onUserClick?: (user: User) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onProductClick, onUserClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<(Product | User & { type: 'user' })[]>([]);
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [userResults, setUserResults] = useState<(User & { type: 'user' })[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get all unique users from products
  const allUsers = useMemo(() => {
    const userMap = new Map<string, User>();
    MOCK_PRODUCTS.forEach(product => {
      if (!userMap.has(product.seller.id)) {
        userMap.set(product.seller.id, product.seller);
      }
    });
    return Array.from(userMap.values());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      const products = MOCK_PRODUCTS.filter(product => {
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDistillery = product.specs.distillery?.toLowerCase().includes(query);
        const matchesLocation = product.location.toLowerCase().includes(query);
        const matchesOrigin = product.specs.origin.toLowerCase().includes(query);
        return matchesTitle || matchesDistillery || matchesLocation || matchesOrigin;
      });
      
      const users = allUsers.filter(user => {
        return user.name.toLowerCase().includes(query);
      }).map(user => ({ ...user, type: 'user' as const }));

      setProductResults(products.slice(0, 6));
      setUserResults(users.slice(0, 4));
      setShowDropdown(true);
    } else {
      setProductResults([]);
      setUserResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery, allUsers]);

  const handleProductSelect = (product: Product) => {
    setSearchQuery('');
    setShowDropdown(false);
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleUserSelect = (user: User) => {
    setSearchQuery('');
    setShowDropdown(false);
    if (onUserClick) {
      onUserClick(user);
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-0.5 cursor-pointer flex-shrink-0"
          onClick={() => setActiveTab('home')}
        >
          <img src="/logo-seul-wine-wine.png" alt="Wine Wine" className="h-7 w-auto" />
          <span className="text-xl tracking-tight text-airbnb-bold bg-gradient-to-r from-red-700 via-wine-700 via-wine-700 to-red-700 bg-clip-text text-transparent pr-0.5">wine wine</span>
        </div>

        {/* Search Bar (Desktop & Mobile) */}
        <div className="flex flex-1 max-w-2xl mx-2 md:mx-4" ref={searchRef}>
          <div className="relative w-full">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
              placeholder="Rechercher une bouteille, une distillerie, une région..." 
              className="w-full h-10 pl-10 pr-10 rounded-full border border-gray-300 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-wine-900 focus:border-transparent transition-all text-sm"
            />
            <Icons.Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            {searchQuery.length > 0 && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowDropdown(false);
                }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                type="button"
              >
                <Icons.X size={18} />
              </button>
            )}
            
            {/* Search Dropdown */}
            {showDropdown && (productResults.length > 0 || userResults.length > 0) && (
              <div className="fixed md:absolute top-16 md:top-12 left-0 md:left-0 right-0 md:right-0 bg-white border border-gray-200 md:rounded-2xl shadow-xl z-50 max-h-[calc(100vh-8rem)] md:max-h-[500px] overflow-y-auto">
                <div className="p-2">
                  {/* Products */}
                  {productResults.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-airbnb-medium text-gray-900 truncate">{product.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-airbnb-light text-gray-500">{product.location}</span>
                          <span className="text-xs text-airbnb-light text-gray-400">•</span>
                          <span className="text-xs text-airbnb-light text-gray-500">{product.seller.name}</span>
                        </div>
                        <p className="text-sm text-airbnb-bold text-wine-900 mt-1">{product.price} {product.currency}</p>
                      </div>
                    </button>
                  ))}

                  {/* Separator between products and users */}
                  {productResults.length > 0 && userResults.length > 0 && (
                    <div className="border-t border-gray-200 my-2"></div>
                  )}

                  {/* Users */}
                  {userResults.map(user => {
                    const userTypeLabel = user.isPro 
                      ? (user.name.toLowerCase().includes('cave') ? 'Cave' 
                        : user.name.toLowerCase().includes('distillerie') || user.name.toLowerCase().includes('maison') ? 'Distillerie' 
                        : 'Professionnel')
                      : 'Particulier';
                    
                    return (
                      <button
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                      >
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-16 h-16 object-cover rounded-full flex-shrink-0 border-2 border-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm text-airbnb-medium text-gray-900 truncate">{user.name}</h4>
                            {user.isVerified && <Icons.ShieldCheck size={14} className="text-green-600 flex-shrink-0" />}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-airbnb-light text-gray-500">{userTypeLabel}</span>
                            <span className="text-xs text-airbnb-light text-gray-400">•</span>
                            <span className="text-xs text-airbnb-light text-gray-500">{user.location}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Icons.Star size={12} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs text-airbnb-medium text-gray-700">{user.rating}</span>
                            <span className="text-xs text-airbnb-light text-gray-400">({user.reviewCount})</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-1.5 text-sm text-airbnb-medium transition-colors ${activeTab === 'explore' ? 'text-wine-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Icons.Compass size={18} />
            Explorer
          </button>
          
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-1.5 text-sm text-airbnb-medium transition-colors ${activeTab === 'messages' ? 'text-wine-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Icons.MessageCircle size={18} />
            Messages
          </button>

          <button 
             onClick={() => setActiveTab('profile')}
             className={`flex items-center gap-1.5 text-sm text-airbnb-medium transition-colors ${activeTab === 'profile' ? 'text-wine-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Icons.User size={18} />
            Compte
          </button>

          <button
            onClick={() => setActiveTab('sell')}
            className="ml-2 gap-2 rounded-full bg-gradient-to-b from-wine-800 to-[#8a3448] backdrop-blur-xl border border-white/12 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_2px_4px_rgba(114,31,45,0.1)] hover:from-wine-700 hover:to-[#9a3c52] hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_3px_6px_rgba(114,31,45,0.15)] transition-all inline-flex items-center justify-center text-airbnb-medium h-8 px-3 md:px-4 text-xs md:text-sm text-white whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icons.Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Vendre / Échanger</span>
            <span className="sm:hidden">Vendre</span>
          </button>
        </nav>
      </div>
    </header>
  );
};