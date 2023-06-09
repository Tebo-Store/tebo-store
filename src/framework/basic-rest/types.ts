import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};

export interface MyBanner {
  id: number;
  name: string;
  link: string;
  image_full_uz: string;
  image_full_ru: string;
}

export interface ResponseCollections {
  data: MyCollection[];
}

export interface MyCollection {
  id: number;
  name_ru: string;
  name_uz: string;
  description_ru: string;
  description_uz: string;
  slug: string;
  products: MyProduct[];
}

export interface ResponseProducts {
  data: MyProduct[];
}

export interface MyProduct {
  id: number;
  name_ru: string;
  name_uz: string;
  description_ru: string;
  description_uz: string;
  brand_id: null;
  SKU: string;
  status: string;
  isFeatured: number;
  price: number;
  sale_price: number | null;
  quantity: number;
  attributes_ru: {
    [key: string]: string;
  };
  attributes_uz: {
    [key: string]: string;
  };
  meta_keywords_ru: string[];
  meta_keywords_uz: string[];
  installment_available: number;
  images: string[];
  slug: string;
  default_image: string;
  tariff_id: string;
  gallery: string[];
  def_image: string;
}

export interface ResponseBrands {
  data: MyBrand[];
}

export interface MyBrand {
  id: number;
  name_ru: string;
  name_uz: string;
  description_ru: string;
  description_uz: string;
  status: number;
  slug: string;
  default_image: string;
  image_path: string;
}

export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  [key: string]: unknown;
};
export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sold: number;
  unit: string;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  brand?: Brand;
  description?: string;
  variations?: object;
  [key: string]: unknown;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};
