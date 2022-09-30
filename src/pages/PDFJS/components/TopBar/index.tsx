import { CusBtn, IconFont, MessageBusContext } from '@/components';
import { TextOverFlow } from '@/components/TextOverFlow';
import { FileInfoContext } from '@/pages/drawing/markPicture/context';
import {
  getFileListApi,
  getFileOrDrawingListApi,
  getFilePreNextApi,
} from '@/services/drawing';
import { DrawingTypeEnum } from '@/utils/enum';
import { DownOutlined } from '@ant-design/icons';
import { Divider, Input, Popover, Switch, Tooltip } from 'century';
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
        (res) => {
          if (res.code === 200 && res.success) {
            setMenuItems(res.data || []);
          }
        },
        (error) => {
          console.log(error);
        },
      )
      .catch((error) => {
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
        (res) => {
          const { code, success, data } = res;
          if (code === 200 && success) {
            // console.log(data);
            const menuItems = data.bluePrintSelectList || [];
            setMenuItems(menuItems);
            const currentFile = menuItems.findIndex((item) => {
              if (fileInfo.typeEnum === DrawingTypeEnum.FILE) {
                return item.fileCode === fileInfo.fileCode;
              } else {
                return item.name === data.currentName;
              }
            });
            messageBus.emit('setFileInfo', {
              currentFile: currentFile === -1 ? 0 : currentFile,
            });
          }
        },
        (error) => {
          console.log(error);
        },
      )
      .catch((error) => {
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
        (res) => {
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
        (error) => {
          console.log(error);
        },
      )
      .catch((error) => {
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
    setFilterVisible((filterVisible) => !filterVisible);
  };

  const onClick = function () {
    setVisible((visible) => {
      return !visible;
    });
  };

  const onClick2 = function () {
    setVisionListVis((visible) => {
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
      {/* 上一张 */}
      <Tooltip title="上一张">
        <CusBtn
          className="topBarLeft"
          icon={<IconFont type="icon-zuo2" />}
          disabled={fileInfo.currentFile === 0}
          onClick={() => {
            messageBus.emit('setFileInfo', {
              ...menuItems[fileInfo.currentFile - 1],
              currentFile: fileInfo.currentFile - 1,
            });
          }}
        ></CusBtn>
      </Tooltip>
      {/* 下一张 */}
      <Tooltip title="下一张">
        <CusBtn
          className="topBarRight"
          icon={<IconFont type="icon-you2" />}
          disabled={fileInfo.currentFile === menuItems.length - 1}
          onClick={() => {
            messageBus.emit('setFileInfo', {
              ...menuItems[fileInfo.currentFile + 1],
              currentFile: fileInfo.currentFile + 1,
            });
          }}
        ></CusBtn>
      </Tooltip>
      {/* 文件/图号切换 */}
      <div
        ref={fileListRef}
        style={{ position: 'relative', marginRight: '12px' }}
      >
        <CusBtn onClick={onClick} className="topBarFileList">
          <span className="fileName">
            <TextOverFlow
              Tooltip
              placement="top"
              title={(menuItems && menuItems[fileInfo.currentFile]?.name) || ''}
            />
          </span>
          <DownOutlined style={{ margin: '0px 12px 0px 8px' }} />
        </CusBtn>

        {visible ? (
          <div className="pt_style_input fileNameSearchContent">
            <Input
              placeholder=""
              allowClear
              size="large"
              className="fileNameSearchIpt"
              defaultValue={name}
              onChange={(e) => fileNameSearchChange(e)}
              prefix={'搜索'}
            />
            <div className="scrollbarStyle dataList">
              {menuItems.map((item) => {
                return (
                  <div
                    key={item.sourceCode || item.fileCode || item.code}
                    onClick={() => onMenuClick(item)}
                    className={`${
                      fileInfo.fileCode === item.fileCode ? 'active' : ''
                    }`}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* 版本切换 */}
      <div ref={versionListRef} style={{ position: 'relative' }}>
        <CusBtn onClick={onClick2} className="topBarFileList">
          <span className="fileName" style={{ width: '172px' }}>
            <TextOverFlow
              Tooltip
              placement="top"
              title={
                ((fileInfo.fileVisionList &&
                  fileInfo.fileVisionList[fileInfo.currentVision]?.name) ||
                  '') + (fileInfo.currentVision === 0 ? '（在用版本）' : '')
              }
            />
          </span>
          <DownOutlined style={{ margin: '0px 12px 0px 8px' }} />
        </CusBtn>
        {visionListVis && fileInfo.fileVisionList ? (
          <div className="pt_style_input fileNameSearchContent">
            <Input
              placeholder=""
              allowClear
              size="large"
              className="fileNameSearchIpt"
              value={visionName}
              onChange={(e) => fileNameSearchChange2(e)}
              prefix={'搜索'}
            />
            <div className="scrollbarStyle dataList">
              {fileInfo.fileVisionList.map((item, idx) => {
                if (
                  visionName !== '' &&
                  (item.name || '')
                    .toLocaleLowerCase()
                    .indexOf(visionName.toLocaleLowerCase()) === -1
                ) {
                  return null;
                }
                return (
                  <div
                    key={item.code}
                    onClick={() => onMenuClick2(item, idx)}
                    className={`${
                      fileInfo.fileVisionList &&
                      fileInfo.fileVisionList[fileInfo.currentVision]?.code ===
                        item.code
                        ? 'active'
                        : ''
                    }`}
                  >
                    {(item.name || '') + (idx === 0 ? '（在用版本）' : '')}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
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
        {/* 引用 */}
        <span
          className={`topBarCite ${
            props.rightListType === 'citeList' ? 'topBarCiteActive' : ''
          }`}
          onClick={() => {
            const type = props.rightListType === 'citeList' ? '' : 'citeList';
            props.setRightListType(type);
          }}
        >
          引用
        </span>
      </span>
    </div>
  );
};
