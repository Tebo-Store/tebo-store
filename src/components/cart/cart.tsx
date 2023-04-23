import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import usePrice from '@framework/product/use-price';
import { IoClose } from 'react-icons/io5';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import DeleteIcon from '@components/icons/delete-icon';
import { useShoppingCart } from '@contexts/myCart/cart';
import Button from '@components/ui/button';
import { useRouter } from 'next/router';
import { toDividePrice } from '@utils/toDividePrice';

export default function Cart() {
  const { cartItems, totalPrice, clearCart } = useShoppingCart();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { closeDrawer } = useUI();

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="w-full flex justify-between items-center relative ps-5 md:ps-7 border-b border-skin-base">
        <Heading variant="titleMedium">{t('text-shopping-cart')}</Heading>
        <div className="flex items-center">
          {cartItems.length > 0 && (
            <button
              className="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none text-skin-base opacity-50 hover:opacity-100 -me-1.5"
              aria-label={t('text-clear-all')}
              onClick={() => clearCart()}
            >
              <DeleteIcon />
              <span className="ps-1">{t('text-clear-all')}</span>
            </button>
          )}

          <button
            className="flex text-2xl items-center justify-center px-4 md:px-6 py-6 lg:py-7 focus:outline-none transition-opacity text-skin-base hover:opacity-60"
            onClick={closeDrawer}
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      </div>
      {cartItems.length > 0 ? (
        <Scrollbar className="cart-scrollbar w-full flex-grow">
          <div className="w-full px-5 md:px-7">
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <EmptyCart />
      )}
      <div className="border-t border-skin-base px-5 md:px-7 pt-5 md:pt-6 pb-5 md:pb-6">
        <div className="flex justify-between items-start pb-5 md:pb-5">
          <div className="pe-3">
            <Heading>{t('text-sub-total')}:</Heading>
          </div>
          <div className="flex-shrink-0 font-semibold text-base md:text-lg text-skin-base -mt-0.5 min-w-[80px] text-end">
            {toDividePrice(totalPrice)} сум
          </div>
        </div>
        <div className="flex flex-col" onClick={closeDrawer}>
          <Button
            onClick={() => {
              router.push(ROUTES.CHECKOUT);
            }}
            disabled={!(cartItems.length > 0)}
          >
            {t('text-proceed-to-checkout')}
          </Button>
        </div>
      </div>
    </div>
  );
}
