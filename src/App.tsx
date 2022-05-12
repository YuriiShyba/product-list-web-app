import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductListPage from './components/ProductListPage';
import ProductPage from './components/ProductPage';

function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Routes>
                    <Route path="" element={<ProductListPage />}></Route>
                    <Route path="/product/:id" element={<ProductPage />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
