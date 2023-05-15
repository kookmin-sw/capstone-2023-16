import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PartialKey {
  key: string;
};

interface PartialKeyValue extends PartialKey {
  value: string|boolean|number|string[];
};

type CreationFormType = {
  birthYear?: number,
  gender?: string,
  introduction?: string,
  isPublic?: boolean
  job?: string,
  nickname: string,
  preferredCategories?: {id: string} [],
  preferredTagBodies?: string,
}

const initialState:CreationFormType = {
  nickname: "",
}

export const newPersonaSlice = createSlice({
  name: 'newPersona',
  initialState,
  reducers: {
    enter: (state, action: PayloadAction<PartialKeyValue>) => ({ ...state, [action.payload.key]: action.payload.value }),
    delete: (state, action: PayloadAction<PartialKey>) => {
      delete state[action.payload.key as keyof CreationFormType];
      return state;
    },
    reset: (state) => ({ ...initialState }),
  },
});

// Action creators are generated for each case reducer function
export const { enter, reset } = newPersonaSlice.actions;

export default newPersonaSlice.reducer;