export interface FeedbackTopic extends Document {
 name: string
 feedbackType: FeedbackType
 active: boolean
}

export type NewFeedbackTopic = Omit<FeedbackTopic, keyof Document>

export enum FeedbackType {
 RATE = 'RATE',
 YES_NO = 'YES_NO',
 DESCRIPTIVE = 'DESCRIPTIVE'
}
