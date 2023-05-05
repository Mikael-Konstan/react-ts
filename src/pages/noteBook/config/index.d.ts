export enum TagEnum {
  EDITOR = '富文本',
  DRAG = '拖拽',
  DRAG_SORT = '拖拽排序',
}

export interface Article {
  title: string;
  path: string;
  tags?: TagEnum[];
}

export interface NoteListItem {
  label: string;
  key: string;
  articles: Article[];
}
