import { useState } from 'react';
import Link from '@components/ui/link';
import Scrollbar from '@components/ui/scrollbar';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { IoClose } from 'react-icons/io5';
import { MyCategory } from '@framework/types';
import { useRouter } from 'next/router';

type Locale = 'ru' | 'uz';

const MenuItem = ({ categories }: { categories: MyCategory[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const locale: Locale = router.locale as Locale;

  const toggle = (item: MyCategory) => {
    return () => {
      if (item.descendants) {
        setIsOpen((prevState) => {
          return !prevState;
        });
      }
    };
  };

  return (
    <>
      {categories.map((item) => (
        <li key={item.id}>
          <div
            className="cursor-pointer flex items-center justify-between"
            onClick={toggle(item)}
          >
            <Link href="/">{item[`name_${locale}`]}</Link>

            {item.descendants && item.descendants.length > 0 && (
              <button className="w-7 h-7">
                {isOpen ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </button>
            )}
          </div>
          {item.descendants && item.descendants.length > 0 && (
            <ul
              className={`${isOpen ? 'block' : 'hidden'} space-y-4 mt-4 pl-3`}
            >
              <MenuItem categories={item.descendants} />
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default function MobileMenu({
  categories,
}: {
  categories: MyCategory[];
}) {
  const { closeSidebar } = useUI();

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-skin-base flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
          <div role="button" onClick={closeSidebar} className="inline-flex">
            <Logo />
          </div>

          <button
            className="flex text-2xl items-center justify-center px-4 md:px-5 py-5 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-skin-base mt-0.5" />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow mb-auto">
          <div className="flex flex-col p-5 text-skin-base">
            <ul className="space-y-4">
              <MenuItem categories={categories} />
            </ul>
          </div>
        </Scrollbar>
      </div>
    </>
  );
}
