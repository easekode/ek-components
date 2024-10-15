import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TableContainer,
  Paper,
  styled,
  tableCellClasses,
} from '@mui/material';
import { Column, Row, SearchPaginationTypes, SortOrder } from '../types';
import { getHoverStyles } from '../helpers';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface TableProps {
  columns: Column<any>[];
  loading?: boolean;
  showSl?: boolean;
  getDataFn: () => Promise<any[]>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const TableWithoutPagination: React.FC<TableProps> = ({
  columns,
  getDataFn,
  loading,
  showSl = true,
}: TableProps) => {
  const [params, setParams] = useState<SearchPaginationTypes>();
  const [data, setData] = useState<any[]>([]);
  const hoverStyles = getHoverStyles();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataFn();
        setData(result);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getDataFn]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <TableContainer
      component={Paper}
      // style={{ height: '40%', width: '500px', overflowY: 'auto' }}
    >
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            {showSl && (
              <StyledTableCell style={hoverStyles}>Sl No</StyledTableCell>
            )}
            {columns?.map((column) => (
              <StyledTableCell key={column.field} style={hoverStyles}>
                {column.headerName}
                {renderSortIcon(column)}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {showSl && <StyledTableCell>{rowIndex + 1}</StyledTableCell>}
                {columns.map((column, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`}>
                    {(column.customField && column.customField(row)) ||
                      row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align='center'>
                No Record Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
