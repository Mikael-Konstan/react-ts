import React from 'react';

export const CanvasDataInit = {
  shapeActiveCode: '',
};

export interface CanvasDataContextType {
  shapeActiveCode: string;
}

export const CanvasDataContext =
  React.createContext<CanvasDataContextType>(CanvasDataInit);
