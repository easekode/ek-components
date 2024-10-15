import React, { useState } from 'react';
import { Checkbox, List, TextField, IconButton, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
  BoxContainer,
  Loading,
  OkCancel,
  useAlert,
  useModalManager,
} from '@ek-components';
import { TitleSubSection } from '@ek-components/TitleHeader';
import {
  Chapter,
  CourseBatchTrackerStatus,
  CourseProgressUpdateType,
  EndSessionBody,
  ICourseBatch,
  Topic,
  CourseProgressSchema,
  ChapterProgress,
  idToString,
  TopicProgress,
  ApiResponse,
} from '@ek-types';
import { cloneDeep, postApi, putApi } from '@/utils';
import { useParams } from 'next/navigation';
import { ApiUrl } from '@/config/api';
import { useEndSessionMutation } from '@/redux/slices/teacher/courseBatchSessionApi';

interface EndSessionModalProps {
  isLoading: boolean;
  courseBatch: ICourseBatch;
  sessionId: string;
  onSessionEnded?: () => void;
}

export const EndSessionModal: React.FC<EndSessionModalProps> = ({
  courseBatch,
  isLoading,
  sessionId,
  onSessionEnded,
}) => {
  const { showAlert } = useAlert();
  const params = useParams();
  const [endSessionMutation, { isLoading: isEndSessionLoading }] =
    useEndSessionMutation();
  const [notes, setNotes] = useState<string>('');

  const { courseProgress } = courseBatch;
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const { closeModal } = useModalManager();
  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean;
  }>({});

  const getKey = ({
    chapter,
    topic,
  }: {
    chapter: ChapterProgress;
    topic?: TopicProgress;
  }) => {
    return chapter?._id + '-' + topic?._id || '';
  };

  const handleCheckboxToggle = ({
    topic,
    chapter,
  }: {
    chapter: ChapterProgress;
    topic?: TopicProgress;
  }) => {
    const key = getKey({
      chapter,
      topic,
    });

    setCheckboxState((prevState) => {
      const newPrevState = cloneDeep(prevState);
      if (newPrevState[key]) {
        delete newPrevState[key];
        return newPrevState;
      }

      newPrevState[key] = true;
      return newPrevState;
    });
  };
  const isChapterChecked = ({ chapter }: { chapter: ChapterProgress }) => {
    return chapter.topics.every((topic: TopicProgress) =>
      isTopicChecked({ chapter, topic })
    );
  };
  const isTopicChecked = ({
    chapter,
    topic,
  }: {
    chapter: ChapterProgress;
    topic: TopicProgress;
  }) => {
    const key = getKey({
      chapter,
      topic,
    });
    return checkboxState[key] || false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getChaptersCovered = (): {
      chapterId: string;
      topicIds: string[];
    }[] => {
      const chaptersCovered: any = [];

      Object.entries(checkboxState).forEach(([key]) => {
        const [chapterId, topicId] = key.split('-');
        if (chaptersCovered[chapterId]) {
          chaptersCovered[chapterId].push(topicId);
        } else {
          chaptersCovered[chapterId] = [topicId];
        }
      });

      const finalChapterCovered: any = [];
      Object.entries(chaptersCovered).forEach(([chapterId, topicIds]) => {
        finalChapterCovered.push({
          chapterId,
          topicIds,
        });
      });
      return finalChapterCovered;
    };
    const body: EndSessionBody = {
      sessionId: sessionId,
      progress: {
        chaptersCovered: getChaptersCovered(),
        status: CourseBatchTrackerStatus.COMPLETED,
        batchId: courseBatch?._id as string,
      },
      notes,
    };
    const res = await endSessionMutation({
      body,
      params: {
        sessionId,
      },
    }).unwrap();
    showAlert({
      message: res.message,
      type: 'success',
    });
    onSessionEnded?.();
  };

  const isChapterDone = (chapter: ChapterProgress) => {
    return chapter.topics.every(
      (topic: TopicProgress) =>
        topic.status === CourseBatchTrackerStatus.COMPLETED
    );
  };
  const isTopicDone = (topic: TopicProgress) => {
    return topic.status === CourseBatchTrackerStatus.COMPLETED;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BoxContainer
      component={'form'}
      sx={{ p: 10, borderRadius: 2, height: '70vh' }}
      onSubmit={handleSubmit}
    >
      <TitleSubSection variant='h5' sx={{ mb: 2 }}>
        End Session
      </TitleSubSection>
      <Divider />
      <List>
        {courseProgress?.chapters.map((chapter: ChapterProgress) => (
          <BoxContainer key={chapter.name}>
            <BoxContainer
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              sx={{ mb: 5 }}
            >
              <TitleSubSection variant='h6'>{chapter.name}</TitleSubSection>
              <BoxContainer display='flex' alignItems='center'>
                <Checkbox
                  disabled={isChapterDone(chapter)}
                  checked={
                    isChapterDone(chapter) ||
                    !!isChapterChecked({
                      chapter,
                    })
                  }
                  onChange={() =>
                    handleCheckboxToggle({
                      chapter,
                      // topic:chapter,
                    })
                  }
                  sx={{ p: 0, mr: 1 }}
                />
                <IconButton
                  onClick={() =>
                    setExpandedChapter((prev) =>
                      prev === chapter.name ? null : chapter.name
                    )
                  }
                  sx={{ p: 0 }}
                >
                  {expandedChapter === chapter.name ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </BoxContainer>
            </BoxContainer>
            {expandedChapter === chapter.name && (
              <BoxContainer
                sx={{
                  pl: 4,
                  pb: 2,
                }}
              >
                {chapter.topics.map((topic: any) => (
                  <BoxContainer
                    key={topic.name}
                    display='flex'
                    alignItems='center'
                    sx={{ mb: 1 }}
                  >
                    <TitleSubSection variant='body2' sx={{ flexGrow: 1 }}>
                      {topic.name}
                    </TitleSubSection>
                    <Checkbox
                      disabled={isTopicDone(topic)}
                      checked={
                        isTopicDone(topic) ||
                        isTopicChecked({
                          chapter,
                          topic,
                        })
                      }
                      onChange={() =>
                        handleCheckboxToggle({
                          chapter,
                          topic,
                        })
                      }
                      sx={{ p: 0 }}
                    />
                  </BoxContainer>
                ))}
              </BoxContainer>
            )}
          </BoxContainer>
        ))}
      </List>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder='Add notes...'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        variant='outlined'
        sx={{ mt: 2, mb: 10 }}
      />
      <OkCancel
        primaryProps={{
          // disabled: isLoading,
          loading: isEndSessionLoading,
          type: 'submit',
        }}
        secondaryProps={{
          onClick: closeModal,
        }}
      />
    </BoxContainer>
  );
};
