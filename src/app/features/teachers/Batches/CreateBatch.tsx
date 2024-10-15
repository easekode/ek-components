import { ApiUrl } from '@/config/api';
import { FormFieldLabels } from '@/constants/formFields';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  BoxContainer,
  Button,
  EventPreview,
  OkCancel,
  ScheduleEvent,
  TextField,
  TitleSubSection,
  AlertContext,
} from '@ek-components';
import { displayFlexRow } from '@/utils/index';
import {
  Box,
  ButtonProps,
  Divider,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import {
  ApiResponse,
  Course,
  ICourseBatch,
  NewCourseBatch,
  PaginatedResult,
} from '@ek-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getApi, postApi } from '@/utils/index';
import { TabContext, TabPanel } from '@mui/lab';
import { ModalContext } from '@ek-components/Modal/ModalContext';

interface AutoCompleteCourse extends Course {
  label: string;
}

export const CreateBatch = ({
  onDone,
  onClose,
}: {
  onDone: (data: ICourseBatch) => void;
  onClose: () => void;
}) => {
  const theme = useTheme();
  const [batch, setBatch] = useState<NewCourseBatch>({} as NewCourseBatch);

  const [course, setCourse] = useState<AutoCompleteCourse[]>([]);

  const selectedCourse = useMemo(
    () => course.find((c) => c._id === batch.courseId),
    [batch.courseId, course]
  );
  const [showCourseBatches, setShowCourseBatches] = useState(false);
  const { showAlert } = useContext(AlertContext);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () =>
      postApi({
        url: ApiUrl.CREATE_COURSE_BATCH,
        data: batch,
      }),
  });

  const { data: courseData } = useQuery({
    queryKey: ['getCourses'],
    queryFn: () =>
      getApi<ApiResponse<PaginatedResult<Course>>>({
        url: ApiUrl.COURSES,
      }),
  });

  useEffect(() => {
    if (courseData) {
      setCourse(
        courseData?.data?.data?.map((course: any) => ({
          label: course.title,
          ...course,
        })) || []
      );
    }
  }, [courseData]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await mutateAsync();
      setShowCourseBatches(true);
      showAlert &&
        showAlert({
          message: 'Batch created successfully',
        });
      onDone({
        ...batch,
      } as ICourseBatch);
      onClose();
    } catch (error: any) {
      showAlert &&
        showAlert({
          message: error.message,
          type: 'error',
        });
    }
  };
  const handleChange = (event: any) => {
    setBatch({ ...batch, [event.target.name]: event.target.value || '' });
  };

  const [value, setValue] = useState('1');

  return (
    <BoxContainer additionalStyles={{ padding: '10px' }}>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={(event: React.ChangeEvent<{}>, newValue: string) => {
            setValue(newValue);
          }}
          aria-label='course tabs'
          sx={{ alignSelf: 'center' }}
        >
          <Tab value={'1'} label='Batch Info' />
          <Tab value={'2'} label='Schedule' />
          <Tab value={'3'} label='Summary' />
        </Tabs>

        <TabPanel value={'1'}>
          <BoxContainer>
            <Autocomplete
              onChange={(event, value) => {
                if (!value || !value?._id) {
                  return;
                }
                setBatch({
                  ...batch,
                  courseId: value?._id,
                });
              }}
              size='medium'
              id='tags-standard'
              options={course}
              getOptionLabel={(course) => course.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={FormFieldLabels.COURSE_TITLE}
                  placeholder={FormFieldLabels.COURSE_TITLE}
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
            <TextField
              size='medium'
              label={FormFieldLabels.BATCH_NAME}
              placeholder={FormFieldLabels.BATCH_NAME}
              name='name'
              value={batch?.name}
              onChange={handleChange}
            />

            <Box
              sx={{
                ...displayFlexRow,
                justifyContent: 'flex-end',
              }}
            >
              <Button
                onClick={() => {
                  setValue('2');
                }}
                fullWidth={false}
              >
                Next
              </Button>
            </Box>
          </BoxContainer>
        </TabPanel>
        <TabPanel value={'2'}>
          <BoxContainer
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ScheduleEvent
              onSubmit={(event) => {
                setBatch({ ...batch, event });
                setValue('3');
              }}
              okCancelProps={{
                primaryProps: {
                  type: 'submit',
                  children: 'Next',
                  loading: isPending,
                },
                secondaryProps: {
                  onClick: () => setValue('1'),
                },
              }}
            />
          </BoxContainer>
        </TabPanel>
        <TabPanel value={'3'}>
          <BoxContainer component={'form'} onSubmit={handleSubmit}>
            <TitleSubSection
              additionalStyles={{ color: theme.palette.grey[600] }}
            >
              Course Details
            </TitleSubSection>
            <Typography>
              Name: {selectedCourse && selectedCourse?.title}
            </Typography>
            <Typography>Batch Name: {batch?.name}</Typography>
            <Divider variant='fullWidth' />
            <EventPreview event={batch?.event} />
            <OkCancel
              primaryProps={{
                type: 'submit',
                loading: isPending,
              }}
              secondaryProps={{}}
            />
          </BoxContainer>
        </TabPanel>
      </TabContext>
    </BoxContainer>
  );
};

export interface CreateBatchButtonProps extends ButtonProps {
  onDone: (courseBatch: ICourseBatch) => void;
  isOpen?: boolean;
}
export const CreateBatchButton = ({
  onDone,
  isOpen: isOpenInput,
  children,
  ...rest
}: CreateBatchButtonProps) => {
  const { setIsOpen, setModalContent, setDialogProps } =
    useContext(ModalContext);
  useEffect(() => {
    if (isOpenInput) {
      setIsOpen && setIsOpen(true);

      setModalContent &&
        setModalContent(
          <CreateBatch
            onDone={onDone}
            onClose={() => setIsOpen && setIsOpen(false)}
          />
        );
    }
  }, [isOpenInput]);

  return (
    <Button
      onClick={() => {
        setIsOpen && setIsOpen(true);
        setModalContent &&
          setModalContent(
            <CreateBatch
              onDone={onDone}
              onClose={() => setIsOpen && setIsOpen(false)}
            />
          );
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
