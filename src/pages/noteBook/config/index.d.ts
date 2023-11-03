export enum TagEnum {
  STYLE = 'style',
  ANIMATION = 'animation',
  TREE = 'tree',
  EDITOR = 'editor',
  DRAG = 'trag',
  VISUALIZATION = 'Visualization',
  REDUX = 'redux',
  MOBX = 'mobx',
  CODE = 'code',
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
