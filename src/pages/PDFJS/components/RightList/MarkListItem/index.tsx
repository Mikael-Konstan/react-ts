import head from '@/public/imgs/test.webp';
import { MessageBusContext } from '@/utils/context';
import { IF } from '@/components';
import {
  InfoCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { TextOverFlow } from '@/components/TextOverFlow';
import { notification } from 'antd';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { CanvasDataContext } from './../../context';
import './index.less';

import {
  AnchorSvg,
  ArrowDoubleSvg,
  ArrowSvg,
  CloudSvg,
  EllipseSvg,
  LineSvg,
  RectSvg,
  TextSvg,
} from '../../icon';

export interface MarkListItemProps {
  markList: any[];
  editMark: (markData: any) => void;
  deleteMarks?: (markData: any) => void;
}

export const MarkListItem: FC<MarkListItemProps> = (
  props: MarkListItemProps,
) => {
  const [activeCode, setActiveCode] = useState<string>('');
  const listContainer = useRef<HTMLDivElement>(null);
  const canvasData = useContext(CanvasDataContext);
  const messageBus = useContext(MessageBusContext);

  useEffect(() => {
    setActiveCode(canvasData.shapeActiveCode);
  }, [canvasData.shapeActiveCode]);
  const getIcon = (type: string) => {
    if (type === 'cloud') {
      return <CloudSvg></CloudSvg>;
    }
    if (type === 'arc') {
      return <EllipseSvg></EllipseSvg>;
    }
    if (type === 'anchor') {
      return <AnchorSvg></AnchorSvg>;
    }
    if (type === 'line') {
      return <LineSvg></LineSvg>;
    }
    if (type === 'arrowRadius') {
      return <ArrowSvg></ArrowSvg>;
    }
    if (type === 'arrowDouble') {
      return <ArrowDoubleSvg></ArrowDoubleSvg>;
    }
    if (type === 'text') {
      return <TextSvg></TextSvg>;
    }
    return <RectSvg></RectSvg>;
  };
  // 展示详情
  const showDetail = (item: any) => {
    notification.info({
      message: '详情',
      description: item.comment,
      placement: 'bottomRight',
      duration: null,
    });
  };
  const listItemClick = (code: string) => {
    setActiveCode((activeCode) => {
      if (activeCode === code) {
        return '';
      }
      return code;
    });
    messageBus.emit('selectMark', code);
  };
  const MarkItem = (item: any, index: number) => {
    return (
      <div
        key={item.markCode || item.code}
        className={`markListItem ${
          activeCode === (item.markCode || item.code)
            ? 'markListItemActive'
            : ''
        }`}
        onClick={() => {
          listItemClick(item.markCode || item.code);
        }}
      >
        <div
          className="markListItemIcon"
          style={{ color: item.fillStyle || '#F7B500' }}
        >
          {getIcon(item.type as string)}
        </div>
        <div>
          <div className="markListItemComment">
            <TextOverFlow Tooltip placement="topRight" title={item.comment} />
          </div>
          <div className="markListItemInfo">
            <img className="markListItemImage" src={head} alt="" />
            <span className="markListItemTime">{item.createTime}</span>
            <span className="optionList">
              <IF condition={item.showDetail}>
                <InfoCircleOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    showDetail(item);
                  }}
                />
              </IF>
              <EditOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  props.editMark({
                    ...item,
                    index,
                  });
                }}
              />
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  props.deleteMarks &&
                    props.deleteMarks({
                      ...item,
                      index,
                    });
                }}
              />
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="scrollbar-style listContainer" ref={listContainer}>
      {Array.isArray(props.markList) &&
        props.markList.map((item: any, index: number) => {
          return MarkItem(item, index);
        })}
    </div>
  );
};
