export type ProductCategory = 
  | 'starter-pack'
  | 'persona'
  | 'workflow'
  | 'skill'
  | 'industry'
  | 'prompt-library';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  platforms: string[];
  rating: number;
  reviews: number;
  isFree: boolean;
  preview?: string;
  downloadCount?: number;
  createdAt?: string;
  updatedAt?: string;
}