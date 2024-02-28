import { configureStore } from "@reduxjs/toolkit";

import StudentSlice from "./Slices/StudentSlice";


const store = configureStore({
    reducer: {
        student: StudentSlice
    },
    devTools: true
});

export default store;