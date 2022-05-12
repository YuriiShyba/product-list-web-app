import { IProduct } from '../types/types';
import axios from 'axios';

let defaultState: { products: IProduct[] } = {
    products: [],
};

const ADD_PRODUCT = 'ADD_PRODUCT';
const INITIALIZE_PRODUCTS = 'INITIALIZE_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const ADD_COMMENT = 'ADD_COMMENT';

export const productReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case ADD_PRODUCT:
            let updatedListOfProducts = state.products.map((product) => {
                if (product.id === action.payload.id) {
                    axios
                        .patch('http://localhost:3000/products/' + product.id, {
                            edited_field: 'count',
                            count: product.count + action.payload.value,
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => console.log(error));
                    return { ...product, count: product.count + action.payload.value };
                }
                return product;
            });

            return { ...state, products: updatedListOfProducts };
        case INITIALIZE_PRODUCTS:
            return { ...state, products: action.payload };
        case REMOVE_PRODUCT:
            let updatedListOfProductsAfterRemove = state.products.map((product) => {
                if (product.id === action.payload.id) {
                    let newCount = product.count - action.payload.value > 0 ? product.count - action.payload.value : 0;
                    axios
                        .patch('http://localhost:3000/products/' + product.id, {
                            edited_field: 'count',
                            count: newCount,
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => console.log(error));
                    return {
                        ...product,
                        count: newCount,
                    };
                }
                return product;
            });
            return { ...state, products: updatedListOfProductsAfterRemove };
        case EDIT_PRODUCT:
            let updatedListOfProductsAfterEdit = state.products.map((product) => {
                if (action.payload.value < 0) {
                    action.payload.value = 0;
                }
                if (product.id === action.payload.id) {
                    axios
                        .patch('http://localhost:3000/products/' + product.id, {
                            edited_field: 'count',
                            count: action.payload.value,
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => console.log(error));
                    return { ...product, count: action.payload.value };
                }
                return product;
            });
            return { ...state, products: updatedListOfProductsAfterEdit };
        case ADD_COMMENT:
            let newComments;
            let newArray = state.products.map((product) => {
                if (product.id === action.payload.id) {
                    newComments = { ...product.comments };
                    newComments.push(action.payload.comment);
                    axios
                        .patch('http://localhost:3000/products/' + product.id, {
                            edited_field: 'comments',
                            comments: newComments,
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => console.log(error));
                    return { ...product, comments: newComments };
                }
                return product;
            });
            return { ...state, products: newArray };
        default:
            return state;
    }
};

export const addManyProductsAction = (payload: IProduct[]) => ({ type: INITIALIZE_PRODUCTS, payload });
