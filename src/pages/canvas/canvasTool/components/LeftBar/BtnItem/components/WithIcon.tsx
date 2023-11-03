export interface WidthIconProps {
  widthIconHeight: string;
}

export const WidthIcon = (props: WidthIconProps): JSX.Element => {
  const height = parseInt(props.widthIconHeight);
  return (
    <span
      style={{
        display: 'inline-block',
        width: '20px',
        height: props.widthIconHeight,
        margin: `${(16 - height) / 2}px 0`,
        backgroundColor: '#333333',
      }}
    ></span>
  );
};
