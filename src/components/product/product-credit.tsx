import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { useMemo, useState } from 'react';

import UIInput from '@components/ui/input';
import UIButton from '@components/ui/button';
import { useRouter } from 'next/router';

export default function ProductCredit() {
  const { closeModal, openModal } = useModalAction();
  const productPrice = 3423000;

  const [month, setMonth] = useState('3');
  const [price, setPrice] = useState(`${productPrice * 25 / 100}`);

  const annuetit = useMemo(() => {
    return () => {
      const margin = (Number(90) / 100)
      const BeforeB = Math.pow(1 + Number(margin) / 12, Number(month))
      const A = ((Number(margin) / 12) * Math.pow((1 + Number(margin) / 12), Number(month)))
      const B = BeforeB - 1

      return A / B;

      // ((Маржа в %/12) * (1+ Маржа в %/12 )^Срок договора )/((1+ Маржа в %/12 )^Срок договора  - 1)
      // annuity () {
      //   if (!this.contract.margin)
      //     return 0

      //   if (!this.contract.period)
      //     return 0

      //   const margin = (Number(this.contract.margin) / 100)
      //   const BeforeB = Math.pow(1 + Number(margin) / 12, Number(this.contract.period))
      //   const A = ((Number(margin) / 12) * Math.pow((1 + Number(margin) / 12), Number(this.contract.period)))
      //   const B = BeforeB - 1

      //   return A / B
      // },
    }
  }, [month])

  const router = useRouter();



  return (
    <div className="p-5 w-full md:w-[450px] bg-skin-fill rounded-lg shadow-dropDown">
      <CloseButton onClick={closeModal} />

      <h2 className="text-lg font-bold">Купить в рассрочку</h2>

      <div>Сам продукт</div>
      <div>Цена продукта: {productPrice}</div>

      <hr className="divide-x-0 my-2" />

      <div className="space-y-3">
        <label className="block">
          <div className="flex items-center justify-between">
            <span className="text-xs">3 мес.</span>
            <span className="text-base font-medium">{month} мес.</span>
            <span className="text-xs">12 мес.</span>
          </div>

          <input
            className="w-full cursor-pointer"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            type="range"
            min="3"
            max="12"
            step="3"
          />
        </label>

        <label className="block">
          <span className="text-xs">Первоначальный взнос</span>
          <UIInput
            variant="solid"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="number"
          />
        </label>
      </div>

      <hr className="my-4" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-base mr-2">Ежемесячный платеж</span>

          <span className="md:text-lg font-medium">{Math.round(annuetit() * (productPrice - Number(price)) / 1000) * 1000}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-base mr-2">Общая сумма</span>
          <span className="md:text-lg font-medium">{(Math.round(annuetit() * (productPrice - Number(price)) / 1000) * 1000) * Number(month) + Number(price)}</span>
        </div>
      </div>

      <UIButton
        onClick={() => {
          console.log('open modal');
          // openModal('LOGIN_VIEW');
          router.push('installment');
          closeModal()
        }}
        className="w-full mt-4"
      >
        Оформить в рассрочку
      </UIButton>
    </div>
  );
}
