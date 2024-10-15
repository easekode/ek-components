import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Column, Row, SearchPaginationTypes, SortOrder } from '../types';
import { getHoverStyles } from '../helpers';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import {
  usePathname,
  useRouter,
  useSearchParams,
  useParams,
} from 'next/navigation';
export interface TableData<T> {
  data: T[];
  totalResult: number;
}

interface TableProps<T> {
  columns: Column<T>[];
  loading?: boolean;
  getDataFn: (pageParams: SearchPaginationTypes) => Promise<TableData<T>>;
  refetch?: boolean;
}

export const TableWithPagination = <T,>({
  columns,
  getDataFn,
  loading,
  refetch: refetchInput,
}: TableProps<T>) => {
  const [refetch, setRefetch] = useState(refetchInput);
  useEffect(() => {
    setRefetch(refetchInput);
  }, [refetchInput]);
  const [totalCount, setTotalCount] = useState(0);
  const [params, setParams] = useState<SearchPaginationTypes>({
    page: 1,
    itemsPerPage: 10,
    sort: {
      field: '',
      order: SortOrder.Ascending,
    },
  });

  const [data, setData] = useState<any[]>([]);

  const hoverStyles = getHoverStyles();
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const newOffset = newPage + 1;
    const newRowsPerPage = params.itemsPerPage;
    setParams({
      ...params,
      page: newOffset,
    });
    router.push(`?page=${newOffset}&rowsPerPage=${newRowsPerPage}`);
  };

  const renderSortIcon = (column: Column<any>) => {
    if (params?.sort?.field === column.field) {
      return params?.sort?.order === SortOrder.Ascending ? (
        <ArrowUpward />
      ) : (
        <ArrowDownward />
      );
    }
    return null;
  };

  const handleRowsPerPageChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newRowsPerPage = parseInt(event.target.value as string, 10);
    setParams({
      ...params,
      itemsPerPage: newRowsPerPage,
    });
    router.push(`?page=${params.page}&rowsPerPage=${newRowsPerPage}`);
  };

  const getData = async (value: any) => {
    try {
      const result = await getDataFn(value);
      setData(result?.data || []);
      setTotalCount(result?.totalResult);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getData(params);
    const page = searchParams.get('page');
    const rowsPerPage = searchParams.get('rowsPerPage');

    if (page !== null && rowsPerPage !== null) {
      const newParams = {
        ...params,
        page,
        rowsPerPage,
      };
      getData(newParams);
    }
  }, []);

  useEffect(() => {
    getData(params);
  }, [refetch]);

  useEffect(() => {
    getData(params);
  }, [params]);

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }
  return (
    <>
      <Table sx={{ background: 'white' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Box>Sl No.</Box>
            </TableCell>
            {columns?.map((column) => (
              <TableCell
                key={column.field}
                onClick={() =>
                  setParams((prevParams) => ({
                    ...prevParams,
                    sort: {
                      field: column.field,
                      order:
                        prevParams?.sort?.order === SortOrder.Ascending
                          ? SortOrder.Descending
                          : SortOrder.Ascending,
                    },
                  }))
                }
                style={hoverStyles}
              >
                {column.headerName}
                {renderSortIcon(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  {/* {params?.itemsPerPage * (params?.page - 1) + rowIndex + 1} */}
                  {rowIndex + 1}
                </TableCell>
                {columns.map((column, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`}>
                    {(column.customField && column.customField(row)) ||
                      row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableCell>No Record Found</TableCell>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={totalCount}
        rowsPerPage={params.itemsPerPage}
        page={params.page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};
