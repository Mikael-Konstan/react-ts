import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { ProductList } from '@/components/ProductList';
import { StoreState, StoreStateType } from '@/models/selectors';

interface ProductsProps extends MapStateRes, MapDispatchRes {}

const Products = (props: ProductsProps) => {
  return (
    <div>
      <h1>Redux Connect</h1>
      <ProductList
        onDelete={props.deleteProduct}
        products={props.reactReduxState?.products}
      />
    </div>
  );
};

interface MapStateRes {
  reactReduxState: StoreStateType.ReactRedux;
}
const mapStateToProps = (state: StoreState) => {
  return { reactReduxState: state.reactRedux };
};

interface MapDispatchRes {
  deleteProduct: (id: string) => void;
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  const deleteProduct = function (id: string) {
    dispatch({
      type: 'reactRedux/deleteProduct',
      payload: id,
    });
  };
  return {
    deleteProduct,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
