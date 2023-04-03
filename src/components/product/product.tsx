import { useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { useShoppingCart } from '@contexts/myCart/cart';
import { useModalAction } from '@components/common/modal/modal.context';

const ProductSingleDetails: React.FC = () => {
  const { decreaseCartQuantity, increaseCartQuantity, getItem } =
    useShoppingCart();

  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { width } = useWindowSize();
  const { data, isLoading } = useProductQuery(slug as string);
  const { openModal } = useModalAction();

  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.sale_price ? data.sale_price : data.price,
      baseAmount: data.price,
      currencyCode: 'USD',
    }
  );
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) return <p>Loading...</p>;
  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = data?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(data!, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(data!, selectedVariation);
    addItemToCart(item, quantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function addToWishlist() {
    // to show btn feedback while product wishlist
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="lg:grid grid-cols-10 gap-7 2xl:gap-8">
        <div className="col-span-5 xl:col-span-6 overflow-hidden mb-6 md:mb-8 lg:mb-0">
          {!!data?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={data?.gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="w-auto flex items-center justify-center">
              <Image
                src={data?.image?.original ?? '/product-placeholder.svg'}
                alt={data?.name!}
                width={900}
                height={680}
              />
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-col col-span-5 xl:col-span-4 xl:ps-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300">
                {data?.name}
              </h2>
            </div>
            {/* {data?.unit && isEmpty(variations) ? (
              <div className="text-sm md:text-15px font-medium">
                {data?.unit}
              </div>
            ) : (
              <VariationPrice
                selectedVariation={selectedVariation}
                minPrice={data?.min_price}
                maxPrice={data?.max_price}
              />
            )} */}

            {isEmpty(variations) && (
              <div className="flex items-center mt-5">
                <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
                  {price}
                </div>
                {discount && (
                  <del className="text-sm md:text-15px ps-3 text-skin-base text-opacity-50">
                    {basePrice}
                  </del>
                )}
              </div>
            )}
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            {getItem(data) ? (
              <Counter
                variant="single"
                value={getItem(data)?.qty}
                onIncrement={() => increaseCartQuantity(data)}
                onDecrement={() => decreaseCartQuantity(data)}
                disabled={data.quantity <= getItem(data).qty}
              />
            ) : (
              <Button
                variant="border"
                onClick={() => increaseCartQuantity(data)}
                className="w-full px-1.5"
                loading={addToCartLoader}
              >
                Купить в один клик
              </Button>
            )}

            <Button
              onClick={() => {
                openModal('PRODUCT_CREDIT', data);
              }}
              className="w-full px-1.5"
            >
              В рассрочку
            </Button>
          </div>
          {data?.tag && (
            <ul className="pt-5 xl:pt-6">
              <li className="text-sm md:text-15px text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
                <LabelIcon className="me-2" /> {t('text-tags')}:
              </li>
              {data?.tag?.map((item: any) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ProductDetailsTab />
    </div>
  );
};

export default ProductSingleDetails;
