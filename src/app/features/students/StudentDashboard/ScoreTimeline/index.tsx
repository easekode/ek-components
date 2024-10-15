import { useIsMobile, theme } from '@ek-components';
import { Box } from '@mui/material';
import { ScoreTimeline } from '@ek-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ScoreTimelineChartProps {
  scoreTimeline: ScoreTimeline[];
}

export const ScoreTimelineChart: React.FC<ScoreTimelineChartProps> = ({
  scoreTimeline,
}) => {
  const data = scoreTimeline?.map((entry) => ({
    date: entry.date,
    scoreMonthly: entry.score,
  }));
  const isMobile = useIsMobile();

  return (
    <ResponsiveContainer width='100%' height={isMobile ? 250 : 350}>
      {data && data.length > 0 ? (
        <LineChart data={data} margin={{ top: 30, right: 20 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='scoreMonthly'
            stroke={theme.palette.secondary.main}
            activeDot={{ r: 10 }}
          />
        </LineChart>
      ) : (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          No data found
        </Box>
      )}
    </ResponsiveContainer>
  );
};
