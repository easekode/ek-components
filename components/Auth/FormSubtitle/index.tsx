import { TitleSubSection } from '@ek-components/index';
import { theme } from '@ek-components/index';

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
