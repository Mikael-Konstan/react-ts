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
      handleOnOk: () => {
        OK && OK();
        hide();
      },
      handleOnCancel: () => {
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
