import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import SidebarMenu from '@components/ui/sidebar-menu';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';
import CategoryMenu from '@components/ui/category-menu';
import { MyCategory } from '@framework/types';

interface CategoryDropdownProps {
  className?: string;
  categories: MyCategory[];
}

const CategoryDropdownMenu: React.FC<CategoryDropdownProps> = ({
  className,
  categories,
}) => {
  return <CategoryMenu items={categories} />;
};

export default CategoryDropdownMenu;
