import { IF } from '@/components';
import { FC, useState } from 'react';
import { BtnItem } from './BtnItem';
import styles from './index.less';

export interface LeftBarProps {
  drawingTypeChange?: (value: string) => void;
  drawingLineWidthChange?: (value: number) => void;
  drawingColorChange?: (value: string) => void;
  drawingSizeChange?: (value: number) => void;
  drawingSelectTypeChange?: (value: string) => void;
}

export const LeftBar: FC<LeftBarProps> = (props: LeftBarProps) => {
  const [showLeftBar, setShowLeftBar] = useState<boolean>(true);
  // LeftBar显隐切换
  const showLeftBarToggle = (e: any) => {
    e.preventDefault();
    setShowLeftBar((flag) => {
      return !flag;
    });
  };
  return (
    <div className={styles.leftBarContainer}>
      <p onClick={showLeftBarToggle} className={styles.showLeftBarToggle}>
        工具栏 <span className={styles.showLeftBarToggleIcon}></span>
      </p>
      <IF noDelete condition={showLeftBar}>
        <div className={styles.leftOperationBar}>
          <BtnItem {...props} />
        </div>
      </IF>
    </div>
  );
};
