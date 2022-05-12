import React from 'react';
import { IProduct } from '../types/types';
import '../styles/ProductCard.css';
import { useDispatch } from 'react-redux';

interface ProductCardProps {
    product: IProduct;
    onClickAdd: (product: IProduct) => void;
    onClickDelete: (product: IProduct) => void;
    onClick: () => void;
}

export default function ProductCard({ product, onClickAdd, onClickDelete, onClick }: ProductCardProps) {
    return (
        <div className="product" onClick={onClick}>
            <div className="product__image">
                <img src="https://picsum.photos/200" alt={product.name} />
            </div>
            <h2 className="product__name">{product.name}</h2>
            <p>Weight: {product.weight}</p>
            <p>
                Width x height: {product.size.width} x {product.size.height}
            </p>
            <p className="product__body">Count: {product.count}</p>
            <div className="product__buttons product-buttons">
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        onClickAdd(product);
                    }}
                    className="product-buttons__add-button"
                >
                    Add
                </button>
                {product.count > 0 && (
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            onClickDelete(product);
                        }}
                        className="product-buttons__delete-button"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
