import { IconPng } from '@/components';
import { picturesExtension } from '@/global.config';
import { FileInfoContext } from '@/pages/drawing/markPicture/context';
import { getTreeMapApi } from '@/services/authorize';
import { TREETYPE } from '@/services/authorize/type';
import { getExistLinkApi, getPictureListApi } from '@/services/drawing';
import { Input, message, Modal, Tree, TreeDataNode } from 'century';
import { Key } from 'rc-tree/lib/interface';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { SearchSvg } from '../../icon';
import supStyles from './../index.less';
import { TreeSwitcherIcon } from './../TreeSwitcherIcon';
import styles from './index.less';

export interface LinkPictureProps {
  isModalVisible: boolean;
  setIsModalVisible: (flag: boolean) => void;
  savelink: (
    linkName: string,
    type: string,
    relativeCodeList: string[],
  ) => void;
}

export const LinkPicture: FC<LinkPictureProps> = (props: LinkPictureProps) => {
  const fileInfo = useContext(FileInfoContext);
  const [linkName, setLinkName] = useState<string>('');
  const [searchFilterWord, setSearchFilterWord] = useState<string>('');
  const [treeData, setTreeData] = useState<any[]>([]);
  const [originTreeData, setOriginTreeData] = useState<any[]>([]);
  const [existFileList, setExistFileList] = useState<string[]>([]);
  const [relativeCodeList, setRelativeCodeList] = useState<React.Key[]>([]);
  const [filterCodeList, setFilterCodeList] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const timerRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    getTreeData();
    getPictureList();
  }, []);
  useEffect(() => {
    if (props.isModalVisible) {
      getPictureList();
      setLinkName('');
      setSearchFilterWord('');
      setExpandedKeys([]);
      setCheckedKeys([]);
      getExistLink();
    }
  }, [props.isModalVisible]);
  useEffect(() => {
    setTreeData(updateTreeDataFilter(originTreeData, filterCodeList));
  }, [originTreeData, filterCodeList]);
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      getPictureList();
      timerRef.current = null;
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [searchFilterWord]);
  // 引用图片名称input
  const linkNameChange = function (e: any) {
    setLinkName(e.target.value);
  };
  // 引用文档搜索关键词
  const searchFilterWordChange = function (e: any) {
    setSearchFilterWord(e.target.value);
  };
  // 引用图片弹窗确定
  const handleOk = () => {
    if (!linkName) {
      return message.info('请填写引用名称!');
    }
    props.savelink(linkName, 'PICTURE', relativeCodeList as string[]);
    props.setIsModalVisible(false);
  };
  // 引用图片弹窗取消
  const handleCancel = () => {
    props.setIsModalVisible(false);
  };
  const onCheck = (
    checked: Key[] | { checked: Key[]; halfChecked: Key[] },
    info: any,
  ) => {
    if (linkName === '') {
      setLinkName(info.node.name || '');
    }
    if (Array.isArray(checked)) {
      setRelativeCodeList(checked);
      setCheckedKeys(checked);
    } else {
      setRelativeCodeList(checked.checked);
      setCheckedKeys(checked.checked);
    }
  };
  const onExpand = (expandedKeys: React.Key[], expanded: any) => {
    setExpandedKeys(expandedKeys);
  };
  // 获取节点树
  const getTreeData = async () => {
    try {
      const res = await getTreeMapApi(TREETYPE.PICTURE);
      let { code, data } = res;
      if (code === 200 && data) {
        const hideCheckBox = (data: any[]): any[] => {
          return data.map((node) => {
            if (node.subNodeList) {
              return {
                ...node,
                checkable: false,
                icon: (
                  <IconPng
                    type="folderTree"
                    className={styles.folderIcon}
                  ></IconPng>
                ),
                switcherIcon: TreeSwitcherIcon,
                subNodeList: hideCheckBox(node.subNodeList),
              };
            }
            return {
              ...node,
              checkable: false,
              icon: (
                <IconPng
                  type="folderTree"
                  className={styles.folderIcon}
                ></IconPng>
              ),
              switcherIcon: TreeSwitcherIcon,
            };
          });
        };
        setOriginTreeData(hideCheckBox([data]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 获取文档节点
  const onLoadData = (treeNode: TreeDataNode) => {
    const { key } = treeNode;
    if ((treeNode as any).isRoot) {
      // 在根节点打开时 获取已有引用
      return getExistLink();
    }
    return getPictureListApi({
      nodeCode: (treeNode as any).nodeCode,
      keyWord: searchFilterWord || null,
      currentPage: 1,
      pageSize: 20,
    })
      .then(
        (res) => {
          const { code, data, success } = res;
          let fileList: any[] = [];
          if (code === 200 && success && data) {
            fileList = data.map((item) => {
              const IconPngType = picturesExtension.includes(item.suffix)
                ? 'picture'
                : 'unPreView';
              return {
                ...item,
                nodeCode: item.fileCode,
                nodeName: item.suffix
                  ? `${item.name}.${item.suffix}`
                  : item.name,
                isLeaf: true,
                disabled: existFileList.includes(item.fileCode),
                icon: <IconPng type={IconPngType}></IconPng>,
              };
            });
          }
          const subNodeList = (treeNode as any).subNodeList || [];
          setOriginTreeData((origin) => {
            return updateTreeData(origin, key, [...subNodeList, ...fileList]);
          });
        },
        (err) => {
          console.log(err);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  };
  // 更新节点树
  function updateTreeData(
    list: any[],
    key: React.Key,
    subNodeList: any[],
  ): any[] {
    return list.map((node) => {
      if (node.nodeCode === key) {
        return {
          ...node,
          subNodeList,
        };
      }
      if (node.subNodeList) {
        return {
          ...node,
          subNodeList: updateTreeData(node.subNodeList, key, subNodeList),
        };
      }
      return node;
    });
  }
  // 获取图片列表
  const getPictureList = () => {
    getPictureListApi({
      keyWord: searchFilterWord || null,
      currentPage: 1,
      pageSize: 2000,
    })
      .then(
        (res) => {
          const { code, data, success } = res;
          if (code === 200 && success && data) {
            const filterCodeList: string[] = data.map((item) => {
              return item.fileCode;
            });
            setFilterCodeList(filterCodeList);
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
  // 按过滤关键词更新树
  function updateTreeDataFilter(list: any[], filterCodeList: string[]): any[] {
    return list
      .filter((item) => {
        if (item.isLeaf) {
          return filterCodeList.includes(item.fileCode);
        } else {
          return true;
        }
      })
      .map((node) => {
        if (node.subNodeList) {
          return {
            ...node,
            subNodeList: updateTreeDataFilter(node.subNodeList, filterCodeList),
          };
        }
        return node;
      });
  }
  // 获取最新已引用列表
  function getExistLink() {
    return getExistLinkApi({
      bluePrintCode: fileInfo.fileCode,
      typeEnum: fileInfo.typeEnum,
    })
      .then(
        (res) => {
          const { code, data, success } = res;
          if (code === 200 && success) {
            const existFileList = data.map((item) => {
              return item.itemCode;
            });
            updateTreeDataDisabled(originTreeData, existFileList);
            setExistFileList(existFileList);
          }
        },
        (err) => {
          console.log(err);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  }
  // 更新节点树
  function updateTreeDataDisabled(list: any[], existFileList: any[]): any[] {
    return list.map((node) => {
      if (node.isLeaf) {
        node.disabled = existFileList.includes(node.fileCode);
      }
      if (node.subNodeList) {
        return {
          ...node,
          subNodeList: updateTreeDataDisabled(node.subNodeList, existFileList),
        };
      }
      return node;
    });
  }
  return (
    <>
      <Modal
        title="引用图片"
        visible={props.isModalVisible}
        maskTransitionName=""
        onOk={handleOk}
        onCancel={handleCancel}
        width={680}
      >
        <p className={supStyles.linkName}>
          <span>引用对象名称</span>
          <Input
            placeholder=""
            allowClear
            className={supStyles.linkNameInput}
            value={linkName}
            onChange={(e) => linkNameChange(e)}
          />
        </p>
        <p className={supStyles.selectFileTitle}>选择图片</p>
        <Input
          placeholder="请输入搜索关键字"
          className={supStyles.selectFileFilter}
          value={searchFilterWord}
          onChange={searchFilterWordChange}
          suffix={<SearchSvg />}
        />
        <Tree
          checkable
          showLine={{ showLeafIcon: false }}
          showIcon={true}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          treeData={treeData}
          fieldNames={{
            title: 'nodeName',
            key: 'nodeCode',
            children: 'subNodeList',
          }}
          loadData={onLoadData}
          className={supStyles.treeContainer}
        />
      </Modal>
    </>
  );
};
