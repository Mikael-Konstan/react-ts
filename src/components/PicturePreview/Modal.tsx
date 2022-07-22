import { useEffect, useState } from 'react';
import { Modal, Tooltip } from 'antd';
import './Modal.less';
import { PicturePreview } from './Preview';
import { IF, IconSvg } from '@/components';
import { getFileInfoApi } from '@/services/file';
import { fileSizeUnitConversion } from '@/utils/tools/file';

export function PicturePreviewModal(props: {
  index: number;
  pictureList: any[];
  visible: boolean;
  handleOnSave: () => void;
  handleOnCancel: () => void;
}) {
  const [index, setIndex] = useState<number>(-1);
  const [fullScreen, setFullScreen] = useState(false);
  const [fileInfo, setFileInfo] = useState<any[]>([]);
  useEffect(() => {
    if (props.visible) {
      setFullScreen(false);
    }
  }, [props.visible]);
  useEffect(() => {
    if (props.index !== undefined || props.index !== null) {
      setIndex(props.index);
    }
  }, [props.index]);
  useEffect(() => {
    getFileInfo(
      props.pictureList.map((item) => {
        return item.fileName;
      }),
    );
  }, [props.pictureList]);
  const fullScreenToggle = () => {
    setFullScreen((fullScreen) => {
      return !fullScreen;
    });
  };
  // 获取文件详细信息
  const getFileInfo = async (fileIdList: string[]) => {
    if (fileIdList.length === 0) return;
    const { code, success, data } = await getFileInfoApi(fileIdList);
    if (code === 200 && success && data) {
      setFileInfo(data);
    }
  };
  // 图片切换
  const changeImg = (flag: boolean) => {
    setIndex((index) => {
      if (flag) {
        index--;
      } else {
        index++;
      }
      return index;
    });
  };
  const FileInfoText = () => {
    if (fileInfo.length === 0 || !fileInfo[index]) return '';
    const info = fileInfo[index];
    const keyList = [
      {
        title: '创建时间',
        field: 'createTime',
      },
      {
        title: '名称',
        field: 'fileName',
      },
      {
        title: '大小',
        field: 'size',
      },
    ];
    return (
      <div>
        {keyList.map((item) => {
          let value = info[item.field];
          if (item.field === 'size') {
            value = fileSizeUnitConversion(value);
          }
          return (
            <p key={item.field}>
              {item.title} :<span style={{ paddingLeft: '10px' }}>{value}</span>
            </p>
          );
        })}
      </div>
    );
  };
  return (
    <Modal
      width={fullScreen ? document.body.clientWidth : 900}
      footer={null}
      visible={props.visible}
      title={''}
      style={{ paddingBottom: '0px', top: fullScreen ? '0px' : '' }}
      onCancel={props.handleOnCancel}
      className="picture-preview-modal"
    >
      <span
        onClick={() => {
          fullScreenToggle();
        }}
      >
        <IF condition={!fullScreen}>
          <IconSvg type="fullScreen" className="screenSvg"></IconSvg>
        </IF>
        <IF condition={fullScreen}>
          <IconSvg type="notFullScreen"></IconSvg>
        </IF>
      </span>
      <Tooltip placement="bottom" title={FileInfoText()}>
        <IconSvg type="detail" className="detailSvg"></IconSvg>
      </Tooltip>
      <PicturePreview
        index={index}
        pictureList={props.pictureList}
        fullScreen={fullScreen}
        changeImg={changeImg}
      ></PicturePreview>
    </Modal>
  );
}
