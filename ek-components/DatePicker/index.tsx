import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { BoxContainer, EkButtonProps, OkCancel } from '..';
import { ModalContext } from '@ek-components/Modal/ModalContext';
export type DateType = Date | null;
interface DatePickerProps {
  onChange: (fromDate: DateType, toDate: DateType) => void;
  onDone?: (fromDate: DateType) => void;
}

const DatePickerComponent = ({ onChange }: DatePickerProps) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const handleTodayClick = () => {
    const today = dayjs();
    setFromDate(today);
    setToDate(today);
    onChange(today.toDate(), today.toDate());
  };

  const handleYesterdayClick = () => {
    const yesterday = dayjs().subtract(1, 'day');
    setFromDate(yesterday);
    setToDate(yesterday);
    onChange(yesterday.toDate(), yesterday.toDate());
  };

  const handleWeekClick = () => {
    const today = dayjs();
    const weekAgo = dayjs().subtract(7, 'day');
    setFromDate(weekAgo);
    setToDate(today);
    onChange(weekAgo.toDate(), today.toDate());
  };

  const handleMonthClick = () => {
    const today = dayjs();
    const startOfMonth = dayjs().startOf('month');
    setFromDate(startOfMonth);
    setToDate(today);
    onChange(startOfMonth.toDate(), today.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <BoxContainer
          additionalStyles={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid red',
            width: '100%',
          }}
        >
          <Typography variant='h6'>Select Date Range</Typography>
          <DatePicker
            label='From'
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue);
              if (toDate && newValue && newValue.isAfter(toDate)) {
                setToDate(newValue);
              }
            }}
          />
          <DatePicker
            label='To'
            value={toDate}
            onChange={(newValue) => {
              setToDate(newValue);
              if (fromDate && newValue && newValue.isBefore(fromDate)) {
                setFromDate(newValue);
              }
            }}
          />
          <Button onClick={handleTodayClick}>Today</Button>
          <Button onClick={handleYesterdayClick}>Yesterday</Button>
          <Button onClick={handleWeekClick}>Week</Button>
          <Button onClick={handleMonthClick}>Month</Button>
          <OkCancel
            primaryProps={{
              onClick: () => {
                onChange(fromDate?.toDate() || null, toDate?.toDate() || null);
              },
            }}
            secondaryProps={{
              onClick: () => {
                onChange(null, null);
              },
            }}
          />
        </BoxContainer>
      </DemoContainer>
    </LocalizationProvider>
  );
};

type DatePickerButton = EkButtonProps & DatePickerProps;

export const DatePickerButton = (props: DatePickerButton) => {
  const { setIsOpen, setModalContent } = useContext(ModalContext);
  return (
    <Button
      onClick={() => {
        if (!setIsOpen || !setModalContent) {
          return;
        }
        setModalContent(
          <DatePickerComponent
            onChange={props.onChange}
            onDone={props.onDone}
          />
        );
        setIsOpen(true);
      }}
    >
      {props.children}
    </Button>
  );
};
