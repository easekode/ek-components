export type ReduxState<T> = {
  data?: T | null;
  loading: boolean;
  error: string | null;
};

export interface ApiBodyInput<T> {
  body: T;
  params?: Record<string, string>;
  query?: Record<string, string>;
}
