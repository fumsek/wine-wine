import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { ProductDetail } from './pages/ProductDetail';
import { CreateListing } from './pages/CreateListing';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { Favorites } from './pages/Favorites';
import { UserProfile } from './pages/UserProfile';
import { Product, User } from './types';
import { MOCK_PRODUCTS } from './constants';

// Simple HashRouter implementation since we can't use React Router DOM in this environment easily without package install
// and requirement to use single file structure implies simplicity.
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // Navigation handlers
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveTab('explore');
    window.scrollTo(0, 0);
  };

  const handleBackToResults = () => {
    setSelectedProduct(null);
    setActiveTab('explore'); // Or go back to history if implemented
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setActiveTab('user-profile');
    window.scrollTo(0, 0);
  };

  const handleBackFromUserProfile = () => {
    setSelectedUser(null);
    setActiveTab('home');
    window.scrollTo(0, 0);
  };

  const handleFavoriteToggle = (productId: string) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const favoriteProducts = MOCK_PRODUCTS.filter(p => favoriteIds.has(p.id));

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} favoriteIds={favoriteIds} onFavoriteToggle={handleFavoriteToggle} />;
      case 'explore':
        return <Explore onProductClick={handleProductClick} initialCategory={selectedCategory || 'all'} favoriteIds={favoriteIds} onFavoriteToggle={handleFavoriteToggle} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBackToResults} />
        ) : (
          <Explore onProductClick={handleProductClick} favoriteIds={favoriteIds} onFavoriteToggle={handleFavoriteToggle} />
        );
      case 'sell':
        return <CreateListing />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile onNavigateToFavorites={() => setActiveTab('favorites')} />;
      case 'favorites':
        return <Favorites favoriteProducts={favoriteProducts} onProductClick={handleProductClick} onFavoriteToggle={handleFavoriteToggle} />;
      case 'user-profile':
        return selectedUser ? (
          <UserProfile 
            user={selectedUser} 
            onBack={handleBackFromUserProfile} 
            onProductClick={handleProductClick}
            favoriteIds={favoriteIds}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ) : (
          <Home onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} favoriteIds={favoriteIds} onFavoriteToggle={handleFavoriteToggle} />
        );
      default:
        return <Home onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} favoriteIds={favoriteIds} onFavoriteToggle={handleFavoriteToggle} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onProductClick={handleProductClick} onUserClick={handleUserClick} />
      
      <main className="min-h-[calc(100vh-4rem)]">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Desktop Footer Mockup */}
      <footer className="hidden md:block bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-8">
            <div>
                <div className="flex items-center gap-0.5 mb-4">
                    <img src="/logo-seul-wine-wine.png" alt="wine wine" className="h-7 w-auto" />
                    <span className="text-xl tracking-tight text-airbnb-bold bg-gradient-to-r from-red-700 via-wine-700 via-wine-700 to-red-700 bg-clip-text text-transparent pr-0.5">wine wine</span>
                </div>
                <p className="text-airbnb-light text-gray-500 text-sm">La première marketplace dédiée aux spiritueux d'exception. Achetez, vendez, échangez en toute confiance.</p>
            </div>
            <div>
                <h4 className="text-airbnb-bold mb-4">Découvrir</h4>
                <ul className="space-y-2 text-sm text-airbnb text-gray-500">
                    <li>Vins rouges</li>
                    <li>Whiskies rares</li>
                    <li>Champagnes</li>
                    <li>Rhum agricole</li>
                </ul>
            </div>
            <div>
                <h4 className="text-airbnb-bold mb-4">Aide & Info</h4>
                <ul className="space-y-2 text-sm text-airbnb text-gray-500">
                    <li>Comment ça marche</li>
                    <li>Vérification & Authenticité</li>
                    <li>Frais de service</li>
                    <li>Nous contacter</li>
                </ul>
            </div>
            <div>
                <h4 className="text-airbnb-bold mb-4">Légal</h4>
                <ul className="space-y-2 text-sm text-airbnb text-gray-500">
                    <li>CGU / CGV</li>
                    <li>Politique de confidentialité</li>
                    <li>Mentions légales</li>
                </ul>
                <div className="mt-4 text-xs text-airbnb-light text-gray-400">
                    L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;