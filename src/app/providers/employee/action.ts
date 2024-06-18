
import { createAction } from "redux-actions";
import { ViewEmployee } from "./interface";

export enum ActionTypes {
    CREATE_EMPLOYEE = "CREATE_EMPLOYEE",
    UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE",
    DELETE_EMPLOYEE = "DELETE_EMPLOYEE",
    SEARCH_EMPLOYEE = "SEARCH_EMPLOYEE",
    SELECT_EMPLOYEE = "SELECT_EMPLOYEE",
    GET_ALL_EMPLOYEES_LOADING = "GET_ALL_EMPLOYEES_LOADING",
    GET_ALL_EMPLOYEES = "GET_ALL_EMPLOYEES",
    REMOVE_SELECTED_EMPLOYEE = "REMOVE_SELECTED_EMPLOYEE",
    GET_ALL_EMPLOYEES_FAILED = "GET_ALL_EMPLOYEES_FAILED",
    

}

export const getAllEmployeesLoadingAction = createAction(ActionTypes.GET_ALL_EMPLOYEES_LOADING);
export const getAllEmployeesAction = createAction<ViewEmployee[],ViewEmployee[]>(ActionTypes.GET_ALL_EMPLOYEES,e=>e);
export const getAllEmployeesFailedAction = createAction(ActionTypes.GET_ALL_EMPLOYEES_FAILED);
export const createEmployeeAction = createAction(ActionTypes.CREATE_EMPLOYEE);
export const updateEmployeeAction = createAction(ActionTypes.UPDATE_EMPLOYEE);
export const deleteEmployeeAction = createAction(ActionTypes.DELETE_EMPLOYEE);
export const searchEmployeeAction = createAction(ActionTypes.SEARCH_EMPLOYEE);
export const selectEmployeeAction = createAction(ActionTypes.SELECT_EMPLOYEE);
export const removeSelectedEmployeeAction = createAction(ActionTypes.REMOVE_SELECTED_EMPLOYEE);
