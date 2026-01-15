import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { CATEGORIES } from '../constants';
import { BottleDetailsFields, BottleDetailsFormData } from '../components/BottleDetailsFields';
import { Product } from '../types';

interface EditListingProps {
  product: Product;
  onBack: () => void;
  onSave?: (updatedProduct: Partial<Product>) => void;
}

export const EditListing: React.FC<EditListingProps> = ({ product, onBack, onSave }) => {
  const [wantsToSell, setWantsToSell] = useState(!!product.price);
  const [wantsToExchange, setWantsToExchange] = useState(!product.price);
  const [selectedCategory, setSelectedCategory] = useState<string>(product.category || '');
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price?.toString() || '');
  const [condition, setCondition] = useState(product.condition || 'Scellé / Neuf');
  const [description, setDescription] = useState(product.description || '');
  const [stock, setStock] = useState(product.stock?.toString() || '');
  const [images, setImages] = useState<string[]>(product.images || []);
  const [bottleDetails, setBottleDetails] = useState<BottleDetailsFormData>({
    grapes: product.bottleDetails?.grapes,
    region: product.bottleDetails?.region,
    classification: product.bottleDetails?.classification,
    tastingNotes: product.bottleDetails?.tastingNotes,
    drinkWindowStart: product.bottleDetails?.drinkWindowStart,
    drinkWindowEnd: product.bottleDetails?.drinkWindowEnd,
    servingTempMin: product.bottleDetails?.servingTempMin,
    servingTempMax: product.bottleDetails?.servingTempMax,
    decantingMinutesMin: product.bottleDetails?.decantingMinutesMin,
    decantingMinutesMax: product.bottleDetails?.decantingMinutesMax,
    pairings: product.bottleDetails?.pairings,
    productionBottlesApprox: product.bottleDetails?.productionBottlesApprox,
    allergens: product.bottleDetails?.allergens,
    taxDisplay: product.bottleDetails?.taxDisplay,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Déterminer si c'est une vente ou un échange basé sur le produit
    // Pour l'instant, on assume que si le prix existe, c'est une vente
    setWantsToSell(!!product.price);
    setWantsToExchange(!product.price);
  }, [product]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const promises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(promises).then(newImages => {
        setImages([...images, ...newImages].slice(0, 6));
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        title,
        price: wantsToSell ? parseFloat(price) : undefined,
        condition,
        description,
        stock: stock ? parseInt(stock) : undefined,
        images,
        category: selectedCategory,
        bottleDetails,
      });
    }
    onBack();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-4">
      <div className="mb-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <Icons.ArrowLeft size={18} />
          <span className="text-airbnb-medium">Retour</span>
        </button>
        <h1 className="text-2xl text-airbnb-bold text-gray-900">Modifier l'annonce</h1>
        <p className="text-gray-500">Mettez à jour les informations de votre annonce.</p>
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
                  onClick={() => {
                    setWantsToSell(true);
                    setWantsToExchange(false);
                  }}
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
                  onClick={() => {
                    setWantsToExchange(true);
                    setWantsToSell(false);
                  }}
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
                {images.length < 6 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-wine-500 hover:text-wine-500 transition-colors bg-gray-50">
                    <Icons.Camera size={24} />
                    <span className="text-xs mt-2 text-airbnb-medium">Ajouter</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={img} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icons.X size={14} />
                    </button>
                  </div>
                ))}
            </div>
        </div>

        {/* Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg text-airbnb-bold mb-4">Détails de la bouteille</h2>
            
            <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Titre de l'annonce</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Macallan 18 ans Sherry Oak 2023" 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900" 
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Catégorie</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900"
                    >
                        <option value="">Sélectionner...</option>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">État</label>
                    <select 
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900"
                    >
                        <option>Scellé / Neuf</option>
                        <option>Ouvert (Niveau col)</option>
                        <option>Coffret abîmé</option>
                    </select>
                </div>
            </div>

            {wantsToSell && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Prix (€)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0" 
                      className="w-full p-2.5 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900" 
                    />
                    <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Stock (optionnel)</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Nb bouteilles" 
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900" 
                  />
                </div>
              </div>
            )}

            <div>
                 <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Description</label>
                 <textarea 
                   rows={4} 
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="Dites-en plus sur l'histoire de la bouteille, son stockage, etc." 
                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none resize-none bg-white text-gray-900"
                 ></textarea>
            </div>

            {/* Fiche bouteille */}
            <div className="pt-4 border-t border-gray-200">
              <BottleDetailsFields
                value={bottleDetails}
                onChange={setBottleDetails}
                category={selectedCategory}
              />
            </div>
        </div>

        {/* Action */}
        <div className="flex flex-col sm:flex-row gap-2 pb-8 md:pb-4">
             <Button variant="outline" fullWidth onClick={onBack}>Annuler</Button>
             <Button fullWidth onClick={handleSave}>Enregistrer les modifications</Button>
        </div>
      </div>
    </div>
  );
};
