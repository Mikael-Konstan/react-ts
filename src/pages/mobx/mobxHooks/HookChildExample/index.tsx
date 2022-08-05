import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import styles from './index.less';
import { ProductList } from '@/components/ProductList';
import { useTodoStore } from '@/mobxStoreHooks';

interface HookChildExampleProps {}

export const HookChildExample = observer((props: HookChildExampleProps) => {
  const todoStore = useTodoStore();
  return (
    <div>
      <h1>HookChildExample</h1>
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
