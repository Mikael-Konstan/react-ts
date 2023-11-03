import { IF } from '@/components';
import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { getComment } from '@/pages/canvas/canvasTool/components/util';
import { ShapesData } from '@/pages/canvas/canvasTool/canvasTool/type';
import { SearchSvg } from './../icon';
import './index.less';
import { MarkListItem } from './MarkListItem';

export interface RightListProps {
  rightListType: string;
  markList: ShapesData;
  setRightListType: (type: string) => void;
  editMark: (markData: any) => void;
  deleteMarks: (markData: any) => void;
}

export const RightList: FC<RightListProps> = (props: RightListProps) => {
  const [keyWord, setKeyWord] = useState<string>('');
  const [markList, setMarkList] = useState<any[]>([]);
  useEffect(() => {
    setMarkList(
      props.markList
        .filter((item) => {
          const KeyWord = String.prototype.trim.call(keyWord);
          if (KeyWord === '') return true;
          const creatorName = item.creatorName || '';
          const comment = item.comment || '';
          const flag =
            creatorName.indexOf(KeyWord) !== -1 ||
            comment.indexOf(KeyWord) !== -1;
          return flag;
        })
        .map((item) => {
          const { showDetail } = getComment(item.comment || '');
          return {
            ...item,
            showDetail,
          };
        }),
    );
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
        <CloseOutlined
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
              markList={markList}
              editMark={props.editMark}
              deleteMarks={props.deleteMarks}
            ></MarkListItem>
          </IF>
        </div>
      </div>
    </div>
  );
};
