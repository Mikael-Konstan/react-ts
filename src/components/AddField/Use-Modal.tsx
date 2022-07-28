import { useState } from 'react';
import { AddFieldModalProps } from './Modal';
import { FieldListItem } from '@/utils/type';

export const useAddFieldModal = function () {
  const [tableField, setTableField] = useState<FieldListItem[]>([]);
  const [formulaConfig, setFormulaConfig] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const show = (tableField: FieldListItem[], formulaConfig: string) => {
    setTableField(tableField);
    setFormulaConfig(formulaConfig);
    setModalVisible(true);
  };
  const hide = () => {
    setModalVisible(false);
  };
  const getProps = (
    OK?: (fieldFormula: string, formulaConfig: string) => void,
    cancel?: (...args: any[]) => void,
  ): AddFieldModalProps => {
    return {
      tableField,
      formulaConfig,
      visible: modalVisible,
      handleOnOk: (fieldFormula: string, formulaConfig: string) => {
        OK && OK(fieldFormula, formulaConfig);
        hide();
      },
      handleOnCancel: () => {
        cancel && cancel();
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
