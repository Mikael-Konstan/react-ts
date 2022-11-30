import { Modal } from 'antd';

export function ShowDetailModal(props: {
  detail: string;
  visible: boolean;
  handleOnSave: () => void;
  handleOnCancel: () => void;
}) {
  return (
    <Modal
      width={500}
      footer={null}
      visible={props.visible}
      title={'详情'}
      maskTransitionName=""
      onCancel={props.handleOnCancel}
      className="detail-modal"
    >
      <div style={{ padding: '24px' }}>{props.detail}</div>
    </Modal>
  );
}
