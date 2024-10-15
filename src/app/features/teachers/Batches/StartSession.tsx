import { Button } from '@ek-components/Button';
import { useAlert } from '@ek-components';
import { useCreateCourseBatchSessionMutation } from '@/redux/slices/teacher/teacherCourseApi';
import { getErrorString, getSuccessString } from '@/utils/responseMessage';
import { ButtonProps } from '@mui/material';

interface StartSessionProps extends ButtonProps {
  batchId: string;
  onNewSessionCreated?: () => void;
}

export const StartSession = ({
  batchId,
  onNewSessionCreated,
  children,
}: StartSessionProps) => {
  const [createSession, { isLoading }] = useCreateCourseBatchSessionMutation();
  const { showAlert } = useAlert();

  return (
    <Button
      loading={isLoading}
      color='secondary'
      onClick={async () => {
        try {
          const response = await createSession({ batchId }).unwrap();
          showAlert(getSuccessString(response));
          if (onNewSessionCreated) {
            onNewSessionCreated();
          }
        } catch (error) {
          showAlert(getErrorString(error));
        }
      }}
    >
      {children}
    </Button>
  );
};
