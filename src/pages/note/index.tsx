import { useState } from 'react';
import { Tabs, List, Input } from 'antd';
import styles from './index.less';
import { IF } from '@/components';
import * as _lodash from 'lodash';
import * as _underscore from 'underscore';
import { NoteList, Article } from './config';

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
          onChange={(e) => {
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
            showTotal: (total) => `共 ${total} 条`,
            pageSize,
            pageSizeOptions: [10, 20, 50],
            onShowSizeChange: (current, size) => {
              setPageSize(size);
            },
          }}
          dataSource={articles.filter((article) => {
            const KeyWord = String.prototype.trim.call(keyWord);
            if (KeyWord === '') return true;
            return String.prototype.includes.call(article.title, KeyWord);
          })}
          renderItem={(item) => (
            <List.Item>
              <a href={item.path}>{item.title}</a>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const Note = () => {
  const [keyWord, setKeyWord] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);

  return (
    <div className={styles.NoteContainer}>
      <div className={styles.NoteTitle}>
        <h1>Note</h1>
        <div>
          <Input
            allowClear
            placeholder="请输入关键词"
            value={keyWord}
            onChange={(e) => {
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
            defaultActiveKey="CSS"
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
              onShowSizeChange: (current, size) => {
                setPageSize(size);
              },
            }}
            header={null}
            dataSource={NoteList.reduce((pre: Article[], cur) => {
              return Array.prototype.concat(pre, cur.articles);
            }, []).filter((article) => {
              const KeyWord = String.prototype.trim.call(keyWord);
              if (KeyWord === '') return true;
              return String.prototype.includes.call(article.title, KeyWord);
            })}
            renderItem={(item) => (
              <List.Item>
                <a href={item.path}>{item.title}</a>
              </List.Item>
            )}
          />
        </IF>
      </div>
    </div>
  );
};

export default Note;
