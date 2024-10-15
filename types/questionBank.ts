import { Schema } from 'mongoose';
import { Level } from './exam';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SHORT_ANSWER = 'short_answer',
  FILL_IN_THE_BLANK = 'fill_in_the_blank',
  MATCHING = 'matching',
  ESSAY = 'essay',
  RANKING = 'ranking',
  SCALE = 'scale',
  YES_NO = 'yes_no',
  MULTIPLE_RESPONSE = 'multiple_response',
  SCENARIO_BASED = 'scenario_based',
  IMAGE_BASED = 'image_based',
}

/* export interface NewQuestion {
  type: QuestionType; // Type of question
  questionText: string; // Text of the question
  options?: string[]; // Array of options (for multiple choice, ranking, and multiple response questions)
  leftColumn?: string[]; // Left column options (for matching questions)
  rightColumn?: string[]; // Right column options (for matching questions)
  maxWordCount?: number; // Maximum word count (for short answer and essay questions)
  correctMatches?: string[]; // Correct matches for matching questions
  correctOrder?: string[]; // Correct order for ranking questions
  minScale?: number; // Minimum scale value (for scale questions)
  maxScale?: number; // Maximum scale value (for scale questions)
  scenario?: string; // Scenario text (for scenario-based questions)
  imageUrl?: string; // URL of the image (for image-based questions)
  negativeScore?: number; // Negative score for wrong answer
  level?: Level; // Level of the question
  score?: number; // Score for the question
  subject?: Schema.Types.ObjectId; // Subject ID
  chapter?: Schema.Types.ObjectId; // Chapter ID
  topic?: Schema.Types.ObjectId; // Topic ID
} */
export interface NewQuestion {
  type: QuestionType; // Type of question
  questionText: string; // Text of the question
  options?: string[]; // Array of options (for multiple choice, ranking, and multiple response questions)
  level?: Level; // Level of the question
  score?: number; // Score for the question
  subject?: Schema.Types.ObjectId; // Subject ID
  chapter?: Schema.Types.ObjectId; // Chapter ID
  topic?: Schema.Types.ObjectId; // Topic ID
}
export interface QuestionBank extends NewQuestion, Document {
  question: string;
  subject?: Schema.Types.ObjectId;
  chapter?: Schema.Types.ObjectId;
  topic?: Schema.Types.ObjectId;
}

export interface SuggestQuestionInput {
  course?: string;
  chapter?: string;
  // subject?: string;
  topics?: string;
  level?: Level;
  questionCount?: number;
}

/* export interface NewExam {
  examTitle: string;
  examDescription: string;
  questions: NewQuestion[];
  isNegativeScoring: boolean;
} */
/*
const multipleChoiceQuestion: Question = {
  type: QuestionType.MULTIPLE_CHOICE,
  text: 'What is the capital of France?',
  options: ['Paris', 'London', 'Berlin', 'Rome'],
};

const shortAnswerQuestion: Question = {
  type: QuestionType.SHORT_ANSWER,
  text: "Who wrote 'Romeo and Juliet'?",
};

const fillInTheBlankQuestion: Question = {
  type: QuestionType.FILL_IN_THE_BLANK,
  text: 'The force of gravity is directly proportional to the _____ of the masses and inversely proportional to the _____ between them.',
};

const matchingQuestion: Question = {
  type: QuestionType.MATCHING,
  text: 'Match the country with its capital:',
  leftColumn: ['France', 'Germany', 'Italy'],
  rightColumn: ['Paris', 'Berlin', 'Rome'],
};

const essayQuestion: Question = {
  type: QuestionType.ESSAY,
  text: 'Discuss the impact of climate change on biodiversity.',
};

const rankingQuestion: Question = {
  type: QuestionType.RANKING,
  text: 'Rank the following programming languages based on your preference:',
  options: ['Python', 'Java', 'JavaScript', 'C++'],
};

const scaleQuestion: Question = {
  type: QuestionType.SCALE,
  text: 'How satisfied are you with our customer service?',
  minScale: 1,
  maxScale: 5,
};

const yesNoQuestion: Question = {
  type: QuestionType.YES_NO,
  text: 'Is the earth round?',
};

const multipleResponseQuestion: Question = {
  type: QuestionType.MULTIPLE_RESPONSE,
  text: 'Which of the following are prime numbers?',
  options: ['2', '3', '4', '5', '6', '7', '8', '9'],
  correctMatches: ['2', '3', '5', '7'],
};

const scenarioBasedQuestion: Question = {
  type: QuestionType.SCENARIO_BASED,
  text: 'Based on the scenario provided, what would you do?',
  scenario: 'Foggy weather conditions',
};

const imageBasedQuestion: Question = {
  type: QuestionType.IMAGE_BASED,
  text: 'What is shown in the image below?',
  imageUrl: 'https://example.com/image.jpg',
};
*/
