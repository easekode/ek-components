import { Schema } from 'mongoose';
import { EventMode, EventPurpose, EventStatus } from './courseBatch';

export interface IEvent extends Document {
  title: string;
  batch?: Schema.Types.ObjectId;
  session?: Schema.Types.ObjectId;
  purpose: EventPurpose;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  allDay?: boolean;
  description?: string;
  mode: EventMode;
  status: EventStatus;
  cancellationReason: string;
  customDays?: number[];
  recurrence?: string;
}

export type NewEvent = Omit<IEvent, keyof Document>;
