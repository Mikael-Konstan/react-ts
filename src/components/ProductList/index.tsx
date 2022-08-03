import React from 'react';
import { Table, Popconfirm, Button } from 'antd';
import { ReactReduxType } from '@/models/reactRedux';

export interface ProductListProps {
  onDelete: (id: string) => void;
  products: ReactReduxType.Products;
}

export const ProductList = ({ onDelete, products }: ProductListProps) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (text: any, record: ReactReduxType.ProductsItem) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button size="small">Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table dataSource={products} columns={columns} size="small" />;
};

export default ProductList;
