import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../help/localStorage";

const initialState = {
    listStudent: getLocalStorage("listStudent", []),
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
                setLocalStorage("listStudent", state.listStudent)
            }
        },
        deleteStudent: (state, { type, payload }) => {
            state.listStudent = state.listStudent.filter((item) => {
                return +item.id !== +payload.id;
            });
            setLocalStorage("listStudent", state.listStudent)

        },
        editStudent: (state, { type, payload }) => {

            const index = state.listStudent.findIndex((item) => payload.id === item.id);
            if (index !== -1) {
                state.listStudent[index] = payload;
            }
            setLocalStorage("listStudent", state.listStudent)
        },
    },
});

export const { addStudent, deleteStudent, editStudent } = studentSlice.actions;

export default studentSlice.reducer;
