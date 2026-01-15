import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { User } from '../types';

interface SettingsProps {
  user: User;
  onBack?: () => void;
  onLogout?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onBack, onLogout }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // États pour les notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [salesNotifications, setSalesNotifications] = useState(true);
  
  // États pour la confidentialité
  const [publicProfile, setPublicProfile] = useState(true);
  const [publicStats, setPublicStats] = useState(false);
  
  // États pour le changement de mot de passe
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const handlePasswordChange = () => {
    setPasswordError('');
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Tous les champs sont requis');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    // Ici, on ferait l'appel API pour changer le mot de passe
    console.log('Changement de mot de passe...');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // Afficher un message de succès (à implémenter)
  };
  
  const handleDeleteAccount = () => {
    // Ici, on ferait l'appel API pour supprimer le compte
    console.log('Suppression du compte...');
    setShowDeleteConfirm(false);
  };
  
  const handleLogout = () => {
    setShowLogoutConfirm(false);
    if (onLogout) {
      onLogout();
    }
  };

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
              <p className="text-sm text-gray-900 py-2">{user.name}</p>
              <p className="text-xs text-gray-500 mt-1">Modifiable dans "Modifier le profil"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Prénom</label>
                <p className="text-sm text-gray-900 py-2">{user.firstName || 'Non renseigné'}</p>
              </div>
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Nom</label>
                <p className="text-sm text-gray-900 py-2">{user.lastName || 'Non renseigné'}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center gap-2 py-2">
                <p className="text-sm text-gray-900">{user.email || 'Non renseigné'}</p>
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
              <p className="text-sm text-gray-900 py-2">{user.phone || 'Non renseigné'}</p>
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Lieu de résidence</label>
              <p className="text-sm text-gray-900 py-2">{user.location}</p>
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Membre depuis</label>
              <p className="text-sm text-gray-900 py-2">{user.memberSince || 'Non renseigné'}</p>
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
              <Button size="sm" variant="outline" onClick={() => setShowPasswordModal(true)}>Modifier</Button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer py-2" onClick={() => setEmailNotifications(!emailNotifications)}>
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Notifications email</span>
                <p className="text-xs text-gray-500 mt-1">Recevoir des emails pour les nouveaux messages</p>
              </div>
              <button
                type="button"
                className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
                  emailNotifications ? 'bg-wine-900' : 'bg-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setEmailNotifications(!emailNotifications);
                }}
              >
                <span className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  emailNotifications ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer py-2" onClick={() => setPushNotifications(!pushNotifications)}>
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Notifications push</span>
                <p className="text-xs text-gray-500 mt-1">Recevoir des notifications sur votre appareil</p>
              </div>
              <button
                type="button"
                className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
                  pushNotifications ? 'bg-wine-900' : 'bg-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPushNotifications(!pushNotifications);
                }}
              >
                <span className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  pushNotifications ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer py-2" onClick={() => setSalesNotifications(!salesNotifications)}>
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Notifications de ventes</span>
                <p className="text-xs text-gray-500 mt-1">Être informé des ventes de vos annonces</p>
              </div>
              <button
                type="button"
                className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
                  salesNotifications ? 'bg-wine-900' : 'bg-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSalesNotifications(!salesNotifications);
                }}
              >
                <span className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  salesNotifications ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </label>
          </div>
        </div>

        {/* Confidentialité */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Confidentialité</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer py-2" onClick={() => setPublicProfile(!publicProfile)}>
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Profil public</span>
                <p className="text-xs text-gray-500 mt-1">Votre profil est visible par tous</p>
              </div>
              <button
                type="button"
                className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
                  publicProfile ? 'bg-wine-900' : 'bg-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPublicProfile(!publicProfile);
                }}
              >
                <span className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  publicProfile ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer py-2" onClick={() => setPublicStats(!publicStats)}>
              <div>
                <span className="text-sm text-airbnb-medium text-gray-900">Statistiques publiques</span>
                <p className="text-xs text-gray-500 mt-1">Afficher vos statistiques de ventes</p>
              </div>
              <button
                type="button"
                className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
                  publicStats ? 'bg-wine-900' : 'bg-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPublicStats(!publicStats);
                }}
              >
                <span className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  publicStats ? 'translate-x-4' : 'translate-x-0'
                }`} />
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

          </div>
        </div>

        {/* Déconnexion */}
        <div className="flex justify-center pt-4 pb-8 md:pb-0">
          <Button 
            variant="outline" 
            className="text-red-600 hover:bg-red-50 border-red-200"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <Icons.Lock size={18} className="mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Supprimer le compte"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Annuler
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteAccount}
            >
              Confirmer la suppression
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-700 mb-4">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est définitive et toutes vos données seront perdues.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-900">
            ⚠️ Cette action ne peut pas être annulée. Toutes vos annonces, messages et données seront définitivement supprimés.
          </p>
        </div>
      </Modal>

      {/* Modal de confirmation de déconnexion */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Se déconnecter"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowLogoutConfirm(false)}
            >
              Annuler
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-700">
          Êtes-vous sûr de vouloir vous déconnecter ?
        </p>
      </Modal>

      {/* Modal de modification du mot de passe */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setPasswordError('');
        }}
        title="Modifier le mot de passe"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordModal(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setPasswordError('');
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handlePasswordChange}
            >
              Enregistrer
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-wine-900 outline-none"
              placeholder="Entrez votre mot de passe actuel"
            />
          </div>
          
          <div>
            <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-wine-900 outline-none"
              placeholder="Au moins 8 caractères"
            />
          </div>
          
          <div>
            <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-wine-900 outline-none"
              placeholder="Confirmez votre nouveau mot de passe"
            />
          </div>
          
          {passwordError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-900">{passwordError}</p>
            </div>
          )}
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              💡 Votre mot de passe doit contenir au moins 8 caractères et être différent de votre mot de passe actuel.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
