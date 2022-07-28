import { ModelsNameSpaceEnum } from '@/utils/enum';
import { PayloadAction } from '@/utils/type';
import { isFn } from '@/utils/tools';
import { getReactReduxModelNumberApi } from '@/services/reactRedux';
import { getReactReduxModelNumberRes } from '@/services/reactRedux/type';

export interface ProductItem {
  id: string;
  name: string;
}

export declare namespace ReactReduxType {
  type List = number[];
  type Total = number;
  type Page = number;
  type ModelNumber = number;
  type ProductId = string;
  type ProductsItem = ProductItem;
  type Products = ProductItem[];
}

export interface ReactReduxState {
  list: ReactReduxType.List;
  total: ReactReduxType.Total;
  page: ReactReduxType.Page;
  modelNumber: ReactReduxType.ModelNumber;
  productId: ReactReduxType.ProductId;
  products: ReactReduxType.Products;
}

export const state: ReactReduxState = {
  list: [1, 2, 3],
  total: 0,
  page: 1,
  modelNumber: 1,
  productId: 'dva',
  products: [
    {
      id: 'dva',
      name: 'dva',
    },
    {
      id: 'antd',
      name: 'antd',
    },
  ],
};

export default {
  namespace: ModelsNameSpaceEnum.REACTREDUX,
  state,
  reducers: {
    save(
      state: ReactReduxState,
      action: PayloadAction<
        ((state: ReactReduxState) => ReactReduxState) | ReactReduxState
      >,
    ) {
      if (isFn(action.payload)) {
        return {
          ...state,
          ...(<(state: ReactReduxState) => ReactReduxState>action.payload)(
            state,
          ),
        };
      }
      return { ...state, ...action.payload };
    },
    setList: (
      state: ReactReduxState,
      action: PayloadAction<
        | ((list: ReactReduxType.List) => ReactReduxType.List)
        | ReactReduxType.List
      >,
    ) => {
      let list = action.payload;
      if (!Array.isArray(action.payload)) {
        list = action.payload(state.list);
      }
      return { ...state, list };
    },
    deleteProduct: (
      state: ReactReduxState,
      action: PayloadAction<
        | ((products: ReactReduxType.Products) => ReactReduxType.Products)
        | ReactReduxType.ProductId
      >,
    ) => {
      let products = state.products;
      if (typeof action.payload === 'string') {
        products = state.products.filter((item) => item.id !== action.payload);
      } else {
        products = action.payload(state.products);
      }
      return { ...state, products };
    },
  },
  effects: {
    // 只能用* yield   不支持async await
    *query(params: any, { call, put }: { call: any; put: any }) {
      const { data }: getReactReduxModelNumberRes = yield call(
        getReactReduxModelNumberApi,
        {},
      );
      console.log(data);
      yield put({
        type: 'save',
        payload: {
          modelNumber: data,
        },
      });
    },
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === '/users') {
    //       dispatch({ type: 'fetch', payload: query });
    //     }
    //   });
    // },
  },
};
