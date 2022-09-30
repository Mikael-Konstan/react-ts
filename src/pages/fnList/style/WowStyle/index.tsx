import { useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from './../index.less';
import comStyles from '@/pages/common.less';
import Wow from 'wowjs';
import 'animate.css';

interface WowStyleProps {}

export const WowStyle = (props: WowStyleProps) => {
  const [fadeVis, setFadeVis] = useState<boolean>(true);
  useEffect(() => {
    new Wow.WOW({
      offset: 0,
      boxClass: 'wow',
      animateClass: 'animate__animated', //当前版本animate.css,class名称为animate__animated，注意修改【和文档有出入】
      // mobile: true,
      // live: false,
    }).init();
  }, []);
  return (
    <div className={styles.WowStyleContainer}>
      <div className={styles.BtnContainer}>
        <Button
          onClick={() => {
            setFadeVis((fadeVis) => {
              return !fadeVis;
            });
          }}
        >
          bounce
        </Button>
      </div>
      <div
        className={`${comStyles.ModalContainer} wow ${fadeVis ? 'bounce' : ''}`}
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        测试下 animate
      </div>
    </div>
  );
};
