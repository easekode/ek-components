import { TitleSubSection } from '@ek-components';
import { theme } from '@ek-components';

interface FormSubtitleProps {
  text: string;
}

export const FormSubtitle: React.FC<FormSubtitleProps> = ({ text }) => {
  return (
    <TitleSubSection
      style={{
        textAlign: 'center',
        fontSize: '14px',
        marginBottom: '25px',
        color: theme.palette.primary.light,
      }}
    >
      <strong>{text}</strong>
    </TitleSubSection>
  );
};
