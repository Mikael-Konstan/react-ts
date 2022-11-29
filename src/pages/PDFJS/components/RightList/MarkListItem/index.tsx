import head from '@/public/imgs/test.webp';
import { MessageBusContext } from '@/utils/context';
import { IF } from '@/components';
import { DownOutlined } from '@ant-design/icons';
import { TextOverFlow } from '@/components/TextOverFlow';
import { fileDomain } from '@/global.config';
import { getComment } from '@/pages/PDFJS/components/util';
import { FileInfoContext } from '@/pages/PDFJS/context';
import { Collapse, notification } from 'antd';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { CanvasDataContext } from './../../context';
import './index.less';

const { Panel } = Collapse;

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
  keyWord: string;
  markList: any[];
  editMark: (markData: any) => void;
  deleteMarks?: (markData: any) => void;
}

export const MarkListItem: FC<MarkListItemProps> = (
  props: MarkListItemProps,
) => {
  const [activeCode, setActiveCode] = useState<string>('');
  const [markList, setMarkList] = useState<any[]>([]);
  const listContainer = useRef<HTMLDivElement>(null);
  const canvasData = useContext(CanvasDataContext);
  const messageBus = useContext(MessageBusContext);
  const fileInfo = useContext(FileInfoContext);

  useEffect(() => {
    setActiveCode(canvasData.shapeActiveCode);
  }, [canvasData.shapeActiveCode]);
  useEffect(() => {
    setMarkList(
      props.markList
        .filter((item) => {
          const keyWord = String.prototype.trim.call(props.keyWord);
          if (keyWord === '') return true;
          const creatorName = item.creatorName || '';
          const comment = item.comment || '';
          const flag =
            creatorName.indexOf(props.keyWord) !== -1 ||
            comment.indexOf(props.keyWord) !== -1;
          return flag;
        })
        .map((item) => {
          const { commentShow, showDetail } = getComment(item.comment || '');
          return {
            ...item,
            commentShow,
            showDetail,
          };
        }),
    );
  }, [props.markList, props.markList.length, props.keyWord]);
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
  const onImgError = (e: any) => {
    e.target.src = head;
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
            <TextOverFlow
              Tooltip
              placement="topRight"
              title={item.commentShow}
            />
          </div>
          <div className="markListItemInfo">
            <img
              className="markListItemImage"
              src={`${fileDomain}/proptech_filestore/file/downloadWithoutReturnMsg?fileId=${item.icon}`}
              alt=""
              onError={onImgError}
            />
            <span className="markListItemName">
              <TextOverFlow
                Tooltip
                placement="topRight"
                title={item.creatorName}
              />
            </span>
            <span className="markListItemTime">{item.createTime}</span>
            <span className="optionList">
              <IF condition={item.showDetail}>
                <DownOutlined
                  type="icon-xiangqing3"
                  onClick={(e) => {
                    e.stopPropagation();
                    showDetail(item);
                  }}
                />
              </IF>
              <DownOutlined
                type="icon-bianji3"
                onClick={(e) => {
                  e.stopPropagation();
                  props.editMark({
                    ...item,
                    index,
                  });
                }}
              />
              <DownOutlined
                type="icon-shanchu5"
                onClick={(e) => {
                  e.stopPropagation();
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
      {Array.isArray(fileInfo.markList) &&
        fileInfo.markList.map((item: any, index: number) => {
          return MarkItem(item, index);
        })}
    </div>
  );
};
