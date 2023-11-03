export enum TagEnum {
  STYLE = 'style',
  TREE = 'tree',
  EDITOR = 'editor',
  DRAG = 'trag',
  DRAG_SORT = 'trag_sort',
  VISUALIZATION = 'Visualization',
}

export interface TagItem {
  label: string;
  color: string;
}

export interface Tags {
  [key: string]: TagItem;
}

export interface Article {
  title: string;
  path: string;
  tags?: TagItem[];
}

export interface NoteListItem {
  label: string;
  key: string;
  articles: Article[];
}
