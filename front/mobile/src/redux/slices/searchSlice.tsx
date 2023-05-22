// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// import {RootState} from '../store';

// interface Tag {
//   node: {
//     body: String;
//     id: String;
//   };
// }

// interface SearchOpt {
//   tags: Tag[];
//   categories: any[];
// }

// const initialState: SearchOpt = {
//   tags: [],
//   categories: [],
// };

// export const searchSlice = createSlice({
//   name: 'search',
//   initialState,
//   reducers: {
//     resetTags: state => {
//       state.tags = [];
//     },
//     resetCategories: state => {
//       state.categories = [];
//     },
//     pushTag: (state, action: PayloadAction<Tag>) => {
//       state.tags.push(action.payload);
//     },
//     deleteTag: (state, action: PayloadAction<Tag>) => {
//       const tmp = state.tags.indexOf(action.payload);
//       if (tmp !== -1) {
//         state.tags.splice(tmp, 1);
//       } else {
//         console.log('Redux error: ', '해당 tag가 기록되어있지 않습니다.');
//       }
//     },
//   },
// });

// export const {resetTags, resetCategories, pushTag, deleteTag} =
//   searchSlice.actions;
// export const selectSearch = (state: RootState) => state.search;
// export const selectTags = (state: RootState) => state.search.tags;
// export const selectCategories = (state: RootState) => state.search.categories;
// export default searchSlice.reducer;