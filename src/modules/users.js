import axios from 'axios';
import { API } from '../api';

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

const initialState = {
  usersData: [],
  usersLoading: false,
  usersError: null,
};

const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};

const getUsersSuccess = data => {
  return {
    type: GET_USERS_SUCCESS,
    payload: data,
  };
};

const getUsersFailure = error => {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
};

export const getUsersInfo = () => {
  return dispatch => {
    dispatch(getUsersRequest());
    axios({
      url: `http://${API}/user/register-info`,
      withCredentials: true,
    })
      .then(res => dispatch(getUsersSuccess(res.data)))
      .catch(error => dispatch(getUsersFailure(error)));
  };
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, usersLoading: true };
    case GET_USERS_SUCCESS:
      return { ...state, usersLoading: false, usersData: action.payload };
    case GET_USERS_FAILURE:
      return { ...state, usersLoading: false, usersError: action.payload };
    default:
      return state;
  }
};
