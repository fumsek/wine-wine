import React, { useState } from 'react';
import { MOCK_USER_PRO, MOCK_PRODUCTS } from '../constants';
import { Icons } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { Product, User } from '../types';
import { Favorites } from './Favorites';
import { Exchanges } from './Exchanges';
import { Payments } from './Payments';
import { Help } from './Help';
import { Settings } from './Settings';
import { EditProfile } from './EditProfile';
import { EditListing } from './EditListing';
import { RemoveListingModal } from '../components/RemoveListingModal';

interface ProfileProps {
  favoriteProducts?: Product[];
  onProductClick?: (product: Product) => void;
  onFavoriteToggle?: (productId: string) => void;
  onNavigateToCreateListing?: () => void;
  onLogout?: () => void;
}

type ActiveSection = 'listings' | 'favorites' | 'exchanges' | 'payments' | 'help' | 'settings' | 'edit' | 'editListing';

export const Profile: React.FC<ProfileProps> = ({ 
  favoriteProducts = [],
  onProductClick,
  onFavoriteToggle,
  onNavigateToCreateListing,
  onLogout
}) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('listings');
  const [user, setUser] = useState<User>(MOCK_USER_PRO);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [removingProduct, setRemovingProduct] = useState<Product | null>(null);
  const [userListings, setUserListings] = useState<Product[]>(
    MOCK_PRODUCTS.filter(p => p.seller.id === user.id || Math.random() > 0.5)
  );

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    setUser({ ...user, ...updatedUser });
    setActiveSection('listings');
  };

  const handleEditListing = (product: Product) => {
    setEditingProduct(product);
    setActiveSection('editListing');
  };

  const handleSaveListing = (updatedProduct: Partial<Product>) => {
    if (editingProduct) {
      setUserListings(userListings.map(p => 
        p.id === editingProduct.id ? { ...p, ...updatedProduct } : p
      ));
    }
    setEditingProduct(null);
    setActiveSection('listings');
  };

  const handleRemoveListing = (product: Product) => {
    setRemovingProduct(product);
  };

  const handleConfirmRemove = (reason?: string) => {
    if (removingProduct) {
      // Ici, on ferait l'appel API pour retirer l'annonce
      console.log('Retrait de l\'annonce:', removingProduct.id, 'Raison:', reason);
      setUserListings(userListings.filter(p => p.id !== removingProduct.id));
      setRemovingProduct(null);
    }
  };

  // Si on est sur Settings, Edit ou EditListing, afficher directement ces pages
  if (activeSection === 'settings') {
    return (
      <Settings 
        user={user} 
        onBack={() => setActiveSection('listings')}
        onLogout={onLogout}
      />
    );
  }

  if (activeSection === 'edit') {
    return (
      <EditProfile 
        user={user} 
        onBack={() => setActiveSection('listings')}
        onSave={handleSaveProfile}
      />
    );
  }

  if (activeSection === 'editListing' && editingProduct) {
    return (
      <EditListing
        product={editingProduct}
        onBack={() => {
          setEditingProduct(null);
          setActiveSection('listings');
        }}
        onSave={handleSaveListing}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-8 md:pb-4">
      
      {/* Cover Photo (si pro) */}
      {user.isPro && user.coverPhoto && (
        <div className="mb-8 rounded-2xl overflow-hidden">
          <div className="relative h-48 md:h-64 w-full">
            <img 
              src={user.coverPhoto} 
              alt="Photo de couverture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative">
            <img src={user.avatar} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md" />
            {user.isVerified && (
              <img src="/verified_7641727.png" alt="Vérifié" className="absolute bottom-1 right-1 w-5 h-5 md:w-6 md:h-6" />
            )}
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <h1 className="text-2xl text-airbnb-bold text-gray-900">{user.name}</h1>
                {user.isPro && <span className="bg-wine-900 text-white text-xs px-2.5 py-0.5 rounded-full text-airbnb-bold uppercase tracking-wider">PRO</span>}
                {user.isVerified && <span className="flex items-center text-green-700 text-xs bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200"><Icons.ShieldCheck size={12} className="mr-1"/> Identité vérifiée</span>}
            </div>
            
            <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1">
                <Icons.MapPin size={14} /> {user.location} {user.memberSince && `• Membre depuis ${user.memberSince}`}
            </p>
            
            {user.bio && (
              <p className="text-sm text-airbnb text-gray-700 mt-3 text-center md:text-left max-w-2xl">
                {user.bio}
              </p>
            )}

            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                <div className="text-center md:text-left">
                    <span className="block text-xl text-airbnb-bold text-gray-900">4.8</span>
                    <span className="text-xs text-gray-500">Note moyenne</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center md:text-left">
                    <span className="block text-xl text-airbnb-bold text-gray-900">124</span>
                    <span className="text-xs text-gray-500">Ventes</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center md:text-left">
                    <span className="block text-xl text-airbnb-bold text-gray-900">12</span>
                    <span className="text-xs text-gray-500">Échanges</span>
                </div>
            </div>
        </div>

        <div className="flex gap-3">
             <Button 
               variant="outline" 
               className="gap-2"
               onClick={() => setActiveSection('settings')}
             >
               <Icons.Settings size={18} /> Paramètres
             </Button>
             <Button 
               variant="outline" 
               className="gap-2"
               onClick={() => setActiveSection('edit')}
             >
               <Icons.Edit size={18} /> Modifier
             </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {/* Sidebar Navigation */}
         <div className="md:col-span-1 space-y-2">
             <nav className="flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2">
                 <button 
                   onClick={() => setActiveSection('listings')}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-airbnb-medium whitespace-nowrap transition-colors ${
                     activeSection === 'listings' 
                       ? 'bg-wine-50 text-wine-900' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                     <Icons.Package size={20} /> Mes annonces
                 </button>
                 <button 
                   onClick={() => setActiveSection('favorites')}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-airbnb-medium whitespace-nowrap transition-colors ${
                     activeSection === 'favorites' 
                       ? 'bg-wine-50 text-wine-900' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                     <Icons.Heart size={20} /> Favoris
                 </button>
                 <button 
                   onClick={() => setActiveSection('exchanges')}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-airbnb-medium whitespace-nowrap transition-colors ${
                     activeSection === 'exchanges' 
                       ? 'bg-wine-50 text-wine-900' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                     <Icons.ArrowLeftRight size={20} /> Échanges en cours
                 </button>
                 <button 
                   onClick={() => setActiveSection('payments')}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-airbnb-medium whitespace-nowrap transition-colors ${
                     activeSection === 'payments' 
                       ? 'bg-wine-50 text-wine-900' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                     <Icons.CreditCard size={20} /> Paiements
                 </button>
                 <button 
                   onClick={() => setActiveSection('help')}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-airbnb-medium whitespace-nowrap transition-colors ${
                     activeSection === 'help' 
                       ? 'bg-wine-50 text-wine-900' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                     <Icons.HelpCircle size={20} /> Aide
                 </button>
                 <button 
                   onClick={() => setActiveSection('settings')}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-airbnb-medium whitespace-nowrap transition-colors ${
                     activeSection === 'settings' 
                       ? 'bg-wine-50 text-wine-900' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                     <Icons.Settings size={20} /> Paramètres
                 </button>
             </nav>
         </div>

         {/* Content Area */}
         <div className="md:col-span-3 pb-24 md:pb-0">
            {activeSection === 'listings' && (
              <>
                <div className="flex items-center justify-between mb-6 gap-4">
                    <h2 className="text-lg md:text-xl text-airbnb-bold text-gray-900 whitespace-nowrap">Mes annonces ({userListings.length})</h2>
                    <Button 
                      size="sm" 
                      variant="primary" 
                      className="text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                      onClick={onNavigateToCreateListing}
                    >
                      Ajouter une annonce
                    </Button>
                </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {userListings.map(p => (
                         <div key={p.id} className="relative">
                             <ProductCard product={p} onClick={() => onProductClick?.(p)} />
                             <div className="mt-2 flex gap-2">
                                 <Button 
                                   size="sm" 
                                   variant="outline" 
                                   fullWidth
                                   onClick={() => handleEditListing(p)}
                                 >
                                   Modifier
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline" 
                                   fullWidth 
                                   className="text-red-600 hover:bg-red-50 border-red-200"
                                   onClick={() => handleRemoveListing(p)}
                                 >
                                   Retirer
                                 </Button>
                             </div>
                         </div>
                     ))}
                 </div>
              </>
            )}

            {activeSection === 'favorites' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg md:text-xl text-airbnb-bold text-gray-900 mb-2">Mes favoris</h2>
                  <p className="text-sm text-airbnb-light text-gray-500">{favoriteProducts.length} {favoriteProducts.length > 1 ? 'produits' : 'produit'} sauvegardé{favoriteProducts.length > 1 ? 's' : ''}</p>
                </div>
                {favoriteProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                      <Icons.Heart size={32} className="fill-none" />
                    </div>
                    <h3 className="text-lg text-airbnb-medium text-gray-900 mb-2">Aucun favori pour le moment</h3>
                    <p className="text-sm text-airbnb-light text-gray-500 max-w-md">
                      Cliquez sur le cœur des produits qui vous intéressent pour les sauvegarder ici.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoriteProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={() => onProductClick?.(product)}
                        isFavorite={true}
                        onFavoriteToggle={() => onFavoriteToggle?.(product.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'exchanges' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Icons.ArrowLeftRight size={32} className="text-wine-900" />
                    <h2 className="text-lg md:text-xl text-airbnb-bold text-gray-900">Échanges en cours</h2>
                  </div>
                  <p className="text-sm text-airbnb-light text-gray-500">
                    Gérez vos échanges de bouteilles en cours
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto text-gray-400">
                    <Icons.ArrowLeftRight size={32} />
                  </div>
                  <h3 className="text-lg text-airbnb-medium text-gray-900 mb-2">Aucun échange en cours</h3>
                  <p className="text-sm text-airbnb-light text-gray-500 max-w-md mx-auto">
                    Vous n'avez pas d'échanges actifs pour le moment. Les échanges que vous initiez ou recevez apparaîtront ici.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'payments' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Icons.CreditCard size={32} className="text-wine-900" />
                    <h2 className="text-lg md:text-xl text-airbnb-bold text-gray-900">Paiements</h2>
                  </div>
                  <p className="text-sm text-airbnb-light text-gray-500">
                    Gérez vos méthodes de paiement et consultez votre historique
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto text-gray-400">
                    <Icons.CreditCard size={32} />
                  </div>
                  <h3 className="text-lg text-airbnb-medium text-gray-900 mb-2">Aucune méthode de paiement</h3>
                  <p className="text-sm text-airbnb-light text-gray-500 max-w-md mx-auto">
                    Ajoutez une méthode de paiement pour faciliter vos transactions sur Wine Wine.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'help' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Icons.HelpCircle size={32} className="text-wine-900" />
                    <h2 className="text-lg md:text-xl text-airbnb-bold text-gray-900">Aide</h2>
                  </div>
                  <p className="text-sm text-airbnb-light text-gray-500">
                    Trouvez des réponses à vos questions
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-wine-200 transition-colors cursor-pointer">
                    <h3 className="text-lg text-airbnb-bold text-gray-900 mb-2">Comment publier une annonce ?</h3>
                    <p className="text-sm text-airbnb-light text-gray-600">
                      Découvrez comment créer et publier votre première annonce de bouteille sur Wine Wine.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-wine-200 transition-colors cursor-pointer">
                    <h3 className="text-lg text-airbnb-bold text-gray-900 mb-2">Comment fonctionne l'échange ?</h3>
                    <p className="text-sm text-airbnb-light text-gray-600">
                      Apprenez à proposer et accepter des échanges de bouteilles avec d'autres membres.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-wine-200 transition-colors cursor-pointer">
                    <h3 className="text-lg text-airbnb-bold text-gray-900 mb-2">Paiement et sécurité</h3>
                    <p className="text-sm text-airbnb-light text-gray-600">
                      Tout ce que vous devez savoir sur les paiements sécurisés et la protection des transactions.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-wine-200 transition-colors cursor-pointer">
                    <h3 className="text-lg text-airbnb-bold text-gray-900 mb-2">Livraison et retrait</h3>
                    <p className="text-sm text-airbnb-light text-gray-600">
                      Informations sur les options de livraison et les modalités de retrait.
                    </p>
                  </div>
                </div>
              </div>
            )}
         </div>
      </div>

      {/* Modal de retrait d'annonce */}
      <RemoveListingModal
        isOpen={!!removingProduct}
        onClose={() => setRemovingProduct(null)}
        onConfirm={handleConfirmRemove}
        productTitle={removingProduct?.title}
      />
    </div>
  );
};