import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IProduct } from '../types/types';
import '../styles/ProductModal.css';

interface ProductDeleteModalProps {
    modal: {
        visible: boolean;
        product: IProduct | null;
    };
    hideModal: () => void;
}

export default function ProductDeleteModal({ modal, hideModal }: ProductDeleteModalProps) {
    const dispatch = useDispatch();
    let [value, setValue] = useState<number>(1);
    let product = modal.product;
    return (
        <div
            className={modal.visible ? 'modal active' : 'modal'}
            onClick={() => {
                hideModal();
                setValue(1);
            }}
        >
            <div className="modal__content" onClick={(event) => event.stopPropagation()}>
                <h2>Remove Ammount</h2>
                <h3>{product?.name}</h3>
                <label htmlFor="inputAmount">
                    Enter amount:
                    <input
                        autoFocus={true}
                        type="number"
                        id="inputAmount"
                        name="inputAmount"
                        value={value}
                        onChange={(event) => setValue(Number(event.target.value))}
                    />
                </label>
                <div className="modal__buttons modal-buttons">
                    <button
                        onClick={() => {
                            if (value < 1) {
                                alert('Set correct amount of items.');
                                return;
                            }
                            dispatch({ type: 'REMOVE_PRODUCT', payload: { id: product?.id, value } });
                            hideModal();
                            setValue(1);
                        }}
                        className="modal-buttons__confirm-button"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => {
                            hideModal();
                            setValue(1);
                        }}
                        className="modal-buttons__cancel-button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
