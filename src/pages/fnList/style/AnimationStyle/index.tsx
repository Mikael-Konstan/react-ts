import { useState } from 'react';
import { Button } from 'antd';
import styles from './../index.less';
import mixins from '@/styles/mixins.less';

interface AnimationStyleProps {}

export const AnimationStyle = (props: AnimationStyleProps) => {
  const [fadeVis, setFadeVis] = useState<boolean>(true);
  const [rightVis, setRightVis] = useState<boolean>(true);
  const title = `琵琶行`;
  const name = `白居易 〔唐代〕`;
  const content = `元和十年，予左迁九江郡司马。明年秋，送客湓浦口，闻舟中夜弹琵琶者，听其音，铮铮然有京都声。问其人，本长安倡女，尝学琵琶于穆、曹二善才，年长色衰，委身为贾人妇。遂命酒，使快弹数曲。曲罢悯然，自叙少小时欢乐事，今漂沦憔悴，转徙于江湖间。予出官二年，恬然自安，感斯人言，是夕始觉有迁谪意。因为长句，歌以赠之，凡六百一十六言，命曰《琵琶行》。
  浔阳江头夜送客，枫叶荻花秋瑟瑟。 主人下马客在船，举酒欲饮无管弦。
  醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声，主人忘归客不发。
  ......... 莫辞更坐弹一曲，为君翻作《琵琶行》。
  感我此言良久立，却坐促弦弦转急。 凄凄不似向前声，满座重闻皆掩泣。
  座中泣下谁最多？江州司马青衫湿。`;
  return (
    <div className={styles.StyleContainer}>
      <div className={styles.DataListContainer}>
        <div className={styles.animationFade}>
          <div className={styles.title}>淡入淡出</div>
          <div
            className={`${styles.content} ${
              fadeVis ? mixins.fadeIn : mixins.fadeOut
            }`}
          >
            <p>{title}</p>
            <p>{name}</p>
          </div>
        </div>
      </div>
      <div className={styles.BtnContainer}>
        <Button
          onClick={() => {
            setFadeVis((fadeVis) => {
              return !fadeVis;
            });
          }}
        >
          淡入淡出
        </Button>
        <Button
          onClick={() => {
            setRightVis((rightVis) => {
              return !rightVis;
            });
          }}
        >
          右侧划进划出
        </Button>
      </div>
      <div
        className={`${styles.rightContainer} ${
          rightVis ? mixins.rightIn : mixins.rightOut
        }`}
      >
        <p>{title}</p>
        <p>{name}</p>
        <div>{content}</div>
      </div>
    </div>
  );
};
