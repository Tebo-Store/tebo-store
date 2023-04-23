import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import DownloadApps from '@components/common/download-apps';
import PopcornJerkyProductFeed from '@components/product/feeds/popcorn-jerky-product-feed';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/ui/breadcrumb';
import { useUI } from '@contexts/ui.context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Divider from '@components/ui/divider';
import { MyProduct } from '@framework/types';

export default function ProductPage({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails product={product} />
        </Container>
      </div>

      {/* <RelatedProductFeed uniqueKey="related-products" /> */}
      {/* <PopcornJerkyProductFeed /> */}
      <DownloadApps />
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps<{
  product: MyProduct;
}> = async ({ locale, params }) => {
  const { slug } = params;

  const response = await fetch(`${process.env.API}/api/v1/products/${slug}`);
  const product: MyProduct = await response.json();

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
