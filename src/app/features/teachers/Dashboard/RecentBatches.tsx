import { TitleSubSection } from '@ek-components/TitleHeader';
import { BoxContainer } from '@ek-components/Container';
import {
  TableWithoutPagination,
  TableWithPagination,
} from '@ek-components/Table';
import { getApi } from '@/utils/index';
import { ApiUrl } from '@/config/api';
import { useQuery } from '@tanstack/react-query';
import { CourseBatchStatus, ICourseBatch } from '@ek-types';
import { CourseStatusChip } from '../../StatusChip/index';
import { formatDate } from '@/utils/dateUtils';

const columns = [
  {
    field: 'name',
    headerName: 'Batch Name',
    customField: (row: ICourseBatch) => {
      return <>{row?.name}</>;
    },
  },
  {
    field: 'code',
    headerName: 'Batch Code',
    customField: (row: ICourseBatch) => {
      return <>{row?.code}</>;
    },
  },
  {
    field: 'course',
    headerName: 'Course Name',
    customField: (row: ICourseBatch) => {
      return <>{row?.course?.title}</>;
    },
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    customField: (row: ICourseBatch) => {
      return <>{formatDate(row?.event?.startDate)}</>;
    },
  },

  {
    field: 'studentCount',
    headerName: 'Total Students',
    customField: (row: ICourseBatch) => {
      return <>{row?.totalStudents}</>;
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    customField: (row: ICourseBatch) => {
      const status = row.status ? row.status : CourseBatchStatus.NOT_STARTED;
      return <CourseStatusChip status={status} />;
    },
  },
];

export const RecentBatches = ({ data }: { data: ICourseBatch[] }) => {
  return (
    <BoxContainer>
      <TitleSubSection>Recent Batches</TitleSubSection>
      <TableWithoutPagination
        columns={columns}
        getDataFn={async (): Promise<any[]> => {
          return data;
        }}
      />
    </BoxContainer>
  );
};
