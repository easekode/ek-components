import { ApiUrl } from '@/config/api';
import { postApi } from '@/utils';
import { Button } from '@ek-components/Button';
import { useAlert } from '@ek-components';
import { CourseBatchStatus, ICourseBatch } from '@ek-types';
import { useMutation } from '@tanstack/react-query';

interface StartEndBatchProps {
  batch: ICourseBatch;
}

export const StartEndBatch = ({ batch }: StartEndBatchProps) => {
  // const batch = batch?.data?.batch;

  const { showAlert } = useAlert();
  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      await postApi({
        url: ApiUrl.TEACHER_INIT_BATCH_PROGRESS,
        data: {
          batchId: batch?._id,
        },
      });
    },
  });

  if (isError) {
    return <Button variant='contained'>Error</Button>;
  }

  if (batch?.status === CourseBatchStatus.IN_PROGRESS) {
    return (
      <Button
        color='secondary'
        onClick={() => {
          // console.log('end batch');
        }}
      >
        End
      </Button>
    );
  }

  if (batch?.status === CourseBatchStatus.NOT_STARTED) {
    return (
      <Button
        loading={isPending}
        color='secondary'
        onClick={async () => {
          try {
            await mutateAsync({ batchId: batch?._id });
            showAlert({
              message: 'Batch started successfully',
              type: 'success',
            });
          } catch (error) {
            showAlert({ message: 'Error starting batch', type: 'error' });
          }
        }}
      >
        Start
      </Button>
    );
  }
  return <>{batch?._id}</>;
};
