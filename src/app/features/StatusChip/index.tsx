import {
  CourseBatchAssnStatus,
  CourseBatchStatus,
  CourseBatchTrackerStatus,
  EventMode,
  EventPurpose,
  EventStatus,
  FeedbackPurpose,
  SessionFrequency,
  SessionStatus,
  SessionAttendanceStatus,
} from '@ek-types';
import { Chip, ChipProps } from '@mui/material';

const statusColor: Record<string, ChipProps['color']> = {
  NOT_STARTED: 'secondary',
  IN_PROGRESS: 'primary',
  COMPLETED: 'secondary',
  CANCELLED: 'default',
  ACTIVE: 'success',
  INACTIVE: 'warning',
  PENDING: 'warning',
  ONLINE: 'primary',
  OFFLINE: 'default',
  DRAFT: 'warning',
};

export const CourseStatusChip = ({ status }: { status: CourseBatchStatus }) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const EventStatusChip = ({ status }: { status: EventStatus }) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const SessionStatusChip = ({ status }: { status: SessionStatus }) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const EventModeChip = ({ status }: { status: EventMode }) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const SessionFrequencyChip = ({
  status,
}: {
  status: SessionFrequency;
}) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const FeedbackPurposeChip = ({
  status,
}: {
  status: FeedbackPurpose;
}) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const EventPurposeStatusChip = ({
  status,
}: {
  status: EventPurpose;
}) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const CourseBatchAssnStatusChip = ({
  status,
}: {
  status: CourseBatchAssnStatus;
}) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const CourseBatchTrackerStatusChip = ({
  status,
}: {
  status: CourseBatchTrackerStatus;
}) => {
  return <Chip label={status} color={statusColor[status]} />;
};

export const SessionAttendanceStatusChip = ({
  status,
}: {
  status: SessionAttendanceStatus;
}) => {
  return <Chip label={status} color={statusColor[status]} />;
};
