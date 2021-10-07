import { getDailyRecord } from '../api';

const GET_RECORDS_REQUEST = 'GET_RECORDS_REQUEST';
const GET_RECORDS_SUCCESS = 'GET_RECORDS_SUCCESS';
const GET_RECORDS_FAILURE = 'GET_RECORDS_FAILURE';
const DELETE_ALL_RECORDS = 'DELETE_ALL_RECORDS';

const initialState = {
  recordsData: [],
  recordsLoading: false,
  recordsError: null,
};

const getRecordsRequest = () => {
  return {
    type: GET_RECORDS_REQUEST,
  };
};

const getRecordsSuccess = data => {
  return {
    type: GET_RECORDS_SUCCESS,
    payload: data,
  };
};

const getRecordsFailure = error => {
  return {
    type: GET_RECORDS_FAILURE,
    payload: error,
  };
};

export const deleteAllRecords = () => {
  return {
    type: DELETE_ALL_RECORDS,
    payload: [],
  };
};

export const getRecords = date => {
  return async dispatch => {
    dispatch(getRecordsRequest());
    try {
      const { data } = await getDailyRecord(date);
      dispatch(getRecordsSuccess(data));
    } catch (error) {
      dispatch(getRecordsFailure(error));
    }
  };
};

export const recordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECORDS_REQUEST:
      return { ...state, recordsLoading: true };
    case GET_RECORDS_SUCCESS:
      return { ...state, recordsLoading: false, recordsData: action.payload };
    case GET_RECORDS_FAILURE:
      return { ...state, recordsLoading: false, recordsError: action.payload };
    case DELETE_ALL_RECORDS:
      return { ...state, recordsData: action.payload };
    default:
      return state;
  }
};
