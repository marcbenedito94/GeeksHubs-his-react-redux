import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import reducer from './reducer';

const enhancer = compose(
    persistState(),
)

const store = createStore( reducer, enhancer )

export default store