/* import { cloneDeep } from '@/utils/cloneDeep';
import { Button } from '@ek-components/Button';
import { Box, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { StyledFormContainer } from './style';
import { AddNewIcon } from './AddNewIcon';

export const AddSubject = ({
  onSubmit,
}: {
  onSubmit: (topic: NewSubject) => void;
}) => {
  const [data, setData] = useState<NewSubject>({
    chapters: [],
    title: '',
    code: '',
    slNo: 0,
  });

  // focust on the input field on load
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, []);
  return (
    <AddNewIcon>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(cloneDeep(data));
          setData({
            chapters: [],
            title: '',
            code: '',
            slNo: 0,
          } as NewSubject);
        }}
      >
        <StyledFormContainer>
          <TextField
            name='title'
            label='Add New NewSubject'
            placeholder='Add New NewSubject'
            required
            value={data.title}
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
            inputRef={inputRef}
          />
          <Button type='submit'>Add</Button>
        </StyledFormContainer>
      </form>
    </AddNewIcon>
  );
};
 */
