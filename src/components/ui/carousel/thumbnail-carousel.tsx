import {
  Swiper,
  SwiperSlide,
  Navigation,
  Thumbs,
} from '@components/ui/carousel/slider';
import Image from '@components/ui/image';
import { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
  gallery: string[];
}

const ThumbnailCarousel: React.FC<Props> = ({ gallery }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-5 lg:mb-6 xl:mb-0 lg:grid lg:grid-cols-12 lg:gap-5 xl:w-1/2">
      <div className="relative mb-5 lg:mb-0 lg:col-span-10 lg:order-2">
        <Swiper
          id="productGallery"
          spaceBetween={20}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
        >
          {gallery.map((item) => (
            <SwiperSlide key={`product-gallery-${item}`}>
              <div className="relative w-full h-96 sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] border border-1 rounded-lg">
                <Image
                  sizes="(min-width: 1280px) 50vw, 100vw"
                  src={item}
                  alt={`Product gallery ${item}`}
                  layout="fill"
                  className="rounded-lg object-contain"
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center cursor-pointer justify-center rounded-full bg-skin-fill transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            {<IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center justify-center cursor-pointer rounded-full bg-skin-fill  transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            {<IoIosArrowForward />}
          </div>
        </div>
      </div>

      <Swiper
        id="productGalleryThumbs"
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={'auto'}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        breakpoints={{
          1024: {
            spaceBetween: 16,
            direction: 'vertical',
          },
        }}
        className="lg:col-span-2 lg:order-1 lg:h-[550px] lg:w-full xl:h-[600px]"
      >
        {gallery?.map((item) => (
          <SwiperSlide
            key={`product-thumb-gallery-${item}`}
            className="max-w-max lg:!h-auto lg:max-w-none cursor-pointer"
          >
            <div className="relative w-20 h-20 lg:w-full lg:h-28 xl:h-20">
              <Image
                sizes="200px"
                src={item}
                alt={`Product thumb gallery ${item}`}
                layout="fill"
                className="object-contain rounded-[4px]"
                quality={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbnailCarousel;
