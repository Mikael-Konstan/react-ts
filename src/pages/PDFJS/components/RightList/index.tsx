import { IF } from '@/components';
import { FileInfoContext } from '@/pages/PDFJS/context';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, message } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import { SearchSvg } from './../icon';
import './index.less';
import { MarkListItem } from './MarkListItem';

export interface RightListProps {
  rightListType: string;
  markList: any[];
  setRightListType: (type: string) => void;
  editMark: (markData: any) => void;
  deleteMarks: (markData: any) => void;
}

export const RightList: FC<RightListProps> = (props: RightListProps) => {
  const fileInfo = useContext(FileInfoContext);
  const [keyWord, setKeyWord] = useState<string>('');
  const [markList, setMarkList] = useState<any[]>([]);
  useEffect(() => {
    setMarkList(props.markList);
  }, [props.markList, props.markList.length]);
  useEffect(() => {
    setKeyWord('');
  }, [props.rightListType]);

  const inputChangeSearch = function (e: any) {
    setKeyWord(e.target.value);
  };

  return (
    <div
      className={`rightList ${
        props.rightListType === '' ? 'rightHide' : 'rightShow'
      }`}
    >
      <div className="rightListHeader">
        <span>标注</span>
        <DownOutlined
          type="icon-guanbi2"
          className="closeBtn"
          onClick={() => {
            props.setRightListType('');
          }}
        />
      </div>
      <div className="rightListBody">
        <Input
          placeholder="请输入关键词搜索"
          allowClear
          className="rightListSearchIpt"
          value={keyWord}
          onChange={(e) => inputChangeSearch(e)}
          prefix={<SearchSvg style={{ marginRight: '8px' }} />}
        />
        <div className="rightListItem">
          <IF condition={props.rightListType === 'markList'}>
            <MarkListItem
              keyWord={keyWord}
              markList={markList}
              editMark={props.editMark}
            ></MarkListItem>
          </IF>
        </div>
      </div>
    </div>
  );
};
