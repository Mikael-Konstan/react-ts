import { CanvasTool } from '@/pages/PDFJS/canvasTool';
import { ShapesDataItem } from '@/pages/PDFJS/canvasTool/type';
import { DrawingTypeEnum } from '@/pages/PDFJS/canvasTool/enum';
import { Button, Input, Modal } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import './index.less';

const { TextArea } = Input;

export interface AddAndEditMarkProps {
  markData: ShapesDataItem | null;
  editMarkVisible: boolean;
  setEditMarkVisible: (flag: boolean) => void;
  saveMarks?: (selected: any) => void;
  deleteMarks?: (selected: any) => void;
  canvasTool: CanvasTool | null;
}

export const AddAndEditMark: FC<AddAndEditMarkProps> = (
  props: AddAndEditMarkProps,
) => {
  const [title, setTitle] = useState<string>('矩形');
  const [comment, setComment] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (props.editMarkVisible) {
      textAreaRef.current?.focus();
      setComment(props.markData?.comment);
    }
  }, [props.editMarkVisible, props.markData, textAreaRef]);
  useEffect(() => {
    switch (props.markData?.type) {
      case DrawingTypeEnum.TEXT:
        setTitle('文本');
        break;
      case DrawingTypeEnum.RECT:
        setTitle('矩形');
        break;
      case DrawingTypeEnum.CLOUD:
        setTitle('云线');
        break;
      case DrawingTypeEnum.ARC:
        setTitle('椭圆');
        break;
      case DrawingTypeEnum.ANCHOR:
        setTitle('图钉');
        break;
      case DrawingTypeEnum.LINE:
        setTitle('直线');
        break;
      case DrawingTypeEnum.ARROWRADIUS:
        setTitle('箭头');
        break;
      case DrawingTypeEnum.ARROWDOUBLE:
        setTitle('双箭头');
        break;
      default:
        break;
    }
  }, [props.markData?.type]);
  // 确定
  const handleOk = () => {
    props.setEditMarkVisible(false);
  };
  // 取消
  const handleCancel = () => {
    if (props.markData?.index === -1 && props.canvasTool) {
      props.canvasTool.remove({
        ...props.markData,
        code: props.markData.markCode,
      });
    }
    props.setEditMarkVisible(false);
  };
  // 删除
  const handleDelete = () => {
    props.setEditMarkVisible(false);
  };
  const textAreaOnChange = (e: any) => {
    setComment(e.target.value);
  };
  const textAreaOnKeyDown = (e: any) => {
    const { key } = e;
    if (key === 'Enter') {
      handleOk();
    }
  };
  const getFooter = () => {
    let arr = [
      <Button
        key="cancel"
        className="AddAndEditMarkCancel"
        onClick={handleCancel}
      >
        取消
      </Button>,
      <Button
        key="ok"
        type="primary"
        className="AddAndEditMarkOk"
        onClick={handleOk}
      >
        确定
      </Button>,
    ];
    if (props.markData?.index !== -1) {
      arr.unshift(
        <Button
          key="delete"
          className="AddAndEditMarkDelete"
          onClick={handleDelete}
          danger
        >
          删除标注
        </Button>,
      );
    }
    return arr;
  };
  return (
    <>
      <Modal
        title={title}
        visible={props.editMarkVisible}
        maskTransitionName=""
        footer={getFooter()}
        width={600}
        onCancel={handleCancel}
      >
        <TextArea
          ref={textAreaRef}
          rows={8}
          defaultValue={comment}
          value={comment}
          onChange={textAreaOnChange}
          onKeyDown={textAreaOnKeyDown}
          maxLength={500}
        />
      </Modal>
    </>
  );
};
