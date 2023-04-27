import classNames from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

const Link: React.FC<
  NextLinkProps & { className?: string; children: React.ReactNode }
> = ({ href, children, className, ...props }) => {
  return (
    <NextLink href={href}>
      <a className={classNames(className)} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
