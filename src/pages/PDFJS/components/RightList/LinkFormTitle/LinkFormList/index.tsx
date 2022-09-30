import { IF } from '@/components';
import {
  getFormInfoApiResItem,
  getFormTreeApiResItem,
} from '@/services/drawing/type';
import { DataTplTypeEnum } from '@/utils/enum';
import { Menu, MenuProps } from 'century';
import { FormTitleList } from '../FormTitleList';

import { FC, useEffect, useRef, useState } from 'react';
import styles from './index.less';

export interface LinkFormListProps {
  filterWord: string;
  list: getFormTreeApiResItem[];
  type: DataTplTypeEnum.FORM | DataTplTypeEnum.FORM_FLOW;
  modalVis: boolean;
  existLinkList: string[];
  relativeCodeList: string[];
  updateRelativeCodeList: (item: getFormInfoApiResItem, add?: boolean) => void;
}

export const LinkFormList: FC<LinkFormListProps> = (
  props: LinkFormListProps,
) => {
  const [modalVis, setModalVis] = useState<boolean>(false);
  const [current, setCurrent] = useState('');
  const [relativeCodeList, setRelativeCodeList] = useState<string[]>([]);
  const [list, setList] = useState<MenuProps['items']>([]);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    setModalVis(props.modalVis);
  }, [props.modalVis]);
  useEffect(() => {
    setRelativeCodeList(props.relativeCodeList);
  }, [props.relativeCodeList]);
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      const filterWord = (props.filterWord || '').toLowerCase();
      const list = props.list.filter(
        (i: any) => (i?.name || '').toLowerCase().indexOf(filterWord) >= 0,
      );
      setList(list);
      if (Array.isArray(list) && list.length > 0) {
        setCurrent(list[0].key);
      }
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [props.list, props.filterWord]);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className={styles.LinkFormListContainer}>
      <div>
        <Menu
          style={{ width: 240, maxHeight: 400, overflow: 'auto' }}
          theme="light"
          items={list}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </div>
      <div className={styles.titleListContainer}>
        {(list || []).map((item: any) => {
          return (
            <IF
              condition={current === item?.formId}
              noDelete={true}
              key={item?.formId}
            >
              <FormTitleList
                formId={item?.formId}
                type={props.type}
                modalVis={modalVis}
                existLinkList={props.existLinkList}
                relativeCodeList={relativeCodeList}
                updateRelativeCodeList={props.updateRelativeCodeList}
              />
            </IF>
          );
        })}
      </div>
    </div>
  );
};
