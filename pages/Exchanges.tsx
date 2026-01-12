import React from 'react';
import { Icons } from '../components/Icon';

interface ExchangesProps {
  onBack: () => void;
}

export const Exchanges: React.FC<ExchangesProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <Icons.ArrowLeft size={18} />
        <span className="text-airbnb-medium">Retour</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Icons.ArrowLeftRight size={32} className="text-wine-900" />
          <h1 className="text-2xl md:text-3xl text-airbnb-extra-bold text-gray-900">Échanges en cours</h1>
        </div>
        <p className="text-sm text-airbnb-light text-gray-500">
          Gérez vos échanges de bouteilles en cours
        </p>
      </div>

      {/* Content */}
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
  );
};
