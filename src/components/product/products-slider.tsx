import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import { LIMITS } from '@framework/utils/limits';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './product-cards/product-card';

import 'swiper/css';
import 'swiper/css/pagination';
import SectionHeader from '@components/common/section-header';
import { MyCollection } from '@framework/types';
import { useRouter } from 'next/router';

type Locale = 'ru' | 'uz';

interface Props {
  collection: MyCollection;
}

const ProductsSlider = ({ collection }: Props) => {
  const router = useRouter();
  const locale: Locale = router.locale as Locale;

  return (
    <div className="py-20 lg:py-[100px]">
      <SectionHeader
        sectionHeading={collection[`name_${locale}`]}
        sectionSubHeading={collection[`description_${locale}`]}
        headingPosition="center"
      />
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1780: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
      >
        {collection.products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
