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
import { Column, Row } from './types';
import { getHoverStyles } from './helpers';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import {
  usePathname,
  useRouter,
  useSearchParams,
  useParams,
} from 'next/navigation';
import { IGetPaginationParams } from '@ek-types';
interface TableData<T> {
  data: T[];
  totalResult: number;
}

interface TableProps<T> {
  hideSerialNumber?: boolean;
  paginationType?: 'scroll' | 'pagination';
  columns: Column<T>[];
  loading?: boolean;
  refetch?: boolean;
  onParamsChange: (params: IGetPaginationParams) => void;
  params: IGetPaginationParams;
  tableData: TableData<T>;
}

export const EkTable = <T,>({
  columns,
  loading,
  refetch: refetchInput,
  tableData: tableDataInput,
  onParamsChange,
  params,
}: TableProps<T>) => {
  const [refetch, setRefetch] = useState(refetchInput);
  const [tableData, setTableData] = useState<TableData<T>>(tableDataInput);

  useEffect(() => {
    setRefetch(refetchInput);
  }, [refetchInput]);

  useEffect(() => {
    setTableData(tableDataInput);
  }, [tableDataInput]);

  useEffect(() => {
    onParamsChange(params);
  }, [params]);

  const hoverStyles = getHoverStyles();

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onParamsChange({
      ...params,
      page: newPage + 1,
    });
  };

  const renderSortIcon = (column: Column<T>) => {
    if (params?.sortDir === 1) {
      return <ArrowUpward />;
    } else if (params?.sortDir === -1) {
      <ArrowDownward />;
    }

    return null;
  };

  const handleRowsPerPageChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newRowsPerPage = parseInt(event.target.value as string, 10);
    onParamsChange({
      ...params,
      limit: newRowsPerPage,
    });
  };

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
                  onParamsChange({
                    ...params,
                    sortField: column.field,
                    sortDir: params?.sortDir === 1 ? -1 : 1,
                  })
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
          {tableData?.data?.length && tableData?.data?.length > 0 ? (
            tableData?.data?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {columns.map((column, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`}>
                    {(column.customField && column.customField(row)) ||
                      row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableCell>No records found</TableCell>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={tableData?.totalResult}
        rowsPerPage={params?.limit || 12}
        page={((params?.page && params?.page) || 1) - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};
