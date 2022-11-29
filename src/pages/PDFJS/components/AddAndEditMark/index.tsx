import { CanvasTool } from '@/pages/PDFJS/canvasTool';
import { Button, Input, Modal } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import './index.less';

const { TextArea } = Input;

export interface AddAndEditMarkProps {
  markData: any;
  editMarkVisible: boolean;
  setEditMarkVisible: (flag: boolean) => void;
  saveMarks: (selected: any) => void;
  deleteMarks: (selected: any) => void;
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
      setComment(props.markData.comment);
    }
  }, [props.editMarkVisible, props.markData, textAreaRef]);
  useEffect(() => {
    switch (props.markData.type) {
      case 'text':
        setTitle('文本');
        break;
      case 'rect':
        setTitle('矩形');
        break;
      case 'cloud':
        setTitle('云线');
        break;
      case 'arc':
        setTitle('椭圆');
        break;
      case 'anchor':
        setTitle('图钉');
        break;
      case 'line':
        setTitle('直线');
        break;
      case 'arrowRadius':
        setTitle('箭头');
        break;
      case 'arrowDouble':
        setTitle('双箭头');
        break;
      default:
        break;
    }
  }, [props.markData.type]);
  // 确定
  const handleOk = () => {
    props.saveMarks({
      ...props.markData,
      comment,
    });
    props.setEditMarkVisible(false);
  };
  // 取消
  const handleCancel = () => {
    if (props.markData.index === -1 && props.canvasTool) {
      props.canvasTool.remove({
        ...props.markData,
        code: props.markData.markCode,
      });
    }
    props.setEditMarkVisible(false);
  };
  // 删除
  const handleDelete = () => {
    props.deleteMarks(props.markData);
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
    if (props.markData.index !== -1) {
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
