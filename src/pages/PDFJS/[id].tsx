import { MessageBus, MessageBusContext } from '@/utils/context';
import { fileDomain } from '@/global.config';
import {
  FileInfoContext,
  FileInfoContextType,
  FileInfoInit,
} from '@/pages/PDFJS/context';
import { FC, useEffect, useMemo, useState } from 'react';
import { history, KeepAlive, useLocation } from 'umi';
import PdfJsAll from './components/pdfJsAll';
import PictureCanvas from './components/pictureCanvas';
import './index.less';

interface MarkPictureProps {}

const MarkPicture: FC<MarkPictureProps> = (props) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const messageBus = useMemo(() => new MessageBus(), []);
  const [fileInfo, setFileInfo] = useState<FileInfoContextType>(FileInfoInit);

  useEffect(() => {
    if (
      Array.isArray(fileInfo.fileVisionList) &&
      fileInfo.fileVisionList.length > 0
    ) {
      setFileUrl(
        `${fileDomain}/proptech_filestore/file/downloadWithoutReturnMsg?fileId=${
          fileInfo.fileVisionList[fileInfo.currentVision].fileId
        }`,
      );
    }
  }, [fileInfo.fileVisionList, fileInfo.currentVision, fileInfo.currentFile]);

  useEffect(() => {
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

const KeepAliveR: any = KeepAlive;
const KeepAliveC = () => (
  <KeepAliveR name={location.pathname} id={location.pathname}>
    <MarkPicture></MarkPicture>
  </KeepAliveR>
);

export default KeepAliveC;
