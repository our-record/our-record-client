import axios from 'axios';
import { API } from '../api';

const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

const initialState = {
  eventsData: [],
  eventsLoading: false,
  eventsError: null,
};

const getEventsRequest = () => {
  return {
    type: GET_EVENTS_REQUEST,
  };
};

const getEventsSuccess = events => {
  return {
    type: GET_EVENTS_SUCCESS,
    payload: events,
  };
};

const getEventsFailure = error => {
  return {
    type: GET_EVENTS_FAILURE,
    payload: error,
  };
};

export const getEvents = () => {
  return dispatch => {
    dispatch(getEventsRequest());
    axios({
      url: `http://${API}/anniversary`,
      withCredentials: true,
    })
      .then(res => {
        dispatch(getEventsSuccess(res.data));
      })
      .catch(error => dispatch(getEventsFailure(error)));
  };
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return { ...state, loading: true };
    case GET_EVENTS_SUCCESS:
      return { ...state, loading: false, eventsData: action.payload };
    case GET_EVENTS_FAILURE:
      return { ...state, loading: false, eventsError: action.payload };
    default:
      return state;
  }
};
