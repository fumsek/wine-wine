import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from '../components/Icon';
import { Button } from '../components/Button';
import { 
  BottleSearchResult, 
  PriceSeriesPoint, 
  BottleSummary, 
  TrendingBottle,
  BottleSale,
  BottleCanonical
} from '../types';
import { 
  searchBottles, 
  getBottlePriceSeries, 
  getBottleSummary,
  getTrendingBottles,
  getBottleById,
  getComparableSales
} from '../services/argusService';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart 
} from 'recharts';

interface ArgusPageProps {
  onBack?: () => void;
  onNavigateToCreateListing?: (bottleId?: string) => void;
  initialBottleId?: string;
}

export const ArgusPage: React.FC<ArgusPageProps> = ({ 
  onBack,
  onNavigateToCreateListing,
  initialBottleId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BottleSearchResult[]>([]);
  const [selectedBottleId, setSelectedBottleId] = useState<string | null>(initialBottleId || null);
  const [selectedBottle, setSelectedBottle] = useState<BottleCanonical | null>(null);
  const [priceSeries, setPriceSeries] = useState<PriceSeriesPoint[]>([]);
  const [summary, setSummary] = useState<BottleSummary | null>(null);
  const [comparableSales, setComparableSales] = useState<BottleSale[]>([]);
  const [trendingBottles, setTrendingBottles] = useState<TrendingBottle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [range, setRange] = useState<'1y' | '3y' | '5y' | 'all'>('1y');
  const [bucket, setBucket] = useState<'day' | 'week' | 'month'>('month');
  const [showAllComparableSales, setShowAllComparableSales] = useState(false);

  // Load trending bottles
  useEffect(() => {
    const loadTrending = async () => {
      const trending = await getTrendingBottles(15);
      setTrendingBottles(trending);
      // If no initial bottle, set first trending as default
      if (initialBottleId) {
        setSelectedBottleId(initialBottleId);
      } else if (trending.length > 0) {
        setSelectedBottleId(prev => prev || trending[0].bottleId);
      }
    };
    loadTrending();
  }, [initialBottleId]);

  // Load bottle details when selected
  useEffect(() => {
    if (!selectedBottleId) {
      setSelectedBottle(null);
      setPriceSeries([]);
      setSummary(null);
      setComparableSales([]);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [bottle, series, bottleSummary, sales] = await Promise.all([
          getBottleById(selectedBottleId),
          getBottlePriceSeries(selectedBottleId, range, bucket),
          getBottleSummary(selectedBottleId, range),
          getComparableSales(selectedBottleId, 10)
        ]);

        setSelectedBottle(bottle);
        setPriceSeries(series);
        setSummary(bottleSummary);
        setComparableSales(sales);
      } catch (error) {
        console.error('Error loading bottle data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedBottleId, range, bucket]);

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
  };

  const handleTrendingClick = (bottleId: string) => {
    setSelectedBottleId(bottleId);
  };

  // Format chart data
  const chartData = useMemo(() => {
    return priceSeries.map(point => ({
      date: new Date(point.date).toLocaleDateString('fr-FR', { 
        month: bucket === 'month' ? 'short' : 'numeric',
        day: bucket === 'day' ? 'numeric' : undefined,
        year: '2-digit' 
      }),
      median: point.median,
      p10: point.p10,
      p90: point.p90,
      fullDate: point.date
    }));
  }, [priceSeries, bucket]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icons.ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl text-airbnb-extra-bold text-gray-900">
              Argus des Bouteilles
            </h1>
            <p className="text-sm text-gray-500 mt-1">Suivez l'évolution des prix sur le marché</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trending - Mobile: horizontal scroll at the top */}
          {trendingBottles.length > 0 && (
            <div className="md:hidden">
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

          {/* Search */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Rechercher une bouteille (vin, champagne, whisky, rhum, cognac, liqueur)…"
                className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wine-900 text-sm"
                style={{ fontSize: '16px' }}
              />
              <Icons.Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              
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
                          className="w-12 h-12 object-cover rounded-full flex-shrink-0"
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
          </div>

          {/* Filters */}
          {selectedBottleId && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Période</label>
                  <div className="flex gap-2">
                    {(['1y', '3y', '5y', 'all'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs text-airbnb-medium transition-colors ${
                          range === r
                            ? 'bg-wine-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {r === '1y' ? '1 an' : r === '3y' ? '3 ans' : r === '5y' ? '5 ans' : 'Tout'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Granularité</label>
                  <div className="flex gap-2">
                    {(['day', 'week', 'month'] as const).map((b) => (
                      <button
                        key={b}
                        onClick={() => setBucket(b)}
                        className={`px-3 py-1.5 rounded-lg text-xs text-airbnb-medium transition-colors ${
                          bucket === b
                            ? 'bg-wine-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {b === 'day' ? 'Jour' : b === 'week' ? 'Semaine' : 'Mois'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chart */}
          {selectedBottleId && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Chargement...</div>
                </div>
              ) : priceSeries.length === 0 ? (
                <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
                  <div className="text-center">
                    <Icons.AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
                    <div className="text-sm text-gray-500 font-medium">Données insuffisantes</div>
                    <div className="text-xs text-gray-400 mt-1">Pas assez de transactions pour cette bouteille</div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg text-airbnb-bold text-gray-900 mb-4">
                    {selectedBottle ? `${selectedBottle.producer} ${selectedBottle.name}${selectedBottle.vintage ? ` ${selectedBottle.vintage}` : ''}` : 'Évolution du prix'}
                  </h3>
                  <div className="h-64 -mx-4 md:-mx-6 px-4 md:px-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorPriceFullGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8a3448" stopOpacity={0.5}/>
                            <stop offset="50%" stopColor="#a855f7" stopOpacity={0.25}/>
                            <stop offset="100%" stopColor="#8a3448" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorBandFullGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.35}/>
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
                            padding: '10px 14px'
                          }}
                          formatter={(value: number, name: string) => {
                            if (name === 'median') return [`${value}€`, 'Prix médian'];
                            if (name === 'p10') return [`${value}€`, 'P10 (10%)'];
                            if (name === 'p90') return [`${value}€`, 'P90 (90%)'];
                            return [`${value}€`, name];
                          }}
                          labelStyle={{ fontWeight: 600, color: '#1f2937', marginBottom: '6px' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="p90"
                          stroke="none"
                          fill="url(#colorBandFullGradient)"
                          strokeWidth={0}
                        />
                        <Area
                          type="monotone"
                          dataKey="p10"
                          stroke="none"
                          fill="url(#colorBandFullGradient)"
                          strokeWidth={0}
                        />
                        <Area
                          type="monotone"
                          dataKey="median"
                          stroke="url(#colorPriceFullGradient)"
                          fill="url(#colorPriceFullGradient)"
                          strokeWidth={3}
                        />
                        <Line
                          type="monotone"
                          dataKey="median"
                          stroke="#8a3448"
                          strokeWidth={3}
                          dot={{ fill: '#8a3448', r: 5, strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff', fill: '#a855f7' }}
                          name="median"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats Summary - Mobile: above comparable sales */}
          {summary && selectedBottle && (
            <div className="md:hidden bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="text-lg text-airbnb-bold text-gray-900 mb-4">Estimation actuelle</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl text-airbnb-extra-bold text-wine-900 mb-1">
                    {summary.currentEstimate} {summary.currency}
                  </div>
                  <div className="text-xs text-gray-500">Prix médian estimé</div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  {summary.delta1m !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">1 mois</span>
                      <span className={`text-sm text-airbnb-medium ${summary.delta1m >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {summary.delta1m >= 0 ? '+' : ''}{summary.delta1m}%
                      </span>
                    </div>
                  )}
                  {summary.delta6m !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">6 mois</span>
                      <span className={`text-sm text-airbnb-medium ${summary.delta6m >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {summary.delta6m >= 0 ? '+' : ''}{summary.delta6m}%
                      </span>
                    </div>
                  )}
                  {summary.delta1y !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">1 an</span>
                      <span className={`text-sm text-airbnb-medium ${summary.delta1y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {summary.delta1y >= 0 ? '+' : ''}{summary.delta1y}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Transactions</span>
                    <span className="text-sm text-airbnb-medium text-gray-900">{summary.tradesCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confiance</span>
                    <span className="text-sm text-airbnb-medium text-gray-900">{summary.confidence}/100</span>
                  </div>
                </div>

                {onNavigateToCreateListing && (
                  <Button
                    fullWidth
                    variant="primary"
                    onClick={() => onNavigateToCreateListing(selectedBottleId || undefined)}
                    className="mt-4"
                  >
                    Vendre cette bouteille
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Comparable Sales Table */}
          {selectedBottleId && comparableSales.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
              <h3 className="text-lg text-airbnb-bold text-gray-900 mb-4">Ventes comparables</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 text-gray-500 text-airbnb-medium">Date</th>
                      <th className="text-right py-2 px-3 text-gray-500 text-airbnb-medium">Prix</th>
                      <th className="text-right py-2 px-3 text-gray-500 text-airbnb-medium">Volume</th>
                      <th className="text-left py-2 px-3 text-gray-500 text-airbnb-medium">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showAllComparableSales ? comparableSales : comparableSales.slice(0, 3)).map((sale) => (
                      <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">
                          {new Date(sale.soldAtDate).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-2 px-3 text-right text-airbnb-medium text-gray-900">
                          <span className="md:hidden">{sale.priceAmount}{sale.currency === 'EUR' ? '€' : ` ${sale.currency}`}</span>
                          <span className="hidden md:inline">{sale.priceAmount} {sale.currency}</span>
                        </td>
                        <td className="py-2 px-3 text-right text-gray-700">
                          {sale.volumeMl}ml
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                          {sale.conditionGrade || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {comparableSales.length > 3 && (
                <button
                  onClick={() => setShowAllComparableSales(!showAllComparableSales)}
                  className="md:hidden mt-3 text-sm text-wine-900 text-airbnb-medium hover:underline w-full text-center"
                >
                  {showAllComparableSales ? 'Voir moins' : 'Voir plus'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Desktop only */}
        <div className="hidden md:block space-y-6">
          {/* Stats Summary */}
          {summary && selectedBottle && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
              <h3 className="text-lg text-airbnb-bold text-gray-900 mb-4">Estimation actuelle</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl text-airbnb-extra-bold text-wine-900 mb-1">
                    {summary.currentEstimate} {summary.currency}
                  </div>
                  <div className="text-xs text-gray-500">Prix médian estimé</div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  {summary.delta1m !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">1 mois</span>
                      <span className={`text-sm text-airbnb-medium ${summary.delta1m >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {summary.delta1m >= 0 ? '+' : ''}{summary.delta1m}%
                      </span>
                    </div>
                  )}
                  {summary.delta6m !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">6 mois</span>
                      <span className={`text-sm text-airbnb-medium ${summary.delta6m >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {summary.delta6m >= 0 ? '+' : ''}{summary.delta6m}%
                      </span>
                    </div>
                  )}
                  {summary.delta1y !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">1 an</span>
                      <span className={`text-sm text-airbnb-medium ${summary.delta1y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {summary.delta1y >= 0 ? '+' : ''}{summary.delta1y}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Transactions</span>
                    <span className="text-sm text-airbnb-medium text-gray-900">{summary.tradesCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confiance</span>
                    <span className="text-sm text-airbnb-medium text-gray-900">{summary.confidence}/100</span>
                  </div>
                </div>

                {onNavigateToCreateListing && (
                  <Button
                    fullWidth
                    variant="primary"
                    onClick={() => onNavigateToCreateListing(selectedBottleId || undefined)}
                    className="mt-4"
                  >
                    Vendre cette bouteille
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Trending - Desktop: vertical list */}
          {trendingBottles.length > 0 && (
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
              <h3 className="text-lg text-airbnb-bold text-gray-900 mb-4">En tendance</h3>
              <div className="space-y-2">
                {trendingBottles.map((bottle) => (
                  <button
                    key={bottle.bottleId}
                    onClick={() => handleTrendingClick(bottle.bottleId)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                      selectedBottleId === bottle.bottleId
                        ? 'bg-wine-50 border-wine-900'
                        : 'bg-white border-gray-200 hover:border-wine-400 hover:bg-wine-50'
                    }`}
                  >
                    {bottle.image && (
                      <img 
                        src={bottle.image} 
                        alt={bottle.label}
                        className="w-10 h-10 object-cover flex-shrink-0 rounded-full"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-airbnb-medium text-gray-900 truncate">
                        {bottle.label}
                      </div>
                      <div className="text-xs text-gray-500">{bottle.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
