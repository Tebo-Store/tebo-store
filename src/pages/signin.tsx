import Layout from '@components/layout/layout';
import LoginForm from '@components/auth/auth-form';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';

export default function SignInPage() {
  return (
    <>
      <Seo
        title="Sign In"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="signin"
      />
      <Divider />
      <div className="flex justify-center items-center">
        <div className="py-12 sm:py-16 lg:py-20">
          <LoginForm
            isPopup={false}
            className="border border-skin-base rounded-lg"
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

SignInPage.Layout = Layout;

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
