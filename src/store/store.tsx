import { createStore, combineReducers, applyMiddleware } from 'redux';
import { IProduct } from '../types/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { modalReducer } from './modalReducer';
import { productReducer } from './productReducer';
import thunk from 'redux-thunk';
import { deleteModalReducer } from './deleteModalReducer';

const rootReducer = combineReducers({
    modal: modalReducer,
    deleteModal: deleteModalReducer,
    product: productReducer,
});
export type IRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
