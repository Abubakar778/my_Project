import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface User {
  _id: string;
  name: string;
  token: string;
  expireTime: number;
}
const userInfoString: string | null = localStorage.getItem("userInfo");
const userInfo: User = userInfoString ? JSON.parse(userInfoString) : null;

interface Initial {
  error: string | null;
  loading: Boolean;
  userData: User | null;
}

const initialState: Initial = {
  error: null,
  loading: false,
  userData: userInfo,
};

//

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    setLogin: (state, action: PayloadAction<User>) => {
      state.error = null;
      state.loading = false;
      state.userData = action.payload;
    },
    setLoding: (state) => {
      state.error = null;
      state.loading = true;
      state.userData = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.userData = null;
    },
    Setlogout: (state) => {
      state.error = null;
      state.loading = false;
      state.userData = null;
    },
  },
});

export const { Setlogout, setError, setLoding, setLogin } = loginSlice.actions;
export const loginSelector = (state: RootState) => state.login;
export default loginSlice.reducer;

export const LoginUser =
  (email: string, password: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoding());
      const obj = {
        query: `
      query{
        login(email:"${email}",password:"${password}"){
        _id
        name
        token
        expireTime
      }
        }`,
      };
      const responce = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "content-Type": "application/json",
        },
      });
      const result = await responce.json();
      try {
        const { login } = result.data;
        dispatch(setLogin(login));
        localStorage.setItem(
          "userInfo",
          JSON.stringify(getState().login.userData)
        );
      } catch (error) {
        const { message } = result.errors[0];
        dispatch(setError(message));
      }
    } catch (error) {
      dispatch(setError("An Error Occour"));
    }
  };

export const LogoutUser = (dispatch: any, getState: any) => {
  dispatch(Setlogout());
  localStorage.clear();
};

// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async (args: Inputdata, { rejectWithValue }) => {
//     const obj = {
//       query: `
//       query{
//         login(email:"${args.email}",password:"${args.password}"){
//         _id
//         name
//         token
//         expireTime
//       }
//         }`,
//     };
//     const responce = await fetch("http://localhost:5000/graphql", {
//       method: "POST",
//       body: JSON.stringify(obj),
//       headers: {
//         "content-Type": "application/json",
//       },
//     });

//     try {
//       const result = await responce.json();
//       if (result.errors) {
//         const { message } = result.errors;
//         // If the backend returns errors, handle them and reject the promise with the error payload
//         return rejectWithValue(message);
//       }

//       const { _id, name, token, expireTime } = result.data.login;
//       const obj = {
//         _id,
//         name,
//         token,
//         expireTime,
//       };

//       return obj;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
// const fetchUsers = async(email : string , password : string) =>{
//      const obj = {
//       query: `
//       query{
//         login(email:"${email}",password:"${password}"){
//         _id
//         name
//         token
//         expireTime
//       }
//         }`,
//     };

//     const responce = await fetch("http://localhost:5000/graphql", {
//       method: "POST",
//       body: JSON.stringify(obj),
//       headers: {
//         "content-Type": "application/json",

//       },
//     });
//     const result = await responce.json()
//     try{
//       const {login} = result.data;
//       return login

//     }catch(error){
//         return result.errors.message
//     }

//   }
