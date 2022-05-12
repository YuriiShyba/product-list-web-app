import { IProduct } from '../types/types';

const defaultState = {
    visible: false,
    product: null,
};

interface Action {
    type: string;
    payload: IProduct;
}

const SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL';
const HIDE_DELETE_MODAL = 'HIDE_DELETE_MODAL';

export const deleteModalReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case SHOW_DELETE_MODAL:
            return { ...state, visible: true, product: action.payload };
        case HIDE_DELETE_MODAL:
            return { ...state, visible: false };
        default:
            return state;
    }
};
