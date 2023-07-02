import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listStudent: [],
};

const studentSlice = createSlice({
    name: "studentSlice",
    initialState,
    reducers: {
        addStudent: (state, { type, payload }) => {
            const index = state.listStudent.findIndex((item) => {
                return item.id === payload.id;
            });
            if (index === -1) {
                state.listStudent.push(payload);
            }
        },
        deleteStudent: (state, { type, payload }) => {
            console.log(payload);
            state.listStudent = state.listStudent.filter((item) => {
                return +item.id !== +payload.id;
            });
        },
        editStudent: (state, {type, payload}) => { 
            console.log(payload);

            const index = state.listStudent.findIndex((item) => payload.id === item.id);
            if (index !== -1) {
                state.listStudent[index] = payload
            }
         }
    },
});

export const { addStudent, deleteStudent, editStudent } = studentSlice.actions;

export default studentSlice.reducer;
