import { Modal } from 'antd';
import styles from './Modal.less';
import { DragSortListHoc } from '@/components';

export interface ModalProps {
  modalVis: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const DragSortModal = (props: ModalProps) => {
  return (
    <Modal
      width={600}
      visible={props.modalVis}
      footer={null}
      title="拖拽排序 react-sortable-hoc"
      onOk={() => {
        props.handleOk();
      }}
      onCancel={() => {
        props.handleCancel();
      }}
    >
      <DragSortListHoc />
    </Modal>
  );
};
