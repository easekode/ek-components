'use client';
import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { ExpandLess, ExpandMore, CheckCircle } from '@mui/icons-material';
import { BoxContainer, theme } from '@ek-components';
import { TitleSubSection } from '@ek-components/TitleHeader';
import { CourseBatchTrackerStatus, ICourseBatch } from '@ek-types';

interface CourseProgressProps {
  batchData: ICourseBatch;
}

const statusColor: Record<CourseBatchTrackerStatus, string> = {
  [CourseBatchTrackerStatus.NOT_STARTED]: theme.palette.grey[500],
  [CourseBatchTrackerStatus.IN_PROGRESS]: theme.palette.warning.main,
  [CourseBatchTrackerStatus.COMPLETED]: theme.palette.success.dark,
};

const statusTextRecord: Record<CourseBatchTrackerStatus, string> = {
  [CourseBatchTrackerStatus.NOT_STARTED]: 'Not Started',
  [CourseBatchTrackerStatus.IN_PROGRESS]: 'In Progress',
  [CourseBatchTrackerStatus.COMPLETED]: 'Completed',
};

const StatusCheckCircle = ({
  status,
}: {
  status: CourseBatchTrackerStatus;
}) => {
  const statusText = statusTextRecord[status as CourseBatchTrackerStatus];

  return (
    <Tooltip title={statusText} arrow>
      <CheckCircle
        sx={{
          color: statusColor[status as CourseBatchTrackerStatus],
        }}
      />
    </Tooltip>
  );
};

const Chapter = ({
  chapter,
  chapterIndex,
  expandedChapters,
  handleExpandClick,
}: {
  chapter: any;
  chapterIndex: number;
  expandedChapters: string[];
  handleExpandClick: (chapterName: string) => void;
}) => (
  <BoxContainer mb={2}>
    <ListItem
      onClick={() => handleExpandClick(chapter.name)}
      sx={{
        borderRadius: '4px',
        backgroundColor: expandedChapters.includes(chapter.name)
          ? theme.palette.grey[200]
          : 'transparent',
      }}
    >
      <ListItemText
        primary={
          <TitleSubSection variant='body1' sx={{ fontWeight: 'bold' }}>
            {chapterIndex + 1}. {chapter.name}
          </TitleSubSection>
        }
      />
      <ListItemIcon>
        <StatusCheckCircle status={chapter.status} />
      </ListItemIcon>
      {expandedChapters.includes(chapter.name) ? (
        <ExpandLess />
      ) : (
        <ExpandMore />
      )}
    </ListItem>
    <Collapse
      in={expandedChapters.includes(chapter.name)}
      timeout='auto'
      unmountOnExit
    >
      <List component='div' disablePadding sx={{ pl: 4 }}>
        {chapter.topics.map((topic: any, topicIndex: number) => (
          <ListItem key={topicIndex}>
            <ListItemText
              primary={
                <TitleSubSection variant='body2'>
                  {topicIndex + 1}. {topic.name}
                </TitleSubSection>
              }
            />
            <ListItemIcon>
              <StatusCheckCircle status={topic.status} />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Collapse>
  </BoxContainer>
);

export const CourseProgress = ({ batchData }: CourseProgressProps) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const courseProgressStatus = batchData?.courseProgress?.chapters || [];
  const totalChapters = courseProgressStatus.length;
  const completedChapters = courseProgressStatus.filter(
    (chapter: any) => chapter.status === CourseBatchTrackerStatus.COMPLETED
  ).length;
  const completionPercentage = totalChapters
    ? (completedChapters / totalChapters) * 100
    : 0;

  const handleExpandClick = (chapterName: string) => {
    setExpandedChapters((prevState) =>
      prevState.includes(chapterName)
        ? prevState.filter((name) => name !== chapterName)
        : [...prevState, chapterName]
    );
  };

  return (
    <BoxContainer>
      <BoxContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TitleSubSection variant='h5' sx={{ fontWeight: 'bold' }}>
          Course Progress
        </TitleSubSection>
        <BoxContainer
          sx={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            variant='determinate'
            value={completionPercentage}
            size={50}
            thickness={4}
            sx={{ color: theme.palette.secondary.main }}
          />
          <BoxContainer
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TitleSubSection
              variant='caption'
              component='div'
              color={theme.palette.secondary.main}
            >
              {`${Math.round(completionPercentage)}%`}
            </TitleSubSection>
          </BoxContainer>
        </BoxContainer>
      </BoxContainer>

      <BoxContainer
        sx={{
          p: '10px',
          borderRadius: '8px',
          boxShadow: `0 1px 2px ${theme.palette.grey[600]}`,
        }}
      >
        <TitleSubSection variant='h6'>
          Course Name: {batchData?.course?.title || 'N/A'}
        </TitleSubSection>
        <TitleSubSection
          variant='subtitle1'
          sx={{ color: theme.palette.grey[300] }}
        >
          Total Chapters: {totalChapters}
        </TitleSubSection>
        <Divider sx={{ marginBottom: '8px' }} />
        <List>
          {courseProgressStatus.map((chapter, chapterIndex) => (
            <Chapter
              key={chapterIndex}
              chapter={chapter}
              chapterIndex={chapterIndex}
              expandedChapters={expandedChapters}
              handleExpandClick={handleExpandClick}
            />
          ))}
        </List>
      </BoxContainer>
    </BoxContainer>
  );
};
