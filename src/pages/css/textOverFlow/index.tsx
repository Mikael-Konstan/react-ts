import { useState } from 'react';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import styles from './index.less';
import { ArticleLayout, TextOverFlow } from '@/components';

const innerText = 'aASLHD';
const innerText2 = 'aASLHDASLJHDLASHDLSAaASLHDASLJHDLASHD';
const innerText3 =
  'aASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSA';

interface TextOverFlowProps {}

export enum textOverflowEnum {
  SINGLE = 'single',
  MULTI = 'textOverflowMulti',
  NONE = 'none',
}

const textOverFlow = (props: TextOverFlowProps) => {
  const arr = [
    {
      value: textOverflowEnum.SINGLE,
      label: '单行超出省略号',
    },
    {
      value: textOverflowEnum.MULTI,
      label: '多行超出省略号',
    },
    {
      value: textOverflowEnum.NONE,
      label: '不显示省略号',
    },
  ];
  const [textOverflow, setTextOverflow] = useState<textOverflowEnum>(
    textOverflowEnum.SINGLE,
  );
  const title = `琵琶行`;
  const name = `白居易 〔唐代〕`;
  const content = `元和十年，予左迁九江郡司马。明年秋，送客湓浦口，闻舟中夜弹琵琶者，听其音，铮铮然有京都声。问其人，本长安倡女，尝学琵琶于穆、曹二善才，年长色衰，委身为贾人妇。遂命酒，使快弹数曲。曲罢悯然，自叙少小时欢乐事，今漂沦憔悴，转徙于江湖间。予出官二年，恬然自安，感斯人言，是夕始觉有迁谪意。因为长句，歌以赠之，凡六百一十六言，命曰《琵琶行》。
  浔阳江头夜送客，枫叶荻花秋瑟瑟。 主人下马客在船，举酒欲饮无管弦。
  醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声，主人忘归客不发。
  ......... 莫辞更坐弹一曲，为君翻作《琵琶行》。
  感我此言良久立，却坐促弦弦转急。 凄凄不似向前声，满座重闻皆掩泣。
  座中泣下谁最多？江州司马青衫湿。`;

  const onRadioChange = (e: RadioChangeEvent) => {
    setTextOverflow(e.target.value);
  };
  const getClassName = () => {
    if (textOverflow === textOverflowEnum.SINGLE) {
      return styles.textOverflow;
    } else if (textOverflow === textOverflowEnum.MULTI) {
      return styles.textOverflowMulti;
    }
    return '';
  };

  return (
    <ArticleLayout title="文本超出">
      {/* 单行文本超出 */}
      <div className={styles.textContainerAll} style={{ height: '50px' }}>
        <div className={styles.textContainer}>
          <TextOverFlow title="无论长度 显示title" overflowall={true} />
        </div>
        <div className={styles.textContainer}>
          <TextOverFlow title={`不使用antd的Tooltip ${innerText2}`} />
        </div>
        <div className={styles.textContainer}>
          <a
            style={{
              display: 'inline-block',
              width: '100%',
              height: '100%',
            }}
          >
            <TextOverFlow
              title={`使用antd的Tooltip ${innerText3}`}
              Tooltip={true}
              placement="left"
            />
          </a>
        </div>
      </div>
      {/* 多行文本超出 */}
      <div className={styles.textContainerAll}>
        <div className={styles.textContainer}>
          <TextOverFlow title={innerText} />
        </div>
        <div className={styles.textContainer}>
          <TextOverFlow title={innerText2} />
        </div>
        <div className={styles.textContainer}>
          <a
            style={{
              display: 'inline-block',
              width: '100%',
              height: '100%',
            }}
          >
            <TextOverFlow
              title={`多行文字显示省略号 ${innerText3}`}
              Tooltip={true}
              placement="top"
            />
          </a>
        </div>
      </div>

      {/* 样式切换 */}
      <Radio.Group
        buttonStyle="solid"
        onChange={onRadioChange}
        value={textOverflow}
      >
        {arr.map((item) => {
          return (
            <Radio.Button key={item.value} value={item.value}>
              {item.label}
            </Radio.Button>
          );
        })}
      </Radio.Group>
      <div className={`${styles.content} ${getClassName()}`}>
        {title}
        {name}
        {content}
      </div>
    </ArticleLayout>
  );
};

export default textOverFlow;
