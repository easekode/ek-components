import { Button } from '@ek-components';
import { TextField } from '@ek-components';
import { Chapter } from '@ek-types';
import { useState } from 'react';
import { StyledFormContainer } from './style';
import { AddNewIcon } from './AddNewIcon';
export const AddChapter = ({
  onSubmit,
}: {
  onSubmit: (Chapter: Chapter) => void;
}) => {
  const [data, setData] = useState<Chapter>({
    name: '',
    topics: [],
    code: '',
    slNo: 0,
  });
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(data);
          setData({
            name: '',
            topics: [],
            slNo: 0,
            code: '',
          } as Chapter);
        }}
      >
        <StyledFormContainer>
          <TextField
            name='name'
            label={'Add New Chapter'}
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
          <Button type='submit'>Save </Button>
        </StyledFormContainer>
      </form>
    </>
  );
};
