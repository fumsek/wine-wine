import React, { useState } from 'react';
import { Icons } from './Icon';

export interface BottleDetailsFormData {
  grapes?: string | string[];
  region?: string;
  classification?: string;
  tastingNotes?: string;
  drinkWindowStart?: number | string;
  drinkWindowEnd?: number | string;
  servingTempMin?: number;
  servingTempMax?: number;
  decantingMinutesMin?: number;
  decantingMinutesMax?: number;
  pairings?: string[];
  productionBottlesApprox?: number;
  allergens?: {
    sulfites?: boolean;
    other?: string[];
  };
  taxDisplay?: 'TTC' | 'HT' | null;
}

interface BottleDetailsFieldsProps {
  value: BottleDetailsFormData;
  onChange: (data: BottleDetailsFormData) => void;
  category?: string; // Pour conditionner l'affichage des allergènes (vin = sulfites)
}

export const BottleDetailsFields: React.FC<BottleDetailsFieldsProps> = ({ 
  value, 
  onChange,
  category 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [pairingInput, setPairingInput] = useState('');

  const isWineCategory = category && ['rouge', 'blanc', 'rose', 'champagne'].includes(category);

  const handleGrapesChange = (input: string) => {
    // Permet d'entrer plusieurs cépages séparés par des virgules
    const grapes = input.split(',').map(g => g.trim()).filter(g => g.length > 0);
    onChange({ ...value, grapes: grapes.length === 1 ? grapes[0] : grapes });
  };

  const handleAddPairing = () => {
    if (pairingInput.trim()) {
      const newPairings = [...(value.pairings || []), pairingInput.trim()];
      onChange({ ...value, pairings: newPairings });
      setPairingInput('');
    }
  };

  const handleRemovePairing = (index: number) => {
    const newPairings = (value.pairings || []).filter((_, i) => i !== index);
    onChange({ ...value, pairings: newPairings.length > 0 ? newPairings : undefined });
  };

  const handleAddOtherAllergen = (allergen: string) => {
    if (allergen.trim()) {
      const newOther = [...(value.allergens?.other || []), allergen.trim()];
      onChange({ 
        ...value, 
        allergens: { ...value.allergens, other: newOther } 
      });
    }
  };

  const handleRemoveOtherAllergen = (index: number) => {
    const newOther = (value.allergens?.other || []).filter((_, i) => i !== index);
    onChange({ 
      ...value, 
      allergens: { 
        ...value.allergens, 
        other: newOther.length > 0 ? newOther : undefined 
      } 
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Essentiel */}
      <div className="space-y-4">
        <h3 className="text-base text-airbnb-bold text-gray-900">Essentiel</h3>
        
        {/* Cépage(s) / Ingrédients */}
        <div>
          <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
            Cépage(s) / Ingrédients
          </label>
          <input
            type="text"
            value={Array.isArray(value.grapes) ? value.grapes.join(', ') : (value.grapes || '')}
            onChange={(e) => handleGrapesChange(e.target.value)}
            placeholder="Ex: Syrah (100%), ou Pinot Noir, Chardonnay"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
          />
          <p className="text-xs text-gray-500 mt-1">Séparez plusieurs cépages par des virgules</p>
        </div>

        {/* Région */}
        <div>
          <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
            Région
          </label>
          <input
            type="text"
            value={value.region || ''}
            onChange={(e) => onChange({ ...value, region: e.target.value || undefined })}
            placeholder="Ex: Vallée du Rhône, Islay, Cognac"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
          />
        </div>

        {/* Classification / Appellation */}
        <div>
          <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
            Classification / Appellation / Type
          </label>
          <input
            type="text"
            value={value.classification || ''}
            onChange={(e) => onChange({ ...value, classification: e.target.value || undefined })}
            placeholder="Ex: AOP, IGP, Vin de France, Single Malt, VSOP"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
          />
        </div>

        {/* Allergènes - Sulfites (si catégorie vin) */}
        {isWineCategory && (
          <div>
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-sm text-airbnb-medium text-gray-700">Sulfites</span>
                <div className="relative group">
                  <Icons.HelpCircle size={14} className="text-gray-400" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Présence de sulfites dans le vin
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onChange({ 
                  ...value, 
                  allergens: { ...value.allergens, sulfites: !value.allergens?.sulfites } 
                })}
                className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
                  value.allergens?.sulfites ? 'bg-wine-900' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    value.allergens?.sulfites ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </label>
          </div>
        )}

        {/* Tax Display */}
        <div>
          <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
            Prix affiché
          </label>
          <select
            value={value.taxDisplay || ''}
            onChange={(e) => onChange({ ...value, taxDisplay: (e.target.value as 'TTC' | 'HT' | '') || undefined })}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900"
          >
            <option value="">Non spécifié</option>
            <option value="TTC">TTC (Toutes taxes comprises)</option>
            <option value="HT">HT (Hors taxes)</option>
          </select>
        </div>
      </div>

      {/* Section Informations avancées - Accordéon */}
      <div className="border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-base text-airbnb-bold text-gray-900 hover:text-wine-900 transition-colors"
        >
          <span>Informations avancées</span>
          <Icons.ChevronDown 
            size={18} 
            className={`text-gray-400 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          />
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 animate-slide-down">
            {/* Notes de dégustation */}
            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
                Notes de dégustation
              </label>
              <textarea
                rows={4}
                value={value.tastingNotes || ''}
                onChange={(e) => onChange({ ...value, tastingNotes: e.target.value || undefined })}
                placeholder="Décrivez les arômes, la texture, la longueur en bouche..."
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none resize-none bg-white text-gray-900"
              />
            </div>

            {/* Fenêtre de consommation */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
                  À boire dès
                </label>
                <input
                  type="text"
                  value={value.drinkWindowStart || ''}
                  onChange={(e) => onChange({ ...value, drinkWindowStart: e.target.value || undefined })}
                  placeholder="maintenant ou 2026"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
                  Jusqu'à
                </label>
                <input
                  type="text"
                  value={value.drinkWindowEnd || ''}
                  onChange={(e) => onChange({ ...value, drinkWindowEnd: e.target.value || undefined })}
                  placeholder="2029"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Service - Température */}
            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                Température de service (°C)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={value.servingTempMin || ''}
                    onChange={(e) => onChange({ 
                      ...value, 
                      servingTempMin: e.target.value ? Number(e.target.value) : undefined 
                    })}
                    placeholder="16"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max</label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={value.servingTempMax || ''}
                    onChange={(e) => onChange({ 
                      ...value, 
                      servingTempMax: e.target.value ? Number(e.target.value) : undefined 
                    })}
                    placeholder="17"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Service - Carafage */}
            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  Carafage (minutes)
                  <div className="relative group">
                    <Icons.HelpCircle size={14} className="text-gray-400" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Temps recommandé d'aération en carafe
                    </div>
                  </div>
                </span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                  <input
                    type="number"
                    min="0"
                    value={value.decantingMinutesMin || ''}
                    onChange={(e) => onChange({ 
                      ...value, 
                      decantingMinutesMin: e.target.value ? Number(e.target.value) : undefined 
                    })}
                    placeholder="30"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max</label>
                  <input
                    type="number"
                    min="0"
                    value={value.decantingMinutesMax || ''}
                    onChange={(e) => onChange({ 
                      ...value, 
                      decantingMinutesMax: e.target.value ? Number(e.target.value) : undefined 
                    })}
                    placeholder="60"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Accords */}
            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                Accords mets
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={pairingInput}
                  onChange={(e) => setPairingInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPairing();
                    }
                  }}
                  placeholder="Ex: viandes grillées"
                  className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                />
                <button
                  type="button"
                  onClick={handleAddPairing}
                  className="px-4 py-2.5 bg-wine-900 text-white rounded-lg hover:bg-wine-800 transition-colors text-sm text-airbnb-medium"
                >
                  Ajouter
                </button>
              </div>
              {value.pairings && value.pairings.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {value.pairings.map((pairing, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-wine-50 text-wine-900 rounded-full text-sm"
                    >
                      {pairing}
                      <button
                        type="button"
                        onClick={() => handleRemovePairing(index)}
                        className="hover:text-wine-700"
                      >
                        <Icons.X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Production approximative */}
            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
                Production approximative (bouteilles)
              </label>
              <input
                type="number"
                min="0"
                value={value.productionBottlesApprox || ''}
                onChange={(e) => onChange({ 
                  ...value, 
                  productionBottlesApprox: e.target.value ? Number(e.target.value) : undefined 
                })}
                placeholder="Ex: 4000"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
              />
            </div>

            {/* Autres allergènes (si non-vin) */}
            {!isWineCategory && (
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                  Autres allergènes
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Ex: gluten, lactose"
                    className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.currentTarget as HTMLInputElement;
                        handleAddOtherAllergen(input.value);
                        input.value = '';
                      }
                    }}
                  />
                </div>
                {value.allergens?.other && value.allergens.other.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {value.allergens.other.map((allergen, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-900 rounded-full text-sm"
                      >
                        {allergen}
                        <button
                          type="button"
                          onClick={() => handleRemoveOtherAllergen(index)}
                          className="hover:text-orange-700"
                        >
                          <Icons.X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
