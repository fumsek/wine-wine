import React, { useState } from 'react';
import { MOCK_CONVERSATIONS, MOCK_USER_COLLECTOR } from '../constants';
import { Icons } from '../components/Icon';
import { Conversation } from '../types';

export const Messages = () => {
  const [selectedConvId, setSelectedConvId] = useState<string | null>(MOCK_CONVERSATIONS[0].id);
  
  const selectedConv = MOCK_CONVERSATIONS.find(c => c.id === selectedConvId);

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-4rem-6rem)] md:h-[calc(100vh-5rem)] flex bg-white md:my-4 md:rounded-2xl md:shadow-sm md:border md:border-gray-200 overflow-hidden">
      
      {/* Sidebar List */}
      <div className={`w-full md:w-80 flex-shrink-0 border-r border-gray-200 flex flex-col ${selectedConvId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100">
            <h2 className="text-xl text-airbnb-bold text-gray-900">Messages</h2>
        </div>
        <div className="overflow-y-auto flex-1">
            {MOCK_CONVERSATIONS.map(conv => (
                <div 
                    key={conv.id} 
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConvId === conv.id ? 'bg-wine-50' : ''}`}
                >
                    <div className="relative">
                        <img src={conv.otherUser.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                        {conv.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-airbnb-bold text-gray-900 truncate">{conv.otherUser.name}</h3>
                            <span className="text-xs text-gray-500">{conv.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate flex items-center gap-1">
                            <Icons.Package size={12} className="text-gray-400" />
                            {conv.product.title}
                        </p>
                        <p className={`text-sm mt-1 truncate ${conv.unreadCount > 0 ? 'text-airbnb-bold text-gray-900' : 'text-gray-500'}`}>
                            {conv.lastMessage}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedConvId ? 'hidden md:flex' : 'flex'}`}>
        {selectedConv ? (
            <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden text-gray-500" onClick={() => setSelectedConvId(null)}>
                            <Icons.X size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                             <img src={selectedConv.otherUser.avatar} className="w-8 h-8 rounded-full" />
                             <div>
                                 <h3 className="text-airbnb-bold text-gray-900 flex items-center gap-1">
                                    {selectedConv.otherUser.name}
                                    {selectedConv.otherUser.isVerified && <Icons.ShieldCheck size={14} className="text-green-600" />}
                                 </h3>
                                 <span className="text-xs text-gray-500">Répond généralement en 1h</span>
                             </div>
                        </div>
                    </div>
                    {/* Product Context */}
                    <div className="hidden sm:flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <img src={selectedConv.product.images[0]} className="w-8 h-8 rounded object-cover" />
                        <div className="text-xs">
                             <div className="text-airbnb-medium text-gray-900 max-w-[150px] truncate">{selectedConv.product.title}</div>
                             <div className="text-wine-900 text-airbnb-bold">{selectedConv.product.price} {selectedConv.product.currency}</div>
                        </div>
                    </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    <div className="flex justify-center">
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Aujourd'hui, 10:45</span>
                    </div>
                    {/* Received */}
                    <div className="flex gap-3">
                         <img src={selectedConv.otherUser.avatar} className="w-8 h-8 rounded-full self-end" />
                         <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm max-w-[75%] border border-gray-100">
                             <p className="text-sm text-gray-800">Bonjour ! Je suis intéressé par votre Macallan. Est-ce que le prix est négociable si je prends aussi le Chartreuse ?</p>
                         </div>
                    </div>
                    {/* Sent */}
                    <div className="flex gap-3 justify-end">
                         <div className="bg-wine-900 text-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-[75%]">
                             <p className="text-sm">Bonjour. Oui, je peux faire un geste pour le lot. Je vous propose 600€ pour les deux.</p>
                         </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="p-3 bg-white border-t border-gray-200">
                    <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                         <button className="flex-shrink-0 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs text-airbnb-medium rounded-full border border-amber-200 hover:bg-amber-100">
                            Proposer un échange
                         </button>
                         <button className="flex-shrink-0 px-3 py-1.5 bg-gray-50 text-gray-700 text-xs text-airbnb-medium rounded-full border border-gray-200 hover:bg-gray-100">
                            Faire une offre
                         </button>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Icons.Image size={24} />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Écrivez votre message..." 
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wine-900"
                        />
                        <button className="p-2 text-wine-900 hover:bg-wine-50 rounded-full">
                            <Icons.Send size={24} />
                        </button>
                    </div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <Icons.MessageCircle size={48} className="mb-4 opacity-20" />
                <p>Sélectionnez une conversation</p>
            </div>
        )}
      </div>
    </div>
  );
};