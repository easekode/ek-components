import { Button } from '@ek-components/Button';
import { BoxContainer } from '@ek-components/Container/BoxContainer';
import { Box, TextField } from '@mui/material';
import { Topic } from '@ek-types';
import { useState } from 'react';
import { StyledFormContainer } from './style';
import { AddNewIcon } from './AddNewIcon';

export const AddTopic = ({
  onSubmit,
}: {
  onSubmit: (topic: Topic) => void;
}) => {
  const [data, setData] = useState<Topic>({
    name: '',
    code: '',
    slNo: 0,
  });
  return (
    <Box
      component={'form'}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(data);
        setData({
          name: '',
        } as Topic);
      }}
    >
      <StyledFormContainer>
        <TextField
          name='name'
          label='Add New Topic'
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
          required
        />
        <Button type='submit'>Save</Button>
      </StyledFormContainer>
    </Box>
  );
};
