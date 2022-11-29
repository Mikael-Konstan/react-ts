import { CusBtn, IconFont, MessageBusContext } from '@/components';
import { TextOverFlow } from '@/components/TextOverFlow';
import { FileInfoContext } from '@/pages/PDFJS/context';
import {
  getFileListApi,
  getFileOrDrawingListApi,
  getFilePreNextApi,
} from '@/services/drawing';
import { DrawingTypeEnum } from '@/utils/enum';
import { DownOutlined } from '@ant-design/icons';
import { Divider, Input, Popover, Switch, Tooltip } from 'antd';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { Key } from 'react';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useCompToPDF } from './../hooks/index';
import './index.less';
import { SelectFilter } from './SelectFilter';

export interface TopBarProps {
  rightListType: string;
  showLeftBarToggle: () => void;
  visionMarkShowOnChange: (show: boolean) => void;
  setRightListType: (type: string) => void;
}

export const TopBar: FC<TopBarProps> = (props: TopBarProps) => {
  const fileInfo = useContext(FileInfoContext);
  const messageBus = useContext(MessageBusContext);
  const [name, setName] = useState<string>('');
  const [visionName, setVisionName] = useState<string>('');
  const [filePreDisabled, setFilePreDisabled] = useState<boolean>(true);
  const [fileNextDisabled, setFileNextDisabled] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [visionListVis, setVisionListVis] = useState<boolean>(false);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timer | null>(null);
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

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      getFileOrDrawingList();
      timerRef.current = null;
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [name]);

  useEffect(() => {
    getFileOrDrawingList();
  }, [fileInfo.fileCode]);
  // 获取文件列表
  const getFileList = () => {
    getFileListApi({ name, nodeCode: fileInfo.treeCode || '' })
      .then(
        (res: { code: number; success: any; data: any }) => {
          if (res.code === 200 && res.success) {
            setMenuItems(res.data || []);
          }
        },
        (error: any) => {
          console.log(error);
        },
      )
      .catch((error: any) => {
        console.log(error);
      });
  };
  const getFileOrDrawingList = () => {
    getFileOrDrawingListApi({
      name,
      nodeCode: fileInfo.treeCode || null,
      typeEnum: fileInfo.typeEnum,
      fileCode: fileInfo.fileCode,
      isFollow: fileInfo.isFollow,
    })
      .then(
        (res: { code: any; success: any; data: any }) => {
          const { code, success, data } = res;
          if (code === 200 && success) {
            // console.log(data);
            const menuItems = data.bluePrintSelectList || [];
            setMenuItems(menuItems);
            const currentFile = menuItems.findIndex(
              (item: { fileCode: any; name: any }) => {
                if (fileInfo.typeEnum === DrawingTypeEnum.FILE) {
                  return item.fileCode === fileInfo.fileCode;
                } else {
                  return item.name === data.currentName;
                }
              },
            );
            messageBus.emit('setFileInfo', {
              currentFile: currentFile === -1 ? 0 : currentFile,
            });
          }
        },
        (error: any) => {
          console.log(error);
        },
      )
      .catch((error: any) => {
        console.log(error);
      });
  };
  // 文件上一个 下一个
  const getFilePreNext = (isPre: boolean, setDisabled: boolean) => {
    if (isPre) {
      setFilePreDisabled(true);
    } else {
      setFileNextDisabled(true);
    }
    getFilePreNextApi({ code: fileInfo.fileCode, isPre })
      .then(
        (res: { code: number; success: any; data: { suffix: any } }) => {
          if (res.code === 200 && res.success && res.data) {
            if (setDisabled) {
              if (isPre) {
                setFilePreDisabled(false);
              } else {
                setFileNextDisabled(false);
              }
            } else {
              messageBus.emit('setFileInfo', {
                ...res.data,
                extension: res.data.suffix,
                treeCode: fileInfo.treeCode,
              });
            }
          }
        },
        (error: any) => {
          console.log(error);
        },
      )
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onChange = function (checked: boolean) {
    props.showLeftBarToggle();
  };

  const visionMarkShowOnChange = function (checked: boolean) {
    props.visionMarkShowOnChange(checked);
  };

  const fileNameSearchChange = function (e: any) {
    setName(e.target.value);
  };

  const fileNameSearchChange2 = function (e: any) {
    setVisionName(e.target.value);
  };

  const filterVisibleToggle = () => {
    setFilterVisible((filterVisible: any) => !filterVisible);
  };

  const onClick = function () {
    setVisible((visible: any) => {
      return !visible;
    });
  };

  const onClick2 = function () {
    setVisionListVis((visible: any) => {
      return !visible;
    });
  };

  const onMenuClick = function (file: any) {
    setVisible(false);
    messageBus.emit('setFileInfo', {
      ...file,
      extension: file.suffix,
      treeCode: fileInfo.treeCode,
    });
  };

  const onMenuClick2 = function (file: any, currentVision: number) {
    messageBus.emit('setFileInfo', {
      currentVision,
    });
  };

  const downloadPdf = () => {
    exportPDF(document.getElementById('canvasContainer'), fileInfo.name);
  };
  const onCheckAllChange = (checked: boolean) => {
    setCheckAll(checked);
  };
  const handleVisibleChange = (visible: boolean) => {
    setFilterVisible(visible);
  };
  return (
    <div className="topOperationBar">
      <span className="topOperationBarRight">
        {/* 标注版本标识显隐 */}
        <span className="visionMarkShow">
          <span>标注版本标识：</span>
          <Switch defaultChecked onChange={visionMarkShowOnChange} />
        </span>
        {/* 过滤 */}
        <Popover
          placement="bottomLeft"
          content={
            <SelectFilter
              filterVisible={filterVisible}
              filterVisibleToggle={filterVisibleToggle}
              onCheckAllChange={onCheckAllChange}
            />
          }
          trigger={['hover', 'click']}
          visible={filterVisible}
          onVisibleChange={handleVisibleChange}
        >
          <CusBtn className="topBarBtn topBarFilter">
            <IconFont type={checkAll ? 'icon-guolv' : 'icon-a-guolvbeifen2'} />
            过滤
          </CusBtn>
        </Popover>
        {/* 下载 */}
        <Tooltip title="下载正在查看版本">
          <CusBtn
            className="topBarBtn topBarDownload"
            onClick={() => {
              downloadPdf();
            }}
          >
            <IconFont type="icon-xiazai2" />
            下载
          </CusBtn>
        </Tooltip>
      </span>
    </div>
  );
};
