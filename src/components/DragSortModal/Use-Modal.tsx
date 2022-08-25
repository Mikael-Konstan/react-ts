import { useState } from 'react';
import { ModalProps } from './Modal';

type CB = (...args: any[]) => void;

export const useDragSortModal = function () {
  const [modalVis, setModalVis] = useState(false);
  const show = () => {
    setModalVis(true);
  };
  const hide = () => {
    setModalVis(false);
  };
  const getProps = (OK?: CB, Cancel?: CB): ModalProps => {
    return {
      modalVis,
      handleOk: () => {
        OK && OK();
        hide();
      },
      handleCancel: () => {
        Cancel && Cancel();
        hide();
      },
    };
  };
  return {
    show,
    hide,
    getProps,
  };
};
