import { createSlice} from "@reduxjs/toolkit";
const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state,{payload}) => {
      state.user = payload;
    },
    loginSuccess: (state,{payload}) => {
      state.user = payload;
    },
    updateInfo: (state,{payload}) => {
      state.user = payload;
    },
    updateAvatar: (state,{payload}) => {
      state.user = payload;
    },
    favoriteMovie: (state,{payload}) => {
      state.user = payload;
    },
    addWatchMovie: (state,{payload}) => {
      state.user = payload;
    },
    deleteWatchMovie: (state,{payload}) => {
      state.user = payload;
    }
    
  },
  extraReducers: {
  },
});

//action
export const { setAuth,loginSuccess,updateInfo,updateAvatar,favoriteMovie,addWatchMovie,deleteWatchMovie} = userSlice.actions;


//get data from store
export const getUser = (state) => state.user.user;

export default userSlice.reducer;