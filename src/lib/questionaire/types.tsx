export interface SurveyChoice {
  value: string;
}

export interface SurveyElement {
  type:
    | 'dropdown' // Used for dropdown questions
    | 'radiogroup' // Used for radio button group questions
    | 'text' // Used for short text input questions
    | 'multipletext' // Used for questions with multiple short text inputs
    | 'checkbox' // Used for checkbox questions
    | 'html'; // Used for HTML content elements
  name?: string;
  title?: string;
  html?: string;
  titleLocation?: string;
  isRequired?: boolean;
  maxLength?: number;
  choices?: string[];
  correctAnswer?: string[];
  // choices?: string[] | SurveyChoice[];
  choicesOrder?: string;
}

export interface CompletedHtmlCondition {
  expression: string;
  html: string;
}

export interface SurveyPage {
  elements: SurveyElement[];
}

export interface SurveyJson {
  title: string;
  showProgressBar: string;
  showTimerPanel: string;
  maxTimeToFinishPage: number;
  maxTimeToFinish: number;
  firstPageIsStarted: boolean;
  startSurveyText: string;
  pages: SurveyPage[];
  completedHtml: string;
  completedHtmlOnCondition: CompletedHtmlCondition[];
}
