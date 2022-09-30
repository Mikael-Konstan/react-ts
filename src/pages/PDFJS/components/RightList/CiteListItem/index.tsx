import head from '@/assets/images/head.png';
import { IconFont, IF } from '@/components';
import {
  PicturePreviewModal,
  usePicturePreviewModal,
} from '@/components/PicturePreview';
import { TextOverFlow } from '@/components/TextOverFlow';
import { fileDomain, picturesExtension } from '@/global.config';
import {
  FileInfoContext,
  fileVisionListItem,
} from '@/pages/drawing/markPicture/context';
import { getLinkListApi, unlinkApi } from '@/services/drawing';
import { getLinkListApiResDataItem } from '@/services/drawing/type';
import { DataTplTypeEnum, DrawingTypeEnum } from '@/utils/enum';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Collapse, Modal, Tooltip } from 'century';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import './index.less';
import styles from './index.less';

const { confirm } = Modal;
const { Panel } = Collapse;

export interface CiteListItemProps {
  keyWord: string;
  refreshCiteList: number;
}

export const CiteListItem: FC<CiteListItemProps> = (
  props: CiteListItemProps,
) => {
  const fileInfo = useContext(FileInfoContext);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [citeList, setCiteList] = useState<getLinkListApiResDataItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [linkName, setLinkName] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [fileVisionList, setFileVisionList] = useState<fileVisionListItem[]>(
    [],
  );
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const listItemRefs = useRef<HTMLDivElement[]>([]);
  const listContainer = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const { showGroupModal, getGroupModalProps } = usePicturePreviewModal();
  useEffect(() => {
    setFileVisionList(
      fileInfo.fileVisionList.map((item) => {
        const list = citeList.filter((mark) => {
          return item.code === mark.versionId;
        });
        return {
          ...item,
          citeList: list,
          citeListLen: list.length,
        };
      }),
    );
    let defaultActiveKey: string[] = [];
    if (
      fileVisionList[fileInfo.currentVision]?.code &&
      fileVisionList[fileInfo.currentVision]?.checked
    ) {
      defaultActiveKey = [fileVisionList[fileInfo.currentVision]?.code];
    }
    const checkedList = fileInfo.fileVisionList.filter((item) => item.checked);
    if (checkedList.length === 1) {
      defaultActiveKey = [checkedList[0].code];
    }
    setActiveKey(defaultActiveKey);
  }, [fileInfo.fileVisionList, citeList]);
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      setCiteList([]);
      getLinkList(true);
      timerRef.current = null;
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [props.keyWord, fileInfo.fileCode, props.refreshCiteList]);
  useEffect(() => {
    const dom = listItemRefs.current[activeIndex];
    if (!!dom && !!listContainer.current) {
      listContainer.current.scrollTop = dom.offsetTop - 116;
    }
  }, [activeIndex]);
  // 获取icon
  const getIcon = (data: any) => {
    // 图片
    if (data.isAllPicture) {
      return 'icon-a-tupianbeifen2';
    }
    // 多文件
    if (data.itemsList && data.itemsList.length > 1) {
      return 'icon-wenjianjia';
    }
    // 单文件
    const item =
      Array.isArray(data.itemsList) &&
      data.itemsList.length > 0 &&
      data.itemsList[0];
    if (item.suffix === 'pdf') {
      return 'icon-PDF1';
    }
    const type = (item && item.dataTemplateType) || '';
    if (type === 'FORM') {
      return 'icon-biaodan1';
    }
    if (type === 'FORM_FLOW') {
      return 'icon-liuchengbiaodan1';
    }
    if (type === 'SCHEDULE') {
      return 'icon-jindujihua';
    }
    return 'icon-weizhiwenjian';
  };
  // 获取icon
  const getIcon2 = (item: any) => {
    const type = (item && item.dataTemplateType) || '';
    if (item.suffix === 'pdf') {
      return 'icon-PDF1';
    }
    if (type === 'FILE' || type === 'PICTURE') {
      if (picturesExtension.includes(item.suffix)) {
        return 'icon-a-tupianbeifen2';
      }
    }
    if (type === 'FORM') {
      return 'icon-biaodan1';
    }
    if (type === 'FORM_FLOW') {
      return 'icon-liuchengbiaodan1';
    }
    if (type === 'SCHEDULE') {
      return 'icon-jindujihua';
    }
    return 'icon-weizhiwenjian';
  };
  // 获取引用列表
  const getLinkList = (search = false) => {
    const len = citeList.length;
    let currentPage = Math.ceil(len / 10) + 1;
    if (search) {
      currentPage = 1;
    }
    return getLinkListApi({
      sourceCode: fileInfo.fileCode,
      operatorName: props.keyWord ? props.keyWord : null,
      referenceName: props.keyWord ? props.keyWord : null,
      pageSize: 10,
      currentPage,
      typeEnum: fileInfo.typeEnum,
    })
      .then(
        (res) => {
          const { code, success, data, total } = res;
          if (code === 200 && success) {
            setCiteList((citeList) => {
              const list = (data || []).map((item) => {
                const isAllPicture = item.itemsList.every((item) => {
                  return picturesExtension.includes(item.suffix);
                });
                return {
                  ...item,
                  isAllPicture,
                  multi: item.itemsList.length > 1,
                };
              });
              if (search) {
                return list;
              }
              return [...citeList, ...list];
            });
            setTotal(total);
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
  // 解除引用
  const unlink = (groupCode: string) => {
    unlinkApi({
      groupCode,
      sourceCode: fileInfo.fileCode,
      sourceType: 'BLUEPRINT',
    })
      .then(
        (res) => {
          if (res.code === 200 && res.success) {
            getLinkList(true);
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
  // 解除引用确认
  const showConfirm = (groupCode: string) => {
    confirm({
      title: '确定要解除引用?',
      icon: <ExclamationCircleOutlined />,
      content: '解除后只能手动重新创建恢复。',
      onOk() {
        unlink(groupCode);
      },
    });
  };
  // 引用名称点击
  const linkNameClick = (item: any) => {
    // console.log(item);
    if (!Array.isArray(item.itemsList)) return;
    const citeItem = item.itemsList[0];
    if (!citeItem) return;
    if (item.itemsList.length > 1) {
      setLinkName(item.name);
      setItemsList(item.itemsList);
      setIsModalVisible(true);
    } else if (picturesExtension.includes(citeItem.suffix)) {
      showGroupModal(item.itemsList, 0);
    } else if (citeItem.suffix === 'pdf') {
      const typeEnum =
        citeItem.dataTemplateType === DrawingTypeEnum.ARCHITECTURAL_DRAWING
          ? DrawingTypeEnum.ARCHITECTURAL_DRAWING
          : DrawingTypeEnum.FILE;
      window.open(
        `/drawing/markPicture/${citeItem.itemCode}?fileCode=${citeItem.itemCode}&suffix=${citeItem.suffix}&typeEnum=${typeEnum}&treeCode=${citeItem.nodeCode}`,
      );
    } else if (
      citeItem.dataTemplateType === 'FORM' ||
      citeItem.dataTemplateType === 'FORM_FLOW'
    ) {
      window.open(`/table/fill/${citeItem.formId}?id=${citeItem.itemCode}`);
    } else if (citeItem.dataTemplateType === 'SCHEDULE') {
      window.open(`/schedule/public/detail/${citeItem.itemCode}?isCheck=1`);
    }
  };
  const onImgError = (e: any) => {
    e.target.src = head;
  };
  const onIconDblClick = (item: any) => {
    if (picturesExtension.includes(item.suffix) || item.suffix === 'pdf') {
      open(`${fileDomain}/proptech_filestore/file/view/${item.itemId}`);
    }
  };
  const listItemClick = (index: number) => {
    setActiveIndex((activeIndex) => {
      if (activeIndex === index) {
        return -1;
      }
      return index;
    });
  };
  const loadMoreData = () => {
    if (loading || !fileInfo.fileCode) {
      return;
    }
    setLoading(true);
    getLinkList()?.finally(() => {
      setLoading(false);
    });
  };
  const callback = (key: any) => {
    setActiveKey(key);
  };
  const CiteItem = (
    item: getLinkListApiResDataItem,
    activeIndex: number,
    index: number,
  ) => {
    return (
      <div
        key={item.groupCode}
        className={`${styles.citeListItem} ${
          activeIndex === index ? styles.citListItemActive : ''
        }`}
        onClick={() => {
          listItemClick(index);
        }}
        ref={(el) => {
          if (el) {
            listItemRefs.current[index] = el;
          }
        }}
      >
        <IconFont type={getIcon(item)} className={styles.citeListItemIcon} />
        <div
          className={styles.citeListItemComment}
          style={{
            marginBottom: item.isAllPicture ? '4px' : '12px',
          }}
        >
          <span
            onClick={() => linkNameClick(item)}
            className={styles.citeListItemTitle}
          >
            <TextOverFlow Tooltip title={item.name} placement="topLeft" />
          </span>

          <span className={styles.citeListItemNum}>
            <IF condition={item.itemsList.length > 1}>
              {item.itemsList.length}个文件
            </IF>
          </span>
        </div>
        <IF condition={item.isAllPicture}>
          <div className={styles.citeListItemImgs}>
            <div>
              {item.itemsList.map((linkListItem, index) => {
                return (
                  <img
                    key={linkListItem.itemCode || ''}
                    className={styles.citeListItemImgItem}
                    onClick={() => {
                      showGroupModal(item.itemsList, index);
                    }}
                    src={`${fileDomain}/proptech_filestore/file/downloadWithoutReturnMsg?fileId=${linkListItem.itemId}`}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </IF>

        <div className={styles.citeListItemInfo}>
          <img
            className={styles.citeListItemImage}
            src={`${fileDomain}/proptech_filestore/file/downloadWithoutReturnMsg?fileId=${item.icon}`}
            alt=""
            onError={onImgError}
          />
          <span className={styles.citeListItemName}>
            <TextOverFlow
              Tooltip
              placement="topRight"
              title={item.creatorName}
            />
          </span>
          <span className={styles.citeListItemTime}>{item.createTime}</span>
          <IconFont
            type="icon-jiechuyinyong"
            className={styles.citeListItemUnlink}
            onClick={(e) => {
              e.stopPropagation();
              if (item.itemsList.length > 1) {
                showConfirm(item.groupCode);
              } else {
                unlink(item.groupCode);
              }
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <div
      className={`scrollbarStyle ${styles.listContainer}`}
      ref={listContainer}
      id="citeListContainer"
    >
      <Collapse
        expandIconPosition="right"
        activeKey={activeKey}
        onChange={callback}
      >
        {fileVisionList[fileInfo.currentVision] &&
          fileVisionList[fileInfo.currentVision].checked && (
            <Panel
              header={
                <span className="markListItemTitle">{`版本：${
                  fileVisionList[fileInfo.currentVision].name || ''
                }（正在查看）（${
                  fileVisionList[fileInfo.currentVision].citeListLen
                }个）`}</span>
              }
              key={fileVisionList[fileInfo.currentVision].code}
            >
              {Array.isArray(fileVisionList[fileInfo.currentVision].citeList) &&
                fileVisionList[fileInfo.currentVision].citeList?.map(
                  (item, index) => {
                    return CiteItem(item, activeIndex, index);
                  },
                )}
            </Panel>
          )}
        {fileVisionList.map((fileVision, index) => {
          if (!fileVision.checked || index === fileInfo.currentVision)
            return null;
          return (
            <Panel
              header={
                <span className="markListItemTitle">{`版本：${
                  fileVision.name || ''
                }（${fileVision.citeListLen}个）`}</span>
              }
              key={fileVision.code}
            >
              {Array.isArray(fileVision.citeList) &&
                fileVision.citeList.map((item, index) => {
                  return CiteItem(item, activeIndex, index);
                })}
            </Panel>
          );
        })}
      </Collapse>
      <Modal
        title={linkName}
        visible={isModalVisible}
        maskTransitionName=""
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={null}
      >
        <div className={styles.multiFile}>
          {itemsList.map((item) => {
            return (
              <div key={item.itemCode || 'dataTemplateType'}>
                <span
                  onDoubleClick={() => {
                    onIconDblClick(item);
                  }}
                >
                  <IconFont
                    type={getIcon2(item)}
                    style={{ fontSize: '48px' }}
                  />
                </span>
                <Tooltip
                  title={
                    item.suffix &&
                    item.dataTemplateType !== DataTplTypeEnum.FORM &&
                    item.dataTemplateType !== DataTplTypeEnum.FORM_FLOW
                      ? `${item.itemName}.${item.suffix}`
                      : item.itemName
                  }
                >
                  <p>
                    {item.suffix &&
                    item.dataTemplateType !== DataTplTypeEnum.FORM &&
                    item.dataTemplateType !== DataTplTypeEnum.FORM_FLOW
                      ? `${item.itemName}.${item.suffix}`
                      : item.itemName}
                  </p>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </Modal>
      <PicturePreviewModal {...getGroupModalProps()}></PicturePreviewModal>
    </div>
  );
};
