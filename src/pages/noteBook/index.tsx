import { useState } from 'react';
import { Tabs, List, Input, Tag } from 'antd';
import styles from './index.less';
import { IF, Link } from '@/components';
import * as _lodash from 'lodash';
import * as _underscore from 'underscore';
import { searchFilter } from '@/utils/tools';
import { NoteList, Article, tags } from './config';

const RenderItem = (item: Article) => {
  return (
    <List.Item>
      <Link href={item.path} target="_self">
        {item.title}
      </Link>
      <div>
        {Array.isArray(item.tags) &&
          item.tags.map((tag) => {
            return (
              <Tag key={tag.label} color={tag.color}>
                {tag.label}
              </Tag>
            );
          })}
      </div>
    </List.Item>
  );
};

const ItemChild = ({ articles }: { articles: Article[] }) => {
  const [keyWord, setKeyWord] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  return (
    <div>
      <div className={styles.itemHeader}>
        <Input
          allowClear
          placeholder="请输入标题"
          value={keyWord}
          onChange={(e: any) => {
            setKeyWord(e.target.value);
          }}
          style={{ width: '240px' }}
        />
      </div>
      <div style={{ height: '468px', overflow: 'auto' }}>
        <List
          bordered
          size="small"
          pagination={{
            showSizeChanger: true,
            total: articles.length,
            showTotal: (total: number) => `共 ${total} 条`,
            pageSize,
            pageSizeOptions: [10, 20, 50],
            onShowSizeChange: (current: any, size: number) => {
              setPageSize(size);
            },
          }}
          dataSource={searchFilter(articles, keyWord)}
          renderItem={RenderItem}
        />
      </div>
    </div>
  );
};

const NoteBook = () => {
  const [keyWord, setKeyWord] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);

  return (
    <div className={styles.NoteContainer}>
      <div className={styles.NoteTitle}>
        <h1>NoteBook</h1>
        <div>
          <Input
            allowClear
            placeholder="请输入关键词"
            value={keyWord}
            onChange={(e: any) => {
              setKeyWord(e.target.value);
            }}
            style={{ width: '240px' }}
          />
        </div>
      </div>
      <div
        style={{
          margin: '20px',
          height: 'calc(100vh - 188px)',
          overflow: 'auto',
        }}
      >
        <IF condition={keyWord === ''}>
          <Tabs
            defaultActiveKey={NoteList[0] && NoteList[0].key}
            tabPosition="left"
            centered
            items={NoteList.map((note, i) => {
              return {
                ...note,
                children: <ItemChild articles={note.articles} />,
              };
            })}
          />
        </IF>
        <IF condition={keyWord !== ''}>
          <List
            bordered
            size="small"
            pagination={{
              showSizeChanger: true,
              pageSize,
              pageSizeOptions: [10, 20, 50],
              onShowSizeChange: (current: number, size: number) => {
                setPageSize(size);
              },
            }}
            header={null}
            dataSource={searchFilter(
              NoteList.reduce((pre: Article[], cur) => {
                return Array.prototype.concat(pre, cur.articles);
              }, []),
              keyWord,
            )}
            renderItem={RenderItem}
          />
        </IF>
      </div>
    </div>
  );
};

export default NoteBook;
