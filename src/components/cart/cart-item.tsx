import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { ROUTES } from '@utils/routes';
import Counter from '@components/ui/counter';
import { useShoppingCart } from '@contexts/myCart/cart';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const {
    decreaseCartQuantity,
    increaseCartQuantity,
    getItem,
    removeProductFromCart,
  } = useShoppingCart();

  const itemCart = getItem(item);

  return (
    <div
      className={`group w-full h-auto flex justify-start items-center bg-skin-fill py-4 md:py-7 border-b border-skin-one border-opacity-70 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex rounded overflow-hidden flex-shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={item?.image.original ?? '/assets/placeholder/cart-item.svg'}
          width={100}
          height={100}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="object-cover bg-skin-thumbnail"
        />
        <div
          className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
          onClick={() => removeProductFromCart(item)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex w-full overflow-hidden items-start justify-between">
        <div className="ps-3 md:ps-4">
          <Link
            href={`${ROUTES.PRODUCT}/${item?.slug}`}
            className="block text-skin-base text-13px sm:text-sm lg:text-15px transition-all leading-5 hover:text-skin-primary"
          >
            {item?.name}
          </Link>
          <div className="text-13px sm:text-sm text-skin-muted mt-1.5 block mb-2">
            {itemCart &&
              (item.sale_price
                ? item.sale_price * itemCart.qty
                : item.price * itemCart.qty
              ).toFixed(2)}{' '}
            X {item.qty}
          </div>
          {itemCart && (
            <Counter
              value={itemCart.qty}
              onIncrement={() => increaseCartQuantity(item)}
              onDecrement={() => decreaseCartQuantity(item)}
              variant="cart"
              disabled={item.quantity <= itemCart.qty}
            />
          )}
        </div>
        {itemCart && (
          <div className="flex font-semibold text-sm md:text-base text-skin-base leading-5 flex-shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
            {item.sale_price ? item.sale_price : item.price}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
