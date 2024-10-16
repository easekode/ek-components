import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiUrl } from '@ek-components/config/api';
import { ApiResponse, LoginBody, LoginResponse } from '@ek-types';
import { getErrorMessage, postApi } from '@ek-components/utils';

interface AuthState {
  data: LoginResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  ApiResponse<LoginResponse>,
  LoginBody,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await postApi<ApiResponse<LoginResponse>>({
      url: ApiUrl.LOGIN,
      data: credentials,
    });

    return response;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const setLoading = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

const setFulfilled = (
  state: AuthState,
  action: PayloadAction<LoginResponse>
) => {
  state.loading = false;
  state.data = action.payload;
  state.error = null;
};

const setRejected = (state: AuthState, action: PayloadAction<string>) => {
  state.loading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null; // Reset the data to null
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        setLoading(state);
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ApiResponse<LoginResponse>>) => {
          setFulfilled(state, {
            payload: action.payload.data,
            type: 'auth/login/fulfilled',
          });
        }
      )
      .addCase(login.rejected, (state, action) => {
        setRejected(state, {
          payload: action.payload as string,
          type: 'auth/login/rejected',
        });
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
