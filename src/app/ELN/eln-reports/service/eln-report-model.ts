export interface SearchEnt {
  PageSize: number;
  PageNumber: number;
  StatusId: number;
}

export enum gridActionEnum {
  paging, sorting, edit, delete
}