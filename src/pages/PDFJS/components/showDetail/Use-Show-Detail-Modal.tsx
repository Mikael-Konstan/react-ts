import { useState } from 'react';

export const useShowDetailModal = function () {
  const [modalVisible, setModalVisible] = useState(false);
  const [detail, setDetail] = useState('');
  const onModalClose = () => {
    setModalVisible(false);
  };
  const getModalProps = () => {
    return {
      detail,
      visible: modalVisible,
      handleOnSave: () => {
        onModalClose();
      },
      handleOnCancel: () => {
        onModalClose();
      },
    };
  };
  const show = (detail: string) => {
    setDetail(detail);
    setModalVisible(true);
  };
  const hide = () => {
    setModalVisible(false);
    onModalClose();
  };
  return {
    showDetailModal: show,
    hideDetailModal: hide,
    getDetailModalProps: getModalProps,
  };
};
