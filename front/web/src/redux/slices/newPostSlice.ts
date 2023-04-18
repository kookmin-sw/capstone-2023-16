import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PartialKeyValue {
  key: string;
  value: string;
};

interface NewPostState {
  category?: string;
  content: string;
  paidContent?: string;
  tagBodies?: string;
  title: string;
};

const initialState: NewPostState = {
    category: "",
    content: "",
    paidContent: "",
    tagBodies: "",
    title: "",
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