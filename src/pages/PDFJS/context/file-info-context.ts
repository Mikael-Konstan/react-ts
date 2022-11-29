import React from 'react';

export const FileInfoInit = {
  code: '',
  name: '',
  suffix: '',
  markList: [],
};

export interface FileInfoContextType {
  code: string;
  name: string;
  suffix: string;
  markList?: any[];
}

export const FileInfoContext =
  React.createContext<FileInfoContextType>(FileInfoInit);
