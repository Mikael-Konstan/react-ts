import { useRef, useState } from 'react';
import { Button } from 'antd';
import styles from './../index.less';
import { IF, Link } from '@/components';
import comStyles from '@/pages/common.less';
import { CheckCircleTwoTone } from '@ant-design/icons';
import 'animate.css';

interface AnimationCssProps {}

export const AnimationCss = (props: AnimationCssProps) => {
  const [className, setClassName] = useState<string>('');
  const divRef = useRef<HTMLDivElement | null>(null);
  const classNames = [
    'bounce',
    'bounceInRight',
    'bounceIn',
    'bounceInUp',
    'bounceInDown',
    'slideInUp',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'lightSpeedIn',
    'pulse',
    'flipInX',
    'flipInY',
    'shake',
    'wobble',
    'rollIn',
    'fadeInUpBig',
  ];
  const onClick = (type: string) => {
    if (!divRef.current) return;
    setClassName('animate__' + type);
    setTimeout(() => {
      setClassName('');
    }, 3000);
  };
  return (
    <div className={styles.AnimationCssContainer}>
      <h1>
        <Link href="http://www.animate.net.cn/">Animate(V4)中文网</Link>
        <br />
        <Link href="https://www.dowebok.com/demo/2014/98/">在线演示一</Link>
        <br />
        <Link href="https://www.jq22.com/yanshi819">在线演示二</Link>
        <br />
        <Link href="https://github.com/animate-css/animate.css">
          animate.css github
        </Link>
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <div className={styles.BtnContainer}>
          <div className={comStyles.ModalContainer}>
            Ready
            <IF condition={className === ''}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ marginLeft: '10px', fontSize: '16px' }}
              />
            </IF>
          </div>
          {classNames.map((className) => {
            return (
              <Button key={className} onClick={() => onClick(className)}>
                {className}
              </Button>
            );
          })}
        </div>
        <div
          className={`${comStyles.ModalContainer} ${styles.AnimateCssContainer}`}
        >
          <div ref={divRef} className={`animate__animated ${className}`}>
            测试下 animate
          </div>
        </div>
      </div>
    </div>
  );
};
