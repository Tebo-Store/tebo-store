import cn from 'classnames';
import Image from '@components/ui/image';
import { MyProduct } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { toDividePrice } from '@utils/toDividePrice';
import Link from 'next/link';
import { useMemo } from 'react';
import { MdAddShoppingCart, MdDone } from 'react-icons/md';
import { useShoppingCart } from '@contexts/myCart/cart';
import { useRouter } from 'next/router';

type Locale = 'ru' | 'uz';

interface ProductProps {
  product: MyProduct;
  className?: string;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const { openModal } = useModalAction();
  const { getItem, addProductFromCart, removeProductFromCart } =
    useShoppingCart();
  const { t } = useTranslation('common');

  const item = getItem(product.id);

  const router = useRouter();
  const locale: Locale = router.locale as Locale;

  function handlePopupView() {
    openModal('PRODUCT_CREDIT', product);
  }

  const firstPayment = useMemo(() => {
    if (product.sale_price) {
      return (product.sale_price * 25) / 100;
    }
    return (product.price * 25) / 100;
  }, []);

  const month = 12;

  const annuetit = useMemo(() => {
    const percent = 90 / 100;
    const BeforeB = Math.pow(1 + Number(percent) / 12, Number(month));
    const A =
      (Number(percent) / 12) *
      Math.pow(1 + Number(percent) / 12, Number(month));
    const B = BeforeB - 1;

    return A / B;
  }, []);

  const monthlyPayment = useMemo(() => {
    const productPrice = product.sale_price
      ? product.sale_price
      : product.price;
    return (
      Math.round((annuetit * (productPrice - Number(firstPayment))) / 1000) *
      1000
    );
  }, []);

  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md transition-all relative h-full',
        className
      )}
    >
      <div className="relative flex-shrink-0">
        <div className="pointer-events-none absolute z-10 top-2 left-2 px-3 py-1 bg-red-500 rounded-md text-sm text-white">
          Новинка
        </div>
        <Link href={`products/${product.slug}`}>
          <a>
            <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
              <Image
                src={product.def_image}
                alt={product.name_ru || 'Product Image'}
                width={230}
                height={200}
                quality={100}
                className="object-cover"
              />
            </div>
          </a>
        </Link>
      </div>

      <div className="flex flex-col justify-between mt-3 flex-grow">
        <Link href={`products/${product.slug}`}>
          <a>
            <h3 className="text-skin-base text-xs sm:text-sm lg:text-base font-medium line-clamp-2 mb-2 sm:mb-3">
              {product[`name_${locale}`]}
            </h3>
          </a>
        </Link>

        <div>
          {product.sale_price ? (
            <>
              <span className="mr-3 block font-semibold text-sm lg:text-base text-skin-base">
                {toDividePrice(product.sale_price)} сум
              </span>

              <span className="block text-sm  lg:text-base line-through text-skin-base text-opacity-70">
                {toDividePrice(product.price)} сум
              </span>
            </>
          ) : (
            <span className="block font-semibold text-sm lg:text-base text-skin-base mb-5">
              {toDividePrice(product.price)} сум
            </span>
          )}
        </div>
      </div>

      <div className="text-xs sm:text-sm mt-1 sm:mt-2 text-skin-primary font-medium">
        от {toDividePrice(monthlyPayment)} сум/мес
      </div>

      <div className="flex mt-3">
        {/* <AddToCart data={product} /> */}
        <button
          onClick={handlePopupView}
          className="flex-grow mr-2 md:mr-3 text-xs sm:text-sm px-1 py-2 sm:py-3 bg-skin-primary text-skin-inverted hover:bg-opacity-90 active:bg-opacity-90 rounded font-semibold cursor-pointer transition ease-in-out duration-300"
        >
          В рассрочку
        </button>
        {item ? (
          <button
            onClick={() => removeProductFromCart(item)}
            className="border rounded-md px-2 sm:px-3"
          >
            <MdDone size={20} />
          </button>
        ) : (
          <button
            onClick={() => addProductFromCart(product)}
            className="border rounded-md px-2 sm:px-3"
          >
            <MdAddShoppingCart size={20} />
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
