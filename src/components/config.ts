import { FieldTypeEnum } from '@/utils/enum';
import { FieldListItem } from '@/utils/type';

export const fieldListDefault: FieldListItem[] = [
  {
    id: 'word',
    title: '文本',
    type: FieldTypeEnum.WORD,
    showCopyIcon: true,
  },
  {
    id: 'date',
    title: '日期',
    type: FieldTypeEnum.DATE,
  },
  {
    id: 'number',
    title: '数字',
    type: FieldTypeEnum.NUMBER,
  },
  {
    id: 'other',
    title: '其他',
    type: FieldTypeEnum.OTHER,
  },
];
