import { CSSProperties, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore, getDvaApp } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { reactReduxSelector } from '@/models/selectors';

const About = () => {
  const dispatch = useDispatch(); // 获取dispatch
  const storeState = useSelector((s: any) => s); // 获取所有model的状态
  const dva = getDvaApp(); // 获取dva实例
  const store = useStore(); // 获取store对象
  const state = store.getState();
  const reactReduxState = useSelector(reactReduxSelector);
  const dispatchSetList = (
    payload: ((list: number[]) => number[]) | number[],
  ) => {
    dispatch({
      type: 'reactRedux/setList',
      payload,
    });
  };
  const dispatchQuery = () => {
    dispatch({ type: 'reactRedux/query' });
  };
  const storeTest = () => {
    // console.log(storeState);
    // console.log(reactReduxState);
    // dispatchSetList([4, 5, 6]);
    dispatchSetList((list: number[]) => {
      return [4, 5, 6];
    });
  };
  const effectsTest = () => {
    dispatchQuery();
  };

  return (
    <div>
      <h1>Redux Hooks</h1>
      <Button onClick={storeTest}>storeTest</Button>
      <Button onClick={effectsTest}>effectsTest</Button>
      <div>
        <p>{JSON.stringify(reactReduxState.list)}</p>
        <p>{JSON.stringify(reactReduxState.modelNumber)}</p>
      </div>
    </div>
  );
};

export default About;
