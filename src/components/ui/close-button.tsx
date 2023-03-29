import { IoClose } from 'react-icons/io5';
import cn from 'classnames';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

interface CloseButtonProps {
  className?: string;
  onClick?: ButtonEvent;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close Button"
      className={cn(
        'absolute top-2 right-2 z-10 inline-flex items-center justify-center w-8 h-8 transition duration-200 text-skin-base text-opacity-50 focus:outline-none hover:text-opacity-100',
        className
      )}
    >
      <IoClose className="text-xl lg:text-2xl" />
    </button>
  );
};

export default CloseButton;
