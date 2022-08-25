interface LinkProps {
  href: string;
  children?: any;
}

export const Link = ({ href, children }: LinkProps) => {
  return (
    <a href={href} target="_blank" style={{ marginRight: '10px' }}>
      {children}
    </a>
  );
};
