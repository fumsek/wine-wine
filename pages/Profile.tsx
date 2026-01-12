import React from 'react';
import { MOCK_USER_PRO, MOCK_PRODUCTS } from '../constants';
import { Icons } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';

interface ProfileProps {
  onNavigateToFavorites?: () => void;
  onNavigateToExchanges?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToHelp?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
  onNavigateToFavorites,
  onNavigateToExchanges,
  onNavigateToPayments,
  onNavigateToHelp
}) => {
  const user = MOCK_USER_PRO;
  const userListings = MOCK_PRODUCTS.filter(p => p.seller.id === user.id || Math.random() > 0.5); // Mock random listings for demo

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      
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
                <Icons.MapPin size={14} /> {user.location} • Membre depuis 2021
            </p>

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
             <Button variant="outline" className="gap-2"><Icons.Settings size={18} /> Paramètres</Button>
             <Button variant="outline" className="gap-2"><Icons.Edit size={18} /> Modifier</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {/* Sidebar Navigation */}
         <div className="md:col-span-1 space-y-2">
             <nav className="flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2">
                 <button className="flex items-center gap-3 px-4 py-3 bg-wine-50 text-wine-900 rounded-lg text-airbnb-medium whitespace-nowrap">
                     <Icons.Package size={20} /> Mes annonces
                 </button>
                 <button 
                   onClick={onNavigateToFavorites}
                   className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-airbnb-medium whitespace-nowrap"
                 >
                     <Icons.Heart size={20} /> Favoris
                 </button>
                 <button 
                   onClick={onNavigateToExchanges}
                   className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-airbnb-medium whitespace-nowrap"
                 >
                     <Icons.ArrowLeftRight size={20} /> Échanges en cours
                 </button>
                 <button 
                   onClick={onNavigateToPayments}
                   className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-airbnb-medium whitespace-nowrap"
                 >
                     <Icons.CreditCard size={20} /> Paiements
                 </button>
                 <button 
                   onClick={onNavigateToHelp}
                   className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-airbnb-medium whitespace-nowrap"
                 >
                     <Icons.HelpCircle size={20} /> Aide
                 </button>
             </nav>
         </div>

         {/* Content Area */}
         <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6 gap-4">
                <h2 className="text-lg md:text-xl text-airbnb-bold text-gray-900 whitespace-nowrap">Mes annonces ({userListings.length})</h2>
                <Button size="sm" variant="primary" className="text-xs md:text-sm whitespace-nowrap flex-shrink-0">Ajouter une annonce</Button>
            </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {userListings.map(p => (
                     <div key={p.id} className="relative group">
                         <ProductCard product={p} onClick={() => {}} />
                         <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="bg-white p-2 rounded-full shadow-sm hover:text-wine-900">
                                 <Icons.Settings size={16} />
                             </button>
                         </div>
                         <div className="mt-2 flex gap-2">
                             <Button size="sm" variant="outline" fullWidth>Modifier</Button>
                             <Button size="sm" variant="outline" fullWidth className="text-red-600 hover:bg-red-50 border-red-200">Retirer</Button>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>
    </div>
  );
};