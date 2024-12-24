import type { RetailStore, StoreProduct } from '../types/shopping';

const STORES: RetailStore[] = [
  {
    id: 'walmart',
    name: 'Walmart',
    logo: 'https://corporate.walmart.com/content/dam/corporate/images/logo/walmart-logo-blue.svg',
    baseUrl: 'https://www.walmart.com'
  },
  {
    id: 'kroger',
    name: 'Kroger',
    logo: 'https://www.kroger.com/content/v2/binary/public/logo',
    baseUrl: 'https://www.kroger.com'
  }
];

export async function searchProducts(query: string, storeId?: string): Promise<StoreProduct[]> {
  // This would typically integrate with retailer APIs
  // For now, we'll return mock data
  return [
    {
      id: '1',
      name: query,
      price: 4.99,
      url: `${STORES[0].baseUrl}/ip/${query.toLowerCase().replace(/\s+/g, '-')}`,
      store: STORES[0]
    }
  ];
}

export function getAvailableStores(): RetailStore[] {
  return STORES;
}