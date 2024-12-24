export interface RetailStore {
  id: string;
  name: string;
  logo: string;
  baseUrl: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  recipeId?: string;
  recipeName?: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  url: string;
  store: RetailStore;
}