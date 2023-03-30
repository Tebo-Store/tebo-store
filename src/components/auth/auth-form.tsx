import { useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { useModalAction } from '@components/common/modal/modal.context';

import Logo from '@components/ui/logo';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';

interface LoginFormProps {
  confirm: (phone: string) => void;
}

const AuthForm: React.FC<LoginFormProps> = ({ confirm }: LoginFormProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>({
    defaultValues: {
      phone: '+998'
    }
  });

  function onSubmit(data: { phone: string }) {
    confirm(data.phone)
  }

  return (
    <div>
      <div className="text-center mb-6">
        <Logo onClick={closeModal} />
        <h2 className="text-xl font-medium mt-4 mb-2">Авторизация</h2>
        <p className="text-sm">Для покупок необходимо авторизоваться</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">

          <Input
            {...register('phone', {
              pattern: {
                value: /^\+998{0,4}\d{10}$/,
                message: 'Невалидный номер телефона'
              }
            })}
            label="Номер телефона"
            id="phone"
            placeholder='+998'
            type="tel"
            variant='solid'
            maxLength={13}
            error={errors.phone?.message}
          />


          <Button
            className="w-full"
            type="submit"
            variant="formButton"
          >
            Авторизоватсься
          </Button>

        </div>
      </form>
    </div>
  );
};

export default AuthForm;
