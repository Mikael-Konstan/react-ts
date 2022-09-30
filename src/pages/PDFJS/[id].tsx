import { MessageBus, MessageBusContext } from '@/components';
import { fileDomain } from '@/global.config';
import {
  FileInfoContext,
  FileInfoContextType,
  FileInfoInit,
} from '@/pages/drawing/markPicture/context';
import { getVersionListApi } from '@/services/drawing';
import useNavigator from '@/utils/hooks/useNavigator';
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
  const location = useLocation();

  const { parseQuery } = useNavigator();

  useEffect(() => {
    const query = parseQuery();
    if (!!query.fileCode) {
      setFileInfo((fileInfo) => {
        return {
          ...fileInfo,
          isFollow: query.isFollow === 'true',
          ...query,
        };
      });
    }
  }, [history, location, location.search]);

  useEffect(() => {
    !!fileInfo.fileCode && getVersionList(fileInfo.fileCode, fileInfo);
  }, [fileInfo.fileCode, fileInfo.currentFile, fileInfo.currentVision]);

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
  // 获取版本列表
  const getVersionList = (
    bluePrintCode: string,
    fileInfo: FileInfoContextType,
  ) => {
    getVersionListApi({
      bluePrintCode,
      typeEnum: fileInfo.typeEnum,
    })
      .then(
        (res) => {
          const { code, success, data = [] } = res;
          if (code === 200 && success) {
            setFileInfo((fileInfo) => {
              let currentVision = fileInfo.currentVision;
              if (currentVision === -1) {
                currentVision = data.findIndex(
                  (item) => item.fileCode === fileInfo.fileCode,
                );
              }
              return {
                ...fileInfo,
                fileVisionList: data.map((item) => {
                  return {
                    ...item,
                    checked: true,
                  };
                }),
                currentVision: currentVision === -1 ? 0 : currentVision,
              };
            });
          }
        },
        (err) => {
          console.log(err);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  };

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
