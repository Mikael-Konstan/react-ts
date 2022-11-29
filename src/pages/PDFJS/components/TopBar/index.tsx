import { TextOverFlow } from '@/components/TextOverFlow';
import { FileInfoContext } from '@/pages/PDFJS/context';
import { DownloadOutlined } from '@ant-design/icons';
import { Divider, Button, Tooltip } from 'antd';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useCompToPDF } from './../hooks/index';
import './index.less';

export interface TopBarProps {
  rightListType: string;
  showLeftBarToggle: () => void;
  visionMarkShowOnChange: (show: boolean) => void;
  setRightListType: (type: string) => void;
}

export const TopBar: FC<TopBarProps> = (props: TopBarProps) => {
  const fileInfo = useContext(FileInfoContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [visionListVis, setVisionListVis] = useState<boolean>(false);
  const fileListRef = useRef<HTMLDivElement | null>(null);
  const versionListRef = useRef<HTMLDivElement | null>(null);
  const { exportPDF } = useCompToPDF({});
  useEffect(() => {
    const selectToggle = (e: any) => {
      const fileListFlag = fileListRef.current?.contains(e.target);
      const versionListFlag = versionListRef.current?.contains(e.target);
      if (!fileListFlag) {
        setVisible(false);
      }
      if (!versionListFlag) {
        setVisionListVis(false);
      }
    };
    document.body.addEventListener('click', selectToggle, true);
    return () => {
      document.body.removeEventListener('click', selectToggle, true);
    };
  }, []);

  const downloadPdf = () => {
    exportPDF(document.getElementById('canvasContainer'), fileInfo.name);
  };
  return (
    <div className="topOperationBar">
      <span className="topOperationBarRight">
        {/* 下载 */}
        <Tooltip title="下载正在查看版本">
          <Button
            className="topBarBtn topBarDownload"
            onClick={() => {
              downloadPdf();
            }}
          >
            <DownloadOutlined type="icon-xiazai2" />
            下载
          </Button>
        </Tooltip>
        <Divider
          type="vertical"
          style={{ height: '30px', margin: ' 1px 28px 1px' }}
        />
        {/* 标注 */}
        <span
          className={`topBarMark ${
            props.rightListType === 'markList' ? 'topBarMarkActive' : ''
          }`}
          onClick={() => {
            const type = props.rightListType === 'markList' ? '' : 'markList';
            props.setRightListType(type);
          }}
        >
          标注
        </span>
      </span>
    </div>
  );
};
