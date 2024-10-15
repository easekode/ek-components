import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@ek-components';
import { FormFieldLabels } from '@/constants/formFields';
import axios from 'axios';

interface SelectCourseProps {
  id?: string;
  title: string;
  label: string;
}

const SelectCourse: React.FC = () => {
  const [options, setOptions] = useState<SelectCourseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3007/api/v1/courses'
        );
        console.log(response.data);
        setOptions(
          response?.data?.data?.data?.map((course: any) => ({
            label: course?.title,
            ...course,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Autocomplete
      size='medium'
      id='tags-standard'
      options={options}
      onChange={(event, value) => {
        console.log(value);
      }}
      loading={loading}
      getOptionLabel={(course) => course?.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={FormFieldLabels.SELECT_COURSE}
          placeholder={FormFieldLabels.SELECT_COURSE}
          variant='outlined'
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
};

export default SelectCourse;
