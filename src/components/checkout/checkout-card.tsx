import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import { ROUTES } from '@utils/routes';
import { useShoppingCart } from '@contexts/myCart/cart';
import { toDividePrice } from '@utils/toDividePrice';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation('common');
  const { totalPrice, cartItems } = useShoppingCart();
  const { openModal } = useModalAction();
  const { isAuthorized } = useUI();
  const { items, total, isEmpty } = useCart();
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  return (
    <>
      <div className="border border-skin-base bg-skin-fill rounded-md p-4 md:px-5">
        <div className="flex items-center">
          <span className="text-sm md:text-lg text-skin-base font-medium">
            Итого:
          </span>
          <span className="ms-auto flex-shrink-0 text-base md:text-xl text-skin-base font-medium">
            {toDividePrice(totalPrice)} сум
          </span>
        </div>
        <Button
          variant="formButton"
          className={`w-full mt-8 bg-skin-primary text-skin-inverted rounded font-semibold px-4 py-3 transition-all`}
          disabled={!(cartItems.length > 0)}
          onClick={() => {
            isAuthorized ? console.log('sumit') : openModal('LOGIN_VIEW');
          }}
        >
          {t('button-order-now')}
        </Button>
      </div>
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={ROUTES.TERMS}>
          <a className="text-skin-primary underline font-medium">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={ROUTES.PRIVACY}>
          <a className="text-skin-primary underline font-medium">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
    </>
  );
};

export default CheckoutCard;
