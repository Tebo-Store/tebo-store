export const siteSettings = {
  name: 'Tebo',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: 'TeboStore',
    websiteUrl: 'https://tebo.uz',
    address: '',
  },
  logo: {
    url: '/assets/images/logo.png',
    alt: 'BoroBazar',
    href: '/',
    width: 120,
    height: 40,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    menu: [
      {
        id: 2,
        path: '/search',
        label: 'menu-categories',
        subMenu: [
          {
            id: 1,
            path: '/search',
            label: 'menu-fresh-vegetables',
          },
          {
            id: 2,
            path: '/search',
            label: 'menu-diet-nutrition',
          },
          {
            id: 3,
            path: '/search',
            label: 'menu-healthy-foods',
          },
          {
            id: 4,
            path: '/search',
            label: 'menu-grocery-items',
          },
          {
            id: 5,
            path: '/search',
            label: 'menu-beaf-steak',
          },
        ],
      },
      {
        id: 3,
        path: '/search',
        label: 'menu-dietary',
        subMenu: [
          {
            id: 1,
            path: '/search',
            label: 'menu-vegetarian',
          },
          {
            id: 2,
            path: '/search',
            label: 'menu-kakogenic',
          },
          {
            id: 3,
            path: '/search',
            label: 'menu-mediterranean',
          },
          {
            id: 4,
            path: '/search',
            label: 'menu-organic',
          },
        ],
      },
      {
        id: 4,
        path: '/search/',
        label: 'menu-search',
      },
      {
        id: 5,
        path: '/shops/',
        label: 'menu-shops',
      },
      {
        id: 6,
        path: '/',
        label: 'menu-pages',
        subMenu: [
          {
            id: 1,
            path: '/',
            label: 'menu-users',
            subMenu: [
              {
                id: 1,
                path: '/my-account/account-settings',
                label: 'menu-my-account',
              },
              {
                id: 2,
                path: '/signin',
                label: 'menu-sign-in',
              },
              {
                id: 3,
                path: '/signup',
                label: 'menu-sign-up',
              },
            ],
          },
          {
            id: 2,
            path: '/faq',
            label: 'menu-faq',
          },
          {
            id: 3,
            path: '/about-us',
            label: 'menu-about-us',
          },
          {
            id: 4,
            path: '/privacy',
            label: 'menu-privacy-policy',
          },
          {
            id: 5,
            path: '/terms',
            label: 'menu-terms-condition',
          },
          {
            id: 6,
            path: '/contact-us',
            label: 'menu-contact-us',
          },
          {
            id: 7,
            path: '/checkout',
            label: 'menu-checkout',
          },
          {
            id: 8,
            path: '/404',
            label: 'menu-404',
          },
        ],
      },
    ],
    languageMenu: [
      {
        id: 'uz',
        name: `O'zbek`,
        value: 'uz',
      },
      {
        id: 'ru',
        name: 'Русский',
        value: 'ru',
      },
    ],
  },
};
