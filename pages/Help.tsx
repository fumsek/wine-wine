import React from 'react';
import { Icons } from '../components/Icon';

interface HelpProps {
  onBack: () => void;
}

export const Help: React.FC<HelpProps> = ({ onBack }) => {
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
          <Icons.HelpCircle size={32} className="text-wine-900" />
          <h1 className="text-2xl md:text-3xl text-airbnb-extra-bold text-gray-900">Aide</h1>
        </div>
        <p className="text-sm text-airbnb-light text-gray-500">
          Trouvez des réponses à vos questions
        </p>
      </div>

      {/* Content */}
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
  );
};
