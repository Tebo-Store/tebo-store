import { useMutation } from 'react-query';

export interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}
async function checkout(input: CheckoutInputType) {
  return input;
}
export const useCheckoutMutation = () => {
  return useMutation((input: CheckoutInputType) => checkout(input), {
    onSuccess: (data) => {
      (data, 'Checkout success response');
    },
    onError: (data) => {
      (data, 'Checkout error response');
    },
  });
};
