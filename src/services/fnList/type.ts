export interface getDataListApiResItem {
  id: string;
  name: string;
}

export interface getDataListApiRes {
  code: number;
  message: string;
  success: boolean;
  data: getDataListApiResItem[];
  total: number;
}
