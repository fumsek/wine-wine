import React from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Breadcrumb / Back */}
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-wine-900 mb-4 transition-colors">
        <Icons.ArrowLeft className="mr-2" size={16} />
        Retour
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Images */}
        <div className="md:col-span-7 space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm relative">
             <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
             
             {/* Glassmorphism Badges on Main Image */}
             <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                 {product.isRare && (
                     <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs text-airbnb-bold tracking-wide bg-white/80 backdrop-blur-md text-gray-900 border border-white/50 shadow-sm">
                         <Icons.Star size={12} className="mr-1.5 text-amber-500" fill="currentColor" />
                         Rare
                     </div>
                 )}
                 {product.isTradeable && (
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs text-airbnb-bold tracking-wide bg-white/80 backdrop-blur-md text-gray-900 border border-white/50 shadow-sm">
                        <Icons.ArrowLeftRight size={12} className="mr-1.5 text-blue-500" />
                        Échange possible
                    </div>
                 )}
             </div>

          </div>
          <div className="grid grid-cols-4 gap-2">
             {/* Thumbnails */}
             {[...product.images, ...product.images, ...product.images].slice(0, 4).map((img, idx) => (
                 <div key={idx} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${idx === 0 ? 'border-wine-900' : 'border-transparent'}`}>
                     <img src={img} alt="" className="w-full h-full object-cover" />
                 </div>
             ))}
          </div>
          
          {/* Description Mobile - Show here on mobile, but keeping structure simple for mockup */}
          <div className="hidden md:block mt-8">
              <h3 className="text-lg text-airbnb-bold text-gray-900 mb-2">Description</h3>
              <p className="text-airbnb text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>

           {/* Specs */}
           <div className="bg-gray-50 rounded-xl p-6 mt-6">
                <h3 className="text-sm text-airbnb-bold text-gray-900 uppercase tracking-wider mb-4">Caractéristiques</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                    <div>
                        <dt className="text-airbnb-light text-gray-500">Origine</dt>
                        <dd className="text-airbnb-medium text-gray-900">{product.specs.origin}</dd>
                    </div>
                    {product.specs.distillery && (
                        <div>
                            <dt className="text-airbnb-light text-gray-500">Distillerie / Domaine</dt>
                            <dd className="text-airbnb-medium text-gray-900">{product.specs.distillery}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-airbnb-light text-gray-500">Volume</dt>
                        <dd className="text-airbnb-medium text-gray-900">{product.volume}</dd>
                    </div>
                    <div>
                        <dt className="text-airbnb-light text-gray-500">État</dt>
                        <dd className="text-airbnb-medium text-gray-900">{product.condition}</dd>
                    </div>
                    {product.specs.vintage && (
                        <div>
                            <dt className="text-airbnb-light text-gray-500">Millésime</dt>
                            <dd className="text-airbnb-medium text-gray-900">{product.specs.vintage}</dd>
                        </div>
                    )}
                </dl>
           </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="md:col-span-5 space-y-6">
            {/* Header Info */}
            <div>
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl text-airbnb-extra-bold text-gray-900">{product.title}</h1>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <Icons.Share2 size={20} />
                    </button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <span className="capitalize">{product.category}</span>
                    <span>•</span>
                    <span>{product.postedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Icons.MapPin size={14} /> {product.location}</span>
                </div>
            </div>

            {/* Price Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl text-airbnb-extra-bold text-gray-900">{product.price} {product.currency}</span>
                </div>

                <div className="space-y-3">
                    <Button fullWidth size="lg">Acheter maintenant</Button>
                    
                    {product.isTradeable && (
                        <Button fullWidth variant="secondary" size="lg" className="flex items-center gap-2">
                            <Icons.ArrowLeftRight size={18} />
                            Proposer un échange
                        </Button>
                    )}
                    
                    <Button fullWidth variant="outline">Contacter le vendeur</Button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Icons.ShieldCheck size={14} className="text-green-600" />
                        Paiement sécurisé via Wine Wine
                    </p>
                </div>
            </div>

            {/* Seller Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={product.seller.avatar} alt={product.seller.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="flex items-center gap-1">
                            <h3 className="text-airbnb-medium text-gray-900">{product.seller.name}</h3>
                            {product.seller.isVerified && <Icons.ShieldCheck size={14} className="text-green-600" />}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 gap-2">
                             <span className="flex items-center text-amber-500 text-airbnb-medium">
                                 <Icons.Star size={12} fill="currentColor" className="mr-0.5"/> 
                                 {product.seller.rating} ({product.seller.reviewCount})
                             </span>
                             {product.seller.isPro && <span className="text-wine-900 bg-wine-50 px-2 py-0.5 rounded-full text-[10px] text-airbnb-bold border border-wine-100">PRO</span>}
                        </div>
                    </div>
                </div>
                <Icons.ChevronDown className="-rotate-90 text-gray-400" size={20} />
            </div>

            {/* Safety Block */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex gap-3">
                    <Icons.ShieldCheck className="text-blue-600 flex-shrink-0" size={24} />
                    <div>
                        <h4 className="text-sm text-airbnb-bold text-blue-900">Authenticité garantie</h4>
                        <p className="text-xs text-airbnb-light text-blue-800 mt-1">
                            Pour les bouteilles de plus de 500€, demandez notre service de vérification optionnel avant l'envoi.
                        </p>
                        <button className="text-xs text-airbnb-medium text-blue-700 underline mt-2">En savoir plus</button>
                    </div>
                </div>
            </div>

            {/* Mobile description fallback */}
            <div className="md:hidden mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
        </div>
      </div>
    </div>
  );
};