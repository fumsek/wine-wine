import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { User } from '../types';

interface EditProfileProps {
  user: User;
  onBack?: () => void;
  onSave?: (updatedUser: Partial<User>) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user, onBack, onSave }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [name, setName] = useState(user.name);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio || '');
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(user.coverPhoto || '');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        name,
        firstName,
        lastName,
        email,
        phone,
        location,
        bio,
        avatar: avatarPreview,
        coverPhoto: coverPhotoPreview
      });
    }
    if (onBack) {
      onBack();
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
        <h1 className="text-2xl md:text-3xl text-airbnb-extra-bold text-gray-900 mb-2">Modifier le profil</h1>
        <p className="text-sm text-airbnb-light text-gray-500">
          Mettez à jour vos informations personnelles et votre présentation
        </p>
      </div>

      <div className="space-y-6">
        {/* Photo de couverture (pour pros/caves) */}
        {user.isPro && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Photo de couverture</h2>
            <div className="relative">
              {coverPhotoPreview ? (
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={coverPhotoPreview} 
                    alt="Photo de couverture" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setCoverPhotoPreview('')}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Icons.X size={18} className="text-gray-700" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 md:h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-wine-500 transition-colors bg-gray-50">
                  <Icons.Camera size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-airbnb-medium text-gray-600">Ajouter une photo de couverture</span>
                  <span className="text-xs text-gray-500 mt-1">Recommandé : 1920x640px</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {coverPhotoPreview && (
              <div className="mt-4">
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                  Remplacer la photo de couverture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900"
                />
              </div>
            )}
          </div>
        )}

        {/* Photo de profil */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Photo de profil</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={avatarPreview} 
                alt="Avatar" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              {user.isVerified && (
                <img src="/verified_7641727.png" alt="Vérifié" className="absolute bottom-1 right-1 w-5 h-5 md:w-6 md:h-6" />
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-2">
                Changer la photo de profil
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none bg-white text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Format recommandé : carré, minimum 400x400px</p>
            </div>
          </div>
        </div>

        {/* Informations de base */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">Informations de base</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">
                {user.isPro ? 'Nom de la cave / entreprise' : 'Nom d\'affichage'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user.isPro ? "Ex: La Cave des Chartrons" : "Ex: Jean Dupont"}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Dupont"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean.dupont@example.com"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
              />
              {user.isVerified && (
                <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                  <Icons.ShieldCheck size={12} />
                  Email vérifié
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm text-airbnb-medium text-gray-700 mb-1">Lieu de résidence</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bordeaux, FR"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 focus:border-transparent outline-none bg-white text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg text-airbnb-bold text-gray-900 mb-4">
            {user.isPro ? 'Description de votre cave / entreprise' : 'À propos de vous'}
          </h2>
          <textarea
            rows={6}
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setBio(e.target.value);
              }
            }}
            placeholder={user.isPro 
              ? "Décrivez votre cave, votre histoire, vos spécialités, vos valeurs..." 
              : "Parlez-nous de vous, de votre passion pour les spiritueux, de votre collection..."}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-900 outline-none resize-none bg-white text-gray-900"
          />
          <p className={`text-xs mt-2 ${bio.length >= 500 ? 'text-red-600' : 'text-gray-500'}`}>
            {bio.length}/500 caractères
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 pb-8 md:pb-0">
          <Button variant="outline" onClick={onBack}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};
