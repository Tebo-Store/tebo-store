import Link from '@components/ui/link';
import Image from 'next/image';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { MyBanner } from '@framework/types';

interface BannerProps {
  banner: MyBanner;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
}

type Locale = 'ru' | 'uz';

const BannerCard: React.FC<BannerProps> = ({
  banner,
  className,
  variant = 'default',
  effectActive = true,
  classNameInner,
}) => {
  const router = useRouter();
  const locale: Locale = router.locale as Locale;

  return (
    <div>
      <Link href={'/'}>
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg">
          <Image
            objectFit="cover"
            src={banner[`image_full_${locale}`]}
            layout="fill"
            alt={'Banner Image'}
            quality={100}
            className="object-cover rounded-lg"
          />
          {effectActive && (
            <div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
          )}
        </div>
      </Link>
    </div>
  );
};

export default BannerCard;
