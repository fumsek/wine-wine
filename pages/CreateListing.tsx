import React, { useState } from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { CATEGORIES } from '../constants';

export const CreateListing = () => {
  const [wantsToSell, setWantsToSell] = useState(true);
  const [wantsToExchange, setWantsToExchange] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-4">
      <div className="mb-8">
        <h1 className="text-2xl text-airbnb-bold text-gray-900">Déposer une annonce</h1>
        <p className="text-gray-500">Vendre ou échanger, c'est simple et rapide.</p>
      </div>

      <div className="space-y-8">
        
        {/* Type of Listing */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg text-airbnb-bold mb-4">Que souhaitez-vous faire ?</h2>
            <div className="grid grid-cols-2 gap-4">
                <label 
                  className={`cursor-pointer rounded-lg p-4 flex flex-col items-center text-center transition-all ${
                    wantsToSell 
                      ? 'border-2 border-wine-900 bg-wine-50' 
                      : 'border border-gray-200 hover:border-wine-400 hover:bg-wine-50/50'
                  }`}
                  onClick={() => setWantsToSell(!wantsToSell)}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      wantsToSell 
                        ? 'bg-wine-200 text-wine-900' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                        <Icons.CreditCard size={20} />
                    </div>
                    <span className={`text-airbnb-bold ${wantsToSell ? 'text-wine-900' : 'text-gray-700'}`}>Vendre</span>
                    <span className={`text-xs mt-1 ${wantsToSell ? 'text-wine-700' : 'text-gray-500'}`}>Je fixe un prix</span>
                </label>
                <label 
                  className={`cursor-pointer rounded-lg p-4 flex flex-col items-center text-center transition-all ${
                    wantsToExchange 
                      ? 'border-2 border-orange-500 bg-orange-50' 
                      : 'border border-gray-200 hover:border-orange-400 hover:bg-orange-50/50'
                  }`}
                  onClick={() => setWantsToExchange(!wantsToExchange)}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      wantsToExchange 
                        ? 'bg-orange-200 text-orange-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                        <Icons.ArrowLeftRight size={20} />
                    </div>
                    <span className={`text-airbnb-bold ${wantsToExchange ? 'text-orange-700' : 'text-gray-700'}`}>Échanger</span>
                    <span className={`text-xs mt-1 ${wantsToExchange ? 'text-orange-600' : 'text-gray-500'}`}>Contre d'autres bouteilles</span>
                </label>
            </div>
        </div>

        {/* Photos */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg text-airbnb-bold mb-4">Photos <span className="text-gray-400 text-airbnb text-sm">(Max 6)</span></h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-wine-500 hover:text-wine-500 transition-colors bg-gray-50">
                    <Icons.Camera size={24} />
                    <span className="text-xs mt-2 text-airbnb-medium">Ajouter</span>
                </div>
                {/* Mockup of uploaded photo */}
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <img src="https://picsum.photos/seed/whisky1/200/200" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 p-1.5 rounded-full shadow-sm">
                            <Icons.Check className="text-green-600" size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg text-airbnb-bold mb-4">Détails de la bouteille</h2>
            
            <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Titre de l'annonce</label>
                <input type="text" placeholder="Ex: Macallan 18 ans Sherry Oak 2023" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Catégorie</label>
                    <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900">
                        <option>Sélectionner...</option>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">État</label>
                    <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900">
                        <option>Scellé / Neuf</option>
                        <option>Ouvert (Niveau col)</option>
                        <option>Coffret abîmé</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Prix (€)</label>
                    <div className="relative">
                        <input type="number" placeholder="0" className="w-full p-2.5 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900" />
                        <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Stock (optionnel)</label>
                    <input type="number" min="1" placeholder="Nb bouteilles" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900" />
                </div>
            </div>

            <div>
                 <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Description</label>
                 <textarea rows={4} placeholder="Dites-en plus sur l'histoire de la bouteille, son stockage, etc." className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none resize-none bg-white text-gray-900"></textarea>
            </div>
        </div>

        {/* Action */}
        <div className="flex flex-col sm:flex-row gap-2 pb-8 md:pb-4">
             <Button variant="outline" fullWidth>Prévisualiser</Button>
             <Button fullWidth>Publier l'annonce</Button>
        </div>
      </div>
    </div>
  );
};