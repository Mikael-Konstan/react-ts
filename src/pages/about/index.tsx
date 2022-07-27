import { CSSProperties, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore, getDvaApp } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { aboutSelector } from '@/models/selectors';

const About = () => {
  const dispatch = useDispatch(); // 获取dispatch
  const storeState = useSelector((s: any) => s); // 获取所有model的状态
  const dva = getDvaApp(); // 获取dva实例
  const store = useStore(); // 获取store对象
  const state = store.getState();
  const aboutState = useSelector(aboutSelector);
  const storeTest = () => {
    // console.log(storeState);
    // console.log(aboutState);
    // dispatch({ type: 'about/setList', payload: [4, 5, 6] });
    dispatch({
      type: 'about/setList',
      payload: (list: number[]) => {
        return [4, 5, 6];
      },
    });
  };
  const effectsTest = () => {
    dispatch({ type: 'about/query' });
  };

  return (
    <div>
      <h1>about</h1>
      <Button onClick={storeTest}>storeTest</Button>
      <Button onClick={effectsTest}>effectsTest</Button>
      <div>
        <p>{JSON.stringify(aboutState.list)}</p>
        <p>{JSON.stringify(aboutState.modelNumber)}</p>
      </div>
    </div>
  );
};

export default About;
