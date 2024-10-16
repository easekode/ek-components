import { ReduxState } from '@ek-components/redux/slices/types';

export const setLoading = (state: ReduxState<any>) => {
  state.loading = true;
  state.error = null;
};

export const setFulfilled = <T>(
  state: ReduxState<T>,
  action: { payload: T }
) => {
  state.loading = false;
  state.data = action.payload;
};

export const setRejected = (
  state: ReduxState<any>,
  action: { payload: any }
) => {
  state.loading = false;
  state.error = action.payload || 'Failed to process request';
};
