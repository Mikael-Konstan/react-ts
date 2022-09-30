import {
  getLinkListApiResDataItem,
  getVersionListApiResItem,
} from '@/services/drawing/type';
import { DrawingTypeEnum } from '@/utils/enum';
import React from 'react';

export const FileInfoInit = {
  fileId: '',
  fileCode: '',
  name: '',
  extension: '',
  treeCode: '',
  sourceCode: '',
  isFollow: false,
  fileVisionId: '',
  currentFile: 0,
  currentVision: -1,
  fileVisionList: [],
  typeEnum: DrawingTypeEnum.ARCHITECTURAL_DRAWING,
};

export interface fileVisionListItem extends getVersionListApiResItem {
  checked: boolean;
  markList?: any[];
  markListLen?: number;
  citeList?: getLinkListApiResDataItem[];
  citeListLen?: number;
}

export interface FileInfoContextType {
  fileId: string;
  fileCode: string;
  name: string;
  extension: string;
  treeCode: string;
  sourceCode: string;
  isFollow: boolean;
  fileVisionId: string;
  currentFile: number;
  currentVision: number;
  fileVisionList: Array<fileVisionListItem>;
  typeEnum: DrawingTypeEnum.ARCHITECTURAL_DRAWING | DrawingTypeEnum.FILE;
  [field: string]: any;
}

export const FileInfoContext =
  React.createContext<FileInfoContextType>(FileInfoInit);
