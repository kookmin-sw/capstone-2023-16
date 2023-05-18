import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PartialKeyValue {
  key: string;
  value: string|object|undefined;
};

interface NewPostState {
  category?: {id: string};
  content: string;
  paidContent?: string;
  tagBodies?: string;
  title: string;
  length: number;
};

const initialState: NewPostState = {
  title: "",
  content: "",
  length: 0,
};

export const newPostSlice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {
    partialChange: (state, action: PayloadAction<PartialKeyValue>) => ({...state, [action.payload.key]: action.payload.value}),
    entireChange: (state, action: PayloadAction<NewPostState>) => ({ ...state, ...action.payload }),
    reset: (state) => ({ ...initialState }),
  },
});

// Action creators are generated for each case reducer function
export const { partialChange, entireChange, reset } = newPostSlice.actions;

export default newPostSlice.reducer;