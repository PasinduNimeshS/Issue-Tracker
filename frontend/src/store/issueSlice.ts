import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIssues, getIssueById, createIssue as createIssueAPI, updateIssue as updateIssueAPI, deleteIssue as apiDeleteIssue, getIssueCounts } from '../services/issueService.ts';
import { type Issue } from '../types.ts';

interface IssueState {
  issues: Issue[];
  currentIssue: Issue | null;
  counts: { _id: string; count: number }[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
}

const initialState: IssueState = {
  issues: [],
  currentIssue: null,
  counts: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
};

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async (params: { search?: string; priority?: string; status?: string; page?: number }) => {
  return await getIssues(params);
});

export const fetchIssueById = createAsyncThunk('issues/fetchIssueById', async (id: string) => {
  return await getIssueById(id);
});

export const createIssue = createAsyncThunk('issues/createIssue', async (data: Partial<Issue>) => {
  return await createIssueAPI(data);
});

export const updateIssue = createAsyncThunk('issues/updateIssue', async ({ id, data }: { id: string; data: Partial<Issue> }) => {
  return await updateIssueAPI(id, data);
});

export const deleteIssue = createAsyncThunk('issues/deleteIssue', async (id: string) => {
  await apiDeleteIssue(id);
  return id;
});

export const fetchIssueCounts = createAsyncThunk('issues/fetchIssueCounts', async () => {
  return await getIssueCounts();
});

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => { state.loading = true; })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload.issues;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => { state.currentIssue = action.payload; })
      .addCase(createIssue.fulfilled, (state, action) => { state.issues.push(action.payload); })
      .addCase(updateIssue.fulfilled, (state, action) => {
        const index = state.issues.findIndex(i => i._id === action.payload._id);
        if (index !== -1) state.issues[index] = action.payload;
        state.currentIssue = action.payload;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.issues = state.issues.filter(i => i._id !== action.payload);
      })
      .addCase(fetchIssueCounts.fulfilled, (state, action) => { state.counts = action.payload; });
  },
});

export const { setCurrentPage } = issueSlice.actions;

export default issueSlice.reducer;