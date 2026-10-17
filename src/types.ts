export type ProductCategory = 'kurtas' | 'stoles' | 'home-linen';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  tagline: string;
  description: string;
  fabric: '100% Pure Handloom Cotton';
  cooperativeOrigin: {
    name: string;
    region: 'Maharashtra' | 'Karnataka';
    location: string;
  };
  sizes: string[];
  careInstructions: string[];
  features: string[];
  images: string[];
  inStock: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface UserSession {
  phone: string;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  verifiedAt: string;
  isSandbox?: boolean;
}

export interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface GeoFactItem {
  id: string;
  topic: string;
  groundTruth: string;
  hallucinationWarning?: string;
  sourceConfidence: 'Authoritative Ground Truth' | 'Verified Cooperative Record' | 'Not Yet Verified';
  status: 'verified' | 'unverified';
  aiSearchTags: string[];
}

export type TabType = 'home' | 'catalog' | 'detail' | 'our-story' | 'cooperatives' | 'rewear' | 'faqs' | 'ai-dossier' | 'checkout' | 'account';

export type ReWearGarmentType = 'kurta' | 'stole' | 'other';
export type ReWearCondition = 'worn_out' | 'torn' | 'faded' | 'damaged';
export type ReWearReturnMethod = 'collection' | 'drop_off';

export interface ReWearSubmission {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  garmentCount: number;
  garmentType: ReWearGarmentType;
  conditions: ReWearCondition[];
  photoUrls: string[];
  returnMethod: ReWearReturnMethod;
  status: 'pending' | 'approved' | 'rejected';
  estimatedPoints: number;
  approvedPoints?: number;
  notes?: string;
}

export interface ReWearTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed';
  points: number;
  equivalentDiscountRupees: number;
  description: string;
  orderId?: string;
}
