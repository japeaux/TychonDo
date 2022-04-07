export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASK_ID';



export const setName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    });
};

export const setPassword = password => dispatch => {
    dispatch({
        type: SET_USER_PASSWORD,
        payload: password,
    });
};

export const setTasks = tasks => dispatch => {
    dispatch({
        type: SET_TASKS,
        payload: tasks,
    });
};

export const setTaskID = taskID => dispatch => {
    dispatch({
        type: SET_TASK_ID,
        payload: taskID,
    });
};

