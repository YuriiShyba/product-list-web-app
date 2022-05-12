import { IProduct } from '../types/types';

let defaultState: { products: IProduct[] } = {
    products: [],
};

const ADD_PRODUCT = 'ADD_PRODUCT';
const INITIALIZE_PRODUCTS = 'INITIALIZE_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const productReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case ADD_PRODUCT:
            let updatedListOfProducts = state.products.map((product) => {
                return product.id === action.payload.id
                    ? { ...product, count: product.count + action.payload.value }
                    : product;
            });
            return { ...state, products: updatedListOfProducts };
        case INITIALIZE_PRODUCTS:
            return { ...state, products: action.payload };
        case REMOVE_PRODUCT:
            let updatedListOfProductsAfterRemove = state.products.map((product) => {
                return product.id === action.payload.id
                    ? {
                          ...product,
                          count: product.count - action.payload.value > 0 ? product.count - action.payload.value : 0,
                      }
                    : product;
            });
            return { ...state, products: updatedListOfProductsAfterRemove };
        default:
            return state;
    }
};

export const addManyProductsAction = (payload: IProduct[]) => ({ type: INITIALIZE_PRODUCTS, payload });
