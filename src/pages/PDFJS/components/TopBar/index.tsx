import { FileInfoContext } from '@/pages/PDFJS/context';
import { DownloadOutlined } from '@ant-design/icons';
import { Divider, Button } from 'antd';
import { FC, useContext } from 'react';
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
  const { exportPDF } = useCompToPDF({});

  const downloadPdf = () => {
    exportPDF(document.getElementById('canvasContainer'), fileInfo.name);
  };
  return (
    <div className="topOperationBar">
      <span className="topOperationBarRight">
        {/* 下载 */}
        <Button className="topBarBtn topBarDownload" onClick={downloadPdf}>
          <DownloadOutlined />
          下载
        </Button>
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
