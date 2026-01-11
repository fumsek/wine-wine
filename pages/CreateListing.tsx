import React from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { CATEGORIES } from '../constants';

export const CreateListing = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl text-airbnb-bold text-gray-900">Déposer une annonce</h1>
        <p className="text-gray-500">Vendre ou échanger, c'est simple et rapide.</p>
      </div>

      <div className="space-y-8">
        
        {/* Type of Listing */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg text-airbnb-bold mb-4">Que souhaitez-vous faire ?</h2>
            <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer border-2 border-wine-900 bg-wine-50 rounded-lg p-4 flex flex-col items-center text-center transition-all">
                    <input type="radio" name="type" className="hidden" defaultChecked />
                    <div className="w-10 h-10 bg-wine-200 text-wine-900 rounded-full flex items-center justify-center mb-2">
                        <Icons.CreditCard size={20} />
                    </div>
                    <span className="text-airbnb-bold text-wine-900">Vendre</span>
                    <span className="text-xs text-wine-700 mt-1">Je fixe un prix</span>
                </label>
                <label className="cursor-pointer border border-gray-200 hover:border-amber-400 hover:bg-amber-50 rounded-lg p-4 flex flex-col items-center text-center transition-all">
                    <input type="radio" name="type" className="hidden" />
                    <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-2">
                        <Icons.ArrowLeftRight size={20} />
                    </div>
                    <span className="text-airbnb-bold text-gray-700">Échanger</span>
                    <span className="text-xs text-gray-500 mt-1">Contre d'autres bouteilles</span>
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
                <input type="text" placeholder="Ex: Macallan 18 ans Sherry Oak 2023" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Catégorie</label>
                    <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white">
                        <option>Sélectionner...</option>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">État</label>
                    <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white">
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
                        <input type="number" placeholder="0" className="w-full p-2.5 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none" />
                        <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Stock (optionnel)</label>
                    <input type="number" min="1" placeholder="Nb bouteilles" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none" />
                </div>
            </div>

            <div>
                 <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Description</label>
                 <textarea rows={4} placeholder="Dites-en plus sur l'histoire de la bouteille, son stockage, etc." className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none resize-none"></textarea>
            </div>
        </div>

        {/* Action */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <Button variant="outline" fullWidth>Prévisualiser</Button>
             <Button fullWidth>Publier l'annonce</Button>
        </div>
      </div>
    </div>
  );
};