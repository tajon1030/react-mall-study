import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

export default configureStore({
  reducer : { // 금고안에서의 파트가 나눠지는것을 reducer라고 보면됨
    "loginSlice": loginSlice
  }  
})