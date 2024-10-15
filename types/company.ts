export interface ICompany extends Document {
  companyId: string;
  name: string;
}

export type NewCompany = Omit<ICompany, '_id'>;
