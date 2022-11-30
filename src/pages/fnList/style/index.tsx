import { useEffect } from 'react';
import { useLocation } from 'umi';
import { Tabs } from 'antd';
import styles from './index.less';
import { StaticStyle } from './StaticStyle';
import { AnimationStyle } from './AnimationStyle';
import { AnimationCss } from './AnimationCss';
import { WowStyle } from './WowStyle';

const { TabPane } = Tabs;

interface StyleProps {}

const Style = (props: StyleProps) => {
  const Location: any = useLocation();
  useEffect(() => {
    // 接参
    const query = Location?.query;
    const state = Location?.state;
    console.log(Location);
    console.log(query);
    console.log(state);
  }, [Location]);
  return (
    <div className={styles.StyleContainer}>
      <h1>Style</h1>

      <Tabs defaultActiveKey="StaticStyle">
        <TabPane tab="静态样式" key="StaticStyle">
          <StaticStyle />
        </TabPane>
        {/* <TabPane tab="手写动画" key="AnimationStyle">
          <AnimationStyle />
        </TabPane> */}
        <TabPane tab="animate.css(4.1.1)动画" key="AnimationCss">
          <AnimationCss />
        </TabPane>
        {/* <TabPane tab="Wow动画" key="WowStyle">
          <WowStyle />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default Style;
