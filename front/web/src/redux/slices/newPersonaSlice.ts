import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PartialKeyValue {
  key: string;
  value: string|boolean|number;
};

type CreationFormType = {
  age?: number,
  gender?: string,
  introduction?: string,
  isPublic: boolean,
  job?: string,
  nickname: string,
  preferredCategories?: string,
  preferredTagBodies?: string,
}

const initialState:CreationFormType = {
  age: 0,
  gender: '',
  introduction: '',
  isPublic: true,
  job: '',
  nickname: '',
  preferredCategories: '',
  preferredTagBodies: '',
}

export const newPersonaSlice = createSlice({
  name: 'newPersona',
  initialState,
  reducers: {
    enter: (state, action: PayloadAction<PartialKeyValue>) => ({...state, [action.payload.key]: action.payload.value}),
    reset: (state) => ({ ...initialState }),
  },
});

// Action creators are generated for each case reducer function
export const { enter, reset } = newPersonaSlice.actions;

export default newPersonaSlice.reducer;