import axios from 'axios';
import { API } from '../api';

const GET_DETAIL_REQUEST = 'GET_DETAIL_REQUEST';
const GET_DETAIL_SUCCESS = 'GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'GET_DETAIL_FAILURE';
const SET_LOADING_FINISH = 'SET_LOADING_FINISH';

const initialState = {
  recordDetailData: {},
  recordDetailLoading: false,
  recordDetailError: null,
};

const getDetailRequest = () => ({ type: GET_DETAIL_REQUEST });
const getDetailSuccess = data => ({ type: GET_DETAIL_SUCCESS, data });
const getDetailFailure = error => ({ type: GET_DETAIL_FAILURE, error });
export const setLoadingFinish = () => ({
  type: SET_LOADING_FINISH,
});

export const getRecordDetail = id => {
  return dispatch => {
    dispatch(getDetailRequest());
    axios({
      url: `http://${API}/post/detail`,
      method: 'post',
      data: { _id: id },
      withCredentials: true,
    })
      .then(res => {
        const { data } = res;
        dispatch(getDetailSuccess(data));
      })
      .catch(error => dispatch(getDetailFailure(error)));
  };
};

export const recordFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_REQUEST:
      return { ...state, recordDetailLoading: true };
    case GET_DETAIL_SUCCESS:
      return {
        ...state,
        recordDetailLoading: false,
        recordDetailData: action.data,
      };
    case GET_DETAIL_FAILURE:
      return {
        ...state,
        recordDetailLoading: false,
        recordDetailError: action.error,
      };
    default:
      return state;
  }
};
