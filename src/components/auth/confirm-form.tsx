import { useForm } from "react-hook-form"
import { useUI } from "@contexts/ui.context";

import Button from "@components/ui/button"
import Input from "@components/ui/input"

interface ConfirmFormProps {
    phone: string;
}

const ConfirmForm = ({ phone }: ConfirmFormProps) => {
    const { authorize } = useUI()

    const { register, handleSubmit, formState: { errors } } = useForm<{ code: string }>()

    const onSubmit = (data: { code: string }) => {
        authorize()
    }

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-xl font-medium mb-2">Подтверждение СМС-кода</h2>
                <p>Введите СМС-код отправленный на номер {phone}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register('code', {
                        required: {
                            value: true,
                            message: 'Поле обязательно для заполнения'
                        },
                        minLength: {
                            value: 4,
                            message: 'СМС код должен содержать 4 цифры'
                        },
                        pattern: {
                            value: /^\d+$/,
                            message: 'Код должен состояить только из цифр'
                        }
                    })}
                    label="СМС код"
                    id="code"
                    type="tel"
                    variant='solid'
                    maxLength={4}
                    error={errors.code?.message}
                />

                <Button className="w-full mt-4">
                    Подтвердить
                </Button>
            </form>
        </div>
    )
}

export default ConfirmForm