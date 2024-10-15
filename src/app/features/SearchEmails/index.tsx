import { Autocomplete, Box, Stack } from '@mui/material';
import { ErrorDisplay, Loading, TextField } from '@ek-components';
import { FormFieldLabels } from '@/constants/formFields';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApi } from '@/utils/index';
import { ApiUrl } from '@/config/api';
import { ApiResponse, IUser, PaginatedResult } from '@ek-types';

interface OptionType {
  label: string;
  id: string;
}

interface SearchEmailsProps {
  onChange: (params: string[]) => void;
}

const formatUsersToOptions = (users: IUser[]): OptionType[] =>
  users.map((user: IUser) => ({
    label: user.email as string,
    id: user._id as unknown as string,
  }));

const useUserOptions = () => {
  const {
    data: result,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      getApi<ApiResponse<PaginatedResult<IUser>>>({ url: ApiUrl.USERS }),
  });

  const users = result?.data.data || [];
  const options = formatUsersToOptions(users);

  return { options, isLoading, error };
};

export const SearchEmails: React.FC<SearchEmailsProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const filterOptions = (options: OptionType[], params: any) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(params.inputValue.toLowerCase())
    );

    // Add "Add new" option if the typed text doesn't match any existing options
    if (
      params.inputValue !== '' &&
      !filtered.some(
        (option) =>
          option.label.toLowerCase() === params.inputValue.toLowerCase()
      )
    ) {
      filtered.push({
        label: params.inputValue,
        id: '',
      });
    }

    return filtered;
  };

  const { options, isLoading, error } = useUserOptions();

  useEffect(() => {
    if (keyword.length >= 3) {
      debouncedRefetch(keyword);
    } else {
      setKeyword('');
    }
  }, [keyword]);

  const debouncedRefetch = debounce((value: string) => {
    setKeyword(value);
  }, 1000);

  const onInputChange = (event: any, value: string) => {
    if (value.length >= 3) {
      setKeyword(value);
    } else {
      setKeyword('');
    }
  };

  const handleSelectionChange = (event: any, value: OptionType[]) => {
    setSelectedOptions(value);
    onChange(value.map((option) => option.label));
  };

  if (isLoading) {
    return <Loading height='10vh' message='Loading, please wait..' />;
  }

  if (error) {
    return (
      <ErrorDisplay message='An error occurred while fetching the data. Please try again later.' />
    );
  }

  return (
    <Stack>
      <Autocomplete
        multiple
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        loading={isLoading}
        disableClearable
        onInputChange={onInputChange}
        onChange={handleSelectionChange}
        autoHighlight
        getOptionLabel={(option: OptionType) => option.label}
        filterOptions={filterOptions}
        // renderOption={(props, option) => {
        //   if (option.id === '') {
        //     return (
        //       <Box>
        //         Add <em>{option.label}</em>
        //       </Box>
        //     );
        //   }
        //   return <Box>{option.label}</Box>;
        // }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label={FormFieldLabels.EMAIL}
            placeholder='Enter email'
            InputProps={{
              ...params.InputProps,
              endAdornment: <Box>{params.InputProps.endAdornment}</Box>,
            }}
          />
        )}
      />
    </Stack>
  );
};
