import { LoadingOutlined } from '@ant-design/icons';
import './index.less';
import { IconPng } from '@/components';

export const TreeSwitcherIcon = (props: any) => {
  if (props.loading) {
    return <LoadingOutlined />;
  }
  if (props.loaded) {
    if (
      !props.subNodeList ||
      (props.subNodeList && props.subNodeList.length === 0)
    ) {
      return <span className="ant-tree-switcher-leaf-line"></span>;
    }
  }
  if (props.expanded) {
    return <IconPng type="treeExpand" size={15} className="treeIcon"></IconPng>;
  } else {
    return (
      <IconPng type="treeCollapse" size={15} className="treeIcon"></IconPng>
    );
  }
};
