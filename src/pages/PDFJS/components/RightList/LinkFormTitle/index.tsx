import { Loading } from '@/components';
import { FileInfoContext } from '@/pages/drawing/markPicture/context';
import { getExistLinkApi, getFormTreeApi } from '@/services/drawing';
import {
  getFormInfoApiResItem,
  getFormTreeApiResItem,
} from '@/services/drawing/type';
import { DataTplTypeEnum } from '@/utils/enum';
import { Input, message, Modal, Tabs } from 'century';
import { FC, useContext, useEffect, useState } from 'react';
import { SearchSvg } from '../../icon';
import supStyles from './../index.less';
import { LinkFormList } from './LinkFormList';

const { TabPane } = Tabs;

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
  const [modalVis, setModalVis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [linkName, setLinkName] = useState<string>('');
  const [filterWord, setFilterWord] = useState<string>('');
  const [formList, setFormList] = useState<getFormTreeApiResItem[]>([]);
  const [formFlowList, setFormFlowList] = useState<getFormTreeApiResItem[]>([]);
  const [relativeCodeList, setRelativeCodeList] = useState<string[]>([]);
  const [existLinkList, setExistLinkList] = useState<string[]>([]);
  useEffect(() => {
    if (props.isModalVisible) {
      getFormTree();
      setLinkName('');
      setFilterWord('');
      setRelativeCodeList([]);
      setExistLinkList([]);
    }
    setModalVis(props.isModalVisible);
  }, [props.isModalVisible]);
  // 引用表单名称input
  const linkNameChange = function (e: any) {
    setLinkName(e.target.value);
  };
  // 引用表单搜索关键词
  const filterWordChange = function (e: any) {
    setFilterWord(e.target.value);
  };
  // 引用表单弹窗确定
  const handleOk = () => {
    if (!linkName) {
      return message.info('请填写引用名称!');
    }
    props.savelink(linkName, 'FORM', relativeCodeList);
    props.setIsModalVisible(false);
  };
  // 引用表单弹窗取消
  const handleCancel = () => {
    props.setIsModalVisible(false);
  };
  // 获取表单列表
  const getFormTree = () => {
    setLoading(true);
    const promise = Promise.all([
      getExistLinkApi({
        bluePrintCode: fileInfo.fileCode,
        typeEnum: fileInfo.typeEnum,
      }),
      getFormTreeApi(),
    ]);
    promise
      .then(
        (res) => {
          if (!Array.isArray(res) || res.length < 2) return;
          if (res[0].code === 200 && res[0].success) {
            setExistLinkList(
              res[0].data.map((item) => {
                return item.itemCode;
              }),
            );
          }
          const { code, success, data } = res[1];
          if (code === 200 && success && Array.isArray(data)) {
            // console.log(data);
            const formList: getFormTreeApiResItem[] = [];
            const formFlowList: getFormTreeApiResItem[] = [];
            data.forEach((item) => {
              const listItem = {
                ...item,
                key: item.formId,
                label: item.name,
              };
              if (item.formType === DataTplTypeEnum.FORM) {
                formList.push(listItem);
              } else {
                formFlowList.push(listItem);
              }
            });
            setFormList(formList);
            setFormFlowList(formFlowList);
          } else {
            message.error(res[1]?.message.toString());
          }
        },
        (err) => {
          message.error(err.toString());
        },
      )
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updateRelativeCodeList = (item: getFormInfoApiResItem, add = true) => {
    // console.log(item);
    setRelativeCodeList((list) => {
      if (add) {
        if (!linkName && !!item.name) {
          setLinkName(item.name);
        }
        return [...list, item.dataId];
      }
      return list.filter((i) => i !== item.dataId);
    });
  };
  return (
    <>
      <Modal
        title="引用表单数据"
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
        <p className={supStyles.selectFileTitle}>选择表单数据</p>
        <Input
          allowClear
          placeholder="请输入表单名称"
          className={supStyles.selectFileFilter}
          value={filterWord}
          onChange={(e) => filterWordChange(e)}
          suffix={<SearchSvg />}
        />
        <Tabs>
          <TabPane tab="表单" key={DataTplTypeEnum.FORM}>
            <LinkFormList
              key={DataTplTypeEnum.FORM}
              type={DataTplTypeEnum.FORM}
              modalVis={modalVis}
              list={formList}
              filterWord={filterWord}
              existLinkList={existLinkList}
              relativeCodeList={relativeCodeList}
              updateRelativeCodeList={updateRelativeCodeList}
            />
          </TabPane>
          <TabPane tab="流程表单" key={DataTplTypeEnum.FORM_FLOW}>
            <LinkFormList
              key={DataTplTypeEnum.FORM_FLOW}
              type={DataTplTypeEnum.FORM_FLOW}
              modalVis={modalVis}
              list={formFlowList}
              filterWord={filterWord}
              existLinkList={existLinkList}
              relativeCodeList={relativeCodeList}
              updateRelativeCodeList={updateRelativeCodeList}
            />
          </TabPane>
        </Tabs>
        <Loading loading={loading} />
      </Modal>
    </>
  );
};
