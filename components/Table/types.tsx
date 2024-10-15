export interface Column<T> {
  field: string;
  headerName: string;
  customField?: (row: T) => JSX.Element | string;
}

export interface Row {
  [key: string]: any;
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}
export interface SearchPaginationTypes {
  page: number;
  itemsPerPage: number;
  // newRowsPerPage?: number;
  keyword?: string;
  sort?: {
    field?: string;
    order?: SortOrder;
  };
  filter?: [
    {
      field: string;
      value: string[];
    }
  ];
}
