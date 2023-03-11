import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: [],
  isLoading: false,
  isAuthenticated: false,
  token: "",
  message: "",
  error: "",
};

// consts

const url = "http://localhost:5000/api/v1/user";

// User login

export const login = createAsyncThunk("user/loign", async (postData) => {
  try {
    const response = await axios.post(`${url}/login`, postData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// User signup

export const signup = createAsyncThunk("user/signup", async (postData) => {
  try {
    const response = await axios.post(`${url}/signup`, postData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// update profile

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ postData, token }) => {
    try {
      // const { token } = postData;

      const response = await axios.patch(`${url}/update`, postData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = [];
      state.token = "";
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    // login Reducer
    [login.pending]: (state) => {
      state.isLoading = true;
      state.message = "Please wait!";
    },
    [login.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = action.payload.error;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
      state.isAuthenticated = false;
    },

    // signup reducer

    [signup.pending]: (state) => {
      state.error = "";
      state.isLoading = true;
      state.message = "Please wait....";
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profile = action.payload.user;
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.error = action.payload.error;
      state.profile = [];
    },

    // update profile

    [updateProfile.pending]: (state) => {
      state.isLoading = true;
      state.message = "Updating Please wait";
      state.error = "";
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      // state.profile = action.payload.user;
      state.message = action.payload.message;
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
