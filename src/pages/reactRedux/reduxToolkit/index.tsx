import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { todoStateSelector } from '@/reduxStore/selectors/todoSelector';
import {
  actions as todoActions,
  setList,
  getModelNumber,
  getModelNumber2,
} from '@/reduxStore/reducers/todoReducer';
import { useAppSelector, useAppDispatch } from '@/utils/hooks';
import styles from './index.less';

const About = () => {
  const dispatch = useDispatch(); // 获取dispatch
  const todoState = useSelector(todoStateSelector);

  const todoStateDiy = useAppSelector(todoStateSelector);
  const appDispatch = useAppDispatch();

  const storeTest = () => {
    dispatch(
      todoActions.setList((list) => {
        return [4, 5, 6];
      }),
    );
  };
  const storeTestDiy = () => {
    // appDispatch(
    //   todoActions.setList((list) => {
    //     return [7, 8, 9];
    //   }),
    // );
    appDispatch(
      setList((list) => {
        return [7, 8, 9];
      }),
    );
  };
  const actionTestDiy = () => {
    appDispatch(getModelNumber());
  };
  const actionTestDiy2 = () => {
    appDispatch(getModelNumber2());
  };
  return (
    <div>
      <h1>Redux Hooks</h1>
      <div>
        <Button onClick={storeTest}>storeTest</Button>
        <Button onClick={storeTestDiy}>storeTestDiy</Button>
        <Button onClick={actionTestDiy}>actionTestDiy</Button>
        <Button onClick={actionTestDiy2}>actionTestDiy2</Button>
        <div>
          <p>{JSON.stringify(todoState.list)}</p>
          <p>{JSON.stringify(todoState.modelNumber)}</p>
          <h2>useAppSelector</h2>
          <p>{JSON.stringify(todoStateDiy.list)}</p>
          <p>{JSON.stringify(todoStateDiy.modelNumber)}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
