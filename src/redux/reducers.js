import { SET_USER_NAME, SET_USER_PASSWORD, SET_TASKS, SET_TASK_ID } from './actions';

const initialState = {
    name: '',
    password:'',
    tasks: [],
    taskID: 1,
}

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload };
        case SET_USER_PASSWORD:
            return { ...state, password: action.payload };
        case SET_TASKS:
            return { ...state, tasks: action.payload };
        case SET_TASK_ID:
            return { ...state, taskID: action.payload };
        default:
            return state;
    }
}

export default taskReducer;