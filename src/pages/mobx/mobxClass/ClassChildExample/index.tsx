import { connect, Dispatch } from 'umi';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import styles from './index.less';
import { ProductList } from '@/components/ProductList';
import { store, todoStore } from '@/stores';

interface ClassChildExampleProps {}

export const ClassChildExample = observer((props: ClassChildExampleProps) => {
  return (
    <div>
      <h1>ClassChildExample</h1>
      {/* <ProductList
        onDelete={(id) => {
          todoStore.deleteProduct(id);
        }}
        products={todoStore.products}
      /> */}
      <div>
        <p>{todoStore.num}</p>
        <Button
          size="small"
          onClick={() => {
            todoStore.increaseNum();
          }}
        >
          Number Increase
        </Button>
        <p>{todoStore.flag + ''}</p>
        <Button
          size="small"
          onClick={() => {
            todoStore.flagToggle();
          }}
        >
          Boolean Toggle
        </Button>
        <p>{todoStore.obj.title + ''}</p>
        <Button
          size="small"
          onClick={() => {
            todoStore.objChange();
          }}
        >
          Object Change
        </Button>
      </div>
    </div>
  );
});
