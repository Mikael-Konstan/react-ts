import { MessageBus, MessageBusContext } from '@/utils/context';
import {
  FileInfoContext,
  FileInfoContextType,
  FileInfoInit,
} from '@/pages/canvas/canvasTool/context';
import { FC, useEffect, useMemo, useState } from 'react';
// import { KeepAlive } from 'umi';
import PdfJsAll from './components/pdfJsAll';
import PictureCanvas from './components/pictureCanvas';
import './index.less';

interface MarkPictureProps {}

const MarkPicture: FC<MarkPictureProps> = (props) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const messageBus = useMemo(() => new MessageBus(), []);
  const [fileInfo, setFileInfo] = useState<FileInfoContextType>(FileInfoInit);

  useEffect(() => {
    // 林间小路
    setFileUrl(
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-12-22%2F5c1db17e19398.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672304027&t=cebfdf086b1a34955f3100850efd3a6f',
    );
    // 雪山
    setFileUrl(
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1113%2F052420110515%2F200524110515-2-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672305086&t=f1d5aece1c5991a1f75d8bb6f2bfc447',
    );
    setFileUrl(
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F57d3d3f0068ca.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672305722&t=f0a85d6adf252c1e338d5df0de476a81',
    );
    const updateFileInfo = messageBus.on('setFileInfo', (data: any) => {
      setFileInfo((fileInfo) => {
        return {
          ...fileInfo,
          ...data,
        };
      });
    });
    return () => {
      updateFileInfo && updateFileInfo();
    };
  }, []);

  return (
    <>
      <MessageBusContext.Provider value={messageBus}>
        <FileInfoContext.Provider value={fileInfo}>
          {fileInfo.suffix === 'pdf' ? (
            <PdfJsAll pdfUrl={fileUrl}></PdfJsAll>
          ) : (
            <PictureCanvas imgUrl={fileUrl}></PictureCanvas>
          )}
        </FileInfoContext.Provider>
      </MessageBusContext.Provider>
    </>
  );
};

// const KeepAliveR: any = KeepAlive;
// const KeepAliveC = () => (
//   <KeepAliveR name={location.pathname} id={location.pathname}>
//     <MarkPicture></MarkPicture>
//   </KeepAliveR>
// );

// export default KeepAliveC;
export default MarkPicture;
