'use client';
import { CreateBatchButton } from '@/app/features/teachers/Batches/CreateBatch';
import { MyBatchesTable } from '@/app/features/teachers/Batches/MyBatchesTable';

import { Box } from '@mui/material';
import { useState } from 'react';
import { ICourseBatch } from '@ek-types';
import { InviteUsers } from '@/app/features/InviteUsers';

const Batches = () => {
  const [refetch, setRefetch] = useState(false);

  const handleDone = (courseBatch: ICourseBatch) => {
    setRefetch((prev) => !prev);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          // marginBottom: 2,
        }}
      >
        <CreateBatchButton onDone={handleDone}>Create Batch</CreateBatchButton>
      </Box>
      <MyBatchesTable refetch={refetch} />
      {/* <InviteUsers /> */}
    </Box>
  );
};

export default Batches;
