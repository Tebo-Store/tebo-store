import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import { useShoppingCart } from '@contexts/myCart/cart';
import { useModalAction } from '@components/common/modal/modal.context';
import { MyProduct } from '@framework/types';
import { useRouter } from 'next/router';
import { toDividePrice } from '@utils/toDividePrice';
import { useMemo } from 'react';

type Locale = 'ru' | 'uz';

const ProductSingleDetails = ({ product }: { product: MyProduct }) => {
  const {
    decreaseCartQuantity,
    increaseCartQuantity,
    addProductFromCart,
    getItem,
  } = useShoppingCart();

  const router = useRouter();
  const locale: Locale = router.locale as Locale;
  const { openModal } = useModalAction();

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

  const cartItem = getItem(product.id);

  return (
    <div className="py-6">
      <div className="flex flex-col xl:flex-row xl:items-start xl:space-x-7">
        <ThumbnailCarousel gallery={product.gallery} />

        <div className="xl:w-1/2">
          <h2 className="mb-5 text-skin-base text-lg md:text-xl xl:text-2xl font-medium">
            {product[`name_${locale}`]}
          </h2>

          <div className="flex space-x-5 mb-4 md:space-x-7">
            <div>
              {product.sale_price ? (
                <>
                  <p>Цена</p>
                  <div className="text-sm md:text-lg font-semibold mt-1">
                    {toDividePrice(product.sale_price)} сум
                  </div>
                  <del className="text-sm md:text-base">
                    {toDividePrice(product.price)} сум
                  </del>
                </>
              ) : (
                <>
                  <p>Цена</p>
                  <div className="text-sm md:text-lg font-semibold mt-1">
                    {toDividePrice(product.price)} сум
                  </div>
                </>
              )}
            </div>
            <div>
              <p>В рассрочку</p>
              <div className="text-sm md:text-lg text-skin-primary font-semibold mt-1">
                от {toDividePrice(monthlyPayment)} сум/мес
              </div>
            </div>
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            {cartItem ? (
              <Counter
                variant="single"
                value={cartItem.qty}
                onIncrement={() => increaseCartQuantity(cartItem)}
                onDecrement={() => decreaseCartQuantity(cartItem)}
                disabled={product.quantity <= cartItem.qty}
              />
            ) : (
              <Button
                variant="border"
                onClick={() => addProductFromCart(product)}
                className="w-full px-1.5"
              >
                Добавить в корзину
              </Button>
            )}

            <Button
              onClick={() => {
                openModal('PRODUCT_CREDIT', product);
              }}
              className="w-full px-1.5"
            >
              В рассрочку
            </Button>
          </div>

          <div className="mt-4 space-y-3 md:space-y-4">
            <h3 className="text-xl font-semibold">Характеристики:</h3>
            {Object.entries(product[`attributes_${locale}`]).map(
              ([key, value]) => (
                <div className="md:flex items-center">
                  <p className="md:mr-5 md:w-64 mb-0 text-sm text-gray-400">
                    {key}
                  </p>
                  <p className="mb-0 text-sm font-medium">{value}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <h3 className="mt-5 mb-2 text-xl font-semibold">Описание:</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: product[`description_${locale}`],
        }}
      />
    </div>
  );
};

export default ProductSingleDetails;
