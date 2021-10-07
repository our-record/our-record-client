import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { recordFormReducer } from './recordForm';
import { recordsReducer } from './records';
import { usersReducer } from './users';

const rootReducer = combineReducers({
  events: eventsReducer,
  users: usersReducer,
  records: recordsReducer,
  recordForm: recordFormReducer,
});

export default rootReducer;
