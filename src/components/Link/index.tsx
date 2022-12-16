interface LinkProps {
  href: string;
  target?: string;
  children?: any;
}

export const Link = ({ href, target = '_blank', children }: LinkProps) => {
  return (
    <a href={href} target={target} style={{ marginRight: '10px' }}>
      {children}
    </a>
  );
};
