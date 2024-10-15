import { SurveyChoice, SurveyJson } from './types';
import { NewQuestion, QuestionType } from '@ek-types';

function convertSurveyToJson(survey: SurveyJson): NewQuestion[] {
  const newQuestions: NewQuestion[] = [];

  survey.pages.forEach((page) => {
    page.elements.forEach((element) => {
      const newQuestion: NewQuestion = {
        type: mapQuestionType(element.type),
        questionText: element.title || '',
      };

      if (element.choices) {
        newQuestion.options = mapChoices(element.choices);
      }

      newQuestions.push(newQuestion);
    });
  });

  return newQuestions;
}

function mapQuestionType(type: string): QuestionType {
  switch (type) {
    case 'radiogroup':
      return QuestionType.MULTIPLE_CHOICE;
    case 'text':
      return QuestionType.SHORT_ANSWER;
    case 'multipletext':
      return QuestionType.FILL_IN_THE_BLANK;
    // Add mappings for other types as needed
    default:
      return QuestionType.ESSAY; // Default to essay type
  }
}

function mapChoices(choices: string[] | SurveyChoice[]): string[] {
  return choices.map((choice) =>
    typeof choice === 'string' ? choice : choice.value
  );
}

// Example usage
const survey: SurveyJson = {
  /* Your survey JSON object */
} as SurveyJson;
const newQuestions: NewQuestion[] = convertSurveyToJson(survey);
console.log(newQuestions);
