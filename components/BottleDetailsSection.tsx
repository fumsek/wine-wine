import React, { useState } from 'react';
import { Icons } from './Icon';
import { Product } from '../types';

interface BottleDetailsSectionProps {
  product: Product;
  // Champs déjà affichés ailleurs pour éviter les doublons
  alreadyDisplayed?: {
    distillery?: boolean;
    vintage?: boolean;
    volume?: boolean;
    abv?: boolean;
    condition?: boolean;
    price?: boolean;
  };
}

export const BottleDetailsSection: React.FC<BottleDetailsSectionProps> = ({ 
  product,
  alreadyDisplayed = {}
}) => {
  const details = product.bottleDetails;
  if (!details) return null;

  // Vérifier si on a des données à afficher
  const hasTastingNotes = details.tastingNotes;
  const hasServiceData = 
    details.drinkWindowStart || 
    details.drinkWindowEnd || 
    details.servingTempMin || 
    details.servingTempMax || 
    details.decantingMinutesMin || 
    details.decantingMinutesMax;
  const hasPairings = details.pairings && details.pairings.length > 0;
  const hasProduction = details.productionBottlesApprox;

  // Initialiser les accordéons ouverts par défaut selon les données disponibles
  const getDefaultExpandedAccordions = () => {
    const defaultSet = new Set<string>();
    if (hasTastingNotes) defaultSet.add('tasting');
    if (hasServiceData) defaultSet.add('service');
    if (hasPairings) defaultSet.add('pairings');
    if (hasProduction) defaultSet.add('production');
    return defaultSet;
  };

  const [expandedAccordions, setExpandedAccordions] = useState<Set<string>>(getDefaultExpandedAccordions());

  const toggleAccordion = (key: string) => {
    const newSet = new Set(expandedAccordions);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExpandedAccordions(newSet);
  };

  // Vérifier si on a des données à afficher
  const hasEssentialData = 
    details.grapes || 
    details.region || 
    details.classification || 
    details.allergens?.sulfites !== undefined ||
    details.taxDisplay;

  if (!hasEssentialData && !hasTastingNotes && !hasServiceData && !hasPairings && !hasProduction) {
    return null;
  }

  // Format grapes
  const formatGrapes = (grapes: string | string[] | undefined) => {
    if (!grapes) return null;
    if (Array.isArray(grapes)) {
      return grapes.join(', ');
    }
    return grapes;
  };

  // Format drink window
  const formatDrinkWindow = () => {
    const start = details.drinkWindowStart;
    const end = details.drinkWindowEnd;
    if (!start && !end) return null;
    if (start && end) {
      return `${start} → ${end}`;
    }
    return start || end || null;
  };

  // Format temperature
  const formatTemperature = () => {
    const min = details.servingTempMin;
    const max = details.servingTempMax;
    if (!min && !max) return null;
    if (min && max) {
      return `${min}–${max}°C`;
    }
    return min ? `${min}°C` : `${max}°C`;
  };

  // Format decanting
  const formatDecanting = () => {
    const min = details.decantingMinutesMin;
    const max = details.decantingMinutesMax;
    if (!min && !max) return null;
    if (min && max) {
      return `${min}–${max} min`;
    }
    return min ? `${min} min` : `${max} min`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg text-airbnb-bold text-gray-900 mb-4">Fiche bouteille</h3>

      {/* Essentiel - Grille */}
      {hasEssentialData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {formatGrapes(details.grapes) && (
            <div>
              <dt className="text-xs text-airbnb-light text-gray-500 uppercase tracking-wider mb-1">Cépage(s)</dt>
              <dd className="text-sm text-airbnb-medium text-gray-900">{formatGrapes(details.grapes)}</dd>
            </div>
          )}
          
          {details.region && (
            <div>
              <dt className="text-xs text-airbnb-light text-gray-500 uppercase tracking-wider mb-1">Région</dt>
              <dd className="text-sm text-airbnb-medium text-gray-900">{details.region}</dd>
            </div>
          )}
          
          {details.classification && (
            <div>
              <dt className="text-xs text-airbnb-light text-gray-500 uppercase tracking-wider mb-1">Classification</dt>
              <dd className="text-sm text-airbnb-medium text-gray-900">{details.classification}</dd>
            </div>
          )}
          
          {details.allergens?.sulfites !== undefined && (
            <div>
              <dt className="text-xs text-airbnb-light text-gray-500 uppercase tracking-wider mb-1">Sulfites</dt>
              <dd className="text-sm text-airbnb-medium text-gray-900">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                  details.allergens.sulfites 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {details.allergens.sulfites ? 'Contient des sulfites' : 'Sans sulfites'}
                </span>
              </dd>
            </div>
          )}
          
          {details.taxDisplay && (
            <div>
              <dt className="text-xs text-airbnb-light text-gray-500 uppercase tracking-wider mb-1">Prix</dt>
              <dd className="text-sm text-airbnb-medium text-gray-900">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                  {details.taxDisplay}
                </span>
              </dd>
            </div>
          )}

          {details.allergens?.other && details.allergens.other.length > 0 && (
            <div>
              <dt className="text-xs text-airbnb-light text-gray-500 uppercase tracking-wider mb-1">Autres allergènes</dt>
              <dd className="text-sm text-airbnb-medium text-gray-900">
                <div className="flex flex-wrap gap-1">
                  {details.allergens.other.map((allergen, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-800">
                      {allergen}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          )}
        </div>
      )}

      {/* Accordéons */}
      <div className="space-y-2">
        {/* Dégustation */}
        {hasTastingNotes && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('tasting')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-airbnb-bold text-gray-900">Dégustation</span>
              <Icons.ChevronDown 
                size={18} 
                className={`text-gray-400 transition-transform ${
                  expandedAccordions.has('tasting') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedAccordions.has('tasting') && (
              <div className="px-4 pb-4 text-sm text-airbnb text-gray-700 leading-relaxed">
                {details.tastingNotes}
              </div>
            )}
          </div>
        )}

        {/* Service & Garde */}
        {hasServiceData && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('service')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-airbnb-bold text-gray-900">Service & Garde</span>
              <Icons.ChevronDown 
                size={18} 
                className={`text-gray-400 transition-transform ${
                  expandedAccordions.has('service') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedAccordions.has('service') && (
              <div className="px-4 pb-4 space-y-3">
                {formatDrinkWindow() && (
                  <div>
                    <dt className="text-xs text-airbnb-light text-gray-500 mb-1">Fenêtre de consommation</dt>
                    <dd className="text-sm text-airbnb-medium text-gray-900">{formatDrinkWindow()}</dd>
                  </div>
                )}
                {formatTemperature() && (
                  <div>
                    <dt className="text-xs text-airbnb-light text-gray-500 mb-1">Température de service</dt>
                    <dd className="text-sm text-airbnb-medium text-gray-900">{formatTemperature()}</dd>
                  </div>
                )}
                {formatDecanting() && (
                  <div>
                    <dt className="text-xs text-airbnb-light text-gray-500 mb-1">Carafage recommandé</dt>
                    <dd className="text-sm text-airbnb-medium text-gray-900">{formatDecanting()}</dd>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Accords */}
        {hasPairings && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('pairings')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-airbnb-bold text-gray-900">Accords</span>
              <Icons.ChevronDown 
                size={18} 
                className={`text-gray-400 transition-transform ${
                  expandedAccordions.has('pairings') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedAccordions.has('pairings') && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {details.pairings!.map((pairing, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 bg-wine-50 text-wine-900 rounded-full text-sm text-airbnb-medium"
                    >
                      <Icons.Utensils size={12} className="mr-1.5" />
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rareté & Production */}
        {hasProduction && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('production')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-airbnb-bold text-gray-900">Rareté & Production</span>
              <Icons.ChevronDown 
                size={18} 
                className={`text-gray-400 transition-transform ${
                  expandedAccordions.has('production') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedAccordions.has('production') && (
              <div className="px-4 pb-4">
                <div>
                  <dt className="text-xs text-airbnb-light text-gray-500 mb-1">Production approximative</dt>
                  <dd className="text-sm text-airbnb-medium text-gray-900">
                    {details.productionBottlesApprox?.toLocaleString('fr-FR')} bouteilles
                  </dd>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
