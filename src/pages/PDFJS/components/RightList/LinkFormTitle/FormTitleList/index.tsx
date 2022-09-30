import { getFormInfoApi } from '@/services/drawing';
import { getFormInfoApiResItem } from '@/services/drawing/type';
import { DataTplTypeEnum } from '@/utils/enum';
import { Checkbox, Divider, Skeleton } from 'century';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.less';

export interface FormTitleListProps {
  formId: string;
  type: DataTplTypeEnum.FORM | DataTplTypeEnum.FORM_FLOW;
  modalVis: boolean;
  existLinkList: string[];
  relativeCodeList: string[];
  updateRelativeCodeList: (item: getFormInfoApiResItem, add?: boolean) => void;
}

interface ListItem extends getFormInfoApiResItem {
  checked: boolean;
}

export const FormTitleList: FC<FormTitleListProps> = (
  props: FormTitleListProps,
) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    getFormInfo();
  }, []);
  useEffect(() => {
    if (props.modalVis) {
      setList((list) => {
        return list.map((i) => {
          i.checked = false;
          return {
            ...i,
            checked: false,
          };
        });
      });
    }
  }, [props.modalVis]);
  // 获取引用列表
  const getFormInfo = () => {
    const len = list.length;
    let currentPage = Math.ceil(len / 10) + 1;
    return getFormInfoApi({
      formId: props.formId,
      pageSize: 10,
      currentPage,
    })
      .then(
        (res) => {
          const { code, success, data, total } = res;
          if (code === 200 && success) {
            setList((list) => {
              return [
                ...list,
                ...(data || []).map((item) => {
                  return {
                    ...item,
                    checked: false,
                  };
                }),
              ];
            });
            setTotal(total);
          }
        },
        (error) => {
          console.log(error);
        },
      )
      .catch((error) => {
        console.log(error);
      });
  };
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    getFormInfo()?.finally(() => {
      setLoading(false);
    });
  };
  const onChange = (
    item: getFormInfoApiResItem,
    checked: boolean,
    index: number,
  ) => {
    props.updateRelativeCodeList(item, checked);
    setList((list) => {
      list[index].checked = checked;
      return list;
    });
  };
  return (
    <div className={styles.listItemContainer} id={props.type + props.formId}>
      {Array.isArray(list) && (
        <InfiniteScroll
          dataLength={list.length}
          next={loadMoreData}
          hasMore={list.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget={props.type + props.formId}
        >
          {list.map((item, index) => {
            return (
              <div key={item.dataId} className={styles.listItem}>
                <Checkbox
                  checked={props.relativeCodeList.includes(item.dataId)}
                  disabled={props.existLinkList.includes(item.dataId)}
                  onChange={(e) => {
                    onChange(item, e.target.checked, index);
                  }}
                >
                  {item.name}
                </Checkbox>
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};
