import React, { useState, useEffect } from 'react';
import { MOCK_CONVERSATIONS, MOCK_USER_COLLECTOR } from '../constants';
import { Icons } from '../components/Icon';
import { Conversation } from '../types';

interface MessagesProps {
  activeTab?: string;
}

interface Message {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: string;
}

export const Messages: React.FC<MessagesProps> = ({ activeTab }) => {
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Bonjour ! Je suis intéressé par votre Macallan. Est-ce que le prix est négociable si je prends aussi le Chartreuse ?', isSent: false, timestamp: '10:45' },
    { id: '2', text: 'Bonjour. Oui, je peux faire un geste pour le lot. Je vous propose 600€ pour les deux.', isSent: true, timestamp: '10:46' },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const prevActiveTabRef = React.useRef<string | undefined>(activeTab);
  
  // Reset to list when Messages tab is clicked from navbar while already on messages
  useEffect(() => {
    // Only reset if we're coming back to messages tab from messages tab (double click on navbar)
    if (activeTab === 'messages' && prevActiveTabRef.current === 'messages' && selectedConvId !== null) {
      // Small delay to ensure the toggle in Header has completed
      const timer = setTimeout(() => {
        setSelectedConvId(null);
      }, 50);
      return () => clearTimeout(timer);
    }
    prevActiveTabRef.current = activeTab;
  }, [activeTab]); // Remove selectedConvId from dependencies to avoid interference
  
  const selectedConv = MOCK_CONVERSATIONS.find(c => c.id === selectedConvId);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput.trim(),
        isSent: true,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const handleSendOffer = () => {
    if (offerPrice.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: `Nouvelle offre : ${offerPrice}€`,
        isSent: true,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setOfferPrice('');
      setShowOfferForm(false);
    }
  };

  return (
    <div className="w-full bg-white fixed inset-0 top-16 bottom-16 md:top-20 md:bottom-0" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto h-full flex bg-white md:my-4 md:rounded-2xl md:shadow-sm md:border md:border-gray-200 overflow-hidden">
      
      {/* Sidebar List */}
      <div className={`w-full md:w-80 flex-shrink-0 border-r border-gray-200 flex flex-col ${selectedConvId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100">
            <h2 
              className="text-xl text-airbnb-bold text-gray-900 cursor-pointer hover:text-wine-900 transition-colors"
              onClick={() => setSelectedConvId(null)}
            >
              Messages
            </h2>
        </div>
        <div className="overflow-y-auto flex-1">
            {MOCK_CONVERSATIONS.map(conv => (
                <div 
                    key={conv.id} 
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConvId === conv.id ? 'bg-wine-50' : ''}`}
                >
                    <img src={conv.otherUser.avatar} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-airbnb-bold text-gray-900 truncate">{conv.otherUser.name}</h3>
                                {conv.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>}
                            </div>
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
      <div className={`flex-1 flex flex-col bg-white ${!selectedConvId ? 'hidden md:flex' : 'flex'}`}>
        {selectedConv ? (
            <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden text-gray-500" onClick={() => setSelectedConvId(null)}>
                            <Icons.ArrowLeft size={24} />
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
                    {messages.map((message) => (
                      message.isSent ? (
                        <div key={message.id} className="flex gap-3 justify-end">
                          <div className="bg-wine-900 text-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-[75%]">
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div key={message.id} className="flex gap-3">
                          <img src={selectedConv.otherUser.avatar} className="w-8 h-8 rounded-full self-end" />
                          <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm max-w-[75%] border border-gray-100">
                            <p className="text-sm text-gray-800">{message.text}</p>
                          </div>
                        </div>
                      )
                    ))}
                </div>

                {/* Action Bar */}
                <div className="p-3 bg-white border-t border-gray-200 pb-11 md:pb-15 flex-shrink-0">
                    {showOfferForm ? (
                      <div className="flex gap-2 items-center">
                        <input 
                          type="number" 
                          placeholder="Prix en €" 
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wine-900"
                          style={{ fontSize: '16px' }}
                        />
                        <button 
                          onClick={handleSendOffer}
                          className="px-4 py-2 bg-wine-900 text-white rounded-full text-sm text-airbnb-medium hover:bg-wine-800 transition-colors"
                        >
                          OK
                        </button>
                        <button 
                          onClick={() => {
                            setShowOfferForm(false);
                            setOfferPrice('');
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Icons.X size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                          <button 
                            onClick={() => setShowOfferForm(true)}
                            className="flex-shrink-0 px-3 py-1.5 bg-gray-50 text-gray-700 text-xs text-airbnb-medium rounded-full border border-gray-200 hover:bg-gray-100"
                          >
                            Faire une offre
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-gray-600">
                            <Icons.Image size={20} />
                          </button>
                          <input 
                            type="text" 
                            placeholder="Écrivez votre message..." 
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSendMessage();
                              }
                            }}
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wine-900"
                            style={{ fontSize: '16px' }}
                          />
                          <button 
                            onClick={handleSendMessage}
                            className="p-1.5 text-wine-900 hover:bg-wine-50 rounded-full"
                          >
                            <Icons.Send size={20} />
                          </button>
                        </div>
                      </>
                    )}
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
    </div>
  );
};