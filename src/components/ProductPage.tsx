import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IRootState } from '../store/store';
import { IComment, IProduct } from '../types/types';
import axios from 'axios';
import List from './List';
import Comment from './Comment';

export default function ProductPage() {
    const dispatch = useDispatch();
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<number | undefined>(product?.count);
    const [addingComment, setAddingComment] = useState<boolean>(false);
    const [commentInput, setCommentInput] = useState<string>('');

    async function getAProduct() {
        let response = await axios.get('http://localhost:3000/products/' + id);
        setProduct(response.data);
    }

    useEffect(() => {
        getAProduct();
    }, []);

    useEffect(() => {
        setValue(product?.count);
    }, [product]);

    return (
        <div>
            {product && (
                <div className="product-page__container">
                    <button onClick={() => navigate('/')}>Back</button>
                    <h3>{product.name}</h3>
                    <p>Height: {product.size.height}</p>
                    <p>Width: {product.size.width}</p>
                    <p>Weight: {product.weight}</p>
                    <div>Count: {product.count}</div>
                    {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
                    {isEditing && (
                        <div>
                            <button
                                onClick={() => {
                                    dispatch({ type: 'EDIT_PRODUCT', payload: { id: product.id, value } });
                                    setIsEditing(false);
                                    setProduct({ ...product, count: Number(value) >= 0 ? Number(value) : 0 });
                                }}
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                }}
                            >
                                Cancel
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={(event) => setValue(Number(event.target.value))}
                            />
                        </div>
                    )}
                    <div>
                        <h4>Comments</h4>
                        {!addingComment && <button onClick={() => setAddingComment(true)}>Add Comment</button>}
                        {addingComment && (
                            <div>
                                <input
                                    type="text"
                                    value={commentInput}
                                    onChange={(event) => setCommentInput(event.target.value)}
                                />
                                <button
                                    onClick={() => {
                                        dispatch({
                                            type: 'ADD_COMMENT',
                                            payload: {
                                                id: id,
                                                comment: {
                                                    id: Number(new Date()),
                                                    productId: id,
                                                    description: commentInput,
                                                    date: new Date().toString(),
                                                },
                                            },
                                        });
                                    }}
                                >
                                    Save
                                </button>
                                <button onClick={() => setAddingComment(false)}>Cancel</button>
                            </div>
                        )}
                        <div>
                            <List
                                items={product.comments}
                                renderItem={(comment: IComment) => <Comment key={comment.id} comment={comment} />}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
