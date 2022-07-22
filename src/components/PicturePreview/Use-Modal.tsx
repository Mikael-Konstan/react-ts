import { useState } from 'react';
import { fileDomain } from '@/global.config';

export const usePicturePreviewModal = function () {
  const [modalVis, setModalVis] = useState(false);
  const [pictureList, setPictureList] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const onModalClose = () => {
    setModalVis(false);
  };
  const getProps = () => {
    return {
      index,
      pictureList,
      visible: modalVis,
      handleOnSave: () => {
        onModalClose();
      },
      handleOnCancel: () => {
        onModalClose();
      },
    };
  };
  const show = (pictureList: any[], index: number) => {
    setPictureList(
      pictureList.map((item) => {
        return {
          url: `${fileDomain}/proptech_filestore/file/downloadWithoutReturnMsg?fileId=${
            item.itemId || ''
          }`,
          fileCode: item.itemCode,
          fileName: item.itemId,
          ...item,
        };
      }),
    );
    setIndex(index);
    setModalVis(true);
  };
  const hide = () => {
    setModalVis(false);
    onModalClose();
  };
  return {
    show,
    hide,
    getProps,
  };
};
