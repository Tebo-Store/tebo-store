import { useModalAction } from '@components/common/modal/modal.context';

import AuthForm from './auth-form';
import ConfirmForm from './confirm-form';

import CloseButton from '@components/ui/close-button';
import { useState } from 'react';


const AuthModal = () => {
    const { closeModal } = useModalAction()
    const [smsConfirmationView, setSmsConfirmationView] = useState<Boolean>(false)
    const [phone, setPhone] = useState<string>('');

    const handleConfirm = (phone: string) => {
        setPhone(phone)
        setSmsConfirmationView(true)
    }

    return <div className="md:w-[450px] p-5 bg-skin-fill rounded-lg shadow-dropDown'flex flex-col justify-center">
        <CloseButton onClick={closeModal} />
        {
            smsConfirmationView ?
                <ConfirmForm phone={phone} />
                :
                <AuthForm confirm={handleConfirm} />
        }
    </div>
}

export default AuthModal;