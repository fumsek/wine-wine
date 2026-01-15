import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from './Icon';
import { BottleSearchResult, PriceSeriesPoint, TrendingBottle, BottleCanonical } from '../types';
import { searchBottles, getBottlePriceSeries, getTrendingBottles, getBottleById } from '../services/argusService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ArgusHomepageSectionProps {
  onNavigateToArgus?: () => void;
  onBottleSelect?: (bottleId: string) => void;
}

export const ArgusHomepageSection: React.FC<ArgusHomepageSectionProps> = ({ 
  onNavigateToArgus,
  onBottleSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BottleSearchResult[]>([]);
  const [selectedBottleId, setSelectedBottleId] = useState<string | null>(null);
  const [selectedBottle, setSelectedBottle] = useState<BottleCanonical | null>(null);
  const [priceSeries, setPriceSeries] = useState<PriceSeriesPoint[]>([]);
  const [trendingBottles, setTrendingBottles] = useState<TrendingBottle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Load default bottle and trending bottles on mount
  useEffect(() => {
    const loadData = async () => {
      const trending = await getTrendingBottles(12);
      setTrendingBottles(trending);
      // Set first trending as default if none selected
      if (trending.length > 0) {
        setSelectedBottleId(prev => prev || trending[0].bottleId);
      }
    };
    loadData();
  }, []);

  // Load bottle details and price series when bottle is selected
  useEffect(() => {
    if (!selectedBottleId) {
      setSelectedBottle(null);
      setPriceSeries([]);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [bottle, series] = await Promise.all([
          getBottleById(selectedBottleId),
          getBottlePriceSeries(selectedBottleId, '1y', 'month')
        ]);
        setSelectedBottle(bottle);
        setPriceSeries(series);
      } catch (error) {
        console.error('Error loading bottle data:', error);
        setSelectedBottle(null);
        setPriceSeries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedBottleId]);

  // Search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const results = await searchBottles(searchQuery);
      setSearchResults(results);
      setShowSearchResults(true);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleBottleSelect = (bottleId: string) => {
    setSelectedBottleId(bottleId);
    setSearchQuery('');
    setShowSearchResults(false);
    onBottleSelect?.(bottleId);
  };

  const handleTrendingClick = (bottleId: string) => {
    setSelectedBottleId(bottleId);
  };

  // Format chart data
  const chartData = useMemo(() => {
    return priceSeries.map(point => ({
      date: new Date(point.date).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
      median: point.median,
      p10: point.p10,
      p90: point.p90,
      fullDate: point.date
    }));
  }, [priceSeries]);


  return (
    <section className="mb-8 pt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg md:text-xl text-airbnb-extra-bold text-gray-900 whitespace-nowrap">
            Argus des Bouteilles
          </h2>
        </div>
        <button 
          onClick={onNavigateToArgus}
          className="text-sm text-airbnb-medium text-wine-900 hover:underline"
        >
          Utiliser l'outil
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Rechercher une bouteille…"
            className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wine-900 text-sm"
            style={{ fontSize: '16px' }}
          />
          <Icons.Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleBottleSelect(result.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
                >
                  {result.image && (
                    <img 
                      src={result.image} 
                      alt={result.label}
                      className="w-10 h-10 object-cover rounded-full flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-airbnb-medium text-gray-900 truncate">
                      {result.label}
                    </div>
                    <div className="text-xs text-gray-500">{result.producer}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="mb-4">
          {selectedBottleId && selectedBottle && (
            <h3 className="text-base md:text-lg text-airbnb-bold text-gray-900 mb-3">
              {selectedBottle.producer} {selectedBottle.name}{selectedBottle.vintage ? ` ${selectedBottle.vintage}` : ''}{selectedBottle.ageStatement ? ` ${selectedBottle.ageStatement}` : ''}
            </h3>
          )}
          {isLoading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="text-gray-400 text-sm">Chargement...</div>
            </div>
          ) : priceSeries.length === 0 ? (
            <div className="h-48 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
              <div className="text-center">
                <Icons.AlertCircle className="mx-auto text-gray-400 mb-2" size={24} />
                <div className="text-sm text-gray-500">Données insuffisantes</div>
                <div className="text-xs text-gray-400 mt-1">Sélectionnez une bouteille pour voir l'évolution des prix</div>
              </div>
            </div>
          ) : (
            <div className="h-48 -mx-4 md:-mx-6 px-4 md:px-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPriceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8a3448" stopOpacity={0.4}/>
                      <stop offset="50%" stopColor="#a855f7" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#8a3448" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBandGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af"
                    fontSize={11}
                    tick={{ fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={11}
                    tick={{ fill: '#6b7280' }}
                    tickFormatter={(value) => value === 0 ? '' : `${value}€`}
                    axisLine={false}
                    tickLine={false}
                    width={50}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                    formatter={(value: number) => [`${value}€`, 'Prix médian']}
                    labelStyle={{ fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="p90"
                    stroke="none"
                    fill="url(#colorBandGradient)"
                    strokeWidth={0}
                  />
                  <Area
                    type="monotone"
                    dataKey="p10"
                    stroke="none"
                    fill="url(#colorBandGradient)"
                    strokeWidth={0}
                  />
                  <Area
                    type="monotone"
                    dataKey="median"
                    stroke="url(#colorPriceGradient)"
                    fill="url(#colorPriceGradient)"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="median"
                    stroke="#8a3448"
                    strokeWidth={3}
                    dot={{ fill: '#8a3448', r: 4, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff', fill: '#a855f7' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Trending Bottles */}
        {trendingBottles.length > 0 && (
          <div>
            <h3 className="text-sm text-airbnb-bold text-gray-900 mb-3">En tendance</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {trendingBottles.map((bottle) => (
                <button
                  key={bottle.bottleId}
                  onClick={() => handleTrendingClick(bottle.bottleId)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-colors ${
                    selectedBottleId === bottle.bottleId
                      ? 'bg-wine-900 text-white border-wine-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-wine-400 hover:bg-wine-50'
                  }`}
                >
                  {bottle.image && (
                    <img 
                      src={bottle.image} 
                      alt={bottle.label}
                      className="w-6 h-6 object-cover rounded-full"
                    />
                  )}
                  <span className="text-xs text-airbnb-medium whitespace-nowrap">
                    {bottle.label.length > 20 ? `${bottle.label.substring(0, 20)}...` : bottle.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
