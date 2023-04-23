import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { MdKeyboardArrowDown } from 'react-icons/md';

export default function LanguageSwitcher() {
  const { site_header } = siteSettings;
  const { t } = useTranslation('common');
  const options = site_header.languageMenu;
  const router = useRouter();
  const { asPath, locale } = router;
  const currentSelectedItem = locale
    ? options.find((o) => o.value === locale)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    setSelectedItem(values);
    router.push(asPath, undefined, {
      locale: values.value,
    });
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative z-10 lg:top-[1px]">
          <Listbox.Button className="text-skin-base relative w-full text-start  rounded-lg shadow-md focus:outline-none cursor-pointer">
            <span className="flex border p-2 rounded truncate items-center text-sm lg:text-15px">
              <span className="leading-5 mr-1">{t(selectedItem.name)}</span>
              <MdKeyboardArrowDown size={20} />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute right-0 top-full w-full py-1 mt-1 bg-skin-fill rounded-md shadow-dropDown max-h-60 focus:outline-none text-sm min-w-[100px]"
            >
              {options?.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-skin-base bg-skin-dropdown-hover'
                        : 'text-skin-base'
                    }
												cursor-pointer relative py-2 px-3`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span
                      className={`${
                        selected ? 'font-medium ' : 'font-normal'
                      } block truncate ms-1.5 text-sm pb-0.5`}
                    >
                      {t(option.name)}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
