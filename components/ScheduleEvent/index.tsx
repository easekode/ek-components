import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Input,
  useTheme,
  Divider,
} from '@mui/material';
import {
  BoxContainer,
  Button,
  EkButtonProps,
  OkCancel,
  OkCancelProps,
  TitleSubSection,
} from '../index';
import { ModalContext } from '@ek-components/Modal/ModalContext/index';
import { NewEvent } from '@ek-types';
/* export type ScheduleType = {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  recurrence: string[];
  customDays: number[];
  description: string;
};
 */

export type ScheduleType = NewEvent;
/* export const DAYS = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
]; */

export const DAYS = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

/* export const RECURRENCE_OPTIONS = [
  { value: '', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'alternate', label: 'Alternate Days' },
  { value: 'custom', label: 'Custom' },
]; */

export const RECURRENCE_OPTIONS = {
  '': 'Does not repeat',
  daily: 'Daily',
  weekly: 'Weekly',
  alternate: 'Alternate Days',
  custom: 'Custom',
};

export interface ScheduleEventProps {
  showTitleDescription?: boolean;
  onSubmit?: (event: any) => void;
  okCancelProps: OkCancelProps;
}

export const ScheduleEvent = ({
  showTitleDescription = true,
  onSubmit: onSubmitProp,
  okCancelProps,
}: ScheduleEventProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<ScheduleType>({
    mode: 'onChange',
  });
  const { setIsOpen } = useContext(ModalContext);
  const recurrence = watch('recurrence');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const [minEndDate, setMinEndDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [minTime, setMinTime] = useState(
    new Date().toISOString().slice(11, 16)
  );
  const onSubmit = (data: ScheduleType) => {
    const event = {
      // title: data.title,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      startTime: data.startTime,
      endTime: data.endTime,
      recurrence: data.recurrence,
      customDays: data.customDays,
      description: data.description,
    };

    onSubmitProp && onSubmitProp(event);
    // setIsOpen && setIsOpen(false);
  };

  const theme = useTheme();

  return (
    <BoxContainer
      additionalStyles={{
        gap: '20px',
        width: '100%',
      }}
      component='form'
      onSubmit={handleSubmit(onSubmit)}

      // p={2}
    >
      <TitleSubSection additionalStyles={{ color: theme.palette.grey[600] }}>
        Schedule Event
      </TitleSubSection>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TextField
            {...register('startDate')}
            label='Start Date'
            type='date'
            fullWidth
            required
            defaultValue={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setMinEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('endDate')}
            label='End Date'
            type='date'
            fullWidth
            required
            defaultValue={new Date().toISOString().slice(0, 10)}
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
            inputProps={{ min: minEndDate }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('startTime')}
            label='From Time'
            type='time'
            fullWidth
            required
            defaultValue={new Date().toISOString().slice(11, 16)}
            helperText={errors.startTime?.message}
            onChange={(e) => setMinTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('endTime')}
            label='To Time'
            type='time'
            fullWidth
            required
            defaultValue={new Date().toISOString().slice(11, 16)}
            error={!!errors.endTime}
            helperText={errors.endTime?.message}
            // inputProps={{ min: minTime }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='recurrence-label'>Recurrence</InputLabel>
            <Select
              {...register('recurrence')}
              labelId='recurrence-label'
              fullWidth
            >
              {Object.entries(RECURRENCE_OPTIONS).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {recurrence === 'custom' && (
          <Grid item xs={12}>
            <Box>
              {Object.entries(DAYS).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox {...register('customDays')} value={key} />}
                  label={value}
                />
              ))}
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            {...register('description')}
            label='Description'
            multiline
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <OkCancel {...okCancelProps} />
        </Grid>
      </Grid>
    </BoxContainer>
  );
};

type ScheduleEventButtonProps = ScheduleEventProps & EkButtonProps;

export const EventPreview = ({ event }: { event: ScheduleType }) => {
  /*  const event = {
    startDate: new Date('2024-04-23T00:00:00.000Z'),
    endDate: new Date('2024-04-23T00:00:00.000Z'),
    startTime: '',
    endTime: '15:33',
    recurrence: 'daily',
    description: 'sdf',
    customDays: [1, 2, 3],
  }; */
  const theme = useTheme();

  return (
    <BoxContainer>
      <Box>
        <TitleSubSection additionalStyles={{ color: theme.palette.grey[600] }}>
          Event Preview
        </TitleSubSection>
        {/* <Divider variant='fullWidth' /> */}
        <Grid container>
          <Grid item xs={6} md={4}>
            <strong>Start Date:</strong>{' '}
            {event?.startDate?.toLocaleDateString() || 'N/A'}
          </Grid>
          <Grid item xs={6} md={4}>
            <strong>End Date:</strong>{' '}
            {event?.endDate?.toLocaleDateString() || 'N/A'}
          </Grid>
          <Grid item xs={6} md={4}>
            <strong>Start Time:</strong> {event?.startTime || 'N/A'}
          </Grid>
          <Grid item xs={6} md={4}>
            <strong>End Time:</strong> {event?.endTime || 'N/A'}
          </Grid>
          <Grid item xs={6} md={4}>
            <strong>Recurrence:</strong> {event?.recurrence}
          </Grid>
          <Grid item xs={6} md={4}>
            <strong>Custom Days:</strong>{' '}
            {event?.customDays
              ?.map((day: number) => DAYS[day as keyof typeof DAYS])
              ?.join(', ') || 'N/A'}
          </Grid>
          {/* <Grid item xs={6} md={4}>
            <strong>Description:</strong> {event?.description}
          </Grid> */}
        </Grid>
      </Box>
    </BoxContainer>
  );
};

export const ScheduleEventButton = (props: ScheduleEventButtonProps) => {
  const { setModalContent, setIsOpen } = useContext(ModalContext);
  return (
    <Button
      onClick={() => {
        setModalContent && setModalContent(<ScheduleEvent {...props} />);
        setIsOpen && setIsOpen(true);
      }}
    >
      {props.children || 'Schedule Event'}
    </Button>
  );
};
