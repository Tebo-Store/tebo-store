import Counter from '@components/ui/counter';

import { useShoppingCart } from '@contexts/myCart/cart';

interface Props {
  data: any;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = ({ data, variation, disabled }: Props) => {
  const { increaseCartQuantity, decreaseCartQuantity, getItem } =
    useShoppingCart();

  const item = getItem(data);

  if (!item) {
    return (
      <button
        onClick={() => {
          increaseCartQuantity(data);
        }}
        className="text-sm py-2 px-4 bg-skin-inverted text-skin-base border border-skin-four active:bg-skin-four rounded font-semibold cursor-pointer transition ease-in-out duration-300"
      >
        В один клик
      </button>
    );
  } else {
    return (
      <Counter
        value={item.qty}
        onDecrement={() => decreaseCartQuantity(data)}
        onIncrement={() => increaseCartQuantity(data)}
        disabled={data.quantity <= item.qty}
      />
    );
  }
};
