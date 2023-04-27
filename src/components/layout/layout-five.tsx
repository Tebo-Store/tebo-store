import { useSessionStorage } from 'react-use';
import Link from '@components/ui/link';
import HighlightedBar from '@components/common/highlighted-bar';
import Header from '@components/layout/header/header-five';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import { IoChevronForwardCircleOutline } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';

const Layout = ({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) => {
  const { t } = useTranslation('common');
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'borobazar-highlightedBar',
    'false'
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* End of highlighted bar  */}

      <Header categories={pageProps.categories} />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation categories={pageProps.categories} />
    </div>
  );
};

export default Layout;
