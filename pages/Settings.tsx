import React, { useState } from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { User } from '../types';

interface SettingsProps {
  user: User;
  onBack?: () => void;
  onLogout?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onBack, onLogout }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
      {onBack && (
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <Icons.ArrowLeft size={18} />
          <span className="text-airbnb-medium">Retour</span>
        </button>
      )}

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-airbnb-extra-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-sm text-airbnb-light text-gray-500">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <div className="space-y-6">
        {/* Informations personnelles */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Informations personnelles</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Nom d'affichage</label>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="flex-1 p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <span className="text-xs text-gray-500 md:whitespace-nowrap">Modifiable dans "Modifier le profil"</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={user.firstName || 'Non renseigné'}
                  readOnly
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={user.lastName || 'Non renseigné'}
                  readOnly
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={user.email || 'Non renseigné'}
                  readOnly
                  className="flex-1 p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                {user.isVerified && (
                  <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                    <Icons.ShieldCheck size={12} />
                    Vérifié
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                value={user.phone || 'Non renseigné'}
                readOnly
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Lieu de résidence</label>
              <input
                type="text"
                value={user.location}
                readOnly
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Membre depuis</label>
              <input
                type="text"
                value={user.memberSince || 'Non renseigné'}
                readOnly
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Compte */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Compte</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm text-airbnb-medium text-gray-900">Type de compte</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {user.isPro ? 'Compte Professionnel' : 'Compte Particulier'}
                </p>
              </div>
              {user.isPro && (
                <span className="bg-wine-900 text-white text-xs px-2.5 py-0.5 rounded-full text-airbnb-bold uppercase">
                  PRO
                </span>
              )}
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm text-airbnb-medium text-gray-900">Vérification d'identité</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {user.isVerified ? 'Identité vérifiée' : 'Non vérifiée'}
                </p>
              </div>
              {user.isVerified ? (
                <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                  <Icons.ShieldCheck size={12} />
                  Vérifié
                </span>
              ) : (
                <Button size="sm" variant="outline">Vérifier</Button>
              )}
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm text-airbnb-medium text-gray-900">Mot de passe</h3>
                <p className="text-xs text-gray-500 mt-1">Dernière modification il y a 3 mois</p>
              </div>
              <Button size="sm" variant="outline">Modifier</Button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer py-2">
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Notifications email</span>
                <p className="text-xs text-gray-500 mt-1">Recevoir des emails pour les nouveaux messages</p>
              </div>
              <button
                type="button"
                className="relative inline-block w-10 h-6 rounded-full bg-wine-900 transition-colors duration-200"
              >
                <span className="absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 translate-x-4" />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer py-2">
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Notifications push</span>
                <p className="text-xs text-gray-500 mt-1">Recevoir des notifications sur votre appareil</p>
              </div>
              <button
                type="button"
                className="relative inline-block w-10 h-6 rounded-full bg-wine-900 transition-colors duration-200"
              >
                <span className="absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 translate-x-4" />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer py-2">
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Notifications de ventes</span>
                <p className="text-xs text-gray-500 mt-1">Être informé des ventes de vos annonces</p>
              </div>
              <button
                type="button"
                className="relative inline-block w-10 h-6 rounded-full bg-wine-900 transition-colors duration-200"
              >
                <span className="absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 translate-x-4" />
              </button>
            </label>
          </div>
        </div>

        {/* Confidentialité */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Confidentialité</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer py-2">
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Profil public</span>
                <p className="text-xs text-gray-500 mt-1">Votre profil est visible par tous</p>
              </div>
              <button
                type="button"
                className="relative inline-block w-10 h-6 rounded-full bg-wine-900 transition-colors duration-200"
              >
                <span className="absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 translate-x-4" />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer py-2">
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Statistiques publiques</span>
                <p className="text-xs text-gray-500 mt-1">Afficher vos statistiques de ventes</p>
              </div>
              <button
                type="button"
                className="relative inline-block w-10 h-6 rounded-full bg-gray-300 transition-colors duration-200"
              >
                <span className="absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 translate-x-0" />
              </button>
            </label>
          </div>
        </div>

        {/* Actions dangereuses */}
        <div className="bg-white rounded-2xl p-6 border border-red-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-red-900 mb-4">Zone de danger</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm text-airbnb-medium text-gray-900">Supprimer le compte</h3>
                <p className="text-xs text-red-600 mt-1">Cette action est irréversible</p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 hover:bg-red-50 border-red-200"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Supprimer
              </Button>
            </div>

            {showDeleteConfirm && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900 mb-3">
                  Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est définitive et toutes vos données seront perdues.
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      // Handle account deletion
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Confirmer la suppression
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Déconnexion */}
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            className="text-red-600 hover:bg-red-50 border-red-200"
            onClick={onLogout}
          >
            <Icons.Lock size={18} className="mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};
