import { useState, useEffect, useRef } from 'react';
import { Input, Divider, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.less';
import { getThrottleListApi } from '@/services/fnList';
import { getDataListApiResItem } from '@/services/fnList/type';
import { Toast } from '@/components';

const Throttle = () => {
  const [keyWord, setKeyWord] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<getDataListApiResItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      getThrottleList();
      timerRef.current = null;
    }, 600);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [keyWord]);

  const iptChange = (e: any) => {
    setKeyWord(e.target.value);
  };
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    getThrottleList().finally(() => {
      setLoading(false);
    });
  };
  const getThrottleList = async () => {
    const { code, success, data, total } = await getThrottleListApi();
    if (code === 200 && success) {
      setDataList((dataList) => {
        let arr: getDataListApiResItem[] = [];
        if (!!dataList) {
          arr = dataList;
        }
        return [...arr, ...data];
      });
      setTotal(total);
    } else {
      Toast.error('未知错误');
    }
  };
  return (
    <div>
      <h1>Throttle</h1>
      <Input
        placeholder=""
        allowClear
        className={styles.ipt}
        value={keyWord}
        onChange={(e) => iptChange(e)}
      />
      <div className={styles.DataList} id="scrollableDiv">
        {!!dataList && (
          <InfiniteScroll
            dataLength={dataList.length}
            next={loadMoreData}
            hasMore={dataList.length < total}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget={`scrollableDiv`}
          >
            {dataList.map((item, idx) => (
              <div key={idx} className={styles.DataListItem}>
                <p>{item.name}</p>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Throttle;
