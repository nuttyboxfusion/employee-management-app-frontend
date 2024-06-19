import { IEmployeeContext, initialState } from "./context";
import { ActionTypes } from "./action";
import { handleActions } from "redux-actions";

export const employeeReducer = handleActions<IEmployeeContext, any>(
  {
    [ActionTypes.GET_ALL_EMPLOYEES]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employees: action.payload,
          loading: false,
        };
      }
      return state;
    },
    [ActionTypes.SEARCH_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employees: state.employees.filter(
            (employee) =>
              employee.firstName
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              employee.lastName
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
              employee.email
                .toLowerCase()
                .includes(action.payload.toLowerCase())
          ),
        };
      }
      return state;
    },
    [ActionTypes.GET_ALL_EMPLOYEES_FAILED]: (state) => {
      return state;
    },
    [ActionTypes.GET_ALL_EMPLOYEES_LOADING]: (state) => {
      return {
        ...state,
        loading: !state.loading,
      };
    },
    [ActionTypes.CREATE_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employees: [...state.employees, action.payload],
        };
      }
      return state;
    },
    [ActionTypes.SELECT_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employee: action.payload,
        };
      }
      console.log("state", state);
      return state;
    },
    [ActionTypes.REMOVE_SELECTED_EMPLOYEE]: (state, action) => {
      return {
        ...state,
        employee: undefined,
      };
    },
    [ActionTypes.UPDATE_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employee: undefined,
          employees: state.employees.map((employee) => {
            if (employee.id === action.payload.id) {
              return action.payload;
            }
            return employee;
          }),
        };
      }
      return state;
    },
    [ActionTypes.DELETE_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employees: state.employees.filter(
            (employee) => employee.id !== action.payload
          ),
        };
      }
      return state;
    },
  },
  initialState
);
