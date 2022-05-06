import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const counterSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {
    postDetail: (state, action) => {
        
        console.log(action.payload)
        localStorage.setItem("detail", JSON.stringify(action.payload))
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = JSON.parse(localStorage.getItem("detail"))
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { postDetail } = counterSlice.actions

export default counterSlice.reducer