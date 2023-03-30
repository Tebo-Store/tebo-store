import LogoutIcon from '@components/icons/logout';
import UserIcon from '@components/icons/user-icon';
import Link from '@components/ui/link';
import React from 'react';

interface Props {
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
  logout: () => void;
}

const AuthMenu: React.FC<Props> = ({
  isAuthorized,
  btnProps,
  logout
}) => {
  return isAuthorized ? (
    <button
      onClick={logout}
      className="flex items-start"
    >
      <LogoutIcon />
      <span
        className="hidden mt-[2px] lg:block text-sm lg:text-15px text-skin-base font-normal focus:outline-none ms-2"
        aria-label="Authentication"
      >Выйти</span>
    </button>
  ) : (
    <button {...btnProps} className="flex items-center">
      <UserIcon className="text-skin-base text-opacity-40" />
      <span
        className="hidden lg:block text-sm lg:text-15px text-skin-base font-normal focus:outline-none ms-2"
        aria-label="Authentication"
      >Войти</span>
    </button>
  );
};

export default AuthMenu;
