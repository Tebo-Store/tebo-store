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

import {
  useModalAction,
} from '@components/common/modal/modal.context';


export default function CheckoutPage() {
  const { openModal } = useModalAction()
  const { isAuthorized } = useUI()

  return (
    <>
      <Seo
        title="Checkout"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="checkout"
      />
      <Container className="py-10 2xl:py-12 checkout">


        <div className="flex xl:max-w-screen-xl mx-auto flex-col">
          <div>Инфо о товаре, Название, Цена, Картинка</div>

          <hr className='my-5' />

          {isAuthorized ? <div>Авторизован</div> :
            <div>

              <Input
                id="fullName"
                label='Имя и фамилия'
                type='text'
                variant='solid'
              />

              <Input
                id="passport"
                label='Серия паспорта'
                type='text'
                variant='solid'
              />

              <div className="flex">
                <Input className="flex-grow" id="card" placeholder='0000 0000 0000 0000' label='Номер карты' variant='solid'></Input>
                <Input className="w-[100px] ml-4" id="term" placeholder='00/00' label='Срок' variant='solid'></Input>
              </div>

              <Button onClick={() => {
                isAuthorized ? console.log('sumit') :  openModal('LOGIN_VIEW')
              }} className="w-full mt-5" variant='formButton'>
                Оформить заказ
              </Button>

            </div>}
          {/* <div className="flex flex-col lg:grid lg:grid-cols-12 grid-cols-1 flex-wrap gap-8">
            <div className="w-full col-start-1 col-end-9">
              <CheckoutDetails />
            </div>
            <div className="w-full mt-7 lg:mt-0 col-start-9 col-end-13">
              <CheckoutCard />
            </div>
          </div> */}
        </div>
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
