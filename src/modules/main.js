import { getMainData } from '../api';

const GET_MAIN_REQUEST = 'GET_MAIN_REQUEST';
const GET_MAIN_SUCCESS = 'GET_MAIN_SUCCESS';
const GET_MAIN_FAILURE = 'GET_MAIN_FAILURE';

const initialState = {
  mainData: [],
  mainLoading: false,
  mainError: null,
};

const getMainRequest = () => {
  return {
    type: GET_MAIN_REQUEST,
  };
};

const getMainSuccess = data => {
  return {
    type: GET_MAIN_SUCCESS,
    payload: data,
  };
};

const getMainFailure = error => {
  return {
    type: GET_MAIN_FAILURE,
    payload: error,
  };
};

export const getMain = date => {
  return async dispatch => {
    dispatch(getMainRequest());
    try {
      const { data } = await getMainData(date);
      dispatch(getMainSuccess(data));
    } catch (error) {
      dispatch(getMainFailure(error));
    }
  };
};

export const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_REQUEST:
      return { ...state, loading: true };
    case GET_MAIN_SUCCESS:
      return { ...state, loading: false, mainData: action.payload };
    case GET_MAIN_FAILURE:
      return { ...state, loading: false, mainError: action.payload };
    default:
      return state;
  }
};
