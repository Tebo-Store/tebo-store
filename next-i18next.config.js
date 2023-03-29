const path = require('path');

module.exports = {
  i18n: {
    locales: ['uz', 'ru'],
    defaultLocale: 'uz',
  },
  localePath: path.resolve('./public/locales'),
};
