'use client';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from '@mui/material';

import { Chapter, Course, IExam, Level, SEOHead, Topic } from '@ek-types';
import {
  DraggableTable,
  InlineEdit,
  SeoForm,
  TextField,
  TitleMain,
  TitleSubMain,
  BoxContainer,
  theme,
} from '@ek-components';
import { displayFlexColumn } from '@/utils/styles';
import { AddTopic } from './AddTopic';
import { cloneDeep } from '@/utils/cloneDeep';
import { CourseDuration, DurationUnit } from '../Duration';
import { FormFieldLabels } from '@/constants';
import { displayFlexRow } from '@/utils';
import { ExpandMoreOutlined as ExpandIcon } from '@mui/icons-material';
import { Tabs, Tab, Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { CreateExamButton } from '../teachers/CreateExam';
import { AddNewOption } from './AddNewOption';
import { AddChapter } from './AddChapter';
import UploadImage from './UploadImage';

interface CoursePreviewProps {
  course: Course;
  onDataChange: (courses: Course) => void;
}

enum ItemType {
  Subject = 'subject',
  Chapter = 'chapter',
  Topic = 'topic',
}

export const CoursePreview: React.FC<CoursePreviewProps> = ({
  course: courseInput,
  onDataChange,
}) => {
  const renderExams = ({ exams }: { exams: IExam[] }) => {
    if (exams?.length === 0) {
      return null;
    } else
      return (
        <Box>
          <Typography
            sx={{
              textAlign: 'center',
            }}
            variant='h6'
          >
            Exams
          </Typography>
          <DraggableTable
            headings={[]}
            rows={exams}
            rowRenderer={({
              row,
              index,
            }: {
              row: IExam;
              index: number;
              onEdit?: (props: { row: IExam; index: number }) => void;
              onDelete?: (props: { row: IExam; index: number }) => void;
            }) => {
              return (
                <InlineEdit
                  value={row.title}
                  onEdit={(value) => {
                    row.title = value;
                    exams[index] = row;
                  }}
                  onDelete={(props) => {
                    exams.splice(index, 1);
                  }}
                />
              );
            }}
            onChangeRows={(exams: IExam[]) => {
              // console.log({ exams });
            }}
          />
        </Box>
      );
  };

  const renderTopics = ({
    topics,
    chapter,
    onChange,
  }: {
    topics: Topic[];
    chapter: Chapter;
    onChange: (newTopics: Topic[]) => void;
  }) => {
    return (
      <Box sx={{ ...displayFlexColumn }}>
        <DraggableTable
          headings={[]}
          rows={topics}
          rowRenderer={({
            row,
            index,
          }: {
            row: Topic;
            index: number;
            onEdit?: (props: { row: Topic; index: number }) => void;
            onDelete?: (props: { row: Topic; index: number }) => void;
          }) => {
            return (
              <InlineEdit
                value={`${String.fromCharCode(97 + index)}. ${row.name} `}
                onEdit={(value) => {
                  const parts = value.split('.');
                  row.name = parts[1];
                  topics[index] = row;
                  onChange(topics);
                }}
                onDelete={(props) => {
                  topics.splice(index, 1);
                  onChange(topics);
                }}
                styleModeEdit={{
                  marginTop: '1rem',
                }}
              />
            );
          }}
          onChangeRows={(topics: Topic[]) => {
            // console.log({ topics });
          }}
        />
      </Box>
    );
  };
  const renderChapters = (
    chapters: any,
    onChange: (data: Chapter[]) => void
  ) => {
    return (
      <DraggableTable
        headings={[]}
        rows={chapters}
        rowRenderer={({ row, index }: { row: Chapter; index: number }) => {
          return (
            <Accordion
              sx={{
                color: theme.palette.secondary.light,
                cursor: 'pointer',
                backgroundColor: theme.palette.grey[300],
                margin: '0.5rem 0',
                padding: '0.5rem',
              }}
            >
              <AccordionSummary expandIcon={<ExpandIcon />}>
                <InlineEdit
                  sx={{ cursor: 'pointer' }}
                  onClick={(props) => {
                    props.stopPropagation();
                  }}
                  value={`${index + 1}. ${row.name} `}
                  onEdit={(value) => {
                    const newChapters = cloneDeep(chapters);
                    const parts = value.split('.');
                    row.name = parts[1];
                    newChapters[index] = row;
                    onChange(newChapters);
                  }}
                  onDelete={(props) => {
                    const newChapters = cloneDeep(chapters);

                    newChapters.splice(index, 1);
                    onChange(newChapters);
                  }}
                />
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  marginLeft: '2rem',
                  padding: '1rem',
                  color: theme.palette.secondary.light,
                }}
              >
                {renderTopics({
                  topics: row.topics || [],
                  chapter: row,
                  onChange: (newTopics: Topic[]) => {
                    const newChapters = cloneDeep(chapters);
                    row.topics = newTopics;
                    newChapters[index] = row;
                    onChange(newChapters);
                  },
                })}

                {renderExams({
                  exams: row.exams || [],
                  /* onChange: (newExams: IExam[]) => {
                    const newChapters = cloneDeep(chapters);
                    row.exams = newExams;
                    newChapters[index] = row;
                    onChange(newChapters);
                  }, */
                })}

                <AddNewOption>
                  <Box
                    sx={{
                      ...displayFlexColumn,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                    }}
                  >
                    <AddTopic
                      onSubmit={(topic) => {
                        const newChapters = cloneDeep(chapters);
                        const newRow = cloneDeep(row);
                        newRow.topics.push(topic);
                        newChapters[index] = newRow;
                        onChange(newChapters);
                      }}
                    />
                    OR
                    <CreateExamButton
                      onSave={(exam) => {
                        const newChapters = cloneDeep(chapters);
                        const newRow = cloneDeep(row);
                        Array.isArray(newRow?.exams) &&
                        newRow?.exams?.length > 0
                          ? newRow.exams.push(exam)
                          : (newRow.exams = [exam]);
                        if (exam._id) {
                          Array.isArray(newRow?.examIds) &&
                          newRow?.examIds?.length > 0
                            ? newRow.examIds.push(exam._id)
                            : (newRow.examIds = [exam._id]);
                        }
                        newChapters[index] = newRow;

                        onChange(newChapters);
                      }}
                      variant='outlined'
                      input={{
                        course: courseInput.title,
                        chapter: row.name,
                        topics: row.topics?.map((t) => t.name).join(','),
                        questionCount: 5,
                        level: Level.MEDIUM,
                      }}
                      onCreateExam={(exam: IExam) => {
                        const newChapters = cloneDeep(chapters);
                        const newRow = cloneDeep(row);
                        Array.isArray(newRow?.exams) &&
                        newRow?.exams?.length > 0
                          ? newRow.exams.push(exam)
                          : (newRow.exams = [exam]);
                        newChapters[index] = newRow;

                        onChange(newChapters);
                      }}
                    >
                      Add a Test
                    </CreateExamButton>
                  </Box>
                </AddNewOption>
              </AccordionDetails>
            </Accordion>
          );
        }}
        onChangeRows={(chapters: Chapter[]) => {
          onChange(chapters);
        }}
      />
    );
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  const [value, setValue] = useState('1');
  const [course, setCourse] = useState<Course>(courseInput || {});
  useEffect(() => {
    onDataChange(course);
  }, [course]);

  return (
    <BoxContainer
      sx={{
        marginTop: '1rem',
      }}
    >
      <TabContext value={value}>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label='course tabs'>
            <Tab
              value={'1'}
              label='Basic Details'
              sx={{
                backgroundColor: theme.palette.background.default,
                fontWeight: value === '1' ? 'bold' : 'normal',
                borderBottom:
                  value === '1'
                    ? `0.3rem solid ${theme.palette.grey[900]}`
                    : 'none',
              }}
            />

            <Tab
              value={'2'}
              label='Course Content'
              sx={{
                backgroundColor: theme.palette.background.default,
                fontWeight: value === '2' ? 'bold' : 'normal',
                borderBottom:
                  value === '2'
                    ? `0.3rem solid ${theme.palette.grey[900]}`
                    : 'none',
              }}
            />

            <Tab
              value={'3'}
              label='SEO'
              sx={{
                backgroundColor: theme.palette.background.default,
                fontWeight: value === '3' ? 'bold' : 'normal',
                borderBottom:
                  value === '3'
                    ? `0.3rem solid ${theme.palette.grey[900]}`
                    : 'none',
              }}
            />
          </Tabs>
        </Box>

        <TabPanel value={'1'}>
          <Box p={3}>
            <BoxContainer>
              <TextField
                value={course?.title}
                required
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                label={FormFieldLabels.COURSE_TITLE}
                onChange={(e) => {
                  setCourse({ ...course, title: e.target.value });
                }}
              />
              <TextField
                value={course.longDescription}
                required
                placeholder={FormFieldLabels.COURSE_DESCRIPTION}
                fullWidth
                multiline
                rows={3}
                sx={{ marginBottom: '1rem' }}
                label={FormFieldLabels.COURSE_DESCRIPTION}
                onChange={(e) => {
                  setCourse({ ...course, longDescription: e.target.value });
                }}
              />
              <Box
                sx={{
                  ...displayFlexRow,
                  gap: '1rem',
                }}
              >
                <CourseDuration />
                <DurationUnit />
              </Box>
              <UploadImage />
            </BoxContainer>
          </Box>
        </TabPanel>

        <TabPanel value={'2'}>
          <Box
            sx={{
              borderRadius: '0.5rem',
              padding: '0.3rem',
            }}
          >
            {renderChapters(course.chapters || [], (newChapters: Chapter[]) => {
              setCourse({ ...course, chapters: newChapters });
            })}

            <AddNewOption>
              <Box
                sx={{
                  ...displayFlexColumn,
                  padding: '1rem',
                  color: theme.palette.secondary.light,
                }}
              >
                <AddChapter
                  onSubmit={(newChapter) => {
                    const newChapters = [
                      ...(course.chapters || []),
                      newChapter,
                    ];
                    setCourse({ ...course, chapters: newChapters });
                  }}
                />
              </Box>
            </AddNewOption>
          </Box>
        </TabPanel>

        <TabPanel value={'3'}>
          <Box p={3}>
            <SeoForm
              data={course.seoHead as SEOHead}
              onChange={(newSeoHead) => {
                setCourse({ ...course, seoHead: newSeoHead });
              }}
            />
          </Box>
        </TabPanel>
      </TabContext>
    </BoxContainer>
  );
};
