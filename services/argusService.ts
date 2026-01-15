import { 
  BottleCanonical, 
  BottleSearchResult, 
  PriceSeriesPoint, 
  BottleSummary, 
  TrendingBottle,
  BottleSale 
} from '../types';
import { MOCK_PRODUCTS } from '../constants';

// Helper: Convert volume string to ml
function volumeToMl(volume: string): number {
  const match = volume.match(/(\d+)\s*(cl|ml|l)/i);
  if (!match) return 700; // Default
  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  if (unit === 'l') return value * 1000;
  if (unit === 'cl') return value * 10;
  return value;
}

// Helper: Extract ABV from string
function extractAbv(abv?: string): number | null {
  if (!abv) return null;
  const match = abv.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}

// Create BottleCanonical from MOCK_PRODUCTS
function createBottlesFromProducts(): BottleCanonical[] {
  return MOCK_PRODUCTS
    .filter(p => p.category !== 'accessoire' && p.category !== 'coffret') // Exclude accessories
    .map((product, index) => {
      const specs = product.specs || {};
      const distillery = specs.distillery || specs.origin || 'Inconnu';
      const name = product.title.split('(')[0].trim(); // Remove vintage from title if in parentheses
      
      return {
        id: `bottle-${product.id}`,
        category: product.category,
        producer: distillery,
        name: name,
        vintage: specs.vintage || null,
        ageStatement: product.title.match(/(\d+\s*ans?)/i)?.[1] || null,
        region: specs.origin || null,
        appellation: null,
        country: specs.origin?.includes('France') ? 'France' : 
                 specs.origin?.includes('Écosse') ? 'Écosse' :
                 specs.origin?.includes('Japon') ? 'Japon' :
                 specs.origin?.includes('Belgique') ? 'Belgique' :
                 specs.origin?.includes('Mexique') ? 'Mexique' :
                 specs.origin?.includes('Cuba') ? 'Cuba' :
                 specs.origin?.includes('Barbade') ? 'Barbade' :
                 specs.origin?.includes('Trinidad') ? 'Trinidad' :
                 specs.origin?.includes('Russie') ? 'Russie' :
                 specs.origin?.includes('Allemagne') ? 'Allemagne' :
                 specs.origin?.includes('Italie') ? 'Italie' :
                 specs.origin?.includes('UK') ? 'Royaume-Uni' : 'France',
        volumeMl: volumeToMl(product.volume),
        abv: extractAbv(specs.abv),
        packaging: product.condition === 'Coffret' ? 'Boîte' : null,
        imageUrl: product.images?.[0] || null,
        createdAt: '2024-01-01T00:00:00Z'
      };
    });
}

const MOCK_BOTTLES = createBottlesFromProducts();

// Generate sales data for each bottle (last 12 months)
function generateSalesForBottle(bottleId: string, basePrice: number, count: number = 8): BottleSale[] {
  const sales: BottleSale[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    // Random date in last 12 months
    const monthsAgo = Math.random() * 12;
    const date = new Date(now);
    date.setMonth(date.getMonth() - monthsAgo);
    date.setDate(date.getDate() + Math.floor(Math.random() * 28));
    
    // Price variation: ±15% from base price
    const variation = (Math.random() - 0.5) * 0.3; // -15% to +15%
    const price = Math.round(basePrice * (1 + variation));
    
    sales.push({
      id: `sale-${bottleId}-${i}`,
      bottleId,
      soldAtDate: date.toISOString().split('T')[0],
      priceAmount: price,
      currency: 'EUR',
      feesIncluded: true,
      conditionGrade: Math.random() > 0.3 ? 'Excellent' : 'Très bon',
      volumeMl: MOCK_BOTTLES.find(b => b.id === bottleId)?.volumeMl || 700,
      lotSize: 1,
      source: 'MARKETPLACE',
      sourceRef: `listing-${bottleId}-${i}`,
      createdAt: date.toISOString()
    });
  }
  
  return sales.sort((a, b) => new Date(a.soldAtDate).getTime() - new Date(b.soldAtDate).getTime());
}

// Create sales for all bottles based on their product prices
const MOCK_SALES: BottleSale[] = MOCK_PRODUCTS
  .filter(p => p.category !== 'accessoire' && p.category !== 'coffret')
  .flatMap((product) => {
    const bottleId = `bottle-${product.id}`;
    const basePrice = product.price;
    // More sales for popular/rare items
    const saleCount = product.isRare ? 12 : product.stock && product.stock > 5 ? 15 : 8;
    return generateSalesForBottle(bottleId, basePrice, saleCount);
  });

// Normalize search text
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with space
    .replace(/\s+/g, ' ')
    .trim();
}

// Convert volume units
function normalizeVolume(text: string): string {
  return text
    .replace(/70\s*cl/gi, '700ml')
    .replace(/75\s*cl/gi, '750ml')
    .replace(/1\s*l/gi, '1000ml')
    .replace(/100\s*cl/gi, '1000ml');
}

// Search bottles
export async function searchBottles(query: string): Promise<BottleSearchResult[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = normalizeText(normalizeVolume(query));
  const results: BottleSearchResult[] = [];

  for (const bottle of MOCK_BOTTLES) {
    const searchableText = normalizeText(
      `${bottle.producer} ${bottle.name} ${bottle.vintage || ''} ${bottle.ageStatement || ''} ${bottle.region || ''} ${bottle.category}`
    );

    if (searchableText.includes(normalizedQuery)) {
      const matchConfidence: 'strict' | 'fuzzy' = 
        searchableText === normalizedQuery || 
        bottle.producer.toLowerCase() === query.toLowerCase() ||
        bottle.name.toLowerCase() === query.toLowerCase()
          ? 'strict'
          : 'fuzzy';

      results.push({
        id: bottle.id,
        label: `${bottle.producer} ${bottle.name}${bottle.vintage ? ` ${bottle.vintage}` : ''}${bottle.ageStatement ? ` ${bottle.ageStatement}` : ''}`,
        image: bottle.imageUrl || null,
        matchConfidence,
        category: bottle.category,
        producer: bottle.producer,
        vintage: bottle.vintage || null
      });
    }
  }

  return results.slice(0, 15); // Limit to 15 results
}

// Calculate price series
function calculatePriceSeries(
  sales: BottleSale[],
  range: '1y' | '3y' | '5y' | 'all' = '1y',
  bucket: 'day' | 'week' | 'month' = 'month'
): PriceSeriesPoint[] {
  if (sales.length === 0) {
    return [];
  }

  // Filter by date range
  const now = new Date();
  const rangeStart = new Date();
  switch (range) {
    case '1y':
      rangeStart.setFullYear(now.getFullYear() - 1);
      break;
    case '3y':
      rangeStart.setFullYear(now.getFullYear() - 3);
      break;
    case '5y':
      rangeStart.setFullYear(now.getFullYear() - 5);
      break;
    case 'all':
      rangeStart.setFullYear(2000);
      break;
  }

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.soldAtDate);
    return saleDate >= rangeStart;
  });

  if (filteredSales.length === 0) {
    return [];
  }

  // Group by bucket
  const buckets = new Map<string, number[]>();
  
  filteredSales.forEach(sale => {
    const saleDate = new Date(sale.soldAtDate);
    let bucketKey: string;
    
    if (bucket === 'month') {
      const month = saleDate.getMonth() + 1;
      bucketKey = `${saleDate.getFullYear()}-${month < 10 ? '0' : ''}${month}`;
    } else if (bucket === 'week') {
      const week = Math.floor(saleDate.getDate() / 7);
      bucketKey = `${saleDate.getFullYear()}-W${week < 10 ? '0' : ''}${week}`;
    } else {
      bucketKey = saleDate.toISOString().split('T')[0];
    }

    if (!buckets.has(bucketKey)) {
      buckets.set(bucketKey, []);
    }
    buckets.get(bucketKey)!.push(sale.priceAmount);
  });

  // Calculate stats for each bucket
  const points: PriceSeriesPoint[] = [];
  
  buckets.forEach((prices, bucketKey) => {
    prices.sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];
    const p10 = prices[Math.floor(prices.length * 0.1)];
    const p90 = prices[Math.floor(prices.length * 0.9)];
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    // Confidence: based on count and recency
    const countScore = Math.min(prices.length * 10, 50);
    const recencyScore = 30; // Simplified
    const dispersionScore = Math.max(0, 20 - ((p90 - p10) / median) * 100);
    const confidence = Math.min(100, countScore + recencyScore + dispersionScore);

    // Convert bucket key to date string
    let dateStr: string;
    if (bucket === 'month') {
      const [year, month] = bucketKey.split('-');
      dateStr = `${year}-${month}-01`;
    } else {
      dateStr = bucketKey;
    }

    points.push({
      date: dateStr,
      median,
      p10,
      p90,
      confidence: Math.round(confidence),
      tradesCount: prices.length
    });
  });

  // Sort by date
  points.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return points;
}

// Get price series for a bottle
export async function getBottlePriceSeries(
  bottleId: string,
  range: '1y' | '3y' | '5y' | 'all' = '1y',
  bucket: 'day' | 'week' | 'month' = 'month'
): Promise<PriceSeriesPoint[]> {
  const sales = MOCK_SALES.filter(s => s.bottleId === bottleId);
  return calculatePriceSeries(sales, range, bucket);
}

// Get bottle summary
export async function getBottleSummary(
  bottleId: string,
  range: '1y' | '3y' | '5y' | 'all' = '1y'
): Promise<BottleSummary | null> {
  const sales = MOCK_SALES.filter(s => s.bottleId === bottleId);
  
  if (sales.length === 0) {
    return null;
  }

  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  const recentSales = sales.filter(s => new Date(s.soldAtDate) >= oneYearAgo);
  const sales1m = sales.filter(s => {
    const date = new Date(s.soldAtDate);
    return date >= oneMonthAgo && date < sixMonthsAgo;
  });
  const sales6m = sales.filter(s => {
    const date = new Date(s.soldAtDate);
    return date >= sixMonthsAgo && date < oneYearAgo;
  });
  const sales1y = sales.filter(s => new Date(s.soldAtDate) >= oneYearAgo);

  const getMedian = (prices: number[]) => {
    if (prices.length === 0) return 0;
    const sorted = [...prices].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  };

  const currentEstimate = getMedian(recentSales.map(s => s.priceAmount));
  const price1m = sales1m.length > 0 ? getMedian(sales1m.map(s => s.priceAmount)) : null;
  const price6m = sales6m.length > 0 ? getMedian(sales6m.map(s => s.priceAmount)) : null;
  const price1y = sales1y.length > 0 ? getMedian(sales1y.map(s => s.priceAmount)) : null;

  const delta1m = price1m ? ((currentEstimate - price1m) / price1m) * 100 : null;
  const delta6m = price6m ? ((currentEstimate - price6m) / price6m) * 100 : null;
  const delta1y = price1y ? ((currentEstimate - price1y) / price1y) * 100 : null;

  // Confidence calculation
  const countScore = Math.min(recentSales.length * 10, 50);
  const recencyScore = 30;
  const confidence = Math.min(100, countScore + recencyScore);

  return {
    bottleId,
    currentEstimate,
    delta1m: delta1m ? Math.round(delta1m * 10) / 10 : null,
    delta6m: delta6m ? Math.round(delta6m * 10) / 10 : null,
    delta1y: delta1y ? Math.round(delta1y * 10) / 10 : null,
    tradesCount: recentSales.length,
    confidence: Math.round(confidence),
    currency: 'EUR'
  };
}

// Get trending bottles (based on sales count and recency)
export async function getTrendingBottles(limit: number = 10): Promise<TrendingBottle[]> {
  const bottleStats = new Map<string, { count: number; recent: number; lastSale: Date }>();
  
  MOCK_SALES.forEach(sale => {
    const stats = bottleStats.get(sale.bottleId) || { count: 0, recent: 0, lastSale: new Date(0) };
    stats.count++;
    const saleDate = new Date(sale.soldAtDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    if (saleDate >= threeMonthsAgo) {
      stats.recent++;
    }
    if (saleDate > stats.lastSale) {
      stats.lastSale = saleDate;
    }
    bottleStats.set(sale.bottleId, stats);
  });

  const trending: TrendingBottle[] = [];
  
  bottleStats.forEach((stats, bottleId) => {
    const bottle = MOCK_BOTTLES.find(b => b.id === bottleId);
    if (bottle) {
      // Trend score: more sales = higher, recent sales = higher, recent last sale = higher
      const daysSinceLastSale = (new Date().getTime() - stats.lastSale.getTime()) / (1000 * 60 * 60 * 24);
      const recencyBonus = Math.max(0, 30 - daysSinceLastSale);
      const trendScore = stats.count * 10 + stats.recent * 20 + recencyBonus;
      
      trending.push({
        bottleId,
        label: `${bottle.producer} ${bottle.name}${bottle.vintage ? ` ${bottle.vintage}` : ''}${bottle.ageStatement ? ` ${bottle.ageStatement}` : ''}`,
        image: bottle.imageUrl || null,
        category: bottle.category,
        trendScore
      });
    }
  });

  trending.sort((a, b) => b.trendScore - a.trendScore);
  return trending.slice(0, limit);
}

// Get bottle by ID
export async function getBottleById(bottleId: string): Promise<BottleCanonical | null> {
  return MOCK_BOTTLES.find(b => b.id === bottleId) || null;
}

// Get comparable sales (for table)
export async function getComparableSales(bottleId: string, limit: number = 10): Promise<BottleSale[]> {
  const bottle = MOCK_BOTTLES.find(b => b.id === bottleId);
  if (!bottle) return [];

  // Filter sales for same bottle with same volume
  const comparable = MOCK_SALES.filter(s => 
    s.bottleId === bottleId && 
    s.volumeMl === bottle.volumeMl &&
    s.lotSize === 1
  );

  // Sort by date descending
  comparable.sort((a, b) => new Date(b.soldAtDate).getTime() - new Date(a.soldAtDate).getTime());

  return comparable.slice(0, limit);
}
