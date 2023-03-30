import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import {
  useModalAction,
} from '@components/common/modal/modal.context';

import CloseButton from '@components/ui/close-button';
import UIButton from '@components/ui/button';

import { toDividePrice } from '@utils/toDividePrice'

export default function ProductCredit() {
  const { closeModal, openModal } = useModalAction();
  const router = useRouter();

  const productPrice = 1000000;
  const margin = 90;

  const minFirstPayment = productPrice * 25 / 100;
  const maxFirstPayment = productPrice * 80 / 100;

  const [month, setMonth] = useState('3');
  const [firstPayment, setFirstPayment] = useState(`${minFirstPayment}`);

  // const { register, getValues, setValue, watch, formState: { errors, isValid } } = useForm<{ firstPayment: string | number }>({
  //   mode: 'onChange',
  //   defaultValues: {
  //     firstPayment: minFirstPayment
  //   },
  // })

  // useEffect(() => {
  //   const subscription = watch(({ firstPayment }) => {
  //     if (firstPayment > maxFirstPayment) {
  //       setValue('firstPayment', maxFirstPayment)
  //     }
  //   })
  //   return () => subscription.unsubscribe();
  // }, [watch])

  const annuetit = useMemo(() => {
    const percent = (margin / 100)
    const BeforeB = Math.pow(1 + Number(percent) / 12, Number(month))
    const A = ((Number(percent) / 12) * Math.pow((1 + Number(percent) / 12), Number(month)))
    const B = BeforeB - 1

    return A / B;
  }, [month])

  const monthlyPayment = useMemo(() => {
    return Math.round(annuetit * (productPrice - Number(firstPayment)) / 1000) * 1000
  }, [annuetit, productPrice, firstPayment])

  const totalPrice = useMemo(() => {
    return (Math.round(annuetit * (productPrice - Number(firstPayment)) / 1000) * 1000) * Number(month) + Number(firstPayment)
  }, [annuetit, productPrice, month, firstPayment])

  // const monthlyPayment = useMemo(() => {
  //   console.log(getValues().firstPayment);

  //   return Math.round(annuetit * (productPrice - Number(getValues().firstPayment)) / 1000) * 1000
  // }, [annuetit, productPrice, getValues().firstPayment])

  // const totalPrice = useMemo(() => {
  //   console.log(getValues().firstPayment);
  //   return (Math.round(annuetit * (productPrice - Number(getValues().firstPayment)) / 1000) * 1000) * Number(month) + Number(getValues().firstPayment)
  // }, [annuetit, productPrice, month, getValues().firstPayment])

  return (
    <div className="p-5 w-full md:w-[450px] bg-skin-fill rounded-lg shadow-dropDown">
      <CloseButton onClick={closeModal} />

      <div className='mb-4'>
        <h2 className="text-lg font-bold">Купить в рассрочку</h2>

        <div>Сам продукт</div>
        <div>Цена продукта: {productPrice}</div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <div className="flex items-center justify-between">
            <span className="text-xs">3 мес.</span>
            <span className="text-base font-medium">{month} мес.</span>
            <span className="text-xs">12 мес.</span>
          </div>

          <input
            className="w-full cursor-pointer range-lg"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            type="range"
            min="3"
            max="12"
            step="3"
          />
        </label>

        <label className='block'>
          <div className="flex items-center justify-between">
            <span className="text-xs">{toDividePrice(minFirstPayment)}</span>
            <span className="text-base font-medium">{toDividePrice(+firstPayment)}</span>
            <span className="text-xs">{toDividePrice(maxFirstPayment)}</span>
          </div>

          <input
            className="w-full cursor-pointer range-lg"
            value={firstPayment}
            onChange={(e) => setFirstPayment(e.target.value)}
            type="range"
            min={minFirstPayment}
            max={maxFirstPayment}
            step='1000'
          />
        </label>
      </div>
      {/* 
        <UIInput
          id='first-payment'
          variant="solid"
          label='Первоначальный взнос'
          type="number"
          {...register('firstPayment', {
            required: `Минимальная сумма: ${minFirstPayment}`,
            min: {
              value: minFirstPayment,
              message: `Минимальная сумма: ${minFirstPayment}`
            },
            max: {
              value: maxFirstPayment,
              message: `Максимальная сумма: ${maxFirstPayment}`
            }
          })}
          error={errors.firstPayment?.message}
        /> */}



      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-base mr-2">Ежемесячный платеж</span>

          <span className="md:text-lg font-medium">{toDividePrice(monthlyPayment)} сум</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-base mr-2">Общая сумма</span>
          <span className="md:text-lg font-medium">{toDividePrice(totalPrice)} сум</span>
        </div>
      </div>

      <UIButton
        className="w-full mt-4"
        onClick={() => {
          closeModal()
          router.push('installment');
        }}
      >
        Оформить в рассрочку
      </UIButton>
    </div>
  );
}
