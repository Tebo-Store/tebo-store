import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import ChangePassword from '@components/my-account/change-password';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Seo from '@components/seo/seo';

export default function ChangePasswordPage() {
  return (
    <>
      <Seo
        title="Change Password"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/change-password"
      />
      <AccountLayout>
        <ChangePassword />
      </AccountLayout>
    </>
  );
}

ChangePasswordPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'terms',
        'faq',
        'footer',
      ])),
    },
  };
};
