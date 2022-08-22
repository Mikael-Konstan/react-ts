import { Modal } from 'antd';
import styles from './Modal.less';
import { DragSortList } from '@/components';

export interface ModalProps {
  modalVis: boolean;
  handleOnOk: () => void;
  handleOnCancel: () => void;
}

export const DragSortModal = (props: ModalProps) => {
  return (
    <Modal
      width={600}
      visible={props.modalVis}
      title="拖拽排序"
      onOk={() => {
        props.handleOnOk();
      }}
      onCancel={() => {
        props.handleOnCancel();
      }}
    >
      <DragSortList />
    </Modal>
  );
};
