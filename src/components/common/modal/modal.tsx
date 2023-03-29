import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { IoClose } from 'react-icons/io5';

type ModalProps = {
  open?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  variant?: 'center' | 'bottom';
};

const Modal: FC<ModalProps> = ({
  children,
  open,
  onClose,
  variant = 'center',
}) => {
  const { t } = useTranslation('common');
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden"
        onClose={onClose}
      >
        <div
          className={cn(
            'min-h-screen flex items-center justify-center lg:px-4 text-center',
            {
              'flex justify-center items-end': variant === 'bottom',
            }
          )}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed bg-skin-base bg-opacity-70 inset-0 z-40 cursor-pointer" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-110"
          >
            <div className="w-full md:w-auto inline-block p-5 overflow-hidden text-start align-middle transition-all transform relative z-50">
              <div className="relative rounded-md">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
