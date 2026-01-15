import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Icons } from './Icon';

interface RemoveListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  productTitle?: string;
}

export const RemoveListingModal: React.FC<RemoveListingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productTitle
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [showSurvey, setShowSurvey] = useState(false);

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setShowSurvey(true);
  };

  const handleConfirm = () => {
    onConfirm(selectedReason);
    setSelectedReason('');
    setShowSurvey(false);
    onClose();
  };

  const handleClose = () => {
    setSelectedReason('');
    setShowSurvey(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Retirer cette annonce ?"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Annuler
          </Button>
          {showSurvey && (
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirm}
            >
              Retirer l'annonce
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          Êtes-vous sûr de vouloir retirer cette annonce{productTitle ? ` "${productTitle}"` : ''} ?
        </p>

        {!showSurvey ? (
          <div className="space-y-3">
            <p className="text-sm text-airbnb-medium text-gray-900">Pourquoi retirez-vous cette annonce ?</p>
            
            <button
              onClick={() => handleReasonSelect('sold')}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedReason === 'sold'
                  ? 'border-wine-900 bg-wine-50'
                  : 'border-gray-200 hover:border-wine-400 hover:bg-wine-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedReason === 'sold' ? 'border-wine-900 bg-wine-900' : 'border-gray-300'
                }`}>
                  {selectedReason === 'sold' && (
                    <Icons.Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-airbnb-medium text-gray-900">L'avez-vous déjà vendue ?</p>
                  <p className="text-xs text-gray-500 mt-0.5">Vous avez vendu cette bouteille en dehors de la plateforme</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleReasonSelect('experience')}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedReason === 'experience'
                  ? 'border-wine-900 bg-wine-50'
                  : 'border-gray-200 hover:border-wine-400 hover:bg-wine-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedReason === 'experience' ? 'border-wine-900 bg-wine-900' : 'border-gray-300'
                }`}>
                  {selectedReason === 'experience' && (
                    <Icons.Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-airbnb-medium text-gray-900">L'expérience ne vous a pas plu ?</p>
                  <p className="text-xs text-gray-500 mt-0.5">Vous souhaitez retirer votre annonce pour une autre raison</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-wine-50 border border-wine-200 rounded-lg p-4">
              <p className="text-sm text-wine-900">
                {selectedReason === 'sold' 
                  ? 'Merci pour votre retour. Nous sommes ravis que vous ayez trouvé un acheteur !'
                  : 'Nous sommes désolés que votre expérience ne vous ait pas convenu. Votre avis nous aiderait à améliorer la plateforme.'}
              </p>
            </div>

            {selectedReason === 'experience' && (
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                  Que pouvons-nous améliorer ? (optionnel)
                </label>
                <textarea
                  rows={3}
                  placeholder="Partagez votre avis..."
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none resize-none bg-white text-gray-900"
                />
              </div>
            )}

            {selectedReason === 'sold' && (
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                  Avez-vous vendu cette bouteille sur une autre plateforme ? (optionnel)
                </label>
                <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900">
                  <option value="">Sélectionner...</option>
                  <option value="leboncoin">Leboncoin</option>
                  <option value="facebook">Facebook Marketplace</option>
                  <option value="autre">Autre plateforme</option>
                  <option value="hors-ligne">Hors ligne (proche, ami, etc.)</option>
                </select>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600">
                💡 Cette action retirera définitivement votre annonce. Vous pourrez toujours créer une nouvelle annonce plus tard.
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
