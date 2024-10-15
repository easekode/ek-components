export enum PaymentType {
  UPFRONT = 'UPFRONT',
  MONTHLY = 'MONTHLY',
  SCHOLARSHIP = 'SCHOLARSHIP',
  AFTER_JOB = 'AFTER_JOB',
}

export interface Pricing {
  slNo?: string;
  paymentType?: PaymentType;
  emiValuePerMonth?: string;
  price?: number;
  actualPrice?: number;
}
