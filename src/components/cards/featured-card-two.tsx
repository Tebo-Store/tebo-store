import cn from 'classnames';
import Image from '@components/ui/image';

interface Props {
  className?: string;
  image_path: string;
  slug: string;
}

const FeaturedCard = ({ className, image_path, slug }: Props) => {
  return (
    <div
      className={cn(
        'h-24 w-24 sm:h-36 sm:w-36 flex-shrink-0 rounded-md flex items-center justify-center',
        className
      )}
    >
      <Image
        src={image_path}
        alt={slug}
        width={150}
        height={100}
        quality={100}
      />
    </div>
  );
};

export default FeaturedCard;
