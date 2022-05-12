import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/store';
import { IProduct } from '../types/types';

export default function ProductPage() {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const products = useSelector((state: IRootState) => state.product.products);
    let product: IProduct = products.filter((product: IProduct) => {
        return product.id === Number(id);
    })[0];

    return (
        <div className="product-page__container">
            <button onClick={() => navigate('/')}>Back</button>
            <h3>{product.name}</h3>
            <p>Height: {product.size.height}</p>
            <p>Width: {product.size.width}</p>
            <p>Weight: {product.weight}</p>
            <div>
                <h4>Comments</h4>
                <div>
                    {product.comments.map((comment) => (
                        <div key={comment.id}>comment</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
