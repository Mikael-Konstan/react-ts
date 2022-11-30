declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.webp';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module 'wowjs' {
  const content: any;
  export = content;
}
