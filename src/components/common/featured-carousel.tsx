import ReferFriendsIcon from '@components/icons/featured/refer-friends-icon';
import DeliveryIcon from '@components/icons/featured/delivery-icon';
import ChatIcon from '@components/icons/featured/chat-icon';
import FeedbackIcon from '@components/icons/featured/feedback-icon';
import CalendarIcon from '@components/icons/featured/calendar-icon';
import CouponIcon from '@components/icons/featured/coupon-icon';
import FeaturedCard from '@components/cards/featured-card-two';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import PromotionIcon from '@components/icons/featured/promotion-icon';

const data = [
  {
    id: 1,
    icon: (
      <CouponIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-five',
    description: 'feature-title-five-description',
  },
  {
    id: 2,
    icon: (
      <CouponIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-five',
    description: 'feature-title-five-description',
  },
  {
    id: 3,
    icon: (
      <CouponIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-five',
    description: 'feature-title-five-description',
  },
  {
    id: 4,
    icon: (
      <CouponIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-five',
    description: 'feature-title-five-description',
  },
  {
    id: 5,
    icon: (
      <CouponIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-five',
    description: 'feature-title-five-description',
  },
  {
    id: 6,
    icon: (
      <CalendarIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-six',
    description: 'feature-title-six-description',
  },
  {
    id: 7,
    icon: (
      <FeedbackIcon
        width="55px"
        height="55px"
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-seven',
    description: 'feature-title-seven-description',
  },
  {
    id: 8,
    icon: (
      <PromotionIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-eight',
    description: 'feature-title-eight-description',
  },
  {
    id: 9,
    icon: (
      <ChatIcon
        color="#E9AD26"
        width="55px"
        height="55px"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-nine',
    description: 'feature-title-nine-description',
  },
];

interface Props {
  className?: string;
}

const breakpoints = {
  '1400': {
    slidesPerView: 4,
    spaceBetween: 24,
  },
  '1024': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '640': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
};

const FeatureCarousel: React.FC<Props> = ({ className = 'mb-0' }) => {
  return (
    <div className={`brands heightFull overflow-x-auto flex flex-nowrap space-x-3 ${className}`}>
      {data?.map((item) => (
        <FeaturedCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default FeatureCarousel;
