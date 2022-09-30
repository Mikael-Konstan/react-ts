import { FileInfoContext } from '@/pages/drawing/markPicture/context';
import { getExistLinkApi, getScheduleListApi } from '@/services/drawing';
import { Input, message, Modal, Table } from 'century';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { SearchSvg } from '../../icon';
import supStyles from './../index.less';
import './index.less';

export interface LinkScheduleProps {
  isModalVisible: boolean;
  setIsModalVisible: (flag: boolean) => void;
  savelink: (
    linkName: string,
    type: string,
    relativeCodeList: string[],
  ) => void;
}

interface DataType {
  key: React.Key;
  name: string;
  address: string;
  [Field: string]: any;
}

export const LinkSchedule: FC<LinkScheduleProps> = (
  props: LinkScheduleProps,
) => {
  const fileInfo = useContext(FileInfoContext);
  const [linkName, setLinkName] = useState<string>('');
  const [searchFilterWord, setSearchFilterWord] = useState<string>('');
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [existList, setExistList] = useState<string[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
    'checkbox',
  );
  const [relativeCodeList, setRelativeCodeList] = useState<React.Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const columns = [
    {
      title: '进度计划名称',
      dataIndex: 'name',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      if (linkName === '') {
        setLinkName((selectedRows[0] && selectedRows[0].name) || '');
      }
      setRelativeCodeList(
        selectedRows.map((item) => {
          return item.scheduleCode;
        }),
      );
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
    getCheckboxProps: (record: DataType) => record,
  };

  useEffect(() => {
    if (props.isModalVisible) {
      getTableData();
      setLinkName('');
      setSearchFilterWord('');
      setSelectedRowKeys([]);
    }
  }, [props.isModalVisible]);
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      getScheduleList();
      timerRef.current = null;
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [searchFilterWord]);
  // 引用进度计划名称input
  const linkNameChange = function (e: any) {
    setLinkName(e.target.value);
  };
  // 引用进度计划搜索关键词
  const searchFilterWordChange = function (e: any) {
    setSearchFilterWord(e.target.value);
  };
  // 引用进度计划弹窗确定
  const handleOk = () => {
    if (!linkName) {
      return message.info('请填写引用名称!');
    }
    props.savelink(linkName, 'SCHEDULE', relativeCodeList as string[]);
    props.setIsModalVisible(false);
  };
  // 引用进度计划弹窗取消
  const handleCancel = () => {
    props.setIsModalVisible(false);
  };
  // 获取进度列表
  const getTableData = async () => {
    Promise.all([
      getScheduleListApi({
        name: searchFilterWord || null,
        currentPage: 1,
        pageSize: 2000,
        type: 'PUBLIC',
      }),
      getExistLinkApi({
        bluePrintCode: fileInfo.fileCode,
        typeEnum: fileInfo.typeEnum,
      }),
    ])
      .then(
        (res) => {
          let tableList: any[] = [];
          if (res[0].code === 200 && res[0].success) {
            tableList = res[0].data;
          }
          if (res[1].code === 200 && res[1].success) {
            const existLinkList = res[1].data.map((item) => {
              return item.itemCode;
            });
            setExistList(existLinkList);
            tableList = tableList.map((item) => {
              return {
                ...item,
                disabled: existLinkList.includes(item.scheduleCode),
              };
            });
          }
          setTableData(tableList);
        },
        (err) => {
          console.log(err);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  };
  // 获取进度列表
  const getScheduleList = () => {
    getScheduleListApi({
      name: searchFilterWord || null,
      currentPage: 1,
      pageSize: 2000,
    })
      .then(
        (res) => {
          let tableList: any[] = [];
          const { code, success, data } = res;
          if (code === 200 && success && data) {
            tableList = data.map((item) => {
              return {
                ...item,
                disabled: existList.includes(item.scheduleCode),
              };
            });
            setTableData(tableList);
          } else {
            setTableData([]);
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
      <Modal
        title="引用进度计划"
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
        <p className={supStyles.selectFileTitle}>选择进度计划</p>
        <Input
          placeholder="请输入进度计划名称"
          className={supStyles.selectFileFilter}
          value={searchFilterWord}
          onChange={searchFilterWordChange}
          suffix={<SearchSvg />}
        />
        <Table
          style={{ marginTop: '10px' }}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          rowKey={'scheduleCode'}
          columns={columns}
          dataSource={tableData}
        />
      </Modal>
    </>
  );
};
