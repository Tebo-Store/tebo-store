import { SwiperSlide } from 'swiper/react';
import Carousel from '@components/ui/carousel/carousel';

import FeaturedCard from '@components/cards/featured-card-two';
import { MyBrand } from '@framework/types';
import { useRouter } from 'next/router';

interface Props {
  brands: MyBrand[];
}

const FeatureCarousel = ({ brands }: Props) => {
  return (
    <>
      <Carousel
        prevActivateId="brands-carousel-button-prev"
        nextActivateId="brands-carousel-button-next"
        slidesPerView={'auto'}
        spaceBetween={20}
        breakpoints={{
          640: {
            spaceBetween: 25,
          },
          1024: {
            spaceBetween: 30,
          },
        }}
      >
        {brands?.map(({ id, image_path, slug }) => (
          <SwiperSlide className="max-w-max" key={id}>
            <FeaturedCard slug={slug} image_path={image_path} />
          </SwiperSlide>
        ))}
      </Carousel>
    </>
  );
};

export default FeatureCarousel;
