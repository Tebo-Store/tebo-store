import Link from '@components/ui/link';
import { IoIosArrowForward } from 'react-icons/io';
import { MyCategory } from '@framework/types';
import { useRouter } from 'next/router';

type Locale = 'ru' | 'uz';

function SidebarMenuItem({ data }: { data: MyCategory[] }) {
  const router = useRouter();
  const locale: Locale = router.locale as Locale;

  return (
    <>
      {data.map((item) => (
        <li className="category-item" key={item.id}>
          <Link
            className="flex items-center justify-between p-2 px-4 transition"
            href="/"
          >
            <span>{item[`name_${locale}`]}</span>

            {item.descendants && item.descendants.length > 0 && (
              <IoIosArrowForward className="ml-2" />
            )}
          </Link>

          {item.descendants && item.descendants.length > 0 && (
            <ul className="py-2 hidden w-full absolute top-0 left-[300px] min-h-full bg-white shadow-card rounded-lg">
              <SidebarMenuItem data={item.descendants} />
            </ul>
          )}
        </li>
      ))}
    </>
  );
}

function SidebarMenu({ items }: { items: MyCategory[] }) {
  return (
    <ul className="py-2 absolute top-[calc(100%+4px)] left-0 w-[300px] bg-white rounded-lg shadow-card">
      <SidebarMenuItem data={items} />
    </ul>
  );
}

export default SidebarMenu;
