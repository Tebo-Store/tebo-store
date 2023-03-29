import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import Countdown, { zeroPad } from 'react-countdown';
import { productPlaceholder } from '@assets/placeholders';
import ProgressCard from '@components/ui/progress-card';
import { useTranslation } from 'react-i18next';

interface ProductProps {
  product: Product;
  className?: string;
  date?: string | number | Date | undefined;
}

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <span className="flex items-center justify-center text-base xl:text-lg text-skin-base text-opacity-50 font-semibold -mx-2.5">
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-skin-four text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(days)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-skin-four text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(hours)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-skin-four text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(minutes)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-skin-four text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(seconds)}
        </span>
      </span>
    );
  }
};

const ProductFlashSellCard: React.FC<ProductProps> = ({
  product,
  className,
  date,
}) => {
  const { name, image, quantity, sold, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'USD',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col justify-between group cursor-pointer relative px-5 lg:px-7 pt-4 lg:pt-5 pb-6 lg:pb-8',
        className
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className="">
        <div className="relative flex-shrink-0">
          <div className="flex justify-center overflow-hidden mx-auto relative">
            <Image
              src={image?.original ?? productPlaceholder}
              alt={name || 'Product Image'}
              width={350}
              height={350}
              quality={100}
              className="object-cover bg-skin-thumbnail"
            />
          </div>
          <div className="w-full h-full absolute top-0 z-10 -mx-0.5 sm:-mx-1">
            <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-red-secondary rounded-full px-2.5 py-[5px] pb-1 mx-0.5 sm:mx-1">
              {t('text-most-popular')}
            </span>
          </div>
        </div>

        <div className="flex flex-col pb-5 lg:pb-6 mb-0.5 lg:pt-3 h-full text-center">
          <div className="space-s-2 mb-1 lg:mb-2.5">
            <span className="inline-block font-semibold text-xl xl:text-2xl text-skin-base">
              {product_type === 'variable'
                ? `${minPrice} - ${maxPrice}`
                : price}
            </span>
            {basePrice && (
              <del className="text-base xl:text-lg text-skin-base text-opacity-50">
                {basePrice}
              </del>
            )}
          </div>
          <h2 className="text-skin-base text-sm lg:text-15px xl:text-base leading-5 sm:leading-6">
            {name}
          </h2>
        </div>
      </div>
      <Countdown date={date} intervalDelay={1000} renderer={renderer} />
      <ProgressCard
        soldProduct={sold}
        totalProduct={quantity}
        className="pt-8 lg:pt-10"
      />
    </article>
  );
};

export default ProductFlashSellCard;
