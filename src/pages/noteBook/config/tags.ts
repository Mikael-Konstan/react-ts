import { Tags, TagEnum } from './index.d';

export const tags: Tags = {
  [TagEnum.STYLE]: {
    label: 'CSS',
    color: 'red',
  },
  [TagEnum.ANIMATION]: {
    label: 'CSS Animation',
    color: 'magenta',
  },
  [TagEnum.UTILS]: {
    label: 'javascript utils',
    color: 'cyan',
  },
  [TagEnum.TREE]: {
    label: '树组件',
    color: 'green',
  },
  [TagEnum.EDITOR]: {
    label: '富文本',
    color: 'volcano',
  },
  [TagEnum.DRAG]: {
    label: '拖拽',
    color: 'geekblue',
  },
  [TagEnum.VISUALIZATION]: {
    label: '可视化',
    color: 'blue',
  },
  [TagEnum.REDUX]: {
    label: 'React Store',
    color: 'orange',
  },
  [TagEnum.MOBX]: {
    label: 'Mobx Store',
    color: 'gold',
  },
  [TagEnum.CODE]: {
    label: '代码',
    color: 'lime',
  },
};
