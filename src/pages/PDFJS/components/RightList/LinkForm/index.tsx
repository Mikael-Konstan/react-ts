import { IconPng } from '@/components';
import { FileInfoContext } from '@/pages/drawing/markPicture/context';
import { getExistLinkApi, getFormTreeAndListApi } from '@/services/drawing';
import { getTableFormFuzzyApi } from '@/services/table';
import { FormType } from '@/services/table/type';
import { Input, message, Modal, Tree } from 'century';
import { Key } from 'rc-tree/lib/interface';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { SearchSvg } from '../../icon';
import supStyles from './../index.less';
import { TreeSwitcherIcon } from './../TreeSwitcherIcon';
import styles from './index.less';

export interface LinkFormProps {
  isModalVisible: boolean;
  setIsModalVisible: (flag: boolean) => void;
  savelink: (
    linkName: string,
    type: string,
    relativeCodeList: string[],
  ) => void;
}

export const LinkForm: FC<LinkFormProps> = (props: LinkFormProps) => {
  const fileInfo = useContext(FileInfoContext);
  const [linkName, setLinkName] = useState<string>('');
  const [searchFilterWord, setSearchFilterWord] = useState<string>('');
  const [treeData, setTreeData] = useState<any[]>([]);
  const [originTreeData, setOriginTreeData] = useState<any[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [relativeCodeList, setRelativeCodeList] = useState<React.Key[]>([]);
  const [filterCodeList, setFilterCodeList] = useState<React.Key[]>([]);
  const timerRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (props.isModalVisible) {
      getTreeData();
      getFormList();
      setLinkName('');
      setSearchFilterWord('');
      setExpandedKeys([]);
      setCheckedKeys([]);
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
      getFormList();
      timerRef.current = null;
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [searchFilterWord]);
  // 引用表单名称input
  const linkNameChange = function (e: any) {
    setLinkName(e.target.value);
  };
  // 引用表单搜索关键词
  const searchFilterWordChange = function (e: any) {
    setSearchFilterWord(e.target.value);
  };
  // 引用表单弹窗确定
  const handleOk = () => {
    if (!linkName) {
      return message.info('请填写引用名称!');
    }
    props.savelink(linkName, 'FORM', relativeCodeList as string[]);
    props.setIsModalVisible(false);
  };
  // 引用表单弹窗取消
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
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
  };
  // 获取节点树
  const getTreeData = async () => {
    const promise = Promise.all([
      getExistLinkApi({
        bluePrintCode: fileInfo.fileCode,
        typeEnum: fileInfo.typeEnum,
      }),
      getFormTreeAndListApi(),
    ]);
    promise
      .then(
        (res) => {
          let existLinkList: string[] = [];
          if (res[0].code === 200 && res[0].success) {
            existLinkList = res[0].data.map((item) => {
              return item.itemCode;
            });
          }
          if (res[1].code === 200 && res[1].success) {
            let { data } = res[1];
            if (data) {
              const hideCheckBox = (node: any): any => {
                let subNodeList = [];
                if (node.subNodeList) {
                  subNodeList = node.subNodeList.map((item: any) => {
                    return hideCheckBox(item);
                  });
                }
                if (node.dataList) {
                  subNodeList = Array.prototype.concat(
                    subNodeList,
                    node.dataList.map((item: any) => {
                      let IconPngType = 'normalForm';
                      if (item.type === FormType.FORM_FLOW) {
                        IconPngType = 'processForm';
                      }
                      return {
                        ...item,
                        nodeName: item.name,
                        nodeCode: item.code,
                        disabled: existLinkList.includes(item.code),
                        icon: <IconPng type={IconPngType}></IconPng>,
                      };
                    }),
                  );
                }
                return {
                  ...node,
                  checkable: false,
                  subNodeList,
                  icon: (
                    <IconPng
                      type="folderTree"
                      className={styles.folderIcon}
                    ></IconPng>
                  ),
                  switcherIcon: TreeSwitcherIcon,
                };
              };
              setOriginTreeData([hideCheckBox(data)]);
            }
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
  // 获取表单列表
  const getFormList = () => {
    getTableFormFuzzyApi({
      name: searchFilterWord || null,
    })
      .then(
        (res) => {
          const { code, data, success } = res;
          if (code === 200 && success && data) {
            const filterCodeList: string[] = data.map((item: any) => {
              return item.formId;
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
  function updateTreeDataFilter(
    list: any[],
    filterCodeList: React.Key[],
  ): any[] {
    return list
      .filter((item) => {
        if (item.isLeaf) {
          return filterCodeList.includes(item.nodeCode);
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
  return (
    <>
      <Modal
        title="引用表单"
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
        <p className={supStyles.selectFileTitle}>选择表单</p>
        <Input
          placeholder="请输入搜索关键字"
          className={supStyles.selectFileFilter}
          value={searchFilterWord}
          onChange={(e) => searchFilterWordChange(e)}
          suffix={<SearchSvg />}
        />
        <Tree
          checkable
          showLine={{ showLeafIcon: false }}
          showIcon={true}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
          fieldNames={{
            title: 'nodeName',
            key: 'nodeCode',
            children: 'subNodeList',
          }}
          className={supStyles.treeContainer}
        />
      </Modal>
    </>
  );
};
