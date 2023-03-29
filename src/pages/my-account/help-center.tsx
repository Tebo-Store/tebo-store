import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Help from '@components/my-account/help';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Seo from '@components/seo/seo';

export default function HelpCenter() {
  return (
    <>
      <Seo
        title="Help Center"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/help-center"
      />
      <AccountLayout>
        <Help />
      </AccountLayout>
    </>
  );
}

HelpCenter.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'help',
        'footer',
      ])),
    },
  };
};
