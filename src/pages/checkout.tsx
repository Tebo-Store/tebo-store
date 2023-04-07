import Layout from '@components/layout/layout';
import CheckoutCard from '@components/checkout/checkout-card';
import Container from '@components/ui/container';
import CheckoutDetails from '@components/checkout/checkout-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { GetServerSideProps } from 'next';
import { useShoppingCart } from '@contexts/myCart/cart';
import EmptyCart from '@components/cart/empty-cart';
import Button from '@components/ui/button';
import { useRouter } from 'next/router';
import Image from '@components/ui/image';
import { toDividePrice } from '@utils/toDividePrice';
import Counter from '@components/ui/counter';
import { useUI } from '@contexts/ui.context';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeProductFromCart,
  } = useShoppingCart();

  const { isAuthorized } = useUI();

  return (
    <>
      <Seo
        title="Checkout"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="checkout"
      />
      <Container className="py-10 2xl:py-12 border-t border-skin-base checkout">
        <div className="flex xl:max-w-screen-xl mx-auto flex-col">
          <div className="flex flex-col lg:grid lg:grid-cols-12 grid-cols-1 flex-wrap gap-8">
            <div className="w-full col-start-1 col-end-9 text-center">
              {/* <CheckoutDetails /> */}

              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center text-left border-b first-of-type:border-t py-2 md:py-4"
                    >
                      <div className="flex-shrink-0 w-[100px] h-[100px] md:w-[130px] md:h-[130px]">
                        <Image
                          src={item.image.original}
                          alt={item.name || 'Product Image'}
                          width={180}
                          height={180}
                          quality={100}
                          className="object-cover bg-skin-thumbnail"
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3">
                          {item.name}
                        </h3>
                        <div className="text-sm md:text-base">
                          {item.qty} x {toDividePrice(item.price * item.qty)}{' '}
                          сум.{' '}
                        </div>

                        <div className="flex items-center mt-3 justify-between">
                          <Counter
                            value={item.qty}
                            onDecrement={() => decreaseCartQuantity(item)}
                            onIncrement={() => increaseCartQuantity(item)}
                            disabled={item.quantity <= item.qty}
                          />
                          <button
                            className="text-red-600"
                            onClick={() => removeProductFromCart(item)}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isAuthorized && <div>Форма</div>}
                </>
              ) : (
                <>
                  <EmptyCart />
                  <Button onClick={() => router.push('/')}>На главную</Button>
                </>
              )}
            </div>
            <div className="w-full mt-7 lg:mt-0 col-start-9 col-end-13">
              <CheckoutCard />
            </div>
          </div>
        </div>
      </Container>
      <Divider />
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
