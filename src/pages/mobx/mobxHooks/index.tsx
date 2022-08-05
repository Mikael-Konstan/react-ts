import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import styles from './index.less';
import { ProductList } from '@/components/ProductList';
import { useTodoStore } from '@/mobxStoreHooks';
import { HookChildExample } from './HookChildExample';

interface MobxHooksProps {}

const MobxHooks = observer((props: MobxHooksProps) => {
  const todoStore = useTodoStore();
  return (
    <div>
      <h1>Mobx Hooks</h1>
      <ProductList
        onDelete={(id) => {
          todoStore.deleteProduct(id);
        }}
        products={todoStore.products}
      />
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <HookChildExample></HookChildExample>
        <HookChildExample></HookChildExample>
      </div>
    </div>
  );
});

export default MobxHooks;
