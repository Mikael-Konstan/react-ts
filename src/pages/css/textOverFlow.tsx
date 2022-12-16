import styles from './index.less';
import mixins from '@/styles/mixins.less';
import comStyles from '@/pages/common.less';
import { ArticleLayout, TextOverFlow } from '@/components';

const innerText = 'aASLHD';
const innerText2 = 'aASLHDASLJHDLASHDLSAaASLHDASLJHDLASHD';
const innerText3 =
  'aASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSAaASLHDASLJHDLASHDLSA';

interface TextOverFlow {}

const textOverFlow = (props: TextOverFlow) => {
  const title = `琵琶行`;
  const name = `白居易 〔唐代〕`;
  const content = `元和十年，予左迁九江郡司马。明年秋，送客湓浦口，闻舟中夜弹琵琶者，听其音，铮铮然有京都声。问其人，本长安倡女，尝学琵琶于穆、曹二善才，年长色衰，委身为贾人妇。遂命酒，使快弹数曲。曲罢悯然，自叙少小时欢乐事，今漂沦憔悴，转徙于江湖间。予出官二年，恬然自安，感斯人言，是夕始觉有迁谪意。因为长句，歌以赠之，凡六百一十六言，命曰《琵琶行》。
  浔阳江头夜送客，枫叶荻花秋瑟瑟。 主人下马客在船，举酒欲饮无管弦。
  醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声，主人忘归客不发。
  ......... 莫辞更坐弹一曲，为君翻作《琵琶行》。
  感我此言良久立，却坐促弦弦转急。 凄凄不似向前声，满座重闻皆掩泣。
  座中泣下谁最多？江州司马青衫湿。`;
  return (
    <ArticleLayout title="文本超出">
      {/* 单纯样式 */}
      <div className={styles.DataListContainer}>
        <div className={styles.single}>
          <div className={styles.title}>单行超出省略号</div>
          <div className={styles.content}>{content}</div>
        </div>
        <div className={styles.multi}>
          <div className={styles.title}>多行超出省略号</div>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
      {/* 多行文本超出 */}
      <div className={comStyles.ModalContainer}>
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
      </div>
      {/* 单行文本超出 */}
      <div className={comStyles.ModalContainer}>
        <div className={styles.textContainerAll} style={{ height: '50px' }}>
          <div className={styles.textContainer}>
            <TextOverFlow title="无视长度 显示title" OverFlowAll={true} />
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
      </div>
    </ArticleLayout>
  );
};

export default textOverFlow;
