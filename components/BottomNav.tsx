import React, { useState } from 'react';
import { Icons } from './Icon';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);
  
  const tabs = [
    { id: 'home', icon: Icons.Home, label: 'Accueil' },
    { id: 'explore', icon: Icons.Compass, label: 'Explorer' },
    { id: 'sell', icon: Icons.Plus, label: 'Vendre', isPrimary: true },
    { id: 'messages', icon: Icons.MessageCircle, label: 'Messages' },
    { id: 'profile', icon: Icons.User, label: 'Compte' },
  ];

  const handleTabClick = (tabId: string) => {
    setAnimatingTab(tabId);
    setActiveTab(tabId);
    setTimeout(() => {
      setAnimatingTab(null);
    }, 1000);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-end h-16 pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          if (tab.isPrimary) {
            return (
              <button 
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative -top-5 flex flex-col items-center justify-center group"
              >
                <div className={`w-12 h-12 bg-wine-900/90 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg shadow-wine-900/30 group-hover:scale-105 transition-transform smooth-rotate-on-click ${animatingTab === tab.id ? 'animate' : ''}`}>
                  <Icon size={20} strokeWidth={2.5} className="animate-rotate-plus-repeat" />
                </div>
                <span className="text-[10px] text-airbnb-medium text-gray-600 mt-1">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors smooth-rotate-on-click ${animatingTab === tab.id ? 'animate' : ''} ${isActive ? 'text-wine-900' : 'text-gray-400'}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] text-airbnb-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};