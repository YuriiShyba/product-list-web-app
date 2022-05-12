import React, { useEffect, useState } from 'react';
import { IProduct } from '../types/types';
import List from './List';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/ProductListPage.css';
import ProductModal from './ProductModal';
import { IRootState } from '../store/store';
import { fetchProducts } from '../asyncActions/products';
import ProductDeleteModal from './ProductDeleteModal';
import { useNavigate } from 'react-router-dom';

export default function ProductListPage() {
    const [sorting, setSorting] = useState<string>('byname');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useSelector((state: IRootState) => state.modal);
    const deleteModal = useSelector((state: IRootState) => state.deleteModal);
    const products: IProduct[] = useSelector((state: IRootState) => state.product.products);
    useEffect(() => {
        dispatch(fetchProducts() as any);
    }, []);
    useEffect(() => {
        if (products.filter((product) => product.count > 0).length > 0) {
            setSorting('byvalue1');
        } else {
            setSorting('byname1');
        }
    }, [products]);

    function handleAdd(product: IProduct) {
        dispatch({ type: 'SHOW_MODAL', payload: product });
    }

    function hideModal() {
        dispatch({ type: 'HIDE_MODAL' });
    }

    function handleDelete(product: IProduct) {
        dispatch({ type: 'SHOW_DELETE_MODAL', payload: product });
    }

    function hideDeleteModal() {
        dispatch({ type: 'HIDE_DELETE_MODAL' });
    }

    function getSortType() {
        switch (sorting) {
            case 'byname1':
                return (a: IProduct, b: IProduct) => {
                    return a.name.localeCompare(b.name);
                };
            case 'byvalue1':
                return (a: IProduct, b: IProduct) => {
                    return b.count - a.count;
                };
            case 'byname2':
                return (a: IProduct, b: IProduct) => {
                    return b.name.localeCompare(a.name);
                };
            case 'byvalue2':
                return (a: IProduct, b: IProduct) => {
                    return a.count - b.count;
                };
            default:
                return (a: IProduct, b: IProduct) => {
                    return a.name.localeCompare(b.name);
                };
        }
    }

    return (
        <div>
            <select name="sorting" id="sorting" value={sorting} onChange={(event) => setSorting(event.target.value)}>
                <option value="byname1">By name A-Z</option>
                <option value="byname2">By name Z-A</option>
                <option value="byvalue1">By value decreasing</option>
                <option value="byvalue2">By value increasing</option>
            </select>
            <div className="products-page">
                <List
                    items={products.sort(getSortType())}
                    renderItem={(product: IProduct) => (
                        <ProductCard
                            onClick={() => navigate('/product/' + product.id)}
                            key={product.id}
                            product={product}
                            onClickAdd={handleAdd}
                            onClickDelete={handleDelete}
                        />
                    )}
                />
                <ProductModal modal={modal} hideModal={hideModal} />
                <ProductDeleteModal modal={deleteModal} hideModal={hideDeleteModal} />
            </div>
        </div>
    );
}
