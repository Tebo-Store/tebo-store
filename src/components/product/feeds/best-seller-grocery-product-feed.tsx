import type { FC } from 'react';
import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import ProductsGridBlock from '../products-grid-block';
import { LIMITS } from '@framework/utils/limits';
import { MyProduct } from '@framework/types';

interface ProductFeedProps {
  className?: string;
  products: MyProduct[];
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({
  className,
  products,
}) => {
  return (
    <ProductsGridBlock
      sectionHeading="text-best-grocery-near-you"
      sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={products}
      uniqueKey="best-sellers"
    />
  );
};
export default BestSellerGroceryProductFeed;
