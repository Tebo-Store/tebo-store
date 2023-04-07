import cn from 'classnames';
import Image from '@components/ui/image';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import { toDividePrice } from '@utils/toDividePrice';
import Link from 'next/link';
import { useMemo } from 'react';

interface ProductProps {
  product: Product;
  className?: string;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const { name, image } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  function handlePopupView() {
    openModal('PRODUCT_CREDIT', product);
  }

  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
    >
      <Link href={`products/${product.slug}`}>
        <a>
          <div className="relative flex-shrink-0">
            <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
              <Image
                src={image?.thumbnail ?? productPlaceholder}
                alt={name || 'Product Image'}
                width={230}
                height={200}
                quality={100}
                className="object-cover bg-skin-thumbnail"
              />
            </div>
            <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
              <div className="inline-block product-count-button-position"></div>
            </div>
          </div>

          <div className="flex flex-col px-3 md:px-4 lg:px-[18px] lg:pt-1.5 h-full">
            <div className="mb-1 lg:mb-1.5">
              {/* <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-base">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="text-sm text-skin-base text-opacity-70">
              {basePrice}
            </del>
          )} */}

              {product.sale_price ? (
                <>
                  <span className="mr-3 block font-semibold text-sm sm:text-15px lg:text-base text-skin-base">
                    {toDividePrice(product.sale_price)} сум
                  </span>

                  <del className="text-sm text-skin-base text-opacity-70">
                    {toDividePrice(product.price)} сум
                  </del>
                </>
              ) : (
                <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-base">
                  {toDividePrice(product.price)} сум
                </span>
              )}
            </div>
            <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6">
              {name}
            </h2>
          </div>
        </a>
      </Link>

      <div className="px-3 pt-2 lg:pt-4 flex flex-col flex-grow justify-end space-y-3">
        <AddToCart data={product} />
        <button
          onClick={handlePopupView}
          className="text-sm py-[9px] px-4 bg-skin-primary text-skin-inverted hover:bg-opacity-90 active:bg-opacity-90 rounded font-semibold cursor-pointer transition ease-in-out duration-300"
        >
          В рассрочку
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
