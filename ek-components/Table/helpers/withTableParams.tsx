import { BoxContainer } from '@ek-components/Container';
import { Box } from '@mui/material';
import React from 'react';
import { TableWithPagination } from '../TableWithPagination';

interface TableParams {
  Table: React.ReactNode;
  params: {
    SearchField: React.ReactNode;
    ActionButtons: React.ReactNode;
    DateFilters: React.ReactNode;
  };
}

export const withTableParams = (props: TableParams) => {
  return (
    <BoxContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {props.params.SearchField}
        {props.params.ActionButtons}
      </Box>
      {props.params.DateFilters}
      {props.Table}
    </BoxContainer>
  );
};

export const UserTable = () => {
  /*
    data fetching
    

    */

  return withTableParams({
    Table: (
      <TableWithPagination
        columns={[]}
        getDataFn={async () => {
          return {
            data: [],
            totalResult: 0,
          };
        }}
      />
    ),
    params: {
      SearchField: <div>SearchField</div>,
      ActionButtons: <div>ActionButtons</div>,
      DateFilters: <div>DateFilters</div>,
    },
  });
};
