'use client';
import {
  TableWithPagination,
  TableWithoutPagination,
} from '@ek-components/Table';
import { BoxContainer, Button, TitleSubSection } from '@ek-components';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Course } from '@ek-types';
import { useRouter } from 'next/navigation';
import { SearchPaginationTypes } from '@ek-components/Table/types';
import Link from 'next/link';
import { useFetchCoursesQuery } from '@/redux/slices/teacher/teacherCourseApi';

export const TeacherCourses = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const {
    data: coursesData,
    refetch,
    error,
    isLoading,
  } = useFetchCoursesQuery();
  const courses = coursesData?.data?.data || [];
  const totalResult = coursesData?.data?.totalResult || 0;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    refetch(); // Fetch data on component mount
  }, [refetch]);

  return (
    <BoxContainer>
      <TitleSubSection>Courses</TitleSubSection>
      <Box>
        <Button
          fullWidth={false}
          onClick={() => {
            router.push('/teacher/courses/new');
          }}
        >
          New Course
        </Button>
      </Box>
      {isLoading ? (
        <>{isLoading}</>
      ) : (
        <TableWithPagination<Course>
          columns={[
            {
              field: 'title',
              headerName: 'Course Name',
              customField(row) {
                return (
                  <Link href={'/teacher/courses/' + row._id}>
                    <Typography>{row.title}</Typography>
                  </Link>
                );
              },
            },
            {
              field: 'startDate',
              headerName: 'Start Date',
              customField(row) {
                return <Typography>{row.title}</Typography>;
              },
            },
            {
              field: 'status',
              headerName: 'Status',
              customField(row) {
                return <Typography>{row.status}</Typography>;
              },
            },
            {
              field: '',
              headerName: 'Actions',
              customField(row) {
                return (
                  <Button
                    onClick={() => {
                      router.push(`/teacher/batches?courseId=${row._id}`);
                    }}
                  >
                    Batches
                  </Button>
                );
              },
            },
          ]}
          getDataFn={async (pageParams: SearchPaginationTypes) => {
            const { data: getCourseData } = await refetch();

            if (!getCourseData || !getCourseData?.data?.data) {
              throw new Error('No data found');
            }

            const courses = getCourseData?.data?.data || [];
            const totalResult = getCourseData?.data?.totalResult || 0;

            return {
              data: courses,
              totalResult: totalResult,
            };
          }}
          loading={isLoading}
        />
      )}
    </BoxContainer>
  );
};
