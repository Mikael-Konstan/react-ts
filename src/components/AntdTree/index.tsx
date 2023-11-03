import { FC, useEffect, useRef, useState } from 'react';
import { Tree, Switch } from 'antd';
import { treeData } from './../testData';
import comStyles from '@/pages/common.less';
import './index.less';

interface AntdTreeProps {}

export const AntdTree: FC<AntdTreeProps> = (props) => {
  const [showLine, setShowLine] = useState<boolean | { showLeafIcon: boolean }>(
    false,
  );
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showLeafIcon, setShowLeafIcon] = useState<boolean>(false);
  const [blockNode, setBlockNode] = useState<boolean>(true);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onSetLeafIcon = (checked: boolean) => {
    setShowLeafIcon(checked);
    setShowLine({ showLeafIcon: checked });
  };

  const onSetShowLine = (checked: boolean) => {
    setShowLine(checked ? { showLeafIcon } : false);
  };
  const onSetBlockNode = (checked: boolean) => {
    setBlockNode(checked);
  };
  return (
    <div className={comStyles.ModalContainer}>
      <div style={{ marginBottom: 16 }}>
        <p>
          showLine: <Switch checked={!!showLine} onChange={onSetShowLine} />
        </p>
        <p>
          showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
        </p>
        <p>
          showLeafIcon:{' '}
          <Switch checked={showLeafIcon} onChange={onSetLeafIcon} />
        </p>
        <p>
          setBlockNode: <Switch checked={blockNode} onChange={onSetBlockNode} />
        </p>
      </div>
      <Tree
        showLine={showLine}
        showIcon={showIcon}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
        blockNode={blockNode}
      />
    </div>
  );
};
