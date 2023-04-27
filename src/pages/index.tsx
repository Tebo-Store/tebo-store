import Layout from '@components/layout/layout-five';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BundleGrid from '@components/bundle/bundle-grid-two';
import CollectionGrid from '@components/common/collection-grid';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import { bundleDataThree as bundle } from '@framework/static/bundle';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Seo from '@components/seo/seo';
import BannerGridTwo from '@components/common/banner-grid-two';
import BannerHeroGrid from '@components/common/banner-hero-grid';
import { bannersGridHero as bannersHero } from '@framework/static/banner';
import { elegantBannerGrid as banners } from '@framework/static/banner';
import FeatureCarousel from '@components/common/featured-carousel';
import {
  MyBanner,
  MyCategory,
  ResponseBrands,
  ResponseCollections,
  ResponseProducts,
} from '@framework/types';
import ProductsSlider from '@components/product/products-slider';

export default function Home({
  brands,
  products,
  collections,
  banners,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Seo
        title="Elegant"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/elegant"
      />

      <Container>
        <BannerHeroGrid
          data={banners}
          className="my-3 md:my-4 lg:mt-0 lg:mb-5 xl:mb-6"
        />
        <FeatureCarousel brands={brands.data} />

        {collections.data.map((collection) => (
          <ProductsSlider key={collection.id} collection={collection} />
        ))}

        <BestSellerGroceryProductFeed
          products={products.data}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
        />
        <BundleGrid
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          data={bundle}
        />
        {/* <PopularProductWithBestDeals /> */}
        <BannerGridTwo
          data={banners}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          girdClassName="xl:gap-5 3xl:gap-7"
        />
      </Container>

      <CollectionGrid
        headingPosition="center"
        className="pb-1 lg:pb-0 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
      />
      {/* <DownloadAppsTwo /> */}
    </>
  );
}

Home.Layout = Layout;

export const getServerSideProps: GetServerSideProps<{
  brands: ResponseBrands;
  products: ResponseProducts;
  collections: ResponseCollections;
  banners: MyBanner[];
  categories: MyCategory[];
}> = async ({ locale }) => {
  const responseBrands = await fetch(`${process.env.API}/api/v1/brands`);
  const brands: ResponseBrands = await responseBrands.json();

  const responseProducts = await fetch(`${process.env.API}/api/v1/products`);
  const products: ResponseProducts = await responseProducts.json();

  const responseCollections = await fetch(
    `${process.env.API}/api/v1/collections`
  );
  const collections: ResponseCollections = await responseCollections.json();

  const responseBanners = await fetch(`${process.env.API}/api/v1/homesliders`);
  const banners: MyBanner[] = await responseBanners.json();

  const responseCategories = await fetch(
    `${process.env.API}/api/v1/categories/all`
  );
  const categories: MyCategory[] = await responseCategories.json();

  return {
    props: {
      brands,
      products,
      collections,
      banners,
      categories,
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
