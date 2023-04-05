import Layout from '@components/layout/layout';
import CheckoutCard from '@components/checkout/checkout-card';
import Container from '@components/ui/container';
import CheckoutDetails from '@components/checkout/checkout-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { GetServerSideProps } from 'next';
import { useUI } from '@contexts/ui.context';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { toDividePrice } from '@utils/toDividePrice';

import { useModalAction } from '@components/common/modal/modal.context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CheckoutPage() {
  const router = useRouter();

  const [installmentData, setInstallmentData] = useState<any>(null);
  const { openModal } = useModalAction();
  const { isAuthorized } = useUI();

  useEffect(() => {
    if (localStorage.getItem('installment-data')) {
      setInstallmentData(JSON.parse(localStorage.getItem('installment-data')));
    }
  }, []);

  return (
    <>
      <Seo
        title="Checkout"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="checkout"
      />
      <Container className="py-10 2xl:py-12 checkout">
        <div className="flex flex-col lg:flex-row lg:space-x-5 xl:max-w-screen-xl mx-auto ">
          {!!installmentData ? (
            <>
              <div className="mb-5 lg:mb-0 lg:w-8/12">
                <div>Инфо о товаре, Название, Цена, Картинка</div>

                <hr className="my-5" />

                {isAuthorized && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Ваши данные</h2>

                    <div className="md:flex md:justify-between space-y-5 md:space-y-0 md:space-x-4">
                      <Input
                        id="fullName"
                        label="Дата рождения"
                        type="date"
                        variant="solid"
                        className="md:w-full"
                      />

                      <Input
                        id="passport"
                        label="Серия паспорта"
                        type="text"
                        variant="solid"
                        className="md:w-full"
                      />
                    </div>

                    <div className="flex md:w-1/2">
                      <Input
                        className="flex-grow"
                        id="card"
                        placeholder="0000 0000 0000 0000"
                        label="Номер карты"
                        variant="solid"
                      ></Input>
                      <Input
                        className="w-[100px] ml-4"
                        id="term"
                        placeholder="00/00"
                        label="Срок"
                        variant="solid"
                      ></Input>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4 lg:w-4/12">
                <h2 className="text-xl font-medium mb-5">Рассрочка</h2>

                <div className="flex justify-between items-center space-x-4 lg:items-start">
                  <span className="text-xs md:text-base lg:w-5/12">
                    Срок рассрочки
                  </span>
                  <span className="text-sm md:text-lg font-semibold text-right">
                    {installmentData?.month} мес.
                  </span>
                </div>

                <div className="flex justify-between items-center space-x-4 lg:items-start">
                  <span className="text-xs md:text-base lg:w-5/12">
                    Первоначальный взнос
                  </span>
                  <span className="text-sm md:text-lg font-semibold text-right">
                    {toDividePrice(installmentData?.firstPayment)} сум
                  </span>
                </div>

                <div className="flex justify-between items-center space-x-4 lg:items-start">
                  <span className="text-xs md:text-base lg:w-5/12">
                    Ежемесячный платеж
                  </span>
                  <span className="text-sm md:text-lg font-semibold text-right">
                    {toDividePrice(installmentData?.monthlyPayment)} сум
                  </span>
                </div>

                <div className="flex justify-between items-center space-x-4 lg:items-start">
                  <span className="text-xs md:text-base lg:w-5/12">
                    Общая сумма рассрочки
                  </span>
                  <span className="text-sm md:text-lg font-semibold text-right">
                    {toDividePrice(installmentData?.totalPrice)} сум
                  </span>
                </div>

                <Button
                  onClick={() => {
                    isAuthorized
                      ? console.log('sumit')
                      : openModal('LOGIN_VIEW');
                  }}
                  className="w-full"
                  variant="formButton"
                >
                  Оформить рассрочку
                </Button>
              </div>
            </>
          ) : (
            <div className="mx-auto md:max-w-[400px]">
              <h2 className="text-2xl font-bold text-center">
                Выберите товар для оформления заказа в рассрочку
              </h2>

              <Button className="w-full mt-5" onClick={() => router.push('/')}>
                На главную
              </Button>
            </div>
          )}
        </div>
        {/* <div className="flex flex-col lg:grid lg:grid-cols-12 grid-cols-1 flex-wrap gap-8">
            <div className="w-full col-start-1 col-end-9">
              <CheckoutDetails />
            </div>
            <div className="w-full mt-7 lg:mt-0 col-start-9 col-end-13">
              <CheckoutCard />
            </div>
          </div> */}
      </Container>
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
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
