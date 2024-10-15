import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DragHandle } from '@mui/icons-material';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { displayFlexRow } from '@/utils';
interface DraggableTableProps<T> {
  rows: T[];
  headings: string[];
  rowRenderer: (props: {
    row: T;
    index: number;
    onEdit?: (props: { row: T; index: number }) => void;
    onDelete?: (props: { row: T; index: number }) => void;
  }) => React.ReactNode;
  onChangeRows: (rows: T[]) => void;
}

export const DraggableTable = <T extends Record<string, any>>({
  rows,
  headings,
  rowRenderer,
  onChangeRows,
}: DraggableTableProps<T>) => {
  const [tableRows, setTableRows] = useState<T[]>(rows);
  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  const handleDragEnd = (e: any) => {
    if (!e.destination) return;
    let tempData = Array.from(tableRows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setTableRows(tempData);
    onChangeRows(tempData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table aria-label='simple table'>
        {headings?.length > 0 && (
          <TableHead>
            {
              <TableRow>
                <TableCell></TableCell>
                {headings.map((heading, index) => (
                  <TableCell key={index}>{heading}</TableCell>
                ))}
              </TableRow>
            }
          </TableHead>
        )}
        <Droppable droppableId='droppable-1'>
          {(provider) => (
            <TableBody ref={provider.innerRef} {...provider.droppableProps}>
              {tableRows?.map((row, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provider) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        mb: '10px',
                        // border: '1px solid green',
                      }}
                      {...provider.draggableProps}
                      ref={provider.innerRef}
                    >
                      {rowRenderer({
                        index,
                        row,
                      })}
                      <TableCell
                        component='td'
                        scope='row'
                        {...provider.dragHandleProps}
                      >
                        <DragIndicatorIcon />
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provider.placeholder}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
};

const data = [
  {
    name: 'Frozen yoghurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  // Add more data as needed
];

const headings = [
  'Dessert (100g serving)',
  'Calories',
  'Fat (g)',
  'Carbs (g)',
  'Protein (g)',
];

const rowRenderer = ({ row, index }: any) => (
  <>
    <TableCell>{row.name}</TableCell>
    <TableCell align='right'>{row.calories}</TableCell>
    <TableCell align='right'>{row.fat}</TableCell>
    <TableCell align='right'>{row.carbs}</TableCell>
    <TableCell align='right'>{row.protein}</TableCell>
  </>
);

export const DraggableTableDemo = () => {
  return (
    <DraggableTable
      onChangeRows={() => {}}
      rows={data}
      headings={headings}
      rowRenderer={rowRenderer}
    />
  );
};
