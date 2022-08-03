import { connect, Dispatch } from 'umi';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import styles from './index.less';
import { ProductList } from '@/components/ProductList';
import { store, TodoStore } from '@/stores';
import { ClassChildExample } from './ClassChildExample';

interface MobxClassProps {
  store: TodoStore;
}

const MobxClass = observer((props: MobxClassProps) => {
  return (
    <div>
      <h1>Mobx Class</h1>
      <ProductList
        onDelete={(id) => {
          props.store.deleteProduct(id);
        }}
        products={props.store.products}
      />
      <div>
        <p>{props.store.num}</p>
        <Button
          size="small"
          onClick={() => {
            props.store.increaseNum();
          }}
        >
          Number Increase
        </Button>
        <p>{props.store.flag + ''}</p>
        <Button
          size="small"
          onClick={() => {
            props.store.flagToggle();
          }}
        >
          Boolean Toggle
        </Button>
        <p>{props.store.obj.title + ''}</p>
        <Button
          size="small"
          onClick={() => {
            props.store.objChange();
          }}
        >
          Object Change
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ClassChildExample></ClassChildExample>
        <ClassChildExample></ClassChildExample>
      </div>
    </div>
  );
});

export default () => <MobxClass store={store.todo}></MobxClass>;
