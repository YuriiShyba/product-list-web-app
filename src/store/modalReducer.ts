import { IProduct } from '../types/types';

const defaultState = {
    visible: false,
    product: null,
};

interface Action {
    type: string;
    payload: IProduct;
}

const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

export const modalReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, visible: true, product: action.payload };
        case HIDE_MODAL:
            return { ...state, visible: false };
        default:
            return state;
    }
};
