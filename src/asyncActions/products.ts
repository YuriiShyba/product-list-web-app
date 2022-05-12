import { Dispatch } from 'react';
import { addManyProductsAction } from '../store/productReducer';
import axios from 'axios';

export const fetchProducts = () => {
    return function (dispatch: Dispatch<any>) {
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((json) => dispatch(addManyProductsAction(json)));
    };
};
